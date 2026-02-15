import { useRef, useCallback } from "react";
import { findCountryAt } from "./countryLookup";
import { getCountryByIso3 } from "../data/countryData";
import type { CountryInfo } from "../data/types";

export function useCountryDetection(onCountryChange: (country: CountryInfo | null) => void) {
  const lastIso3Ref = useRef<string | null>(null);
  const lastCheckRef = useRef(0);

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
          const info = getCountryByIso3(iso3);
          onCountryChange(info ?? null);
        } else {
          onCountryChange(null);
        }
      }
    },
    [onCountryChange],
  );

  return check;
}
