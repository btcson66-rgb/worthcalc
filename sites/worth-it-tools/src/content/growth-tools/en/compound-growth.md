---
contentType: tool
toolSlug: compound-growth
locale: en
title: "Compound Growth & Savings Goal Calculator"
description: "Project contributions, fees, inflation and a savings target, or solve the monthly contribution needed to reach that target."
relatedArticle: /en/how-compound-growth-works/
lastReviewed: 2026-07-23
draft: false
---

Project contributions, fees, inflation and a savings target, or solve the monthly contribution needed to reach that target.

## How to use this calculator

1. Start with the latest statement, contract, payslip or official index relevant to the calculation.
2. Replace every default with a value you can verify. Defaults are examples, not recommendations or market averages.
3. Calculate the baseline first, then save at least a conservative, base and favorable scenario.
4. Review the detailed breakdown and the break-even input instead of relying only on the headline verdict.
5. Export or copy only non-sensitive results. Never include identifying account information.

## Calculation method


`FV = PV(1+r)^n + PMT × ((1+r)^n − 1) ÷ r`

The implementation must preserve full precision internally and round only for display. It must reject non-finite values, impossible terms, negative balances where they are not meaningful, division by zero and plans that do not amortize. The result panel must show the assumptions used so another person can reproduce the calculation.

## Worked example

$10,000 initial principal plus $500 monthly for 10 years at a 7% assumed return, 0.2% fee and 2% inflation produces nominal and real balances side by side.

The example is illustrative. The published page must include a “load example” button and a “reset” button, while leaving the user free to enter different values.

## Local notes

The return is an assumption, not a promise. Show a low, base and high scenario and keep fees separate. Do not label this as retirement advice without tax and account rules.

## Limits and verification

This page provides a general educational estimate, not individualized financial, tax, legal, lending, or investment advice.

Before acting, confirm the current rate, fees, taxes, payment rules, and contract terms with the relevant provider or public authority.

The calculation runs in your browser. Do not place personal account numbers, names, addresses, or other identifying information in shareable URLs.

The model intentionally separates mathematical outputs from legal or underwriting conclusions. It must not display “approved”, “safe”, “guaranteed”, “best investment”, or similar claims. If a threshold is shown, label it as an editable illustration or a dated public rule with a source and exceptions.

## Related guide

Read [Compound Growth: Contributions, Fees and Inflation Matter More Than the Headline Rate](/en/how-compound-growth-works/)for a step-by-step explanation, scenario design and verification checklist.

## Frequently asked questions

### Is the return guaranteed?

No.

### Why subtract fees?

Even small annual fees compound over long periods.

### What is real balance?

The nominal balance adjusted for the entered inflation assumption.

### Can contributions grow each year?

Yes, set an annual contribution-growth rate.

### How is the required monthly contribution found?

The engine searches for the smallest monthly amount that reaches the target under the assumptions.


## Sources to verify before publication

- [Consumer Financial Protection Bureau — debt-to-income definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/)
- [Consumer Financial Protection Bureau — mortgage payoff amount](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/)
- [U.S. Bureau of Labor Statistics — CPI inflation calculator](https://www.bls.gov/data/inflation_calculator.htm)
- [Investor.gov — compound interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)

The editor must verify that each source is still current on the deployment date and replace general landing pages with a more specific official document when available.
