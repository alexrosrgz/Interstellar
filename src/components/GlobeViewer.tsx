import { useEffect, useRef, useState, useCallback } from "react";
import {
  Viewer as CesiumViewer,
  Cesium3DTileset,
  Cartesian3,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  GeoJsonDataSource,
  Color,
  JulianDate,
  PolylineGraphics,
  PolylineDashMaterialProperty,
} from "cesium";
import { loadCountries } from "../geo/countryLookup";
import { useGameLoop } from "../state/useGameLoop";
import PlaneEntity from "./PlaneEntity";
import { createInitialFlightState } from "../flight/FlightState";
import type { CountryInfo } from "../data/types";
import type { FlightState } from "../flight/FlightState";

interface Props {
  onReady: () => void;
  onCountryChange: (country: CountryInfo | null) => void;
  onFlightUpdate: (data: Pick<FlightState, "speed" | "altitude" | "heading">) => void;
}

export default function GlobeViewer({ onReady, onCountryChange, onFlightUpdate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerObjRef = useRef<CesiumViewer | null>(null);
  const initRef = useRef(false);
  const [viewerReady, setViewerReady] = useState(false);
  const { tick, setEntity, setViewer, flightRef, handleWheel } = useGameLoop(onCountryChange, onFlightUpdate);

  useEffect(() => {
    if (initRef.current || !containerRef.current) return;
    initRef.current = true;

    async function init() {
      const viewer = new CesiumViewer(containerRef.current!, {
        scene3DOnly: true,
        animation: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        creditContainer: document.createElement("div"),
      });

      const tileset = await Cesium3DTileset.fromIonAssetId(2275207);
      viewer.scene.primitives.add(tileset);
      viewer.scene.globe.show = false;

      // Disable all default camera inputs (we handle camera ourselves)
      const sc = viewer.scene.screenSpaceCameraController;
      sc.enableRotate = false;
      sc.enableZoom = false;
      sc.enableTilt = false;
      sc.enableLook = false;
      sc.enableTranslate = false;

      // Enable atmosphere & lighting
      viewer.scene.globe.enableLighting = true;
      viewer.scene.fog.enabled = true;

      // Disable default click handling
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(() => {}, ScreenSpaceEventType.LEFT_CLICK);

      // Set initial camera
      const initialState = createInitialFlightState();
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(initialState.lon, initialState.lat, initialState.altitude + 200),
      });

      viewerObjRef.current = viewer;
      setViewer(viewer);

      // Load geojson for country detection and render borders visually
      const [, borders] = await Promise.all([
        loadCountries(),
        GeoJsonDataSource.load("/data/countries.geojson", {
          stroke: Color.fromAlpha(Color.WHITE, 0.4),
          fill: Color.TRANSPARENT,
          strokeWidth: 1.5,
        }),
      ]);
      // Convert polygon entities to ground-clamped polylines
      // (polygon clampToGround is too expensive for complex shapes)
      const now = JulianDate.now();
      for (const entity of borders.entities.values) {
        if (entity.polygon) {
          const hierarchy = entity.polygon.hierarchy?.getValue(now);
          if (hierarchy) {
            entity.polyline = new PolylineGraphics({
              positions: [...hierarchy.positions, hierarchy.positions[0]],
              clampToGround: true,
              material: Color.fromAlpha(Color.WHITE, 0.4),
              width: 1.5,
            });
          }
          entity.polygon = undefined as any;
        }
      }
      viewer.dataSources.add(borders);

      // Load US state borders with dashed lines
      const states = await GeoJsonDataSource.load("/data/us-states.geojson", {
        stroke: Color.fromAlpha(Color.WHITE, 0.3),
        fill: Color.TRANSPARENT,
        strokeWidth: 1,
      });
      for (const entity of states.entities.values) {
        if (entity.polygon) {
          const hierarchy = entity.polygon.hierarchy?.getValue(now);
          if (hierarchy) {
            entity.polyline = new PolylineGraphics({
              positions: [...hierarchy.positions, hierarchy.positions[0]],
              clampToGround: true,
              material: new PolylineDashMaterialProperty({
                color: Color.fromAlpha(Color.WHITE, 0.3),
                dashLength: 16,
              }),
              width: 1,
            });
          }
          entity.polygon = undefined as any;
        }
      }
      viewer.dataSources.add(states);

      // Register preRender callback
      viewer.scene.preRender.addEventListener(tick);

      // Trigger re-render so PlaneEntity mounts
      setViewerReady(true);
      onReady();
    }

    init();

    return () => {
      if (viewerObjRef.current) {
        viewerObjRef.current.scene.preRender.removeEventListener(tick);
        viewerObjRef.current.destroy();
      }
    };
  }, []);

  // Attach wheel zoom handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleEntityReady = useCallback(
    (entity: any) => {
      setEntity(entity);
    },
    [setEntity],
  );

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
      {viewerReady && viewerObjRef.current && (
        <PlaneEntity
          viewer={viewerObjRef.current}
          initialState={flightRef.current}
          onEntityReady={handleEntityReady}
        />
      )}
    </>
  );
}
