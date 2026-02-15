# Interstellar

An interactive 3D globe flight simulator. Pilot a virtual aircraft around Earth, view real-time flight instruments, and discover country information as you fly over different territories.

## Features

- **Flight simulation** — fly freely around the globe with keyboard controls and realistic flight dynamics
- **Heads-up display** — real-time speed, altitude, and heading instruments
- **Country detection** — automatic identification of the country below using point-in-polygon geolocation
- **Country info panel** — population, GDP, median salary, and government type for each country
- **Country borders** — subtle border outlines rendered on the globe surface

## Controls

| Key | Action |
|-----|--------|
| W / Arrow Up | Speed up |
| S / Arrow Down | Slow down |
| A / Arrow Left | Turn left |
| D / Arrow Right | Turn right |
| Space | Ascend |
| Shift | Descend |
| Scroll | Zoom in/out |

## Setup

```bash
npm install
```

Create a `.env.local` file with your Cesium Ion access token:

```
VITE_CESIUM_ION_TOKEN=your_token_here
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19, TypeScript, Vite
- CesiumJS for 3D globe rendering
- Turf.js for geospatial calculations
