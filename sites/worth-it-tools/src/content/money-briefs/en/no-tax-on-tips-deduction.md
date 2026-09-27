---
contentType: brief
briefSlug: "no-tax-on-tips-deduction"
locale: "en"
cluster: "earning"
title: "No Tax on Tips Deduction: $25,000 Cap and Phase-Out"
description: "Qualified tips can generate up to a $25,000 federal deduction for 2025–2028. See the MAGI phase-out and the IRS worked example."
answer: "For 2025 through 2028, qualified tips can be deducted up to $25,000 per return, subject to the rules for qualified occupations and voluntary tips. The deduction phases out by $100 for each $1,000 of MAGI above $150,000 for most filers or $300,000 for joint filers. In an IRS example, $26,000 of qualified tips is capped at $25,000, then $200,000 of MAGI reduces the deduction by $5,000, leaving $20,000."
publishAt: "2026-10-15"
lastReviewed: "2026-09-27"
relatedTool: "/en/tools/salary-converter/"
relatedToolLabel: "salary converter"
formula: "deduction = min(qualified tips, $25,000) - phase-out reduction, not below $0"
limits:
  - "This is a calculation, not tax or financial advice; it cannot determine whether your occupation, tips, filing status, or MAGI meets the statutory rules."
  - "The deduction applies to qualified voluntary tips and is subject to reporting and eligibility rules. The IRS decides eligibility; this page does not guarantee a deduction."
  - "The provision applies for 2025 through 2028 under current law. Confirm the current IRS guidance or ask a CPA before filing."
sources:
  - label: "IRS — 2026-18 guidance on qualified tips"
    url: "https://www.irs.gov/irb/2026-18_IRB"
    verifiedDate: "2026-09-27"
faq:
  - q: "What is the maximum no-tax-on-tips deduction?"
    a: "The annual deduction is capped at $25,000 for qualified tips, before the income phase-out."
  - q: "When does the tips deduction phase out?"
    a: "The phase-out begins above $150,000 of MAGI for most filers and $300,000 for married filing jointly, reducing the deduction by $100 per $1,000 of excess MAGI."
  - q: "Do mandatory service charges count as qualified tips?"
    a: "IRS guidance distinguishes mandatory service charges from voluntary qualified tips; mandatory charges are not qualified tips for this deduction."
  - q: "Do qualified tips still have payroll tax?"
    a: "Generally yes. The tips deduction is an income-tax deduction and does not erase Social Security and Medicare tax rules on tip income."
related:
  - "/en/money/no-tax-on-overtime-deduction/"
  - "/en/money/self-employment-tax/"
draft: false
---
## The 2025–2028 official figures

| Rule | Amount |
| --- | ---: |
| Maximum deduction for qualified tips | **$25,000** |
| MAGI phase-out begins — most filers | **$150,000** |
| MAGI phase-out begins — joint filers | **$300,000** |
| Phase-out rate | **$100 per $1,000 of excess MAGI** |

The deduction does not mean every dollar called a “tip” disappears from taxable income. The payment has to meet the federal definition of a qualified tip, including the rule that it is voluntary rather than a mandatory service charge.

## The formula

    capped tips = min(qualified tips, $25,000)
    phase-out reduction = $100 × each $1,000 of MAGI above the applicable threshold
    deduction = max(0, capped tips - phase-out reduction)

## Worked example: a server with $18,000 of qualified tips

Assume a server has **$18,000 of voluntary qualified tips** for the year and MAGI of **$75,000**. Those reader inputs are hypothetical; the federal cap and phase-out rules are official. Because $18,000 is below the $25,000 annual cap and the assumed MAGI is below the phase-out threshold, the tentative deduction is **$18,000**.

    tentative deduction = min($18,000, $25,000) = $18,000
    phase-out reduction = $0
    final deduction = $18,000

If the reader assumes a **22% marginal federal income-tax rate** for a rough sensitivity check, an $18,000 deduction could reduce federal income tax by roughly **$3,960** before considering the rest of the return. That 22% is an example assumption, not a guaranteed rate. Payroll taxes and withholding are separate.

## The mistake people make: “tips” is not every amount added to a restaurant bill

The federal deduction applies to qualified tips, not every payment that looks tip-like. Mandatory service charges are a classic source of confusion because they can be wages rather than voluntary tips. The deduction also does not erase payroll taxes or necessarily stop federal income-tax withholding during the year. A worker should preserve tip records and distinguish voluntary tips from employer-imposed charges before applying the annual cap and MAGI phase-out. The tax benefit is also a deduction, not a refundable credit: the same $18,000 of qualified tips can produce different federal income-tax savings for taxpayers in different marginal-rate situations.

## What would flip the answer

- **The payment is not a qualified voluntary tip.** Then it does not enter this deduction calculation.
- **MAGI rises into the phase-out.** The $25,000 headline cap can overstate the actual deduction.
- **The tax year is outside 2025–2028.** The current provision is time-limited under current law.
- **Your filing, income, timing, or eligibility facts change.** Re-run the calculation with the facts for the year you are actually filing or planning.
