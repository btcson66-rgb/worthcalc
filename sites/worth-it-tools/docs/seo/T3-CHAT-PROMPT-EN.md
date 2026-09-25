# Prompt for Claude chat — US English briefs (paste whole thing)

---

You are writing **28 US-market English money briefs** (Markdown + YAML front matter) for worthcalc.win. A separate engineering pass will validate format and ship them.

## Rule #1: only numbers from official pages you actually opened in this conversation

1. Every figure (limits, rates, thresholds, dollar amounts) must come from a page you **opened with your web tool in this conversation**: `irs.gov`, `ssa.gov`, `cms.gov`, `medicare.gov`, `healthcare.gov`, `treasurydirect.gov`, `federalreserve.gov`, `consumerfinance.gov`, `eia.gov`, `energy.gov`, `bls.gov`, `fdic.gov`, `studentaid.gov`, `dol.gov`, `ecfr.gov`, `congress.gov`, or another `.gov` primary source.
2. **Never** cite news, blogs, NerdWallet, Investopedia, or memory.
3. `verifiedDate` = the date you opened that page (today). A URL you did not open must not appear in `sources`.
4. If you can't open an official page for a topic, **skip it and pick another**. List skipped topics and why at the end.
5. After each article, outside the file, add an **evidence table**:

   | Figure | Source URL | Exact sentence from the page (verbatim) |
   |---|---|---|

   Cover every official figure in the article. Verbatim — this is used for human spot checks.

## Content rules

- English only (US).
- No investment advice, no forecasts. The site's stance: lay the arithmetic out so the reader can check it.
- One search intent per article. No near-duplicate variants (e.g. not separate pages for single vs married of the same topic).
- `limits` must include at least: this is a calculation, not financial/tax advice; no guarantee of eligibility/approval; not a substitute for a professional (CPA, advisor, the agency).
- Body: an official-figures table, the formula (indented code block), one concrete worked example, and a "What would flip the answer" section. Length similar to the template.
- Tax-year figures: say which tax year. If 2027 figures are not yet published by the agency, write about 2026 and say so — do not guess 2027.

## Front matter rules (wrong format = build failure)

- `contentType: brief`, `locale: "en"`, `draft: false`
- `briefSlug`: lowercase kebab-case, identical to the filename
- `cluster`: exactly one of `rates` / `protection` / `ownership` / `earning`
- `publishAt`: per schedule below; `lastReviewed`: today
- `relatedTool`: one of these only, format `/en/tools/<slug>/`:
  `appliance-running-cost` `budget-builder` `car-affordability` `cashback-breakeven` `commute-cost` `compound-growth` `cost-per-mile` `costco-membership` `credit-card-payoff` `debt-strategy` `dti-calculator` `ev-vs-gas` `home-affordability` `installment-true-apr` `latte-factor` `mortgage-payoff` `rent-vs-buy` `salary-converter` `subscription-audit`
- `relatedToolLabel`: short lowercase tool name, e.g. "budget builder"
- `sources`: ≥1, each with `label`, `url`, `verifiedDate` (YYYY-MM-DD)
- `faq`: ≥2; `limits`: ≥3
- `related`: 2–3 other briefs, format `/en/money/<slug>/` (existing slugs below are fine)
- Double-quote all YAML strings; use single quotes inside a string instead of double quotes.

## Schedule (2 per day)

2026-10-10 through 2026-10-23, two per day, 28 total. Fill in writing order; dates may shift as a block later.

## Candidate topics (pick 28 you can source officially)

| Topic | Official source | relatedTool |
|---|---|---|
| Capital gains 0% bracket: how much gain you can realize tax-free | IRS tax-year inflation adjustments / Topic 409 | salary-converter |
| Tax-loss harvesting: the $3,000 ordinary-income offset | IRS Topic 409 / Pub 550 | compound-growth |
| Wash-sale rule: what 30 days actually blocks | IRS Pub 550 | compound-growth |
| Required minimum distributions: first RMD and the penalty | IRS RMD FAQs | compound-growth |
| 401(k) early withdrawal: 10% penalty + tax, the real cost | IRS Topic 558 | compound-growth |
| Roth IRA income phase-out 2026 | IRS | compound-growth |
| Saver's Credit: who qualifies and how much | IRS | salary-converter |
| Child Tax Credit 2026 | IRS | budget-builder |
| Earned Income Tax Credit 2026 tables | IRS | salary-converter |
| Dependent care FSA limit vs child care credit | IRS Pub 503 | budget-builder |
| Health FSA 2026 limit and carryover / use-it-or-lose-it | IRS | budget-builder |
| SALT deduction cap 2026 | IRS / enacted law | home-affordability |
| Mortgage points: break-even months | IRS Topic 504 / CFPB | mortgage-payoff |
| Home office deduction: simplified $5/sq ft vs actual | IRS Topic 509 / Pub 587 | budget-builder |
| Self-employment tax 15.3% and the 92.35% base | IRS Topic 554 | salary-converter |
| Quarterly estimated tax safe harbor (100%/110%) | IRS Pub 505 | budget-builder |
| SEP IRA vs Solo 401(k) contribution limits | IRS | compound-growth |
| Gift tax annual exclusion 2026 | IRS | budget-builder |
| Social Security claiming at 62 vs 67 vs 70 | SSA | compound-growth |
| Social Security earnings test 2026 | SSA | salary-converter |
| Medicare IRMAA 2026 brackets | CMS / SSA | budget-builder |
| Medicare Part D 2026 out-of-pocket cap | CMS | budget-builder |
| ACA marketplace premium tax credit: the cliff | healthcare.gov / IRS | budget-builder |
| I bonds current rate: fixed + inflation parts | TreasuryDirect | compound-growth |
| T-bills vs high-yield savings after state tax | TreasuryDirect / IRS | compound-growth |
| 529 plan: qualified expenses and the Roth rollover | IRS Pub 970 | compound-growth |
| Credit card minimum payment: how long payoff takes | CFPB / Fed | credit-card-payoff |
| Winter heating cost outlook by fuel | EIA Winter Fuels Outlook | appliance-running-cost |

**Do not duplicate** existing briefs (en): 401k-contribution-limits-2026, airline-points-cash-value, auto-loan-rate-by-credit-score-2026, buy-now-or-wait-price-increase, car-repair-vs-trade-in, childcare-cost-2026, credit-card-apr-2026, credit-score-points-dollar-value, dental-insurance-vs-cash, disability-insurance-break-even, electricity-price-per-kwh-2026, emergency-fund-size-2026, employer-match-vs-debt-payoff, gas-vs-ev-cost-per-mile-2026, gym-membership-vs-pay-per-visit, heat-pump-payback-2026, home-improvement-roi-before-selling, home-warranty-break-even, hsa-limits-2026, hsa-vs-fsa-decision, idle-cash-cost-2026, inflation-adjusted-raise-2026, insurance-deductible-break-even, internet-plan-cost-2026, ira-vs-401k-priority-2026, irs-mileage-rate-2026, lease-buyout-break-even, medicare-part-b-2026, mortgage-rate-2026-payment-impact, mortgage-refinance-break-even, moving-for-a-job-full-cost, overtime-vs-second-job, pay-off-car-loan-early-or-invest, pet-insurance-break-even, phone-upgrade-trade-in-timing, pmi-removal-timing, rent-increase-move-or-stay, rental-car-insurance-decline, roth-vs-traditional-break-even, salary-raise-vs-bonus, savings-vs-cd-2026, should-i-file-an-insurance-claim, side-hustle-true-hourly-rate, social-security-cola-2026, solar-payback-2026, standard-deduction-2026, streaming-prices-2026, student-loan-degree-roi, student-loan-rate-2026, term-vs-whole-life-cost, tsa-precheck-break-even, umbrella-insurance-break-even.
Also existing standalone pages: annual-fee card break-even, annual vs monthly billing, commuting cost, bulk buying, Costco, extended warranty, free shipping threshold, installment APR, opportunity cost, price in work hours, rent vs buy, return-to-office cost, rule of 72, subscription creep, sunk cost, zero-interest installments.

## Output

- 4 batches of 7; one reply per batch. Wait for "continue" before the next.
- Put the 7 files in a zip too, plus one BATCH file containing each file and its evidence table:

  ````
  ### File: <slug>.md
  ```markdown
  (full file)
  ```
  **Evidence**
  | Figure | Source URL | Exact sentence |
  ...
  ````

- After the last batch: a summary table — publishAt | slug | topic | official source URLs.

## Template (match this structure and tone)

```markdown
---
contentType: brief
briefSlug: "hsa-limits-2026"
locale: "en"
cluster: "protection"
title: "The 2026 HSA Limits Are $4,300 and $8,550 — and Payroll Contributions Dodge FICA Too"
description: "Health savings account limits for 2026 are $4,300 for individual coverage and $8,550 for family, plus $1,000 at 55. Contributed through payroll, $4,300 avoids about $1,275 of tax at a 22% bracket."
answer: "For 2026 the HSA limit is $4,300 for individual coverage and $8,550 for family, with a $1,000 catch-up from age 55. Contributed through payroll it escapes income tax and the 7.65% FICA that a 401(k) deferral does not: at a 22% marginal rate, $4,300 avoids about $1,275."
publishAt: "2026-10-17"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/budget-builder/"
relatedToolLabel: "budget builder"
formula: "tax avoided on a payroll HSA contribution = contribution × (marginal income tax rate + payroll tax rate); for a direct contribution, income tax rate only"
limits:
  - "This is a calculation, not tax advice. Eligibility requires enrolment in a qualifying high-deductible health plan and no disqualifying other coverage, conditions this page cannot check for you."
  - "The FICA advantage applies to contributions made through an employer's cafeteria plan by payroll deduction."
  - "Withdrawals are tax-free only for qualified medical expenses. IRS Publication 969 defines what qualifies."
sources:
  - label: "IRS — Publication 969, Health Savings Accounts and Other Tax-Favored Health Plans"
    url: "https://www.irs.gov/publications/p969"
    verifiedDate: "2026-09-19"
faq:
  - q: "Why is an HSA better than a 401(k) dollar for dollar?"
    a: "Because a payroll HSA contribution avoids payroll tax as well as income tax, while a 401(k) deferral avoids income tax only."
  - q: "What happens to the money if I stay healthy?"
    a: "It stays yours. Unlike an FSA there is no use-it-or-lose-it deadline."
related:
  - "/en/money/401k-contribution-limits-2026/"
  - "/en/money/insurance-deductible-break-even/"
draft: false
---

## The 2026 limits

| | 2026 |
| --- | ---: |
| Self-only coverage | **$4,300** |
| Family coverage | **$8,550** |
| Catch-up, age 55+ | $1,000 |

## The formula

    tax avoided = contribution × (marginal rate + 7.65%)

## Worked example

At a 22% bracket, $4,300 through payroll avoids 4,300 × 29.65% = **$1,275**.

## What would flip the answer

- **The plan itself loses.** A high-deductible plan is only worth it if premium savings minus worst-case exposure still wins.
- **Direct contribution.** Outside payroll you save income tax only.
```
