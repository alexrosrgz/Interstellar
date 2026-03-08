import "./StartScreen.css";

interface StartScreenProps {
  ready: boolean;
  onStart: () => void;
}

export default function StartScreen({ ready, onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-screen__content">
        <h1 className="start-screen__title">INTERSTELLAR</h1>
        <p className="start-screen__subtitle">Fly-Over-Earth Explorer</p>
        <button
          className="start-screen__start-btn"
          disabled={!ready}
          onClick={onStart}
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
