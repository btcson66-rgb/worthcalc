/**
 * P2 batch 8 (2026-10-18): starting values of the zh growth calculators where the shared English defaults
 * carried a foreign rule. P2 batch 10 and 11 (2026-10-18) retired all of them, because every zh page that had a foreign
 * default now runs its own Taiwanese component instead of the shared calculator:
 *
 * - dti-calculator, home-affordability (batch 10): src/lib/twDbrMath.mjs, src/lib/twHomeAffordMath.mjs
 * - salary-converter (batch 11): src/lib/twSalaryMath.mjs (勞基法 §24 multiples as fractions, not the US 1.5)
 * - debt-strategy (batch 11): src/lib/twDebtMath.mjs (the 15% card cap is a flag on the reader's own input)
 * - car-affordability (batch 11): src/lib/twCarMath.mjs
 *
 * The object is kept (empty) so a new zh override has an obvious home; tests/tw-p2b8-examples.test.mjs asserts it stays empty
 * until one is added on purpose.
 */
export const ZH_GROWTH_DEFAULTS = Object.freeze({});
