import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import App from "./App";

window.CESIUM_BASE_URL = "/cesiumStatic";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN ?? "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
