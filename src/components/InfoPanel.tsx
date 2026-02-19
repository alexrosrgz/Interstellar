import type { CountryInfo } from "../data/types";
import {
  formatPopulation,
  formatCurrency,
  formatSalary,
  formatArea,
  formatDebt,
  formatBirthRate,
  formatDebtRatio,
  formatGdpPerCapita,
} from "../utils/formatters";
import "./InfoPanel.css";

interface Props {
  country: CountryInfo | null;
}

function Val({ v }: { v: string | null | undefined }) {
  return <span className="info-panel__value">{v ?? "\u2014"}</span>;
}

function SmallVal({ v }: { v: string | null | undefined }) {
  return <span className="info-panel__value info-panel__value--small">{v ?? "\u2014"}</span>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="info-panel__item">
      <span className="info-panel__label">{label}</span>
      {children}
    </div>
  );
}

export default function InfoPanel({ country }: Props) {
  return (
    <div className={`info-panel ${country ? "visible" : ""}`}>
      {country && (
        <>
          <h2 className="info-panel__name">
            {country.flagUrl && (
              <img className="info-panel__flag" src={country.flagUrl} alt={`${country.name} flag`} />
            )}
            {country.name}
          </h2>

          <div className="info-panel__grid">
            <Row label="Capital"><Val v={country.capital} /></Row>
            <Row label="Language(s)"><SmallVal v={country.officialLanguages} /></Row>
            <Row label="Land Area"><Val v={formatArea(country.landArea)} /></Row>
            <Row label="Government"><SmallVal v={country.governmentType} /></Row>
          </div>

          <h3 className="info-panel__section-title">Economy</h3>
          <div className="info-panel__grid">
            <Row label="GDP (Nominal)"><Val v={formatCurrency(country.gdpNominal)} /></Row>
            <Row label="GDP Per Capita"><Val v={formatGdpPerCapita(country.gdpPerCapita)} /></Row>
            <Row label="Median Salary"><Val v={formatSalary(country.medianSalary)} /></Row>
            <Row label="National Debt"><Val v={formatDebt(country.nationalDebt)} /></Row>
            <Row label="Debt-to-GDP"><Val v={formatDebtRatio(country.debtToGdpRatio)} /></Row>
          </div>

          <h3 className="info-panel__section-title">Demographics</h3>
          <div className="info-panel__grid">
            <Row label="Population"><Val v={formatPopulation(country.population)} /></Row>
            <Row label="Birth Rate"><Val v={formatBirthRate(country.birthRate)} /></Row>
          </div>
        </>
      )}
    </div>
  );
}
