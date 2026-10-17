/*
 * Money formatting for the growth calculators (P2 batch 6, 2026-10-17).
 *
 * The zh calculators work in New Taiwan dollars, but Intl.NumberFormat('zh-TW', { currency: 'TWD' }) prints the bare "$"
 * that readers also know as US dollars. The zh output now says NT$ ("NT$10,000", "-NT$1,234"), with no decimals; the
 * other locales keep the Intl default for their currency.
 */
export const GROWTH_CURRENCY = Object.freeze({ en: 'USD', zh: 'TWD', es: 'EUR', fr: 'EUR', de: 'EUR' });
export const GROWTH_NUMBER_LOCALE = Object.freeze({ en: 'en-US', zh: 'zh-TW', es: 'es-ES', fr: 'fr-FR', de: 'de-DE' });

export function formatGrowthMoney(locale, value) {
  const formatter = new Intl.NumberFormat(GROWTH_NUMBER_LOCALE[locale], {
    style: 'currency',
    currency: GROWTH_CURRENCY[locale],
    maximumFractionDigits: locale === 'zh' ? 0 : 2,
  });
  if (locale !== 'zh') return formatter.format(value);
  return formatter.formatToParts(value).map((part) => (part.type === 'currency' ? 'NT$' : part.value)).join('');
}
