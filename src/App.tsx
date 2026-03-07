import { useState } from "react";
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
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [flightHud, setFlightHud] = useState<Pick<FlightState, "speed" | "altitude" | "heading"> & { zoom: number }>({
    speed: 278,
    altitude: 2_000_000,
    heading: 90,
    zoom: 1,
  });

  return (
    <>
      {!started && <StartScreen ready={ready} onStart={() => setStarted(true)} />}
      <GlobeViewer
        onReady={() => setReady(true)}
        onCountryChange={setCountry}
        onFlightUpdate={setFlightHud}
      />
      {started && (
        <>
          <HUD speed={flightHud.speed} altitude={flightHud.altitude} heading={flightHud.heading} zoom={flightHud.zoom} />
          <InfoPanel country={country} />
          <ControlsOverlay />
        </>
      )}
    </>
  );
}
