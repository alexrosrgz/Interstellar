interface HardcodedCountry {
  name: string;
  iso3: string;
  population: number;
  gdpNominal: number;
  medianSalary: number | null;
  governmentType: string;
}

const COUNTRY_DATA: Record<string, HardcodedCountry> = {
  // ─── North America ───
  USA: { name: "United States", iso3: "USA", population: 331900000, gdpNominal: 28780000000000, medianSalary: 56300, governmentType: "Federal presidential constitutional republic" },
  CAN: { name: "Canada", iso3: "CAN", population: 40100000, gdpNominal: 2140000000000, medianSalary: 42600, governmentType: "Federal parliamentary constitutional monarchy" },
  MEX: { name: "Mexico", iso3: "MEX", population: 128900000, gdpNominal: 1789000000000, medianSalary: 6100, governmentType: "Federal presidential constitutional republic" },

  // ─── Central America ───
  GTM: { name: "Guatemala", iso3: "GTM", population: 17600000, gdpNominal: 102700000000, medianSalary: 3200, governmentType: "Unitary presidential constitutional republic" },
  BLZ: { name: "Belize", iso3: "BLZ", population: 410000, gdpNominal: 2870000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  HND: { name: "Honduras", iso3: "HND", population: 10280000, gdpNominal: 34230000000, medianSalary: 2500, governmentType: "Unitary presidential constitutional republic" },
  SLV: { name: "El Salvador", iso3: "SLV", population: 6310000, gdpNominal: 33810000000, medianSalary: 3900, governmentType: "Unitary presidential constitutional republic" },
  NIC: { name: "Nicaragua", iso3: "NIC", population: 6850000, gdpNominal: 17620000000, medianSalary: 2400, governmentType: "Unitary presidential constitutional republic" },
  CRI: { name: "Costa Rica", iso3: "CRI", population: 5210000, gdpNominal: 68380000000, medianSalary: 7900, governmentType: "Unitary presidential constitutional republic" },
  PAN: { name: "Panama", iso3: "PAN", population: 4380000, gdpNominal: 76520000000, medianSalary: 7200, governmentType: "Unitary presidential constitutional republic" },

  // ─── Caribbean ───
  CUB: { name: "Cuba", iso3: "CUB", population: 11260000, gdpNominal: 107400000000, medianSalary: null, governmentType: "Unitary one-party socialist republic" },
  JAM: { name: "Jamaica", iso3: "JAM", population: 2830000, gdpNominal: 18540000000, medianSalary: 3600, governmentType: "Unitary parliamentary constitutional monarchy" },
  HTI: { name: "Haiti", iso3: "HTI", population: 11580000, gdpNominal: 20300000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },
  DOM: { name: "Dominican Republic", iso3: "DOM", population: 11120000, gdpNominal: 113600000000, medianSalary: 4800, governmentType: "Unitary presidential constitutional republic" },
  TTO: { name: "Trinidad and Tobago", iso3: "TTO", population: 1530000, gdpNominal: 27820000000, medianSalary: 9400, governmentType: "Unitary parliamentary constitutional republic" },
  BRB: { name: "Barbados", iso3: "BRB", population: 282000, gdpNominal: 6130000000, medianSalary: 10200, governmentType: "Unitary parliamentary republic" },
  BHS: { name: "Bahamas", iso3: "BHS", population: 410000, gdpNominal: 14580000000, medianSalary: 18000, governmentType: "Unitary parliamentary constitutional monarchy" },
  GRD: { name: "Grenada", iso3: "GRD", population: 125000, gdpNominal: 1310000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  ATG: { name: "Antigua and Barbuda", iso3: "ATG", population: 94000, gdpNominal: 1870000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  DMA: { name: "Dominica", iso3: "DMA", population: 73000, gdpNominal: 640000000, medianSalary: null, governmentType: "Unitary parliamentary republic" },
  KNA: { name: "Saint Kitts and Nevis", iso3: "KNA", population: 48000, gdpNominal: 1080000000, medianSalary: null, governmentType: "Federal parliamentary constitutional monarchy" },
  LCA: { name: "Saint Lucia", iso3: "LCA", population: 180000, gdpNominal: 2270000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  VCT: { name: "Saint Vincent and the Grenadines", iso3: "VCT", population: 104000, gdpNominal: 970000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },

  // ─── South America ───
  BRA: { name: "Brazil", iso3: "BRA", population: 214300000, gdpNominal: 2170000000000, medianSalary: 5400, governmentType: "Federal presidential constitutional republic" },
  ARG: { name: "Argentina", iso3: "ARG", population: 46300000, gdpNominal: 621800000000, medianSalary: 5200, governmentType: "Federal presidential constitutional republic" },
  COL: { name: "Colombia", iso3: "COL", population: 52080000, gdpNominal: 363500000000, medianSalary: 3700, governmentType: "Unitary presidential constitutional republic" },
  VEN: { name: "Venezuela", iso3: "VEN", population: 28440000, gdpNominal: 96500000000, medianSalary: null, governmentType: "Federal presidential constitutional republic" },
  PER: { name: "Peru", iso3: "PER", population: 34050000, gdpNominal: 268200000000, medianSalary: 4300, governmentType: "Unitary presidential constitutional republic" },
  CHL: { name: "Chile", iso3: "CHL", population: 19490000, gdpNominal: 335500000000, medianSalary: 8600, governmentType: "Unitary presidential constitutional republic" },
  ECU: { name: "Ecuador", iso3: "ECU", population: 18190000, gdpNominal: 118700000000, medianSalary: 4100, governmentType: "Unitary presidential constitutional republic" },
  BOL: { name: "Bolivia", iso3: "BOL", population: 12080000, gdpNominal: 44010000000, medianSalary: 2700, governmentType: "Unitary presidential constitutional republic" },
  PRY: { name: "Paraguay", iso3: "PRY", population: 6780000, gdpNominal: 42960000000, medianSalary: 3500, governmentType: "Unitary presidential constitutional republic" },
  URY: { name: "Uruguay", iso3: "URY", population: 3420000, gdpNominal: 77240000000, medianSalary: 9300, governmentType: "Unitary presidential constitutional republic" },
  GUY: { name: "Guyana", iso3: "GUY", population: 810000, gdpNominal: 16320000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  SUR: { name: "Suriname", iso3: "SUR", population: 620000, gdpNominal: 3690000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },

  // ─── Western Europe ───
  GBR: { name: "United Kingdom", iso3: "GBR", population: 67700000, gdpNominal: 3500000000000, medianSalary: 39600, governmentType: "Unitary parliamentary constitutional monarchy" },
  FRA: { name: "France", iso3: "FRA", population: 68200000, gdpNominal: 3130000000000, medianSalary: 33400, governmentType: "Unitary semi-presidential constitutional republic" },
  DEU: { name: "Germany", iso3: "DEU", population: 84500000, gdpNominal: 4460000000000, medianSalary: 44700, governmentType: "Federal parliamentary republic" },
  ITA: { name: "Italy", iso3: "ITA", population: 58900000, gdpNominal: 2255000000000, medianSalary: 30400, governmentType: "Unitary parliamentary constitutional republic" },
  ESP: { name: "Spain", iso3: "ESP", population: 48100000, gdpNominal: 1582000000000, medianSalary: 27200, governmentType: "Unitary parliamentary constitutional monarchy" },
  NLD: { name: "Netherlands", iso3: "NLD", population: 17700000, gdpNominal: 1092000000000, medianSalary: 44000, governmentType: "Unitary parliamentary constitutional monarchy" },
  BEL: { name: "Belgium", iso3: "BEL", population: 11700000, gdpNominal: 624000000000, medianSalary: 40500, governmentType: "Federal parliamentary constitutional monarchy" },
  AUT: { name: "Austria", iso3: "AUT", population: 9100000, gdpNominal: 516000000000, medianSalary: 42500, governmentType: "Federal parliamentary republic" },
  CHE: { name: "Switzerland", iso3: "CHE", population: 8800000, gdpNominal: 885000000000, medianSalary: 66800, governmentType: "Federal semi-direct democracy" },
  LUX: { name: "Luxembourg", iso3: "LUX", population: 660000, gdpNominal: 86900000000, medianSalary: 52500, governmentType: "Unitary parliamentary constitutional monarchy" },
  IRL: { name: "Ireland", iso3: "IRL", population: 5150000, gdpNominal: 545000000000, medianSalary: 41200, governmentType: "Unitary parliamentary republic" },
  PRT: { name: "Portugal", iso3: "PRT", population: 10300000, gdpNominal: 287100000000, medianSalary: 17900, governmentType: "Unitary semi-presidential constitutional republic" },
  MCO: { name: "Monaco", iso3: "MCO", population: 40000, gdpNominal: 8600000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  LIE: { name: "Liechtenstein", iso3: "LIE", population: 39000, gdpNominal: 7200000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  AND: { name: "Andorra", iso3: "AND", population: 80000, gdpNominal: 3350000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional diarchy" },
  SMR: { name: "San Marino", iso3: "SMR", population: 34000, gdpNominal: 1850000000, medianSalary: null, governmentType: "Unitary parliamentary directorial republic" },
  MLT: { name: "Malta", iso3: "MLT", population: 535000, gdpNominal: 19800000000, medianSalary: 22000, governmentType: "Unitary parliamentary constitutional republic" },

  // ─── Northern Europe ───
  SWE: { name: "Sweden", iso3: "SWE", population: 10500000, gdpNominal: 593000000000, medianSalary: 39400, governmentType: "Unitary parliamentary constitutional monarchy" },
  NOR: { name: "Norway", iso3: "NOR", population: 5500000, gdpNominal: 485000000000, medianSalary: 53000, governmentType: "Unitary parliamentary constitutional monarchy" },
  DNK: { name: "Denmark", iso3: "DNK", population: 5900000, gdpNominal: 404000000000, medianSalary: 48200, governmentType: "Unitary parliamentary constitutional monarchy" },
  FIN: { name: "Finland", iso3: "FIN", population: 5550000, gdpNominal: 300000000000, medianSalary: 38200, governmentType: "Unitary parliamentary republic" },
  ISL: { name: "Iceland", iso3: "ISL", population: 380000, gdpNominal: 28600000000, medianSalary: 42500, governmentType: "Unitary parliamentary republic" },
  EST: { name: "Estonia", iso3: "EST", population: 1340000, gdpNominal: 41160000000, medianSalary: 20800, governmentType: "Unitary parliamentary republic" },
  LVA: { name: "Latvia", iso3: "LVA", population: 1840000, gdpNominal: 43490000000, medianSalary: 16200, governmentType: "Unitary parliamentary republic" },
  LTU: { name: "Lithuania", iso3: "LTU", population: 2870000, gdpNominal: 77840000000, medianSalary: 18500, governmentType: "Unitary semi-presidential republic" },

  // ─── Eastern Europe ───
  RUS: { name: "Russia", iso3: "RUS", population: 144200000, gdpNominal: 2020000000000, medianSalary: 6400, governmentType: "Federal semi-presidential constitutional republic" },
  UKR: { name: "Ukraine", iso3: "UKR", population: 37000000, gdpNominal: 178800000000, medianSalary: 3600, governmentType: "Unitary semi-presidential constitutional republic" },
  POL: { name: "Poland", iso3: "POL", population: 37800000, gdpNominal: 842200000000, medianSalary: 17900, governmentType: "Unitary parliamentary republic" },
  CZE: { name: "Czechia", iso3: "CZE", population: 10830000, gdpNominal: 330860000000, medianSalary: 19200, governmentType: "Unitary parliamentary republic" },
  ROU: { name: "Romania", iso3: "ROU", population: 19000000, gdpNominal: 348000000000, medianSalary: 11500, governmentType: "Unitary semi-presidential republic" },
  HUN: { name: "Hungary", iso3: "HUN", population: 9600000, gdpNominal: 212000000000, medianSalary: 14200, governmentType: "Unitary parliamentary republic" },
  BGR: { name: "Bulgaria", iso3: "BGR", population: 6520000, gdpNominal: 100640000000, medianSalary: 9800, governmentType: "Unitary parliamentary republic" },
  SVK: { name: "Slovakia", iso3: "SVK", population: 5460000, gdpNominal: 132000000000, medianSalary: 15800, governmentType: "Unitary parliamentary republic" },
  SVN: { name: "Slovenia", iso3: "SVN", population: 2120000, gdpNominal: 68220000000, medianSalary: 23500, governmentType: "Unitary parliamentary republic" },
  HRV: { name: "Croatia", iso3: "HRV", population: 3860000, gdpNominal: 82200000000, medianSalary: 14600, governmentType: "Unitary parliamentary republic" },
  BIH: { name: "Bosnia and Herzegovina", iso3: "BIH", population: 3230000, gdpNominal: 24660000000, medianSalary: 7600, governmentType: "Federal parliamentary republic" },
  SRB: { name: "Serbia", iso3: "SRB", population: 6660000, gdpNominal: 75180000000, medianSalary: 8200, governmentType: "Unitary parliamentary constitutional republic" },
  MNE: { name: "Montenegro", iso3: "MNE", population: 620000, gdpNominal: 7060000000, medianSalary: 7100, governmentType: "Unitary parliamentary republic" },
  MKD: { name: "North Macedonia", iso3: "MKD", population: 1830000, gdpNominal: 14130000000, medianSalary: 6900, governmentType: "Unitary parliamentary republic" },
  ALB: { name: "Albania", iso3: "ALB", population: 2770000, gdpNominal: 22980000000, medianSalary: 5600, governmentType: "Unitary parliamentary constitutional republic" },
  KOS: { name: "Kosovo", iso3: "KOS", population: 1770000, gdpNominal: 9430000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional republic" },
  MDA: { name: "Moldova", iso3: "MDA", population: 2490000, gdpNominal: 16540000000, medianSalary: 4200, governmentType: "Unitary parliamentary republic" },
  BLR: { name: "Belarus", iso3: "BLR", population: 9200000, gdpNominal: 72830000000, medianSalary: 4800, governmentType: "Unitary presidential republic" },
  GRC: { name: "Greece", iso3: "GRC", population: 10400000, gdpNominal: 239300000000, medianSalary: 17500, governmentType: "Unitary parliamentary republic" },
  CYP: { name: "Cyprus", iso3: "CYP", population: 1260000, gdpNominal: 31460000000, medianSalary: 21000, governmentType: "Unitary presidential constitutional republic" },

  // ─── East Asia ───
  CHN: { name: "China", iso3: "CHN", population: 1412000000, gdpNominal: 18530000000000, medianSalary: 8200, governmentType: "Unitary one-party socialist republic" },
  JPN: { name: "Japan", iso3: "JPN", population: 123300000, gdpNominal: 4210000000000, medianSalary: 29100, governmentType: "Unitary parliamentary constitutional monarchy" },
  KOR: { name: "South Korea", iso3: "KOR", population: 51740000, gdpNominal: 1710000000000, medianSalary: 26800, governmentType: "Unitary presidential constitutional republic" },
  PRK: { name: "North Korea", iso3: "PRK", population: 26070000, gdpNominal: 18000000000, medianSalary: null, governmentType: "Unitary one-party socialist republic" },
  MNG: { name: "Mongolia", iso3: "MNG", population: 3400000, gdpNominal: 17840000000, medianSalary: 3600, governmentType: "Unitary semi-presidential republic" },
  TWN: { name: "Taiwan", iso3: "TWN", population: 23400000, gdpNominal: 790000000000, medianSalary: 18700, governmentType: "Unitary semi-presidential constitutional republic" },

  // ─── Southeast Asia ───
  IDN: { name: "Indonesia", iso3: "IDN", population: 275500000, gdpNominal: 1417000000000, medianSalary: 3200, governmentType: "Unitary presidential constitutional republic" },
  PHL: { name: "Philippines", iso3: "PHL", population: 115600000, gdpNominal: 435700000000, medianSalary: 3100, governmentType: "Unitary presidential constitutional republic" },
  VNM: { name: "Vietnam", iso3: "VNM", population: 99500000, gdpNominal: 449100000000, medianSalary: 2800, governmentType: "Unitary one-party socialist republic" },
  THA: { name: "Thailand", iso3: "THA", population: 71800000, gdpNominal: 514900000000, medianSalary: 5200, governmentType: "Unitary parliamentary constitutional monarchy" },
  MMR: { name: "Myanmar", iso3: "MMR", population: 54410000, gdpNominal: 59800000000, medianSalary: null, governmentType: "Unitary parliamentary republic (military junta)" },
  MYS: { name: "Malaysia", iso3: "MYS", population: 33940000, gdpNominal: 399600000000, medianSalary: 7800, governmentType: "Federal parliamentary constitutional monarchy" },
  SGP: { name: "Singapore", iso3: "SGP", population: 5920000, gdpNominal: 497300000000, medianSalary: 35500, governmentType: "Unitary parliamentary republic" },
  KHM: { name: "Cambodia", iso3: "KHM", population: 16940000, gdpNominal: 31800000000, medianSalary: 1800, governmentType: "Unitary parliamentary constitutional monarchy" },
  LAO: { name: "Laos", iso3: "LAO", population: 7530000, gdpNominal: 14100000000, medianSalary: null, governmentType: "Unitary one-party socialist republic" },
  BRN: { name: "Brunei", iso3: "BRN", population: 450000, gdpNominal: 15100000000, medianSalary: null, governmentType: "Unitary Islamic absolute monarchy" },
  TLS: { name: "Timor-Leste", iso3: "TLS", population: 1360000, gdpNominal: 3100000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },

  // ─── South Asia ───
  IND: { name: "India", iso3: "IND", population: 1408000000, gdpNominal: 3940000000000, medianSalary: 2100, governmentType: "Federal parliamentary constitutional republic" },
  PAK: { name: "Pakistan", iso3: "PAK", population: 231400000, gdpNominal: 374900000000, medianSalary: 1500, governmentType: "Federal parliamentary constitutional republic" },
  BGD: { name: "Bangladesh", iso3: "BGD", population: 171200000, gdpNominal: 460200000000, medianSalary: 1600, governmentType: "Unitary parliamentary constitutional republic" },
  LKA: { name: "Sri Lanka", iso3: "LKA", population: 22200000, gdpNominal: 74400000000, medianSalary: 2600, governmentType: "Unitary semi-presidential constitutional republic" },
  NPL: { name: "Nepal", iso3: "NPL", population: 30900000, gdpNominal: 40920000000, medianSalary: 1400, governmentType: "Federal parliamentary republic" },
  BTN: { name: "Bhutan", iso3: "BTN", population: 790000, gdpNominal: 2890000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  MDV: { name: "Maldives", iso3: "MDV", population: 520000, gdpNominal: 6300000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  AFG: { name: "Afghanistan", iso3: "AFG", population: 41100000, gdpNominal: 14580000000, medianSalary: null, governmentType: "Unitary theocratic Islamic emirate" },

  // ─── Central Asia ───
  KAZ: { name: "Kazakhstan", iso3: "KAZ", population: 19600000, gdpNominal: 261000000000, medianSalary: 5400, governmentType: "Unitary presidential constitutional republic" },
  UZB: { name: "Uzbekistan", iso3: "UZB", population: 35300000, gdpNominal: 90380000000, medianSalary: 2200, governmentType: "Unitary presidential constitutional republic" },
  TKM: { name: "Turkmenistan", iso3: "TKM", population: 6340000, gdpNominal: 59900000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  TJK: { name: "Tajikistan", iso3: "TJK", population: 10140000, gdpNominal: 12010000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  KGZ: { name: "Kyrgyzstan", iso3: "KGZ", population: 6970000, gdpNominal: 11520000000, medianSalary: 2000, governmentType: "Unitary presidential republic" },

  // ─── Middle East ───
  TUR: { name: "Turkey", iso3: "TUR", population: 85280000, gdpNominal: 1108000000000, medianSalary: 7200, governmentType: "Unitary presidential constitutional republic" },
  SAU: { name: "Saudi Arabia", iso3: "SAU", population: 36900000, gdpNominal: 1069000000000, medianSalary: 15600, governmentType: "Unitary Islamic absolute monarchy" },
  IRN: { name: "Iran", iso3: "IRN", population: 87900000, gdpNominal: 401500000000, medianSalary: 4100, governmentType: "Unitary theocratic presidential Islamic republic" },
  IRQ: { name: "Iraq", iso3: "IRQ", population: 43530000, gdpNominal: 264200000000, medianSalary: 3200, governmentType: "Federal parliamentary republic" },
  ISR: { name: "Israel", iso3: "ISR", population: 9840000, gdpNominal: 527000000000, medianSalary: 33200, governmentType: "Unitary parliamentary republic" },
  ARE: { name: "United Arab Emirates", iso3: "ARE", population: 10080000, gdpNominal: 504200000000, medianSalary: 22000, governmentType: "Federal constitutional monarchy" },
  QAT: { name: "Qatar", iso3: "QAT", population: 2690000, gdpNominal: 219600000000, medianSalary: 20000, governmentType: "Unitary constitutional monarchy" },
  KWT: { name: "Kuwait", iso3: "KWT", population: 4310000, gdpNominal: 164700000000, medianSalary: 17500, governmentType: "Unitary constitutional monarchy" },
  OMN: { name: "Oman", iso3: "OMN", population: 4600000, gdpNominal: 104900000000, medianSalary: 10500, governmentType: "Unitary absolute monarchy" },
  BHR: { name: "Bahrain", iso3: "BHR", population: 1470000, gdpNominal: 44400000000, medianSalary: 12600, governmentType: "Unitary constitutional monarchy" },
  YEM: { name: "Yemen", iso3: "YEM", population: 33700000, gdpNominal: 21600000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  JOR: { name: "Jordan", iso3: "JOR", population: 11290000, gdpNominal: 50810000000, medianSalary: 5100, governmentType: "Unitary parliamentary constitutional monarchy" },
  LBN: { name: "Lebanon", iso3: "LBN", population: 5490000, gdpNominal: 18130000000, medianSalary: null, governmentType: "Unitary parliamentary confessionalist republic" },
  SYR: { name: "Syria", iso3: "SYR", population: 22130000, gdpNominal: 11000000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },
  PSE: { name: "Palestine", iso3: "PSE", population: 5370000, gdpNominal: 19100000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },

  // ─── Caucasus ───
  GEO: { name: "Georgia", iso3: "GEO", population: 3710000, gdpNominal: 24610000000, medianSalary: 4800, governmentType: "Unitary parliamentary republic" },
  ARM: { name: "Armenia", iso3: "ARM", population: 2790000, gdpNominal: 24040000000, medianSalary: 4200, governmentType: "Unitary parliamentary republic" },
  AZE: { name: "Azerbaijan", iso3: "AZE", population: 10140000, gdpNominal: 72350000000, medianSalary: 4500, governmentType: "Unitary semi-presidential republic" },

  // ─── North Africa ───
  EGY: { name: "Egypt", iso3: "EGY", population: 104300000, gdpNominal: 395900000000, medianSalary: 2700, governmentType: "Unitary semi-presidential republic" },
  DZA: { name: "Algeria", iso3: "DZA", population: 45600000, gdpNominal: 239900000000, medianSalary: 3400, governmentType: "Unitary semi-presidential constitutional republic" },
  MAR: { name: "Morocco", iso3: "MAR", population: 37800000, gdpNominal: 141500000000, medianSalary: 3100, governmentType: "Unitary parliamentary constitutional monarchy" },
  TUN: { name: "Tunisia", iso3: "TUN", population: 12460000, gdpNominal: 46300000000, medianSalary: 3200, governmentType: "Unitary presidential republic" },
  LBY: { name: "Libya", iso3: "LBY", population: 7000000, gdpNominal: 45750000000, medianSalary: null, governmentType: "Provisional government" },
  SDN: { name: "Sudan", iso3: "SDN", population: 47960000, gdpNominal: 34330000000, medianSalary: null, governmentType: "Federal provisional government" },
  MRT: { name: "Mauritania", iso3: "MRT", population: 4610000, gdpNominal: 10370000000, medianSalary: null, governmentType: "Unitary presidential Islamic republic" },

  // ─── West Africa ───
  NGA: { name: "Nigeria", iso3: "NGA", population: 218500000, gdpNominal: 472600000000, medianSalary: 1500, governmentType: "Federal presidential constitutional republic" },
  GHA: { name: "Ghana", iso3: "GHA", population: 33500000, gdpNominal: 72840000000, medianSalary: 1800, governmentType: "Unitary presidential constitutional republic" },
  CIV: { name: "Cote d'Ivoire", iso3: "CIV", population: 28160000, gdpNominal: 78800000000, medianSalary: 1300, governmentType: "Unitary presidential republic" },
  SEN: { name: "Senegal", iso3: "SEN", population: 17740000, gdpNominal: 28040000000, medianSalary: 1200, governmentType: "Unitary presidential republic" },
  MLI: { name: "Mali", iso3: "MLI", population: 22400000, gdpNominal: 19150000000, medianSalary: null, governmentType: "Military junta" },
  BFA: { name: "Burkina Faso", iso3: "BFA", population: 22670000, gdpNominal: 18900000000, medianSalary: null, governmentType: "Military junta" },
  NER: { name: "Niger", iso3: "NER", population: 26200000, gdpNominal: 16820000000, medianSalary: null, governmentType: "Military junta" },
  GIN: { name: "Guinea", iso3: "GIN", population: 13860000, gdpNominal: 20340000000, medianSalary: null, governmentType: "Military junta" },
  BEN: { name: "Benin", iso3: "BEN", population: 13350000, gdpNominal: 19760000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  TGO: { name: "Togo", iso3: "TGO", population: 8850000, gdpNominal: 8600000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  SLE: { name: "Sierra Leone", iso3: "SLE", population: 8610000, gdpNominal: 4090000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  LBR: { name: "Liberia", iso3: "LBR", population: 5300000, gdpNominal: 4000000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  GMB: { name: "Gambia", iso3: "GMB", population: 2640000, gdpNominal: 2270000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  GNB: { name: "Guinea-Bissau", iso3: "GNB", population: 2060000, gdpNominal: 1640000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },
  CPV: { name: "Cabo Verde", iso3: "CPV", population: 590000, gdpNominal: 2190000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },

  // ─── Central Africa ───
  CMR: { name: "Cameroon", iso3: "CMR", population: 27910000, gdpNominal: 44340000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  COD: { name: "Democratic Republic of the Congo", iso3: "COD", population: 99010000, gdpNominal: 64720000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },
  COG: { name: "Republic of the Congo", iso3: "COG", population: 5970000, gdpNominal: 15340000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  GAB: { name: "Gabon", iso3: "GAB", population: 2390000, gdpNominal: 21070000000, medianSalary: null, governmentType: "Military transitional government" },
  GNQ: { name: "Equatorial Guinea", iso3: "GNQ", population: 1670000, gdpNominal: 12260000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  TCD: { name: "Chad", iso3: "TCD", population: 17720000, gdpNominal: 12700000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  CAF: { name: "Central African Republic", iso3: "CAF", population: 5580000, gdpNominal: 2380000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  STP: { name: "Sao Tome and Principe", iso3: "STP", population: 230000, gdpNominal: 600000000, medianSalary: null, governmentType: "Unitary semi-presidential republic" },

  // ─── East Africa ───
  ETH: { name: "Ethiopia", iso3: "ETH", population: 123400000, gdpNominal: 155800000000, medianSalary: 900, governmentType: "Federal parliamentary republic" },
  KEN: { name: "Kenya", iso3: "KEN", population: 55100000, gdpNominal: 113100000000, medianSalary: 1800, governmentType: "Unitary presidential constitutional republic" },
  TZA: { name: "Tanzania", iso3: "TZA", population: 65500000, gdpNominal: 79160000000, medianSalary: 1000, governmentType: "Unitary presidential constitutional republic" },
  UGA: { name: "Uganda", iso3: "UGA", population: 47250000, gdpNominal: 49270000000, medianSalary: 700, governmentType: "Unitary presidential constitutional republic" },
  RWA: { name: "Rwanda", iso3: "RWA", population: 13600000, gdpNominal: 13310000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  BDI: { name: "Burundi", iso3: "BDI", population: 12890000, gdpNominal: 3070000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  SSD: { name: "South Sudan", iso3: "SSD", population: 11090000, gdpNominal: 5350000000, medianSalary: null, governmentType: "Federal presidential constitutional republic" },
  ERI: { name: "Eritrea", iso3: "ERI", population: 3620000, gdpNominal: 2070000000, medianSalary: null, governmentType: "Unitary one-party presidential republic" },
  DJI: { name: "Djibouti", iso3: "DJI", population: 1120000, gdpNominal: 3670000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  SOM: { name: "Somalia", iso3: "SOM", population: 17600000, gdpNominal: 8130000000, medianSalary: null, governmentType: "Federal parliamentary republic" },
  MDG: { name: "Madagascar", iso3: "MDG", population: 29610000, gdpNominal: 16060000000, medianSalary: null, governmentType: "Unitary semi-presidential constitutional republic" },
  MUS: { name: "Mauritius", iso3: "MUS", population: 1270000, gdpNominal: 14440000000, medianSalary: 7200, governmentType: "Unitary parliamentary republic" },
  SYC: { name: "Seychelles", iso3: "SYC", population: 100000, gdpNominal: 2100000000, medianSalary: null, governmentType: "Unitary presidential republic" },
  COM: { name: "Comoros", iso3: "COM", population: 890000, gdpNominal: 1340000000, medianSalary: null, governmentType: "Federal presidential republic" },

  // ─── Southern Africa ───
  ZAF: { name: "South Africa", iso3: "ZAF", population: 60400000, gdpNominal: 399000000000, medianSalary: 4800, governmentType: "Unitary parliamentary constitutional republic" },
  MOZ: { name: "Mozambique", iso3: "MOZ", population: 33900000, gdpNominal: 18080000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  ZWE: { name: "Zimbabwe", iso3: "ZWE", population: 15990000, gdpNominal: 28540000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  ZMB: { name: "Zambia", iso3: "ZMB", population: 20020000, gdpNominal: 28660000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  MWI: { name: "Malawi", iso3: "MWI", population: 20400000, gdpNominal: 12630000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  AGO: { name: "Angola", iso3: "AGO", population: 35600000, gdpNominal: 84720000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  NAM: { name: "Namibia", iso3: "NAM", population: 2570000, gdpNominal: 12240000000, medianSalary: 3100, governmentType: "Unitary presidential constitutional republic" },
  BWA: { name: "Botswana", iso3: "BWA", population: 2630000, gdpNominal: 19390000000, medianSalary: 4200, governmentType: "Unitary parliamentary constitutional republic" },
  LSO: { name: "Lesotho", iso3: "LSO", population: 2310000, gdpNominal: 2420000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  SWZ: { name: "Eswatini", iso3: "SWZ", population: 1200000, gdpNominal: 4850000000, medianSalary: null, governmentType: "Unitary parliamentary absolute monarchy" },

  // ─── Oceania ───
  AUS: { name: "Australia", iso3: "AUS", population: 26400000, gdpNominal: 1788000000000, medianSalary: 44500, governmentType: "Federal parliamentary constitutional monarchy" },
  NZL: { name: "New Zealand", iso3: "NZL", population: 5120000, gdpNominal: 252000000000, medianSalary: 36200, governmentType: "Unitary parliamentary constitutional monarchy" },
  PNG: { name: "Papua New Guinea", iso3: "PNG", population: 10140000, gdpNominal: 31690000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  FJI: { name: "Fiji", iso3: "FJI", population: 930000, gdpNominal: 5320000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional republic" },
  SLB: { name: "Solomon Islands", iso3: "SLB", population: 720000, gdpNominal: 1690000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  VUT: { name: "Vanuatu", iso3: "VUT", population: 320000, gdpNominal: 1020000000, medianSalary: null, governmentType: "Unitary parliamentary republic" },
  WSM: { name: "Samoa", iso3: "WSM", population: 220000, gdpNominal: 900000000, medianSalary: null, governmentType: "Unitary parliamentary republic" },
  TON: { name: "Tonga", iso3: "TON", population: 107000, gdpNominal: 510000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },
  KIR: { name: "Kiribati", iso3: "KIR", population: 131000, gdpNominal: 250000000, medianSalary: null, governmentType: "Unitary parliamentary republic" },
  FSM: { name: "Micronesia", iso3: "FSM", population: 115000, gdpNominal: 440000000, medianSalary: null, governmentType: "Federal parliamentary constitutional republic" },
  MHL: { name: "Marshall Islands", iso3: "MHL", population: 42000, gdpNominal: 280000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional republic" },
  PLW: { name: "Palau", iso3: "PLW", population: 18000, gdpNominal: 260000000, medianSalary: null, governmentType: "Unitary presidential constitutional republic" },
  NRU: { name: "Nauru", iso3: "NRU", population: 13000, gdpNominal: 150000000, medianSalary: null, governmentType: "Unitary parliamentary republic" },
  TUV: { name: "Tuvalu", iso3: "TUV", population: 11000, gdpNominal: 60000000, medianSalary: null, governmentType: "Unitary parliamentary constitutional monarchy" },

  // ─── Additional notable territories ───
  HKG: { name: "Hong Kong", iso3: "HKG", population: 7400000, gdpNominal: 382900000000, medianSalary: 22800, governmentType: "Special administrative region of China" },
  MAC: { name: "Macau", iso3: "MAC", population: 696000, gdpNominal: 36520000000, medianSalary: 16500, governmentType: "Special administrative region of China" },

  // ─── Vatican ───
  VAT: { name: "Vatican City", iso3: "VAT", population: 800, gdpNominal: 0, medianSalary: null, governmentType: "Unitary theocratic elective absolute monarchy" },
};

export { COUNTRY_DATA };
