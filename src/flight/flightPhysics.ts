import type { FlightState } from "./FlightState";
import {
  MIN_SPEED,
  MAX_SPEED,
  SPEED_STEP,
  MIN_ALTITUDE,
  MAX_ALTITUDE,
  ALTITUDE_RATE,
  TURN_RATE,
  MAX_ROLL,
  MAX_PITCH,
  ROLL_LERP,
  PITCH_LERP,
  EARTH_RADIUS,
} from "./constants";

export interface KeysPressed {
  forward: boolean;   // W or E
  backward: boolean;  // S or Q
  left: boolean;      // A
  right: boolean;     // D
  ascend: boolean;    // Space
  descend: boolean;   // Shift
}

const DEG_TO_RAD = Math.PI / 180;

function lerp(current: number, target: number, rate: number, dt: number): number {
  return current + (target - current) * Math.min(1, rate * dt);
}

export function updateFlight(state: FlightState, keys: KeysPressed, dt: number, speedMultiplier = 1): FlightState {
  // Speed
  let speed = state.speed;
  if (keys.forward) speed = Math.min(MAX_SPEED, speed + SPEED_STEP * dt);
  if (keys.backward) speed = Math.max(MIN_SPEED, speed - SPEED_STEP * dt);

  // Altitude (scaled by zoom multiplier)
  let altitude = state.altitude;
  const altitudeMultiplier = Math.min(speedMultiplier, 100);
  if (keys.ascend) altitude = Math.min(MAX_ALTITUDE, altitude + ALTITUDE_RATE * altitudeMultiplier * dt);
  if (keys.descend) altitude = Math.max(MIN_ALTITUDE, altitude - ALTITUDE_RATE * altitudeMultiplier * dt);

  // Turning
  let turnInput = 0;
  if (keys.left) turnInput = -1;
  if (keys.right) turnInput = 1;

  const heading = (state.heading + turnInput * TURN_RATE * dt + 360) % 360;

  // Visual roll (banking)
  const targetRoll = -turnInput * MAX_ROLL;
  const roll = lerp(state.roll, targetRoll, ROLL_LERP, dt);

  // Visual pitch
  let pitchInput = 0;
  if (keys.ascend) pitchInput = 1;
  if (keys.descend) pitchInput = -1;
  const targetPitch = pitchInput * MAX_PITCH;
  const pitch = lerp(state.pitch, targetPitch, PITCH_LERP, dt);

  // Move position along great circle (spherical approximation)
  const headingRad = heading * DEG_TO_RAD;
  const dist = speed * speedMultiplier * dt;
  const angularDist = dist / EARTH_RADIUS;

  const latRad = state.lat * DEG_TO_RAD;
  const lonRad = state.lon * DEG_TO_RAD;

  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(angularDist) +
    Math.cos(latRad) * Math.sin(angularDist) * Math.cos(headingRad),
  );
  const newLonRad =
    lonRad +
    Math.atan2(
      Math.sin(headingRad) * Math.sin(angularDist) * Math.cos(latRad),
      Math.cos(angularDist) - Math.sin(latRad) * Math.sin(newLatRad),
    );

  let lat = newLatRad / DEG_TO_RAD;
  let lon = newLonRad / DEG_TO_RAD;

  // Wrap longitude to [-180, 180]
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;

  // Clamp latitude
  lat = Math.max(-89.9, Math.min(89.9, lat));

  return { lon, lat, altitude, heading, speed, roll, pitch };
}
