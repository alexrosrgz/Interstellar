import { readFileSync } from "fs";
const d = JSON.parse(readFileSync("/Users/alerr415/Project/Interstellar/public/data/countries.geojson", "utf8"));
console.log("Features:", d.features.length);
const iso3s = d.features.map(f => f.properties.ISO_A3).filter(x => x && x !== "-99");
console.log("Valid ISO3:", iso3s.length);
console.log("Sample:", iso3s.slice(0, 10).join(", "));
