interface Window {
  CESIUM_BASE_URL: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace React.JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        "rotation-per-second"?: string;
        "interaction-prompt"?: string;
        "disable-zoom"?: boolean | string;
      },
      HTMLElement
    >;
  }
}
