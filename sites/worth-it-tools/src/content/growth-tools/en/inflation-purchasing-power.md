---
contentType: tool
toolSlug: inflation-purchasing-power
locale: en
title: "Inflation & Purchasing Power Calculator"
description: "Convert an amount between periods using an official price-index series and show cumulative inflation and purchasing-power change."
relatedArticle: /en/nominal-vs-real-purchasing-power/
lastReviewed: 2026-07-23
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

Convert an amount between periods using an official price-index series and show cumulative inflation and purchasing-power change.

## How to use this calculator

1. Start with the latest statement, contract, payslip or official index relevant to the calculation.
2. Replace every default with a value you can verify. Defaults are examples, not recommendations or market averages.
3. Calculate the baseline first, then save at least a conservative, base and favorable scenario.
4. Review the detailed breakdown and the break-even input instead of relying only on the headline verdict.
5. Export or copy only non-sensitive results. Never include identifying account information.

## Calculation method


`equivalent amount = source amount × target CPI ÷ source CPI`

The implementation must preserve full precision internally and round only for display. It must reject non-finite values, impossible terms, negative balances where they are not meaningful, division by zero and plans that do not amortize. The result panel must show the assumptions used so another person can reproduce the calculation.

## Worked example

If the official index rises from 100 to 120, $100 in the start period corresponds to $120 in the end period and the original dollar retains 83.3% of its former purchasing power.

The example is illustrative. The published page must include a “load example” button and a “reset” button, while leaving the user free to enter different values.

## Local notes

Use BLS CPI-U annual averages for the default U.S. view and clearly label monthly versus annual comparisons. CPI represents an average basket and is not a personal cost-of-living index.

## Limits and verification

This page provides a general educational estimate, not individualized financial, tax, legal, lending, or investment advice.

Before acting, confirm the current rate, fees, taxes, payment rules, and contract terms with the relevant provider or public authority.

The calculation runs in your browser. Do not place personal account numbers, names, addresses, or other identifying information in shareable URLs.

The model intentionally separates mathematical outputs from legal or underwriting conclusions. It must not display “approved”, “safe”, “guaranteed”, “best investment”, or similar claims. If a threshold is shown, label it as an editable illustration or a dated public rule with a source and exceptions.

## Related guide

Read [Nominal Money vs Real Purchasing Power](/en/nominal-vs-real-purchasing-power/)for a step-by-step explanation, scenario design and verification checklist.

## Frequently asked questions

### Is CPI the same as my personal inflation rate?

No. It is an average index for a defined basket and population.

### Can I compare monthly and annual values?

Only if the series type is clearly consistent.

### Why does the official calculator differ?

It may use a different series, base, period average or latest month.

### Does this predict future inflation?

No. Historical adjustment and future assumptions must be separated.

### Can CPI update a legal contract?

Not automatically; use the index and formula specified by the contract and law.


## Sources to verify before publication

- [Consumer Financial Protection Bureau — debt-to-income definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/)
- [Consumer Financial Protection Bureau — mortgage payoff amount](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/)
- [U.S. Bureau of Labor Statistics — CPI inflation calculator](https://www.bls.gov/data/inflation_calculator.htm)
- [Investor.gov — compound interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)

The editor must verify that each source is still current on the deployment date and replace general landing pages with a more specific official document when available.
