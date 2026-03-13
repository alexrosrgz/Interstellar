import { useState, useCallback, useRef, useEffect } from "react";
import GlobeViewer from "./components/GlobeViewer";
import InfoPanel from "./components/InfoPanel";
import HUD from "./components/HUD";
import StartScreen from "./components/StartScreen";
import ControlsOverlay from "./components/ControlsOverlay";
import type { CountryInfo } from "./data/types";
import type { FlightState } from "./flight/FlightState";
import "./App.css";

export default function App() {
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [pointerLockLost, setPointerLockLost] = useState(false);
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [flightHud, setFlightHud] = useState<Pick<FlightState, "speed" | "altitude" | "heading"> & { zoom: number }>({
    speed: 278,
    altitude: 2_000_000,
    heading: 90,
    zoom: 1,
  });

  const requestLockRef = useRef<(() => void) | null>(null);
  const isLockedRef = useRef<React.MutableRefObject<boolean> | null>(null);

  const handlePointerLockReady = useCallback((requestLock: () => void, isLocked: React.MutableRefObject<boolean>) => {
    requestLockRef.current = requestLock;
    isLockedRef.current = isLocked;
  }, []);

  // Listen for pointer lock loss while game is running
  const startedRef = useRef(false);
  startedRef.current = started;

  useEffect(() => {
    function onLockChange() {
      if (document.pointerLockElement === null && startedRef.current) {
        setPointerLockLost(true);
      }
    }
    document.addEventListener("pointerlockchange", onLockChange);
    return () => document.removeEventListener("pointerlockchange", onLockChange);
  }, []);

  const [modelUrl, setModelUrl] = useState("/models/lockheed_martin_f-22_raptor.glb");
  const [headingOffset, setHeadingOffset] = useState(Math.PI);

  const handleStart = useCallback((selectedModelUrl: string, selectedHeadingOffset: number) => {
    setModelUrl(selectedModelUrl);
    setHeadingOffset(selectedHeadingOffset);
    setStarted(true);
    setPointerLockLost(false);
    requestLockRef.current?.();
  }, []);

  const handleResumeLock = useCallback(() => {
    setPointerLockLost(false);
    requestLockRef.current?.();
  }, []);

  return (
    <>
      {!started && <StartScreen ready={ready} onStart={handleStart} />}
      <GlobeViewer
        modelUrl={modelUrl}
        headingOffset={headingOffset}
        started={started}
        onReady={() => setReady(true)}
        onCountryChange={setCountry}
        onFlightUpdate={setFlightHud}
        onPointerLockReady={handlePointerLockReady}
      />
      {started && (
        <>
          <HUD speed={flightHud.speed} altitude={flightHud.altitude} heading={flightHud.heading} zoom={flightHud.zoom} />
          <InfoPanel country={country} />
          <ControlsOverlay />
          {pointerLockLost && (
            <div
              onClick={handleResumeLock}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "16px 32px",
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 12,
                color: "white",
                fontSize: 16,
                cursor: "pointer",
                zIndex: 200,
                textAlign: "center",
              }}
            >
              Click to resume flight
            </div>
          )}
        </>
      )}
    </>
  );
}
