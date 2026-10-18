/**
 * P2 batch 8 (2026-10-18): starting values of the zh growth calculators where the shared English defaults
 * carried a foreign rule. Everything else keeps the shared example values, which the page labels 示範值.
 *
 * - overtimeMultiplier 1.34: 勞動基準法第 24 條 first-two-hours floor (加給三分之一以上), the usual rounding.
 *   The shared default 1.5 is a US overtime rule and appears nowhere in Taiwanese law.
 * - debt1Rate 15: 銀行法第 47-1 條 caps revolving credit-card interest at 15% a year, so a 22% card is not a
 *   Taiwanese demo.
 * Removed in P2 batch 10 (2026-10-18): homeThresholdPercent and mortgageInsurancePercent. The zh home-affordability and
 * dti-calculator pages no longer use the shared calculator at all; they run src/lib/twHomeAffordMath.mjs and
 * src/lib/twDbrMath.mjs (1/3 and 1/5 from 金管會金融智慧網 金融健檢, no mortgage insurance anywhere).
 */
export const ZH_GROWTH_DEFAULTS = Object.freeze({
  overtimeMultiplier: 1.34,
  debt1Rate: 15,
});
