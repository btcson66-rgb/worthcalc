# WorthCalc Part B — Batch 1

Revised and re-verified: 2026-09-27

Evidence rule: the third column reproduces the exact sentence or table-row text captured from the official page. Hypothetical worked-example inputs are explicitly labeled as reader assumptions in the article and are not represented as government figures.

### File: medicare-part-d-out-of-pocket-cap.md

```markdown
---
contentType: brief
briefSlug: medicare-part-d-out-of-pocket-cap
locale: en
cluster: protection
title: 'Medicare Part D Out-of-Pocket Cap: $2,100 in 2026'
description: Medicare Part D caps covered-drug out-of-pocket spending at $2,100 in 2026 and $2,400 in 2027. Here is what counts and what does not.
answer: For 2026, Medicare Part D reaches its catastrophic stage after $2,100 of out-of-pocket spending on covered Part D drugs; the 2027 amount is $2,400. The maximum Part D deductible is $615 in 2026 and $700 in 2027. After the cap is reached, the enrollee pays $0 for covered Part D drugs for the rest of that calendar year. Premiums and non-covered drugs do not count toward the cap.
publishAt: '2026-10-12'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: remaining covered-drug exposure = max(0, annual Part D out-of-pocket cap - qualifying out-of-pocket spending so far)
limits:
- This is a calculation, not financial or Medicare advice; it cannot verify whether a drug, pharmacy, or payment counts toward Part D true out-of-pocket spending.
- Plan premiums and spending on drugs that are not covered by Part D are outside this cap. Medicare and the plan decide what counts; this page does not guarantee coverage.
- Plan formularies and cost sharing can change. Confirm the current plan details with Medicare or the plan before acting.
sources:
- label: Medicare — Part D costs
  url: https://www.medicare.gov/health-drug-plans/part-d/basics/costs
  verifiedDate: '2026-09-27'
faq:
- q: What is the Medicare Part D out-of-pocket cap for 2026?
  a: The 2026 cap is $2,100 for covered Part D drugs. Once qualifying out-of-pocket spending reaches that amount, covered Part D drugs cost $0 for the rest of the calendar year.
- q: Does the Part D premium count toward the $2,100 cap?
  a: No. Medicare says monthly plan premiums do not count toward the Part D out-of-pocket cap; neither do drugs that the plan does not cover.
- q: Does the Part D premium count toward the cap?
  a: No. The cap concerns qualifying out-of-pocket spending on covered Part D drugs; the monthly plan premium is separate.
- q: What is the Part D cap in 2027?
  a: Medicare lists $2,400 for 2027, compared with $2,100 for 2026.
related:
- /en/money/medicare-irmaa-brackets/
- /en/money/medicare-part-b-premium/
draft: false
---
## The 2026 and 2027 official figures

| Part D figure | 2026 | 2027 |
| --- | ---: | ---: |
| Maximum deductible | **$615** | **$700** |
| Covered-drug out-of-pocket cap | **$2,100** | **$2,400** |
| Cost for covered Part D drugs after the cap | **$0** | **$0** |

The cap is about **covered Part D drug spending**, not every health-care dollar that leaves your bank account. Your monthly Part D premium does not move you closer to the cap, and spending on drugs the plan does not cover does not count either.

## The formula

    remaining covered-drug exposure = max(0, annual Part D out-of-pocket cap - qualifying out-of-pocket spending so far)

This is a ceiling on qualifying prescription spending, not a promise that every prescription is covered or that every payment counts.

## Worked example

Use the official annual caps only.

- 2026 cap: **$2,100**.
- 2027 cap: **$2,400**.
- Difference: **$2,400 - $2,100 = $300**.

So a beneficiary who reaches the catastrophic threshold in both years has **$300 more maximum qualifying Part D out-of-pocket exposure in 2027 than in 2026**, before considering plan premiums or non-covered drugs.

If a 2026 enrollee has already accumulated the full **$2,100** in qualifying out-of-pocket spending, the formula becomes:

    max(0, $2,100 - $2,100) = $0

For covered Part D drugs, the rest-of-year out-of-pocket amount is then $0.

## What the cap does not solve

A low or capped prescription bill can still sit next to a high total health-care budget. Part B premiums, Medigap or Medicare Advantage premiums, non-Part-D services, and drugs excluded from the plan's formulary are separate questions. The useful budgeting move is to keep the Part D cap as its own line item instead of treating it as an all-in Medicare maximum.

## The mistake people make: treating the Part D cap as an all-in Medicare cap

The Part D out-of-pocket threshold is specific to covered Part D drugs. It does not cap Part B premiums, Medigap premiums, Medicare Advantage costs, dental care, or every pharmacy purchase. That distinction matters in retirement budgeting because a person can hit the Part D catastrophic threshold and still have substantial medical cash outflow elsewhere. A second interaction is formulary status: if a drug is not covered by the plan, spending on it may not receive the protection a reader expects from the headline cap. Use the cap as one budget ceiling for qualifying prescription costs, then model premiums and non-Part-D health spending separately.

## What would flip the answer

- **The drug is not covered by Part D.** Spending on a non-covered drug does not get the protection described by this cap.
- **The payment does not count toward Part D out-of-pocket spending.** Premiums are the clearest example; they remain a separate cash expense.
- **The year changes.** The official cap rises from $2,100 in 2026 to $2,400 in 2027, so use the figure for the calendar year you are budgeting.
- **Your filing, income, timing, or eligibility facts change.** Re-run the calculation with the facts for the year you are actually filing or planning.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026/2027 Part D deductible maximum | https://www.medicare.gov/health-drug-plans/part-d/basics/costs | No Medicare drug plan may have a deductible more than $700 in 2027 ($615 in 2026), and some plans have no deductible. |
| 2026/2027 out-of-pocket threshold | https://www.medicare.gov/health-drug-plans/part-d/basics/costs | Initial coverage stage: After you reach your full deductible (if your plan has a deductible), you’ll pay 25% of the cost as coinsurance for your generic and brand-name drugs until your out-of-pocket spending on covered Part D drugs reaches $2,100 in 2026 ($2,400 in 2027)(including certain payments made on your behalf, like through the Extra Help program). Then, you’ll automatically get “catastrophic coverage.” |
| $0 covered Part D drugs after threshold | https://www.medicare.gov/health-drug-plans/part-d/basics/costs | Catastrophic coverage stage: You won’t have to pay out-of-pocket for covered Part D drugs for the rest of the calendar year. |

### File: medicare-irmaa-brackets.md

```markdown
---
contentType: brief
briefSlug: medicare-irmaa-brackets
locale: en
cluster: protection
title: 'Medicare IRMAA Brackets: 2026 Part B and Part D'
description: 2026 IRMAA starts above $109,000 single or $218,000 joint MAGI. See each Part B and Part D surcharge and the cost of crossing a tier.
answer: For 2026, the standard Medicare Part B premium is $202.90 per month. IRMAA begins when the income used by Social Security exceeds $109,000 for an individual return or $218,000 for a joint return. The first IRMAA tier adds $81.20 per month to Part B and $14.50 per month to Part D. That first step is $95.70 a month, or $1,148.40 over 12 months.
publishAt: '2026-10-13'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: annual IRMAA increase = 12 × (monthly Part B IRMAA + monthly Part D IRMAA)
limits:
- This is a calculation, not tax, financial, or Medicare advice; it does not determine your filing status, MAGI, or eligibility for an IRMAA adjustment.
- Part D IRMAA is added to your plan premium, so this page does not calculate the underlying plan premium. Social Security decides IRMAA; this page does not guarantee a premium amount.
- Life-changing events can support an IRMAA reconsideration in some cases. Confirm your notice and options with Social Security or a qualified adviser.
sources:
- label: SSA — 2026 Medicare premiums and IRMAA
  url: https://www.ssa.gov/benefits/medicare/medicare-premiums.html
  verifiedDate: '2026-09-27'
faq:
- q: What income triggers IRMAA in 2026?
  a: For 2026, the first IRMAA tier begins above $109,000 for an individual return and above $218,000 for a married joint return, using the tax-year income specified by Social Security.
- q: How much does the first IRMAA tier add?
  a: The first 2026 tier adds $81.20 per month to Part B and $14.50 per month to Part D, for a combined $95.70 monthly adjustment before the underlying Part D plan premium.
- q: Which tax year does Social Security use for 2026 IRMAA?
  a: SSA says it generally uses the federal tax return filed in 2025 for tax year 2024 when determining 2026 income-related premiums.
- q: Can a life-changing event reduce IRMAA?
  a: Potentially. SSA has a reconsideration process for certain qualifying life-changing events; use your SSA notice and current guidance for the actual request.
related:
- /en/money/medicare-part-d-out-of-pocket-cap/
- /en/money/medicare-part-b-premium/
draft: false
---
## The 2026 IRMAA figures

For 2026, the standard Part B premium is **$202.90 per month**. The income-related monthly adjustment amount, or IRMAA, is layered on top when the income Social Security uses crosses a threshold.

| 2024 MAGI used for 2026 premiums | Individual return | Joint return | Part B IRMAA | Part D IRMAA |
| --- | ---: | ---: | ---: | ---: |
| Base tier | $109,000 or less | $218,000 or less | $0 | $0 |
| Tier 1 | over $109,000 to $137,000 | over $218,000 to $274,000 | **$81.20/mo** | **$14.50/mo** |
| Tier 2 | over $137,000 to $171,000 | over $274,000 to $342,000 | **$202.90/mo** | **$37.50/mo** |
| Tier 3 | over $171,000 to $205,000 | over $342,000 to $410,000 | **$324.60/mo** | **$60.40/mo** |
| Tier 4 | over $205,000 to under $500,000 | over $410,000 to under $750,000 | **$446.30/mo** | **$83.30/mo** |
| Top tier | $500,000 or more | $750,000 or more | **$487.00/mo** | **$91.00/mo** |

Social Security generally bases the 2026 determination on the federal tax return filed in 2025 for tax year 2024. That lag is why a current retirement budget can be affected by older income.

## The formula

    annual IRMAA increase = 12 × (monthly Part B IRMAA + monthly Part D IRMAA)

The Part D number above is only the **IRMAA surcharge**. Your actual Part D plan premium is separate.

## Worked example: crossing the first tier

Compare the base tier with Tier 1 for 2026.

- Added Part B amount: **$81.20 per month**.
- Added Part D amount: **$14.50 per month**.
- Combined monthly increase: **$81.20 + $14.50 = $95.70**.
- Annualized: **$95.70 × 12 = $1,148.40**.

The important arithmetic is not merely the income tax on the last dollar of MAGI. Crossing an IRMAA threshold can also change Medicare premiums for the year to which that determination applies.

## Why it behaves like a cliff

Within a tier, the published IRMAA amount is fixed. A small amount of MAGI above a threshold can therefore trigger the same monthly adjustment as a much larger amount of MAGI within that tier. That does not mean the extra income was a mistake; it means the Medicare premium effect belongs in the comparison.

## The mistake people make: looking only at this year’s income

IRMAA has a lookback. A retiree can reduce current income and still receive an income-related premium because Social Security is using an earlier federal tax return. That timing matters around retirement, Roth conversions, large capital gains, and property sales. It also means a one-time income spike can affect Medicare premiums later even when the cash event is over. Some qualifying life-changing events can support a request for a new determination, but the adjustment is not automatic. When comparing a Roth conversion or asset sale, put the possible Medicare premium effect on the same timeline as the tax effect instead of assuming the premium follows the transaction immediately.

## What would flip the answer

- **Your filing status changes.** Joint-return thresholds are different from individual thresholds.
- **Social Security accepts a reconsideration.** Certain life-changing events may allow a more recent income figure to be used.
- **Your MAGI stays inside the same tier.** Additional income that does not cross the next line does not create another IRMAA step.
- **Your filing, income, timing, or eligibility facts change.** Re-run the calculation with the facts for the year you are actually filing or planning.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 standard Part B premium | https://www.ssa.gov/benefits/medicare/medicare-premiums.html | The standard Part B premium for 2026 is $202.90. If you're single and filed an individual tax return, or married and filed a joint tax return, the following chart applies to you: |
| 2026 first IRMAA thresholds | https://www.ssa.gov/benefits/medicare/medicare-premiums.html | If you file your taxes as "married, filing jointly" and your MAGI is greater than $218,000, you'll pay higher premiums for your Part B and Medicare prescription drug coverage. If you file your taxes using a different status, and your MAGI is greater than $109,000, you'll pay higher premiums. |
| 2026 IRMAA table — all individual/joint tiers and surcharges | https://www.ssa.gov/benefits/medicare/medicare-premiums.html | Individuals with a MAGI less than or equal to $109,000 / Married couples with a MAGI of $218,000 or less &#124; 2026 standard premium = $202.90 &#124; Your plan premium<br>Individuals with a MAGI above $109,000 up to $137,000 / Married couples with a MAGI above $218,000 up to $274,000 &#124; Standard premium + $81.20 &#124; Your plan premium + $14.50<br>Individuals with a MAGI above $137,000 up to $171,000 / Married couples with a MAGI above $274,000 up to $342,000 &#124; Standard premium + $202.90 &#124; Your plan premium + $37.50<br>Individuals with a MAGI above $171,000 up to $205,000 / Married couples with a MAGI above $342,000 up to $410,000 &#124; Standard premium + $324.60 &#124; Your plan premium + $60.40<br>Individuals with a MAGI above $205,000 and less than $500,000 / Married couples with a MAGI above $410,000 and less than $750,000 &#124; Standard premium + $446.30 &#124; Your plan premium + $83.30<br>Individuals with a MAGI equal to or above $500,000 / Married couples with a MAGI equal to or above $750,000 &#124; Standard premium + $487.00 &#124; Your plan premium + $91.00 |

### File: no-tax-on-overtime-deduction.md

```markdown
---
contentType: brief
briefSlug: no-tax-on-overtime-deduction
locale: en
cluster: earning
title: 'No Tax on Overtime Deduction: What Actually Counts'
description: The 2025–2028 overtime deduction applies to the FLSA premium portion, up to $12,500 single or $25,000 joint, with an income phase-out.
answer: For 2025 through 2028, the federal deduction for qualified overtime is generally the FLSA premium portion, not the entire overtime paycheck. With time-and-a-half pay, the extra one-half of the regular rate is the qualified premium. The annual deduction is capped at $12,500 for other filers and $25,000 for married filing jointly, with a phase-out above $150,000 or $300,000 of MAGI. A $12,500 deduction fully inside the 2026 22% bracket would reduce federal income tax by $2,750 before phase-out or other limits.
publishAt: '2026-10-14'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/salary-converter/
relatedToolLabel: salary converter
formula: qualified overtime deduction = min(qualified FLSA overtime premium, annual cap), then apply the MAGI phase-out
limits:
- This is a calculation, not tax or financial advice; it cannot determine whether your overtime is qualified FLSA overtime or verify your MAGI.
- The deduction does not make all overtime wages tax-free and does not by itself eliminate payroll taxes. The IRS determines eligibility; this page does not guarantee a deduction.
- The deduction is scheduled for 2025 through 2028 under current law. Confirm current IRS guidance or ask a CPA before filing.
sources:
- label: IRS — qualified overtime Q&A
  url: https://www.irs.gov/newsroom/questions-and-answers-about-the-new-deduction-for-qualified-overtime-compensation
  verifiedDate: '2026-09-27'
- label: IRS — 2026 tax brackets
  url: https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers
  verifiedDate: '2026-09-27'
faq:
- q: Is all overtime pay tax-free?
  a: No. The deduction generally targets the qualified overtime premium required under the FLSA. For time-and-a-half pay, that is normally the extra half-time portion, not the full overtime wage.
- q: What is the overtime deduction cap?
  a: For 2025 through 2028, the annual cap is $12,500 for filers other than married filing jointly and $25,000 for married filing jointly, before the MAGI phase-out.
- q: Do I have to itemize to claim the overtime deduction?
  a: No. IRS guidance says the deduction is available whether you itemize or take the standard deduction.
- q: Does qualified overtime still have payroll taxes?
  a: Yes. IRS guidance says overtime compensation is generally still subject to Social Security and Medicare taxes, and federal income-tax withholding can still apply.
related:
- /en/money/overtime-vs-second-job/
- /en/money/no-tax-on-tips-deduction/
draft: false
---
## The official 2025–2028 rules

| Rule | Amount |
| --- | ---: |
| Maximum deduction — most filing statuses | **$12,500** |
| Maximum deduction — married filing jointly | **$25,000** |
| MAGI phase-out begins — most filing statuses | **$150,000** |
| MAGI phase-out begins — married filing jointly | **$300,000** |

The phrase “no tax on overtime” is easy to overread. The deduction is for **qualified overtime compensation**, which the IRS ties to the premium required by the Fair Labor Standards Act. If the regular rate is paid at time-and-a-half, the normal wage portion remains ordinary wage income; the extra half-time premium is the piece that can qualify.

## The formula

    qualified overtime deduction = min(qualified FLSA overtime premium, annual cap)
    final deduction = qualified overtime deduction after the MAGI phase-out

The tax value is then roughly the deduction multiplied by the marginal federal income-tax rate that the deduction displaces, subject to the rest of the return.

## Worked example: maximum deduction in the 22% bracket

The 2026 single 22% bracket covers taxable income above **$50,400** through **$105,700**. Assume the full **$12,500** qualified-overtime deduction displaces income that would otherwise all fall in that 22% bracket.

- Qualified deduction: **$12,500**.
- Marginal rate in this simplified case: **22%**.
- Federal income-tax reduction: **$12,500 × 22% = $2,750**.

That **$2,750** is not a flat government payment and not a payroll-tax refund. It is the arithmetic effect of a $12,500 deduction against income taxed at 22% in this simplified case.

## Why the pay stub can be misleading

Employers still withhold taxes under payroll rules. The eventual deduction is reconciled on the federal return. So “my overtime check still had tax withheld” does not by itself tell you whether the deduction applies.

## The mistake people make: “no tax” does not mean no withholding

The provision is a federal income-tax deduction for qualified overtime compensation; it does not convert the whole overtime paycheck into tax-free wages. Payroll can still show federal withholding and Social Security/Medicare taxes, and only the qualified overtime portion defined by the rule enters the deduction calculation. That is why a worker can see taxes withheld from an overtime check and still claim the deduction later. The withholding setting and the eventual deduction are separate systems. For planning, track qualified overtime from pay records, estimate the deduction, and compare it with expected year-end taxable income rather than changing withholding solely because the phrase “no tax on overtime” sounds like an exclusion.

## What would flip the answer

- **The overtime is not FLSA-required premium pay.** Extra pay created only by a contract, policy, or different premium structure may not be qualified compensation.
- **MAGI is above the phase-out threshold.** The available deduction can shrink.
- **Your marginal rate is different.** The same deduction has a different federal income-tax effect in another bracket.
- **Your filing, income, timing, or eligibility facts change.** Re-run the calculation with the facts for the year you are actually filing or planning.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| qualified overtime definition | https://www.irs.gov/instructions/iw2w3 | Qualified overtime is compensation that exceeds the regular rate of pay (such as the “and-a-half” portion of time-and-a-half compensation) that is paid to an individual required under section 7 of the Fair Labor Standards Act (FLSA) of 1938. |
| $12,500 / $25,000 annual maximum | https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction | Maximum annual deduction is $12,500; $25,000, if you file jointly. |
| $150,000 / $300,000 MAGI phase-out start | https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction | Deduction phases out if your modified adjusted gross income is over $150,000; $300,000, if you file jointly. |
| itemizing not required | https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction | Deduction is available regardless of whether you itemize or take the standard deduction. |

### File: no-tax-on-tips-deduction.md

```markdown
---
contentType: brief
briefSlug: no-tax-on-tips-deduction
locale: en
cluster: earning
title: 'No Tax on Tips Deduction: $25,000 Cap and Phase-Out'
description: Qualified tips can generate up to a $25,000 federal deduction for 2025–2028. See the MAGI phase-out and the IRS worked example.
answer: For 2025 through 2028, qualified tips can be deducted up to $25,000 per return, subject to the rules for qualified occupations and voluntary tips. The deduction phases out by $100 for each $1,000 of MAGI above $150,000 for most filers or $300,000 for joint filers. In an IRS example, $26,000 of qualified tips is capped at $25,000, then $200,000 of MAGI reduces the deduction by $5,000, leaving $20,000.
publishAt: '2026-10-15'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/salary-converter/
relatedToolLabel: salary converter
formula: deduction = min(qualified tips, $25,000) - phase-out reduction, not below $0
limits:
- This is a calculation, not tax or financial advice; it cannot determine whether your occupation, tips, filing status, or MAGI meets the statutory rules.
- The deduction applies to qualified voluntary tips and is subject to reporting and eligibility rules. The IRS decides eligibility; this page does not guarantee a deduction.
- The provision applies for 2025 through 2028 under current law. Confirm the current IRS guidance or ask a CPA before filing.
sources:
- label: IRS — 2026-18 guidance on qualified tips
  url: https://www.irs.gov/irb/2026-18_IRB
  verifiedDate: '2026-09-27'
faq:
- q: What is the maximum no-tax-on-tips deduction?
  a: The annual deduction is capped at $25,000 for qualified tips, before the income phase-out.
- q: When does the tips deduction phase out?
  a: The phase-out begins above $150,000 of MAGI for most filers and $300,000 for married filing jointly, reducing the deduction by $100 per $1,000 of excess MAGI.
- q: Do mandatory service charges count as qualified tips?
  a: IRS guidance distinguishes mandatory service charges from voluntary qualified tips; mandatory charges are not qualified tips for this deduction.
- q: Do qualified tips still have payroll tax?
  a: Generally yes. The tips deduction is an income-tax deduction and does not erase Social Security and Medicare tax rules on tip income.
related:
- /en/money/no-tax-on-overtime-deduction/
- /en/money/self-employment-tax/
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

## What counts is more important than the nickname

Mandatory service charges and other non-voluntary payments do not become qualified tips merely because a business passes them to workers. Recordkeeping also matters because the deduction is tied to reported qualified tip income.

## The mistake people make: “tips” is not every amount added to a restaurant bill

The federal deduction applies to qualified tips, not every payment that looks tip-like. Mandatory service charges are a classic source of confusion because they can be wages rather than voluntary tips. The deduction also does not erase payroll taxes or necessarily stop federal income-tax withholding during the year. A worker should preserve tip records and distinguish voluntary tips from employer-imposed charges before applying the annual cap and MAGI phase-out. The tax benefit is also a deduction, not a refundable credit: the same $18,000 of qualified tips can produce different federal income-tax savings for taxpayers in different marginal-rate situations.

## What would flip the answer

- **The payment is not a qualified voluntary tip.** Then it does not enter this deduction calculation.
- **MAGI rises into the phase-out.** The $25,000 headline cap can overstate the actual deduction.
- **The tax year is outside 2025–2028.** The current provision is time-limited under current law.
- **Your filing, income, timing, or eligibility facts change.** Re-run the calculation with the facts for the year you are actually filing or planning.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $25,000 cap and phase-out | https://www.irs.gov/irb/2026-18_IRB | Section 224(b)(1) limits the deduction for qualified tips for any taxable year to $25,000. The final regulations clarify that this limitation applies regardless of the taxpayer’s filing status for that taxable year. Under section 224(b)(2)(A), the deduction for qualified tips is reduced (but not below zero) by $100 for each $1,000 by which the taxpayer’s modified adjusted gross income (MAGI) exceeds $150,000 ($300,000 in the case of a joint return). |

### File: car-loan-interest-deduction.md

```markdown
---
contentType: brief
briefSlug: car-loan-interest-deduction
locale: en
cluster: ownership
title: 'Car Loan Interest Deduction: $10,000 Cap Explained'
description: The 2025–2028 car-loan interest deduction is capped at $10,000 and phases out above $100,000 single or $200,000 joint MAGI.
answer: For 2025 through 2028, qualified passenger vehicle loan interest can be deductible up to $10,000 per year. The loan generally must finance a new vehicle for the taxpayer’s first use, be secured by the vehicle, and the vehicle must have final assembly in the United States and a GVWR under 14,000 pounds. The deduction phases out above $100,000 of MAGI for most filers or $200,000 for joint filers. In an IRS example, $7,000 of qualified interest at $124,200 MAGI is reduced to a $2,000 deduction.
publishAt: '2026-10-16'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/car-affordability/
relatedToolLabel: car affordability
formula: deduction = min(qualified vehicle loan interest, $10,000) - $200 × each $1,000 (or fraction) of excess MAGI
limits:
- This is a calculation, not tax or financial advice; it cannot verify the vehicle, loan, assembly location, lien, personal-use requirement, or your MAGI.
- Used vehicles, leases, and loans that fail the qualified passenger vehicle rules can be excluded. The IRS determines eligibility; this page does not guarantee a deduction.
- The provision applies for 2025 through 2028 under current law. Confirm VIN and tax details with the IRS, dealer records, or a CPA before filing.
sources:
- label: IRS — final regulations for qualified passenger vehicle loan interest
  url: https://www.irs.gov/irb/2026-39_irb
  verifiedDate: '2026-09-27'
faq:
- q: How much car loan interest can I deduct?
  a: The annual federal deduction is capped at $10,000 of qualified passenger vehicle loan interest before any MAGI phase-out.
- q: Can a used car qualify for the new interest deduction?
  a: The federal rule generally requires the vehicle to be new to the taxpayer as its original user, so a used-vehicle purchase does not satisfy that requirement.
- q: Do I have to itemize to claim the car-loan interest deduction?
  a: No. IRS guidance says the deduction is available to itemizers and non-itemizers if the loan, vehicle, use, and income rules are satisfied.
- q: Does the $10,000 deduction mean $10,000 less tax?
  a: No. It is a deduction from income, not a dollar-for-dollar tax credit; the tax savings depend on the taxpayer’s situation.
related:
- /en/money/used-ev-after-tax-credit/
- /en/money/car-repair-vs-trade-in/
draft: false
---
## The official 2025–2028 rules

| Rule | Amount |
| --- | ---: |
| Maximum annual deduction | **$10,000** |
| Phase-out begins — most filers | **$100,000 MAGI** |
| Phase-out begins — joint filers | **$200,000 MAGI** |
| Phase-out reduction | **$200 per $1,000 or fraction of excess MAGI** |
| Vehicle weight ceiling | **under 14,000 lb GVWR** |

The headline deduction is narrower than “interest on my car loan.” The IRS rules generally require a loan incurred after 2024 for a new qualified passenger vehicle for the taxpayer's original use, secured by a lien on the vehicle, with final assembly in the United States and personal use.

## The formula

    starting deduction = min(qualified vehicle loan interest, $10,000)
    phase-out reduction = $200 × $1,000-units (or fractions) above the MAGI threshold
    final deduction = max(0, starting deduction - phase-out reduction)

## Worked example: a $35,000 five-year loan at 7%

Assume a reader buys a **new U.S.-assembled qualifying vehicle**, finances **$35,000** for **60 months at 7% APR**, uses it personally, and is below the MAGI phase-out. The monthly payment is about **$693**. Using a standard amortization schedule, the first 12 payments contain about **$2,263 of interest**.

    starting deduction = min($2,263, $10,000) = $2,263
    phase-out reduction = $0
    estimated deduction = $2,263

That **$2,263 is a deduction, not a $2,263 refund**. If the same reader were far enough into the MAGI phase-out, some or all of the deduction could disappear. If the vehicle were used, assembled outside the United States, or the loan failed the secured-loan rules, the worked example would not qualify at all.

## The mistake people make: shopping for a deduction instead of total cost

A deduction reduces taxable income; it does not reimburse the interest dollar for dollar. A borrower who pays more for a qualifying vehicle or accepts a higher APR just to claim the deduction can still come out behind. The clean comparison is purchase price, APR, term, insurance, depreciation, and expected tax benefit together. The deduction also interacts with MAGI: two buyers with the same loan can receive different deductions because one is in the phase-out range. Before signing, verify the VIN/final-assembly requirement and loan structure, then compare the **after-tax interest cost** with a cheaper vehicle or shorter loan. The tax rule should be the last adjustment to the deal, not the reason to make the deal.

## What would flip the answer

- **The vehicle was bought used.** The original-use requirement can rule it out.
- **Final assembly was outside the United States.** That fails a core vehicle condition.
- **MAGI is high enough to phase out the deduction.** A borrower can have qualifying interest but little or no remaining deduction.
- **The loan is not secured by the vehicle or the vehicle is not for personal use.** The deduction can fail even if interest was paid.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $10,000 cap, itemizing status, first-lien/new/U.S.-assembly rules | https://www.irs.gov/taxtopics/tc505 | For tax years 2025-2028, you can take an annual deduction of up to $10,000 of qualified passenger vehicle loan interest. This deduction is available for both itemizing and non-itemizing taxpayers and is subject to limitations based on your modified adjusted gross income. The interest must be paid or accrued on indebtedness you incurred after December 31, 2024, for the purchase of, and that is secured by a first lien on, a vehicle. The vehicle’s original use must start with the taxpayer (used vehicles do not qualify), and the vehicle’s final assembly must be in the United States. |
| MAGI phase-out starting points | https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers | Phases out for taxpayers with modified adjusted gross income over $100,000 ($200,000 for joint filers) |
| Phase-out reduction formula | https://www.irs.gov/irb/2026-39_irb | The amount taken into account as QPVLI (after the application of the dollar limitation in paragraph (h)(1) of this section) is reduced (but not below zero) by $200 for each $1,000 (or portion thereof) by which the modified adjusted gross income of the taxpayer for the taxable year exceeds $100,000 or, in the case of a joint Federal income tax return, by which the modified adjusted gross income exceeds $200,000. |
| Vehicle weight ceiling | https://www.irs.gov/irb/2026-39_irb | (vi) The vehicle has a gross vehicle weight rating of less than 14,000 pounds; |

### File: senior-deduction-65.md

```markdown
---
contentType: brief
briefSlug: senior-deduction-65
locale: en
cluster: earning
title: 'Senior Deduction at 65: Up to $6,000 per Person'
description: The 2025–2028 senior deduction is up to $6,000 per eligible person, with a 6% phase-out above $75,000 single or $150,000 joint MAGI.
answer: For 2025 through 2028, an eligible taxpayer age 65 or older can claim a senior deduction of up to $6,000, or up to $12,000 on a joint return when both spouses qualify. The deduction begins to phase out above $75,000 of MAGI for an individual or $150,000 on a joint return, at 6% of excess MAGI. For a single filer with $150,000 MAGI, the $75,000 excess produces a $4,500 reduction, leaving a $1,500 deduction.
publishAt: '2026-10-17'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: senior deduction = max(0, maximum deduction - 6% × MAGI above the applicable threshold)
limits:
- This is a calculation, not tax or financial advice; it cannot verify age, filing status, MAGI, residency, or other eligibility conditions.
- A deduction reduces taxable income; it is not a dollar-for-dollar tax credit. The IRS determines eligibility; this page does not guarantee a deduction.
- The provision applies for 2025 through 2028 under current law. Confirm the current return instructions or ask a CPA before filing.
sources:
- label: IRS — senior deduction rules
  url: https://www.irs.gov/irm/part3/irm_03-011-006r
  verifiedDate: '2026-09-27'
- label: IRS — 2026 tax brackets
  url: https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers
  verifiedDate: '2026-09-27'
faq:
- q: How much is the new senior deduction?
  a: The maximum is $6,000 per eligible person age 65 or older, or $12,000 for a joint return if both spouses qualify, before the MAGI phase-out.
- q: Is the $6,000 senior deduction a tax credit?
  a: No. It is a deduction from taxable income, so its tax value depends on the taxpayer’s marginal tax rate and other return details.
- q: Is the new senior deduction the same as the standard deduction?
  a: No. The enhanced senior deduction is an additional 2025–2028 provision and should be modeled separately from the regular standard deduction.
- q: Does the $6,000 amount phase out?
  a: Yes. IRS guidance says the deduction begins to phase out above specified MAGI thresholds.
related:
- /en/money/standard-deduction/
- /en/money/medicare-irmaa-brackets/
draft: false
---
## The 2025–2028 official figures

| Rule | Amount |
| --- | ---: |
| Maximum deduction per eligible person | **$6,000** |
| Maximum if both spouses on a joint return qualify | **$12,000** |
| Phase-out begins — individual | **$75,000 MAGI** |
| Phase-out begins — joint return | **$150,000 MAGI** |
| Phase-out rate | **6% of excess MAGI** |

This deduction is **in addition to** the existing tax rules that can give older taxpayers a larger standard deduction. It can also be available whether the taxpayer uses the standard deduction or itemizes, subject to the new provision's rules.

## The formula

    phase-out reduction = 6% × max(0, MAGI - threshold)
    senior deduction = max(0, maximum deduction - phase-out reduction)

## Worked example

Use an eligible single filer with **$150,000** of MAGI.

- Maximum deduction: **$6,000**.
- Phase-out threshold: **$75,000**.
- Excess MAGI: **$150,000 - $75,000 = $75,000**.
- Phase-out reduction: **$75,000 × 6% = $4,500**.
- Remaining senior deduction: **$6,000 - $4,500 = $1,500**.

A deduction is not worth its face amount in tax savings. If that $1,500 falls against income in a given marginal bracket, the income-tax effect is $1,500 multiplied by that bracket rate, subject to the rest of the return.

## The mistake people make: replacing the standard deduction with the senior deduction

The enhanced senior deduction is an additional deduction under the 2025–2028 provision; it is not the same thing as the regular standard deduction for older taxpayers. A qualifying taxpayer can therefore need to consider the regular deduction framework, the enhanced senior deduction, and other new deductions such as qualified tips or overtime separately. MAGI phase-out also matters: the $6,000 headline amount can be reduced for higher-income taxpayers. For a married couple, eligibility is determined person by person for the senior deduction amount, while filing status and MAGI affect the phase-out. Stack the deductions in the order the tax form requires instead of subtracting $6,000 from tax itself.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Only one spouse qualifies by age.** A joint return does not automatically receive the $12,000 maximum.
- **MAGI rises above the threshold.** The 6% phase-out can shrink the deduction quickly.
- **The taxpayer is comparing this with a credit.** A $6,000 deduction and a $6,000 credit are not economically equivalent.
- **The tax year is outside 2025–2028.** The current provision is time-limited.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $6,000/$12,000 maximum and 6% phase-out | https://www.irs.gov/irm/part3/irm_03-011-006r | The EDS amount is reported on Schedule 1-A, Additional Deductions, line 37, and the maximum deduction amount is $6,000 ($12,000 in the case of a joint return). The EDS amount begins to phase out by 6% of so much of the taxpayer's MAGI that exceeds $75,000 ($150,000 in the case of a joint return). |
| 2025–2028 effective period | https://www.irs.gov/irm/part3/irm_03-011-006r | Beginning in TY 2025 and through TY 2028 taxpayers may qualify for the Enhanced Deduction for Seniors deduction. |
