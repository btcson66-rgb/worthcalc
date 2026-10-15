export type WorthCalcLocale = 'en' | 'zh';

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
    locale: 'zh', htmlLang: 'zh-TW', region: '台灣', currency: 'TWD', currencyDigits: 0,
    decimalSeparator: '.', groupSeparator: ',', defaultSalaryPaymentsPerYear: 12, illustrativeDtiPercent: null,
    mortgageTerminology: ['年利率', '本息平均攤還', '本金', '利息', '寬限期', '提前清償違約金'],
    homeCostFields: ['房貸本息', '房屋稅', '地價稅', '管理費', '修繕準備金', '契稅與登記相關費用'],
    officialInflationAuthority: '行政院主計總處', inflationSeriesKey: 'TW_CPI_ANNUAL_AVERAGE',
    legalDisclaimer: '僅供一般教育與試算；銀行授信、稅費與契約條款仍以最新官方資料及個別契約為準。',
  },
};
