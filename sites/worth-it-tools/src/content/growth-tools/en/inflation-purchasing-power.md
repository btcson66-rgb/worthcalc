---
contentType: tool
toolSlug: inflation-purchasing-power
locale: en
title: "Inflation & Purchasing Power Calculator"
description: "Convert an amount between years using an official CPI series and see cumulative inflation and purchasing-power change side by side."
relatedArticle: /en/nominal-vs-real-purchasing-power/
lastReviewed: 2026-07-31
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

Enter a dollar amount, a source year, and a target year to see the CPI-adjusted equivalent and how much purchasing power changed between the two periods.

## Before you enter numbers

Confirm which CPI series matches your comparison — CPI-U for the broad urban-consumer figure most commonly cited, CPI-W if comparing against Social Security COLA calculations, or a category-specific index if your question is about one spending category rather than the overall basket.

## Formula

`equivalent amount = source amount × target CPI ÷ source CPI`

## Worked example

If the index rises from 100 to 120 between two periods, $100 in the start period is equivalent to $120 in end-period dollars, and the original $100 retains about 83.3% of its former purchasing power.

## Why this pair is not yet published

This tool and its companion article are held back until they're wired to live, dated BLS index data rather than a static table, so every conversion can cite the exact series and vintage used — see `publicationGate: OFFICIAL_CPI_DATA_REQUIRED` in this page's metadata.

## CPI-U, CPI-W, and core CPI

CPI-U covers urban consumers broadly and is the most commonly cited headline figure; CPI-W (urban wage earners and clerical workers) is the narrower series used for Social Security COLA calculations; core CPI excludes volatile food and energy prices. Confirm which series a comparison requires before treating the results as equivalent.

## Limits and privacy

This tool will provide a general educational estimate, not individualized financial or legal advice, and will not predict future inflation — only convert amounts using already-recorded historical data.

The calculation runs in your browser. Do not put identifying information into a shareable link.

## Related guide

Read [Nominal Dollars vs. Real Purchasing Power: What CPI Actually Adjusts](/en/nominal-vs-real-purchasing-power/) for the difference between CPI-U, CPI-W, and core CPI, and the most common mistakes when comparing dollar amounts across years.

## Frequently asked questions

### Is CPI the same as my personal inflation rate?

No — it's an average index for a defined basket and population, not a personal cost-of-living measure.

### Can I compare monthly and annual index values directly?

Only if you clearly label which type each value is; mixing them without noting it produces a misleading result.

### Why might this differ from another official calculator?

It may use a different series, base period, or month-versus-annual-average convention.

### Does this predict future inflation?

No — it adjusts historical, already-recorded amounts only.

### Can CPI update a legal contract automatically?

Not on its own — use the specific index and formula your contract or applicable law specifies.

## Common mistakes to avoid once this ships

Don't mix an annual-average index value with a single month's value without labeling which is used; don't apply a national CPI figure to price one narrow local product; and don't treat a CPI-adjusted figure as a promise about your personal cost of living rather than an average-basket estimate.

## Sources

- [U.S. Bureau of Labor Statistics — CPI Inflation Calculator](https://www.bls.gov/data/inflation_calculator.htm), reviewed 2026-07-31
