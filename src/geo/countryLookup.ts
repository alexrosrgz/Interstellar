import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import type { Feature, FeatureCollection, Geometry } from "geojson";

interface BBoxEntry {
  feature: Feature<Geometry>;
  iso3: string;
  name: string;
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
}

let entries: BBoxEntry[] = [];
let lastResult: { lon: number; lat: number; iso3: string | null } | null = null;

function computeBBox(coords: number[][][]): [number, number, number, number] {
  let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
  for (const ring of coords) {
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }
  return [minLon, minLat, maxLon, maxLat];
}

export async function loadCountries(): Promise<void> {
  const resp = await fetch("/data/countries.geojson");
  const geojson: FeatureCollection = await resp.json();

  entries = [];
  for (const feature of geojson.features) {
    const rawIso3 = feature.properties?.ISO_A3;
    const iso3 = (rawIso3 && rawIso3 !== "-99") ? rawIso3 : (feature.properties?.ADM0_A3 ?? "");
    const name = feature.properties?.NAME ?? feature.properties?.ADMIN ?? "";
    if (!iso3 || iso3 === "-99") continue;

    const geom = feature.geometry;
    if (geom.type === "Polygon") {
      const [minLon, minLat, maxLon, maxLat] = computeBBox(geom.coordinates);
      entries.push({ feature, iso3, name, minLon, maxLon, minLat, maxLat });
    } else if (geom.type === "MultiPolygon") {
      // Compute bbox over all polygons for the whole feature
      let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
      for (const polygon of geom.coordinates) {
        const [a, b, c, d] = computeBBox(polygon);
        if (a < minLon) minLon = a;
        if (c > maxLon) maxLon = c;
        if (b < minLat) minLat = b;
        if (d > maxLat) maxLat = d;
      }
      entries.push({ feature, iso3, name, minLon, maxLon, minLat, maxLat });
    }
  }
}

export function findCountryAt(lon: number, lat: number): { iso3: string; name: string } | null {
  // Fast path: same position as last check, return cached result
  if (lastResult && Math.abs(lastResult.lon - lon) < 0.001 && Math.abs(lastResult.lat - lat) < 0.001) {
    if (lastResult.iso3 === null) return null;
    const entry = entries.find((e) => e.iso3 === lastResult!.iso3);
    return entry ? { iso3: entry.iso3, name: entry.name } : null;
  }

  const pt = point([lon, lat]);

  // Check last known country first (fast path for staying in same country)
  if (lastResult?.iso3) {
    const lastEntry = entries.find((e) => e.iso3 === lastResult!.iso3);
    if (
      lastEntry &&
      lon >= lastEntry.minLon && lon <= lastEntry.maxLon &&
      lat >= lastEntry.minLat && lat <= lastEntry.maxLat &&
      booleanPointInPolygon(pt, lastEntry.feature as any)
    ) {
      lastResult = { lon, lat, iso3: lastEntry.iso3 };
      return { iso3: lastEntry.iso3, name: lastEntry.name };
    }
  }

  // Full search with bbox pre-filter
  for (const entry of entries) {
    if (lon < entry.minLon || lon > entry.maxLon || lat < entry.minLat || lat > entry.maxLat) {
      continue;
    }
    if (booleanPointInPolygon(pt, entry.feature as any)) {
      lastResult = { lon, lat, iso3: entry.iso3 };
      return { iso3: entry.iso3, name: entry.name };
    }
  }

  lastResult = { lon, lat, iso3: null };
  return null;
}
