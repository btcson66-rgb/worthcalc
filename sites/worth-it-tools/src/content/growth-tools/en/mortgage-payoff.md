---
contentType: tool
toolSlug: mortgage-payoff
locale: en
title: "Mortgage Payoff & Extra Payment Calculator"
description: "Compare the original payoff schedule with monthly extra payments and lump sums, including interest and months saved."
relatedArticle: /en/extra-mortgage-payments-guide/
lastReviewed: 2026-07-23
draft: false
---

Compare the original payoff schedule with monthly extra payments and lump sums, including interest and months saved.

## How to use this calculator

1. Start with the latest statement, contract, payslip or official index relevant to the calculation.
2. Replace every default with a value you can verify. Defaults are examples, not recommendations or market averages.
3. Calculate the baseline first, then save at least a conservative, base and favorable scenario.
4. Review the detailed breakdown and the break-even input instead of relying only on the headline verdict.
5. Export or copy only non-sensitive results. Never include identifying account information.

## Calculation method


`i = annual rate ÷ 12; interest = opening balance × i; ending balance = opening balance − (payment − interest) − extra principal`

The implementation must preserve full precision internally and round only for display. It must reject non-finite values, impossible terms, negative balances where they are not meaningful, division by zero and plans that do not amortize. The result panel must show the assumptions used so another person can reproduce the calculation.

## Worked example

A borrower with a $240,000 remaining balance, 5.5% annual rate and 25 years left can compare the normal schedule with an extra $200 each month. The result should show a shorter payoff period and lower lifetime interest, while keeping the original scheduled payment visible.

The example is illustrative. The published page must include a “load example” button and a “reset” button, while leaving the user free to enter different values.

## Local notes

Use the remaining principal, note rate and remaining term from the latest statement. A lender payoff quote can differ because it may include per-diem interest, fees or timing rules. Verify whether extra money is applied to principal and whether a prepayment charge exists.

## Limits and verification

This page provides a general educational estimate, not individualized financial, tax, legal, lending, or investment advice.

Before acting, confirm the current rate, fees, taxes, payment rules, and contract terms with the relevant provider or public authority.

The calculation runs in your browser. Do not place personal account numbers, names, addresses, or other identifying information in shareable URLs.

The model intentionally separates mathematical outputs from legal or underwriting conclusions. It must not display “approved”, “safe”, “guaranteed”, “best investment”, or similar claims. If a threshold is shown, label it as an editable illustration or a dated public rule with a source and exceptions.

## Related guide

Read [Extra Mortgage Payments: What Actually Changes?](/en/extra-mortgage-payments-guide/)for a step-by-step explanation, scenario design and verification checklist.

## Frequently asked questions

### Does an extra payment always reduce principal?

Not automatically. Confirm the servicer’s instructions and whether the payment must be marked as principal-only.

### Is a lender payoff quote the same as the online balance?

Not always. A payoff quote can include interest through a specific date and permitted fees.

### Should I reduce the payment or the term?

The calculator models keeping the scheduled payment and shortening the term. A lender may offer different recast options.

### Can I add annual bonuses?

Yes. Enter them as lump-sum payments in the month you expect to apply them.

### Does this compare investing instead?

No. It reports loan savings. A separate scenario can compare an uncertain investment return without presenting it as guaranteed.


## Sources to verify before publication

- [Consumer Financial Protection Bureau — debt-to-income definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/)
- [Consumer Financial Protection Bureau — mortgage payoff amount](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/)
- [U.S. Bureau of Labor Statistics — CPI inflation calculator](https://www.bls.gov/data/inflation_calculator.htm)
- [Investor.gov — compound interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)

The editor must verify that each source is still current on the deployment date and replace general landing pages with a more specific official document when available.
