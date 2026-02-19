import { formatSpeed, formatAltitude, formatHeading, formatZoom } from "../utils/formatters";
import "./HUD.css";

interface Props {
  speed: number;
  altitude: number;
  heading: number;
  zoom: number;
}

export default function HUD({ speed, altitude, heading, zoom }: Props) {
  return (
    <div className="hud">
      <div className="hud__item">
        <span className="hud__label">SPD</span>
        <span className="hud__value">{formatSpeed(speed)}</span>
      </div>
      <div className="hud__divider" />
      <div className="hud__item">
        <span className="hud__label">ALT</span>
        <span className="hud__value">{formatAltitude(altitude)}</span>
      </div>
      <div className="hud__divider" />
      <div className="hud__item">
        <span className="hud__label">HDG</span>
        <span className="hud__value">{formatHeading(heading)}</span>
      </div>
      <div className="hud__divider" />
      <div className="hud__item">
        <span className="hud__label">ZOM</span>
        <span className="hud__value">{formatZoom(zoom)}</span>
      </div>
    </div>
  );
}
