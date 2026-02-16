import { useEffect } from "react";
import {
  Cartesian3,
  HeadingPitchRoll,
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
    // Cesium HPR axes are swapped vs aviation: "pitch" = banking, "roll" = nose pitch
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(initialState.heading),
      0, // banking (Cesium "pitch")
      0, // nose pitch (Cesium "roll")
    );

    const entity = viewer.entities.add({
      position,
      orientation: Transforms.headingPitchRollQuaternion(position, hpr) as any,
      model: {
        uri: "/models/f-35_lightning_ii_-_fighter_jet_-_free.glb",
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
