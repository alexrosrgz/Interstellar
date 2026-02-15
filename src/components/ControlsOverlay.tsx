export default function ControlsOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        padding: "16px 20px",
        background: "var(--panel-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--panel-border)",
        borderRadius: 12,
        color: "var(--text-primary)",
        fontSize: 13,
        lineHeight: 1.7,
        zIndex: 100,
        maxWidth: 260,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--accent)" }}>Controls</div>
      <div><kbd>W</kbd> / <kbd>S</kbd> — Speed up / Slow down</div>
      <div><kbd>A</kbd> / <kbd>D</kbd> — Turn left / right</div>
      <div><kbd>Space</kbd> — Ascend</div>
      <div><kbd>Shift</kbd> — Descend</div>
      <div><kbd>Scroll</kbd> — Zoom</div>
    </div>
  );
}
