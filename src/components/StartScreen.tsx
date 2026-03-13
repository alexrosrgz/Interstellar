import { useState } from "react";
import "@google/model-viewer";
import { planes } from "../data/planes";
import "./StartScreen.css";

interface StartScreenProps {
  ready: boolean;
  onStart: (modelUrl: string, headingOffset: number) => void;
}

export default function StartScreen({ ready, onStart }: StartScreenProps) {
  const [selectedId, setSelectedId] = useState(planes[0].id);

  return (
    <div className="start-screen">
      <div className="start-screen__content">
        <h1 className="start-screen__title">INTERSTELLAR</h1>
        <p className="start-screen__subtitle">Fly-Over-Earth Explorer</p>
        <div className="plane-selector">
          {planes.map((plane) => (
            <button
              key={plane.id}
              className={`plane-selector__card${selectedId === plane.id ? " plane-selector__card--selected" : ""}`}
              onClick={() => setSelectedId(plane.id)}
            >
              <model-viewer
                src={plane.modelUrl}
                camera-controls
                auto-rotate
                rotation-per-second="30deg"
                interaction-prompt="none"
                disable-zoom
                className="plane-selector__viewer"
              />
              <span className="plane-selector__name">{plane.name}</span>
            </button>
          ))}
        </div>
        <button
          className="start-screen__start-btn"
          disabled={!ready}
          onClick={() => {
            const plane = planes.find((p) => p.id === selectedId)!;
            onStart(plane.modelUrl, plane.headingOffset);
          }}
        >
          {ready ? "Start Flight" : "Loading..."}
        </button>
        <p className="start-screen__hint">
          {ready ? "Mouse to steer \u00B7 W/S throttle \u00B7 Space/Shift altitude" : "Preparing Earth for exploration..."}
        </p>
      </div>
    </div>
  );
}
