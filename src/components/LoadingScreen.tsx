import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <h1 className="loading-screen__title">INTERSTELLAR</h1>
        <p className="loading-screen__subtitle">Preparing Earth for exploration...</p>
        <div className="loading-screen__spinner" />
      </div>
    </div>
  );
}
