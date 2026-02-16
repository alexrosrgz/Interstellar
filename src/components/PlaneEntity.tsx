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
    const modelOffset = Quaternion.fromHeadingPitchRoll(new HeadingPitchRoll(Math.PI, 0, 0));
    const flightQuat = Transforms.headingPitchRollQuaternion(position, hpr);
    const orientation = Quaternion.multiply(flightQuat, modelOffset, new Quaternion());

    const entity = viewer.entities.add({
      position,
      orientation: orientation as any,
      model: {
        uri: "/models/lockheed_martin_f-22_raptor.glb",
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
