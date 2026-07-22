---
contentType: tool
toolSlug: salary-converter
locale: en
title: "Hourly, Monthly & Annual Salary Converter"
description: "Convert hourly and annual pay using real workweeks, unpaid leave, overtime, bonuses and local pay frequencies."
relatedArticle: /en/hourly-vs-annual-salary/
lastReviewed: 2026-07-23
draft: false
---

Convert hourly and annual pay using real workweeks, unpaid leave, overtime, bonuses and local pay frequencies.

## How to use this calculator

1. Start with the latest statement, contract, payslip or official index relevant to the calculation.
2. Replace every default with a value you can verify. Defaults are examples, not recommendations or market averages.
3. Calculate the baseline first, then save at least a conservative, base and favorable scenario.
4. Review the detailed breakdown and the break-even input instead of relying only on the headline verdict.
5. Export or copy only non-sensitive results. Never include identifying account information.

## Calculation method


`annual gross = hourly rate × paid hours per week × working weeks + overtime + bonus + commission`

The implementation must preserve full precision internally and round only for display. It must reject non-finite values, impossible terms, negative balances where they are not meaningful, division by zero and plans that do not amortize. The result panel must show the assumptions used so another person can reproduce the calculation.

## Worked example

At $25 per hour, 40 hours a week and 52 paid weeks, base annual gross is $52,000 before overtime or bonuses.

The example is illustrative. The published page must include a “load example” button and a “reset” button, while leaving the user free to enter different values.

## Local notes

This is a gross-pay converter unless the user enters take-home figures. Do not estimate taxes without a maintained jurisdiction-specific payroll engine.

## Limits and verification

This page provides a general educational estimate, not individualized financial, tax, legal, lending, or investment advice.

Before acting, confirm the current rate, fees, taxes, payment rules, and contract terms with the relevant provider or public authority.

The calculation runs in your browser. Do not place personal account numbers, names, addresses, or other identifying information in shareable URLs.

The model intentionally separates mathematical outputs from legal or underwriting conclusions. It must not display “approved”, “safe”, “guaranteed”, “best investment”, or similar claims. If a threshold is shown, label it as an editable illustration or a dated public rule with a source and exceptions.

## Related guide

Read [Hourly vs Annual Salary: Compare Offers on the Same Basis](/en/hourly-vs-annual-salary/)for a step-by-step explanation, scenario design and verification checklist.

## Frequently asked questions

### Is monthly salary annual salary divided by 12?

It is the monthly average; individual paychecks depend on pay frequency.

### How are unpaid weeks handled?

They are removed from the paid-week count.

### Can I use 14 salary payments?

Yes, set the pay periods to 14.

### Does it calculate tax?

No. It intentionally stays gross unless a maintained tax module exists.

### How is overtime included?

Hourly equivalent × multiplier × overtime hours × effective weeks.


## Sources to verify before publication

- [Consumer Financial Protection Bureau — debt-to-income definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/)
- [Consumer Financial Protection Bureau — mortgage payoff amount](https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/)
- [U.S. Bureau of Labor Statistics — CPI inflation calculator](https://www.bls.gov/data/inflation_calculator.htm)
- [Investor.gov — compound interest calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator)

The editor must verify that each source is still current on the deployment date and replace general landing pages with a more specific official document when available.
