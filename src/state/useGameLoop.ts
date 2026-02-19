import { useRef, useCallback, useEffect } from "react";
import {
  Cartesian3,
  HeadingPitchRoll,
  Quaternion,
  Transforms,
  Math as CesiumMath,
  type Viewer,
  type Entity,
} from "cesium";
import { updateFlight } from "../flight/flightPhysics";
import { createInitialFlightState, type FlightState } from "../flight/FlightState";
import { useFlightControls } from "../flight/useFlightControls";
import { useCountryDetection } from "../geo/useCountryDetection";
import { BASE_CHASE_DISTANCE } from "../flight/constants";
import type { CountryInfo } from "../data/types";

const MIN_CHASE_DISTANCE = 5;
const MODEL_OFFSET_QUAT = Quaternion.fromHeadingPitchRoll(
  new HeadingPitchRoll(Math.PI, 0, 0),
);
const MAX_CHASE_DISTANCE = 15_000_000;
const CHASE_HEIGHT_RATIO = 30 / 80; // height / distance at default zoom

export function useGameLoop(
  onCountryChange: (c: CountryInfo | null) => void,
  onFlightUpdate: (data: Pick<FlightState, "speed" | "altitude" | "heading">) => void,
) {
  const flightRef = useRef<FlightState>(createInitialFlightState());
  const lastTimeRef = useRef(0);
  const hudThrottleRef = useRef(0);
  const keysRef = useFlightControls();
  const checkCountry = useCountryDetection(onCountryChange);
  const entityRef = useRef<Entity | null>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const chaseDistRef = useRef(80);
  const pausedRef = useRef(false);

  // Toggle pause on P key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "KeyP") pausedRef.current = !pausedRef.current;
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const setEntity = useCallback((entity: Entity) => {
    entityRef.current = entity;
  }, []);

  const setViewer = useCallback((viewer: Viewer) => {
    viewerRef.current = viewer;
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.001 * chaseDistRef.current;
    chaseDistRef.current = Math.max(
      MIN_CHASE_DISTANCE,
      Math.min(MAX_CHASE_DISTANCE, chaseDistRef.current + delta),
    );
  }, []);

  const tick = useCallback(() => {
    const viewer = viewerRef.current;
    const entity = entityRef.current;
    if (!viewer || !entity) return;
    if (pausedRef.current) {
      lastTimeRef.current = 0;
      return;
    }

    const now = performance.now();
    if (lastTimeRef.current === 0) lastTimeRef.current = now;
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
    lastTimeRef.current = now;

    if (dt <= 0) return;

    // Compute zoom-dependent speed multiplier
    const chaseDist = chaseDistRef.current;
    const speedMultiplier = Math.pow(chaseDist / BASE_CHASE_DISTANCE, 0.6);

    // 1. Update flight physics
    const flight = updateFlight(flightRef.current, keysRef.current, dt, speedMultiplier);
    flightRef.current = flight;

    // 2. Update entity position/orientation
    const position = Cartesian3.fromDegrees(flight.lon, flight.lat, flight.altitude);
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(flight.heading),
      -flight.roll,  // Cesium "pitch" = forward-axis rotation = aviation banking
      flight.pitch,   // Cesium "roll" = lateral-axis rotation = aviation nose up/down
    );
    const flightQuat = Transforms.headingPitchRollQuaternion(position, hpr);
    const orientationQuat = Quaternion.multiply(flightQuat, MODEL_OFFSET_QUAT, new Quaternion());

    (entity.position as any).setValue(position);
    (entity.orientation as any).setValue(orientationQuat);

    // 3. Chase camera with orbit-mode blending at far distances
    const ORBIT_START = 500_000;
    const ORBIT_FULL = 5_000_000;
    const orbitBlend = Math.min(1, Math.max(0,
      (chaseDist - ORBIT_START) / (ORBIT_FULL - ORBIT_START)));

    const chaseHeight = chaseDist * CHASE_HEIGHT_RATIO;
    const headingRad = CesiumMath.toRadians(flight.heading);
    const transform = Transforms.eastNorthUpToFixedFrame(position);

    const chaseX = -chaseDist * Math.sin(headingRad);
    const chaseY = -chaseDist * Math.cos(headingRad);
    const chaseZ = chaseHeight;

    // Always keep some "behind" offset so the plane is seen from behind (pointing forward)
    const behindFactor = Math.max(0.15, 1 - orbitBlend);
    const offset = new Cartesian3(
      chaseX * behindFactor,
      chaseY * behindFactor,
      chaseZ + (chaseDist - chaseZ) * orbitBlend,
    );
    viewer.camera.lookAtTransform(transform, offset);

    // 4. Throttled country detection (every 500ms)
    checkCountry(flight.lon, flight.lat, now);

    // 5. Throttled HUD update (~10fps) — show effective speed (base × multiplier)
    if (now - hudThrottleRef.current > 100) {
      hudThrottleRef.current = now;
      onFlightUpdate({
        speed: flight.speed * speedMultiplier,
        altitude: flight.altitude,
        heading: flight.heading,
      });
    }
  }, [keysRef, checkCountry, onFlightUpdate]);

  return { tick, setEntity, setViewer, flightRef, handleWheel };
}
