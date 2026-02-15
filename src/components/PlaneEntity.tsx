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
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(initialState.heading),
      0,
      0,
    );

    const entity = viewer.entities.add({
      position,
      orientation: Transforms.headingPitchRollQuaternion(position, hpr) as any,
      model: {
        uri: "/models/plane.glb",
        minimumPixelSize: 200,
        silhouetteColor: { red: 0.3, green: 0.6, blue: 1.0, alpha: 0.6 } as any,
        silhouetteSize: 1,
      },
    });

    onEntityReady(entity);

    return () => {
      viewer.entities.remove(entity);
    };
  }, [viewer]);

  return null;
}
