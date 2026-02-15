import { useState } from "react";
import GlobeViewer from "./components/GlobeViewer";
import InfoPanel from "./components/InfoPanel";
import HUD from "./components/HUD";
import LoadingScreen from "./components/LoadingScreen";
import ControlsOverlay from "./components/ControlsOverlay";
import type { CountryInfo } from "./data/types";
import type { FlightState } from "./flight/FlightState";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [flightHud, setFlightHud] = useState<Pick<FlightState, "speed" | "altitude" | "heading">>({
    speed: 278,
    altitude: 2_000_000,
    heading: 90,
  });

  return (
    <>
      {loading && <LoadingScreen />}
      <GlobeViewer
        onReady={() => setLoading(false)}
        onCountryChange={setCountry}
        onFlightUpdate={setFlightHud}
      />
      {!loading && (
        <>
          <HUD speed={flightHud.speed} altitude={flightHud.altitude} heading={flightHud.heading} />
          <InfoPanel country={country} />
          <ControlsOverlay />
        </>
      )}
    </>
  );
}
