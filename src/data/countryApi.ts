import type { CountryInfo } from "./types";
import { COUNTRY_DATA } from "./countryData";

const cache = new Map<string, CountryInfo>();

const WORLD_BANK_INDICATORS = [
  "SP.POP.TOTL",
  "NY.GDP.MKTP.CD",
  "NY.GDP.PCAP.CD",
  "SP.DYN.TFRT.IN",
  "GC.DOD.TOTL.GD.ZS",
  "GC.DOD.TOTL.CN",
];

interface RestCountryResponse {
  name: { common: string; official: string };
  capital?: string[];
  area?: number;
  languages?: Record<string, string>;
  flags?: { svg?: string; png?: string };
}

interface WorldBankEntry {
  indicator: { id: string };
  value: number | null;
}

function buildFallback(iso3: string): CountryInfo {
  const hc = COUNTRY_DATA[iso3];
  if (hc) {
    return {
      ...hc,
      gdpPerCapita: null,
      birthRate: null,
      capital: null,
      landArea: null,
      officialLanguages: null,
      nationalDebt: null,
      debtToGdpRatio: null,
      flagUrl: null,
    };
  }
  return {
    name: iso3,
    iso3,
    population: null,
    gdpNominal: null,
    gdpPerCapita: null,
    birthRate: null,
    capital: null,
    landArea: null,
    officialLanguages: null,
    nationalDebt: null,
    debtToGdpRatio: null,
    flagUrl: null,
    medianSalary: null,
    governmentType: "Unknown",
  };
}

async function fetchRestCountries(
  iso3: string,
): Promise<{ capital: string | null; landArea: number | null; officialLanguages: string | null; name: string | null; flagUrl: string | null }> {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${iso3}?fields=name,capital,area,languages,flags`,
    );
    if (!res.ok) return { capital: null, landArea: null, officialLanguages: null, name: null, flagUrl: null };
    const data: RestCountryResponse = await res.json();
    return {
      name: data.name?.common ?? null,
      capital: data.capital?.[0] ?? null,
      landArea: data.area ?? null,
      officialLanguages: data.languages
        ? Object.values(data.languages).join(", ")
        : null,
      flagUrl: data.flags?.svg ?? data.flags?.png ?? null,
    };
  } catch {
    return { capital: null, landArea: null, officialLanguages: null, name: null, flagUrl: null };
  }
}

async function fetchWorldBank(
  iso3: string,
): Promise<{
  population: number | null;
  gdpNominal: number | null;
  gdpPerCapita: number | null;
  birthRate: number | null;
  nationalDebt: number | null;
  debtToGdpRatio: number | null;
}> {
  const result = {
    population: null as number | null,
    gdpNominal: null as number | null,
    gdpPerCapita: null as number | null,
    birthRate: null as number | null,
    nationalDebt: null as number | null,
    debtToGdpRatio: null as number | null,
  };

  try {
    const indicators = WORLD_BANK_INDICATORS.join(";");
    const res = await fetch(
      `https://api.worldbank.org/v2/country/${iso3}/indicator/${indicators}?source=2&format=json&per_page=12&mrv=2`,
    );
    if (!res.ok) return result;

    const json = await res.json();
    // World Bank returns [metadata, data[]] — data is in index 1
    const entries: WorldBankEntry[] | undefined = json[1];
    if (!entries) return result;

    // For each indicator, take the first non-null value (most recent)
    const seen = new Set<string>();
    for (const entry of entries) {
      const id = entry.indicator.id;
      if (seen.has(id) || entry.value === null) continue;
      seen.add(id);

      switch (id) {
        case "SP.POP.TOTL":
          result.population = entry.value;
          break;
        case "NY.GDP.MKTP.CD":
          result.gdpNominal = entry.value;
          break;
        case "NY.GDP.PCAP.CD":
          result.gdpPerCapita = entry.value;
          break;
        case "SP.DYN.TFRT.IN":
          result.birthRate = entry.value;
          break;
        case "GC.DOD.TOTL.CN":
          result.nationalDebt = entry.value;
          break;
        case "GC.DOD.TOTL.GD.ZS":
          result.debtToGdpRatio = entry.value;
          break;
      }
    }
    return result;
  } catch {
    return result;
  }
}

export async function fetchCountryInfo(iso3: string): Promise<CountryInfo> {
  const cached = cache.get(iso3);
  if (cached) return cached;

  const hardcoded = COUNTRY_DATA[iso3];

  const [restData, wbData] = await Promise.all([
    fetchRestCountries(iso3),
    fetchWorldBank(iso3),
  ]);

  const info: CountryInfo = {
    name: restData.name ?? hardcoded?.name ?? iso3,
    iso3,
    population: wbData.population ?? hardcoded?.population ?? null,
    gdpNominal: wbData.gdpNominal ?? hardcoded?.gdpNominal ?? null,
    gdpPerCapita: wbData.gdpPerCapita,
    birthRate: wbData.birthRate,
    capital: restData.capital,
    landArea: restData.landArea,
    officialLanguages: restData.officialLanguages,
    nationalDebt: wbData.nationalDebt,
    debtToGdpRatio: wbData.debtToGdpRatio,
    flagUrl: restData.flagUrl,
    medianSalary: hardcoded?.medianSalary ?? null,
    governmentType: hardcoded?.governmentType ?? "Unknown",
  };

  cache.set(iso3, info);
  return info;
}
