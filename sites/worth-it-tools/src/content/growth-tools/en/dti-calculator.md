---
contentType: tool
toolSlug: dti-calculator
locale: en
title: "Debt-to-Income Ratio Calculator"
description: "Calculate front-end and back-end debt-to-income ratios and test how paying off one debt changes the result."
relatedArticle: /en/how-to-calculate-dti/
lastReviewed: 2026-07-23
draft: false
---

Calculate front-end and back-end debt-to-income ratios and test how paying off one debt changes the result.

## How to use this calculator

1. Start with the latest statement, contract, payslip or official index relevant to the calculation.
2. Replace every default with a value you can verify. Defaults are examples, not recommendations or market averages.
3. Calculate the baseline first, then save at least a conservative, base and favorable scenario.
4. Review the detailed breakdown and the break-even input instead of relying only on the headline verdict.
5. Export or copy only non-sensitive results. Never include identifying account information.

## Calculation method


`front-end DTI = housing payment ÷ gross monthly income; back-end DTI = all included debt payments ÷ gross monthly income`

The implementation must preserve full precision internally and round only for display. It must reject non-finite values, impossible terms, negative balances where they are not meaningful, division by zero and plans that do not amortize. The result panel must show the assumptions used so another person can reproduce the calculation.

## Worked example

$8,000 gross monthly income, $2,000 housing and $400 other debt gives a 25% front-end and 30% back-end ratio.

The example is illustrative. The published page must include a “load example” button and a “reset” button, while leaving the user free to enter different values.

## Local notes

Lenders define included income and debts differently. The result is not an approval prediction. Use gross monthly income only when comparing with a lender DTI definition.

## Limits and verification

This page provides a general educational estimate, not individualized financial, tax, legal, lending, or investment advice.

Before acting, confirm the current rate, fees, taxes, payment rules, and contract terms with the relevant provider or public authority.

The calculation runs in your browser. Do not place personal account numbers, names, addresses, or other identifying information in shareable URLs.

The model intentionally separates mathematical outputs from legal or underwriting conclusions. It must not display “approved”, “safe”, “guaranteed”, “best investment”, or similar claims. If a threshold is shown, label it as an editable illustration or a dated public rule with a source and exceptions.

## Related guide

Read [How to Calculate DTI Without Treating It as an Approval Score](/en/how-to-calculate-dti/)for a step-by-step explanation, scenario design and verification checklist.

## Frequently asked questions

### Should income be gross or net?

Use the definition required by the comparison; many DTI definitions use gross income.

### Does rent count as housing?

For personal planning it can; lender mortgage DTI may use the proposed housing payment.

### Does a credit-card balance count?

Usually the required monthly payment matters more than the full balance in a DTI ratio.

### Can I exclude a debt paid by someone else?

Only for a scenario; lender documentation rules may differ.

### Is a lower DTI always enough for approval?

No. Credit, assets, collateral and underwriting rules also matter.


## Sources to verify before publication

- [Consumer Financial Protection Bureau — debt-to-income definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/)
- [Consumer Financial Protection Bureau — mortgage payoff amount](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/)
- [U.S. Bureau of Labor Statistics — CPI inflation calculator](https://www.bls.gov/data/inflation_calculator.htm)
- [Investor.gov — compound interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)

The editor must verify that each source is still current on the deployment date and replace general landing pages with a more specific official document when available.
