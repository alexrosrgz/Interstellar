import { useRef, useCallback } from "react";
import { findCountryAt } from "./countryLookup";
import { fetchCountryInfo } from "../data/countryApi";
import type { CountryInfo } from "../data/types";

export function useCountryDetection(onCountryChange: (country: CountryInfo | null) => void) {
  const lastIso3Ref = useRef<string | null>(null);
  const lastCheckRef = useRef(0);
  const fetchIdRef = useRef(0);

  const check = useCallback(
    (lon: number, lat: number, now: number) => {
      // Throttle to every 500ms
      if (now - lastCheckRef.current < 500) return;
      lastCheckRef.current = now;

      const result = findCountryAt(lon, lat);
      const iso3 = result?.iso3 ?? null;

      if (iso3 !== lastIso3Ref.current) {
        lastIso3Ref.current = iso3;
        if (iso3) {
          const id = ++fetchIdRef.current;
          fetchCountryInfo(iso3).then((info) => {
            // Discard stale result if country changed while fetching
            if (fetchIdRef.current !== id) return;
            onCountryChange(info);
          });
        } else {
          fetchIdRef.current++;
          onCountryChange(null);
        }
      }
    },
    [onCountryChange],
  );

  return check;
}
