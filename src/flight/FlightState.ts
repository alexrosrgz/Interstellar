export interface FlightState {
  /** Longitude in degrees */
  lon: number;
  /** Latitude in degrees */
  lat: number;
  /** Altitude in meters above surface */
  altitude: number;
  /** Heading in degrees (0 = north, 90 = east) */
  heading: number;
  /** Speed in meters per second */
  speed: number;
  /** Visual roll in radians (banking during turns) */
  roll: number;
  /** Visual pitch in radians (climb/descent angle) */
  pitch: number;
}

export function createInitialFlightState(): FlightState {
  return {
    lon: -74.0,
    lat: 40.71,
    altitude: 1_000,
    heading: 0,
    speed: 75,
    roll: 0,
    pitch: 0,
  };
}
