/*
 * Dates behind the TechArticle JSON-LD on /zh/tools/* (2026-11-08, task pack TP-20261108-P2-WORTHCALC).
 *
 *   datePublished  the day the page's source file first entered git history, read with
 *                  `git log --follow --diff-filter=A --format=%cs -- <file>` on the full (unshallowed) history.
 *                  The hand-built tool pages are src/pages/zh/tools/<slug>.astro; the growth tools are
 *                  src/content/growth-tools/zh/<slug>.md.
 *   dateModified   2026-11-08 for every page listed here: the same release added the 台灣在地金錢決策延伸試算 table
 *                  (and, where listed in src/data/toolPresets.ts, the 情境一鍵帶入 buttons) to its visible content.
 *
 * A tool slug that is not listed gets no TechArticle: a date that cannot be sourced is left out, not invented.
 */
export const TOOL_CONTENT_UPDATED = '2026-11-08';

export const TOOL_FIRST_PUBLISHED: Record<string, string> = {
  'appliance-electricity-cost': '2026-09-15',
  'cashback-breakeven': '2026-07-03',
  'commute-cost': '2026-07-03',
  'costco-membership': '2026-07-03',
  'ev-vs-gas': '2026-07-03',
  'installment-true-apr': '2026-07-03',
  'subscription-audit': '2026-07-03',
  'budget-builder': '2026-07-23',
  'car-affordability': '2026-07-23',
  'compound-growth': '2026-07-23',
  'credit-card-payoff': '2026-07-23',
  'debt-strategy': '2026-07-23',
  'dti-calculator': '2026-07-23',
  'home-affordability': '2026-07-23',
  'mortgage-payoff': '2026-07-23',
  'salary-converter': '2026-07-23',
};

/**
 * The two zh guides that gained a table in the same release. datePublished is again the first git appearance of
 * src/content/growth-articles/zh/<slug>.md (2026-07-23); dateModified is the release that added the table.
 */
export const GUIDE_DATES: Record<string, { datePublished: string; dateModified: string }> = {
  'how-to-calculate-dti': { datePublished: '2026-07-23', dateModified: TOOL_CONTENT_UPDATED },
  'true-cost-of-car-ownership': { datePublished: '2026-07-23', dateModified: TOOL_CONTENT_UPDATED },
};
