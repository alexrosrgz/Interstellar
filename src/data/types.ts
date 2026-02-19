export interface CountryInfo {
  name: string;
  iso3: string;
  // API fields (nullable — may fail or be unavailable)
  population: number | null;
  gdpNominal: number | null;
  gdpPerCapita: number | null;
  birthRate: number | null;
  capital: string | null;
  landArea: number | null;
  officialLanguages: string | null;
  nationalDebt: number | null;
  debtToGdpRatio: number | null;
  flagUrl: string | null;
  // Hardcoded-only fields
  medianSalary: number | null;
  governmentType: string;
}
