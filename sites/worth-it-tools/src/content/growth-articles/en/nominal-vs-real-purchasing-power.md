---
contentType: article
articleSlug: nominal-vs-real-purchasing-power
locale: en
title: "Nominal Dollars vs. Real Purchasing Power: What CPI Actually Adjusts"
description: "How to convert an amount between years using an official CPI series, which CPI variant to use, and the most common mistakes when comparing dollars across time."
relatedTool: /en/tools/inflation-purchasing-power/
lastReviewed: 2026-07-31
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

A raise from $60,000 to $66,000 sounds like a 10% gain until you check what prices did over the same period. Comparing dollar amounts across different years without adjusting for inflation compares numbers that aren't actually measuring the same thing — this is what CPI-based conversion is for.

## What CPI Actually Measures

The Consumer Price Index tracks the average price change of a fixed basket of goods and services over time for a defined population. It's an average across many households and categories, not a personal cost-of-living index — your own inflation experience can run higher or lower than the published CPI depending on what you actually spend money on (housing-heavy budgets versus grocery-heavy budgets react differently to the same reported CPI figure, for instance).

## Nominal Change vs. Real Purchasing-Power Change

A nominal dollar amount is the raw, unadjusted figure as stated in whatever year it was recorded. A real amount restates that figure in another year's dollars using the ratio of CPI values between the two periods, isolating how much actual purchasing power changed, separate from the sticker-number change. A salary that rose 10% nominally in a period when prices rose 12% actually lost purchasing power, even though the paycheck got larger.

## Worked Example: If the Index Rises From 100 to 120

`equivalent amount = source amount × target CPI ÷ source CPI`

If an index value of 100 in a start year rises to 120 in an end year, $100 from the start year is equivalent to $120 in end-year dollars, and — read the other direction — the original $100 retains about 83.3% of its former purchasing power (100 ÷ 120) by the end year.

## CPI-U, CPI-W, and Core CPI: Which One to Use

The headline U.S. figure most commonly cited is CPI-U (covering urban consumers broadly); CPI-W (urban wage earners and clerical workers) is the narrower series used to calculate Social Security cost-of-living adjustments; "core" CPI excludes volatile food and energy prices and is often used to assess underlying inflation trends rather than the total cost consumers actually pay. Mixing series — comparing a CPI-U figure against a CPI-W-based benchmark, for example — produces a subtly wrong answer even when both are official numbers.

## Regional and Category-Level CPI vs. the National Number

The BLS also publishes regional indexes and category-specific indexes (medical care, housing, food) alongside the national all-items figure. A national CPI-U conversion is a reasonable general-purpose default, but if your comparison is specifically about a category — medical costs, for instance — a category-level index is a more accurate adjustment than the broad national basket.

## Common Mistakes When Comparing Dollars Across Years

- Mixing an annual-average index value with a single month's index value without labeling which one is being used
- Applying a national CPI figure to price a single narrow product or local market it wasn't designed to represent
- Treating a CPI-adjusted comparison as a promise about your own personal cost of living rather than an average-basket estimate
- Using a provisional or not-yet-finalized recent month's figure without noting it may be revised

## Where These Numbers Come From

- [U.S. Bureau of Labor Statistics — CPI Inflation Calculator](https://www.bls.gov/data/inflation_calculator.htm), reviewed 2026-07-31, the official source for historical CPI-U values used in this type of conversion.
- U.S. Bureau of Labor Statistics, CPI series documentation distinguishing CPI-U, CPI-W, and core CPI definitions and coverage populations.
- This page and its companion calculator remain unpublished pending direct integration of official, dated BLS series data rather than a static or estimated index table, so that every conversion cites the specific series and vintage used.

This guide is general education, not individualized financial, tax, or legal advice, and CPI-based adjustments are not a personal cost-of-living guarantee. Do not enter identifying information into a shareable URL.

## Frequently Asked Questions

### Is CPI the same as my personal inflation rate?

No — it's an average across a defined basket and population; your own spending mix can experience meaningfully higher or lower price changes than the published figure.

### Can I compare a monthly index value against an annual-average value?

Only if you're careful to label which type each figure is — mixing the two without noting it produces a misleading comparison.

### Why might an official inflation calculator give a slightly different answer than mine?

It may use a different series (CPI-U vs. CPI-W), a different base period, an annual average versus a specific month, or a revised figure not yet reflected elsewhere.

### Does a CPI conversion predict future inflation?

No — it adjusts historical dollar amounts using data that has already been recorded; any future assumption is a separate, clearly labeled projection.

### Can CPI be used to automatically update a legal contract or lease?

Not on its own — use the exact index series and formula specified by the contract or applicable law, which may differ from the general CPI-U conversion shown here.

## Use the calculator

Open the related calculator to see the mechanics of a CPI-based conversion using the illustrative example above; live official BLS data integration for this pair is in progress.

[Inflation & Purchasing Power Calculator](/en/tools/inflation-purchasing-power/)
