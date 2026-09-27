---
contentType: brief
briefSlug: "federal-tax-brackets"
locale: "en"
cluster: "earning"
title: "Federal Tax Brackets: 2026 Marginal vs Effective Rate"
description: "The 2026 single brackets run from 10% through 37%. A single filer with $105,700 taxable income owes $17,966 before credits in this bracket example."
answer: "The IRS has published the 2026 federal ordinary-income tax brackets; 2027 brackets were not yet officially released when this brief was reviewed on September 27, 2026. For a single filer, the first $12,400 of taxable income is in the 10% bracket, the next band through $50,400 is 12%, and the next band through $105,700 is 22%. At exactly $105,700 of taxable income, those three layers produce $17,966 of federal income tax before credits and other special rules. The marginal rate is 22%, while the effective rate on that taxable income is about 17.0%."
publishAt: "2026-11-04"
lastReviewed: "2026-09-27"
relatedTool: "/en/tools/salary-converter/"
relatedToolLabel: "salary converter"
formula: "federal tax = sum of (taxable income inside each bracket × that bracket rate); effective rate = total tax ÷ taxable income"
limits:
  - "This is a calculation, not tax or financial advice; it uses taxable income and does not calculate deductions, credits, preferential capital-gain rates, AMT, NIIT, self-employment tax, or state tax."
  - "A marginal bracket applies only to the slice of taxable income inside that bracket, not to all income. The IRS determines liability; this page does not guarantee a tax amount."
  - "Bracket thresholds change by tax year. Confirm the latest IRS inflation-adjustment release or ask a CPA before filing or withholding decisions."
sources:
  - label: "IRS — 2026 federal tax brackets"
    url: "https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers"
    verifiedDate: "2026-09-27"
faq:
  - q: "What are the 2026 federal tax brackets for a single filer?"
    a: "The seven rates are 10%, 12%, 22%, 24%, 32%, 35%, and 37%, with 2026 single thresholds of $12,400, $50,400, $105,700, $201,775, $256,225 and $640,600 between the bands."
  - q: "What is the difference between marginal and effective tax rate?"
    a: "The marginal rate is the rate on the next taxable dollar within the current bracket; the effective rate is total tax divided by taxable income in this simplified bracket calculation."
  - q: "Does entering the 22% bracket tax all my income at 22%?"
    a: "No. Only the taxable-income slice inside that bracket is taxed at 22%; lower slices keep their lower rates."
  - q: "What is the difference between marginal and effective tax rate?"
    a: "Marginal rate is the rate on the next dollar of taxable income; effective rate is total tax divided by an income base."
related:
  - "/en/money/standard-deduction/"
  - "/en/money/capital-gains-zero-percent-bracket/"
draft: false
---
## The 2026 federal brackets

The prompt for this page says to use 2027 if officially released; otherwise use 2026. As of **September 27, 2026**, the IRS has not yet published the tax-year 2027 inflation-adjusted brackets, so this page uses the official **2026** figures rather than a projection.

| Single taxable income | Marginal rate |
| --- | ---: |
| up to $12,400 | **10%** |
| over $12,400 to $50,400 | **12%** |
| over $50,400 to $105,700 | **22%** |
| over $105,700 to $201,775 | **24%** |
| over $201,775 to $256,225 | **32%** |
| over $256,225 to $640,600 | **35%** |
| over $640,600 | **37%** |

For married filing jointly, the corresponding 2026 thresholds between bands are **$24,800, $100,800, $211,400, $403,550, $512,450, and $768,700**.

## The formula

    federal tax
    = sum of (taxable income inside each bracket × that bracket rate)

    effective rate = total bracket tax ÷ taxable income

## Worked example: $105,700 of single taxable income

Break the taxable income into slices:

1. First **$12,400 × 10% = $1,240**.
2. Next **$50,400 - $12,400 = $38,000** at 12%: **$4,560**.
3. Next **$105,700 - $50,400 = $55,300** at 22%: **$12,166**.
4. Total: **$1,240 + $4,560 + $12,166 = $17,966**.

Marginal rate: **22%**.

Effective rate on taxable income:

    $17,966 ÷ $105,700 = 16.996...% ≈ 17.0%

This is why “I am in the 22% bracket” does **not** mean 22% of all taxable income goes to federal income tax.

## The mistake people make: multiplying all income by the top bracket

Federal income tax is marginal. Reaching the 22% bracket does not make the dollars in the 10% and 12% brackets retroactively taxable at 22%. The useful distinction is **marginal rate**—the rate on the next dollar of taxable income—versus **effective rate**—total federal income tax divided by the chosen income base. Deductions change taxable income before the bracket calculation, while credits generally reduce tax after the tax is calculated. That is why a salary increase that crosses a bracket boundary normally still increases after-tax income. For a planning estimate, first determine filing status and taxable income, then apply each bracket slice in order.

## What would flip the answer

- **Taxable income changes.** Deductions affect taxable income before the bracket calculation.
- **Preferential income is present.** Long-term capital gains and qualified dividends can use separate rate schedules.
- **Credits apply.** Credits can reduce tax after the bracket calculation.
- **The IRS releases 2027 brackets.** This evergreen page should then be updated in place rather than mixing projections with official figures.
