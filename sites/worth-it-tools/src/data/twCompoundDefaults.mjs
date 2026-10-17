/**
 * Starting values of the zh 複利計算機 (/zh/tools/compound-growth/). They are the page's 算例三, so pressing the
 * button on a fresh page prints the table row the page shows (tests/tw-compound-math.test.mjs asserts both).
 * Return, fee and inflation are scenario assumptions, not predictions.
 */
export const ZH_COMPOUND_DEFAULTS = Object.freeze({
  initialPrincipal: 100000,
  monthlyContribution: 10000,
  returnRate: 5,
  feeRate: 0.5,
  inflationRate: 2,
  years: 20,
  contributionGrowth: 0,
  targetAmount: 5000000,
  contributionTiming: 'end',
});
