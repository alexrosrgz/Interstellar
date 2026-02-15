import type { CountryInfo } from "../data/types";
import { formatPopulation, formatCurrency, formatSalary } from "../utils/formatters";
import "./InfoPanel.css";

interface Props {
  country: CountryInfo | null;
}

export default function InfoPanel({ country }: Props) {
  return (
    <div className={`info-panel ${country ? "visible" : ""}`}>
      {country && (
        <>
          <h2 className="info-panel__name">{country.name}</h2>
          <div className="info-panel__grid">
            <div className="info-panel__item">
              <span className="info-panel__label">Population</span>
              <span className="info-panel__value">{formatPopulation(country.population)}</span>
            </div>
            <div className="info-panel__item">
              <span className="info-panel__label">GDP (Nominal)</span>
              <span className="info-panel__value">{formatCurrency(country.gdpNominal)}</span>
            </div>
            <div className="info-panel__item">
              <span className="info-panel__label">Median Salary</span>
              <span className="info-panel__value">{formatSalary(country.medianSalary)}</span>
            </div>
            <div className="info-panel__item">
              <span className="info-panel__label">Government</span>
              <span className="info-panel__value info-panel__value--small">
                {country.governmentType}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
