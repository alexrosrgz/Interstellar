import { useEffect } from "react";
import {
  Cartesian3,
  HeadingPitchRoll,
  Quaternion,
  Transforms,
  Math as CesiumMath,
  type Viewer,
  type Entity,
} from "cesium";
import type { FlightState } from "../flight/FlightState";

interface Props {
  viewer: Viewer;
  initialState: FlightState;
  onEntityReady: (entity: Entity) => void;
}

export default function PlaneEntity({ viewer, initialState, onEntityReady }: Props) {
  useEffect(() => {
    const position = Cartesian3.fromDegrees(
      initialState.lon,
      initialState.lat,
      initialState.altitude,
    );
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(initialState.heading),
      0, // banking (Cesium "pitch")
      0, // nose pitch (Cesium "roll")
    );
    const modelOffset = Quaternion.fromHeadingPitchRoll(new HeadingPitchRoll(-Math.PI / 2, 0, 0));
    const flightQuat = Transforms.headingPitchRollQuaternion(position, hpr);
    const orientation = Quaternion.multiply(flightQuat, modelOffset, new Quaternion());

    // F-22 Raptor model by NLM (CC-BY) — https://sketchfab.com/3d-models/f22-raptor-free-2a64abf0866a405c865466c7642ca689
    const entity = viewer.entities.add({
      position,
      orientation: orientation as any,
      model: {
        uri: "/models/f22_raptor.glb",
        minimumPixelSize: 200,
      },
    });

    onEntityReady(entity);

    return () => {
      viewer.entities.remove(entity);
    };
  }, [viewer]);

  return null;
}
