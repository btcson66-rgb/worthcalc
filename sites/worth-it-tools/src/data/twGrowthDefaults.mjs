/**
 * P2 batch 8 (2026-10-18): starting values of the zh growth calculators where the shared English defaults
 * carried a foreign rule. Everything else keeps the shared example values, which the page labels 示範值.
 *
 * - overtimeMultiplier 1.34: 勞動基準法第 24 條 first-two-hours floor (加給三分之一以上), the usual rounding.
 *   The shared default 1.5 is a US overtime rule and appears nowhere in Taiwanese law.
 * - debt1Rate 15: 銀行法第 47-1 條 caps revolving credit-card interest at 15% a year, so a 22% card is not a
 *   Taiwanese demo.
 * - homeThresholdPercent 33.3: 金管會金融智慧網 金融健檢 uses 房貸支出 <= 收入 1/3 as the reference line.
 *   The shared default 36 is the US 28/36 rule. The calculator applies it to housing + other debt payments together.
 * - mortgageInsurancePercent 0: the shared 0.6% a year above 80% LTV is US private mortgage insurance; the page
 *   does not assume any such cost and leaves the field for the user.
 */
export const ZH_GROWTH_DEFAULTS = Object.freeze({
  overtimeMultiplier: 1.34,
  debt1Rate: 15,
  homeThresholdPercent: 33.3,
  mortgageInsurancePercent: 0,
});
