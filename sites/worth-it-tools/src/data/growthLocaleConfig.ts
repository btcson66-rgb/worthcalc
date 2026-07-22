export type WorthCalcLocale = 'en' | 'zh' | 'es' | 'fr' | 'de';

export interface LocaleFinanceConfig {
  locale: WorthCalcLocale;
  htmlLang: string;
  region: string;
  currency: string;
  currencyDigits: number;
  decimalSeparator: string;
  groupSeparator: string;
  defaultSalaryPaymentsPerYear: number;
  illustrativeDtiPercent: number | null;
  mortgageTerminology: string[];
  homeCostFields: string[];
  officialInflationAuthority: string;
  inflationSeriesKey: string;
  legalDisclaimer: string;
}

export const localeFinanceConfig: Record<WorthCalcLocale, LocaleFinanceConfig> = {
  en: {
    locale: 'en', htmlLang: 'en-US', region: 'United States / international English', currency: 'USD', currencyDigits: 2,
    decimalSeparator: '.', groupSeparator: ',', defaultSalaryPaymentsPerYear: 12, illustrativeDtiPercent: null,
    mortgageTerminology: ['APR', 'principal and interest', 'property tax', 'homeowners insurance', 'HOA', 'PMI'],
    homeCostFields: ['property tax', 'homeowners insurance', 'HOA', 'maintenance reserve', 'mortgage insurance', 'closing costs'],
    officialInflationAuthority: 'U.S. Bureau of Labor Statistics', inflationSeriesKey: 'US_CPI_U_ANNUAL_AVERAGE',
    legalDisclaimer: 'General educational estimate only; lenders and contracts may use different definitions and rules.',
  },
  zh: {
    locale: 'zh', htmlLang: 'zh-Hant-TW', region: '台灣', currency: 'TWD', currencyDigits: 0,
    decimalSeparator: '.', groupSeparator: ',', defaultSalaryPaymentsPerYear: 12, illustrativeDtiPercent: null,
    mortgageTerminology: ['年利率', '本息平均攤還', '本金', '利息', '寬限期', '提前清償違約金'],
    homeCostFields: ['房貸本息', '房屋稅', '地價稅', '管理費', '修繕準備金', '契稅與登記相關費用'],
    officialInflationAuthority: '行政院主計總處', inflationSeriesKey: 'TW_CPI_ANNUAL_AVERAGE',
    legalDisclaimer: '僅供一般教育與試算；銀行授信、稅費與契約條款仍以最新官方資料及個別契約為準。',
  },
  es: {
    locale: 'es', htmlLang: 'es-ES', region: 'España', currency: 'EUR', currencyDigits: 2,
    decimalSeparator: ',', groupSeparator: '.', defaultSalaryPaymentsPerYear: 14, illustrativeDtiPercent: null,
    mortgageTerminology: ['TIN', 'TAE', 'sistema francés', 'cuota', 'amortización anticipada', 'comisión'],
    homeCostFields: ['cuota hipotecaria', 'IBI', 'seguro', 'comunidad', 'mantenimiento', 'ITP/IVA/AJD', 'notaría y registro'],
    officialInflationAuthority: 'Instituto Nacional de Estadística', inflationSeriesKey: 'ES_IPC_ANNUAL_AVERAGE',
    legalDisclaimer: 'Estimación educativa; la TAE, las comisiones, los impuestos y la aprobación dependen de la oferta y de la normativa vigente.',
  },
  fr: {
    locale: 'fr', htmlLang: 'fr-FR', region: 'France', currency: 'EUR', currencyDigits: 2,
    decimalSeparator: ',', groupSeparator: ' ', defaultSalaryPaymentsPerYear: 12, illustrativeDtiPercent: 35,
    mortgageTerminology: ['TAEG', 'mensualité', 'capital', 'intérêts', 'assurance emprunteur', 'remboursement anticipé'],
    homeCostFields: ['mensualité', 'assurance emprunteur', 'taxe foncière', 'charges de copropriété', 'entretien', 'frais de notaire'],
    officialInflationAuthority: 'Insee', inflationSeriesKey: 'FR_IPC_ANNUAL_AVERAGE',
    legalDisclaimer: 'Estimation pédagogique; le taux d’effort, le TAEG, l’assurance et la décision de crédit dépendent du dossier et des règles en vigueur.',
  },
  de: {
    locale: 'de', htmlLang: 'de-DE', region: 'Deutschland', currency: 'EUR', currencyDigits: 2,
    decimalSeparator: ',', groupSeparator: '.', defaultSalaryPaymentsPerYear: 12, illustrativeDtiPercent: null,
    mortgageTerminology: ['Sollzins', 'effektiver Jahreszins', 'Annuität', 'Tilgung', 'Sondertilgung', 'Restschuld'],
    homeCostFields: ['Annuität', 'Hausgeld', 'Instandhaltung', 'Grundsteuer', 'Versicherung', 'Grunderwerbsteuer', 'Notar und Grundbuch'],
    officialInflationAuthority: 'Statistisches Bundesamt (Destatis)', inflationSeriesKey: 'DE_VPI_ANNUAL_AVERAGE',
    legalDisclaimer: 'Allgemeine Rechenhilfe; Kreditprüfung, Nebenkosten, Zinsbindung und Vertragsbedingungen können abweichen.',
  },
};
