export function formatPopulation(n: number | null): string {
  if (n === null) return "\u2014";
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function formatCurrency(n: number | null): string {
  if (n === null) return "\u2014";
  if (n >= 1_000_000_000_000) return "$" + (n / 1_000_000_000_000).toFixed(1) + "T";
  if (n >= 1_000_000_000) return "$" + (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toString();
}

export function formatSalary(n: number | null): string {
  if (n === null) return "N/A";
  return formatCurrency(n) + "/yr";
}

export function formatSpeed(mps: number): string {
  return Math.round(mps * 3.6) + " km/h";
}

export function formatAltitude(m: number): string {
  if (m >= 1000) return (m / 1000).toFixed(1) + " km";
  return Math.round(m) + " m";
}

export function formatHeading(deg: number): string {
  const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round(deg / 45) % 8;
  return Math.round(deg) + "° " + cardinals[idx];
}

export function formatZoom(zoom: number): string {
  if (zoom >= 10) return Math.round(zoom) + "x";
  return zoom.toFixed(1) + "x";
}

export function formatArea(km2: number | null): string {
  if (km2 === null) return "\u2014";
  if (km2 >= 1_000_000) return (km2 / 1_000_000).toFixed(1) + "M km\u00B2";
  return km2.toLocaleString("en-US") + " km\u00B2";
}

export function formatDebt(usd: number | null): string {
  if (usd === null) return "\u2014";
  return formatCurrency(usd);
}

export function formatBirthRate(rate: number | null): string {
  if (rate === null) return "\u2014";
  return rate.toFixed(1) + " births/woman";
}

export function formatDebtRatio(pct: number | null): string {
  if (pct === null) return "\u2014";
  return pct.toFixed(1) + "%";
}

export function formatGdpPerCapita(usd: number | null): string {
  if (usd === null) return "\u2014";
  return "$" + Math.round(usd).toLocaleString("en-US");
}
