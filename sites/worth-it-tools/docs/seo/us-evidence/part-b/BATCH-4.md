# WorthCalc Part B — Batch 4

Revised and re-verified: 2026-09-27

Evidence rule: the third column reproduces the exact sentence or table-row text captured from the official page. Hypothetical worked-example inputs are explicitly labeled as reader assumptions in the article and are not represented as government figures.

### File: child-tax-credit.md

```markdown
---
contentType: brief
briefSlug: child-tax-credit
locale: en
cluster: earning
title: 'Child Tax Credit: $2,200 per Child in 2026'
description: The 2026 Child Tax Credit is up to $2,200 per qualifying child, with up to $1,700 refundable. Full-credit income lines are $200,000/$400,000.
answer: For tax year 2026, the Child Tax Credit is up to $2,200 per qualifying child and the refundable Additional Child Tax Credit is capped at $1,700 per qualifying child, subject to the earned-income and other rules. The full credit is available through $200,000 of income for most filing statuses and $400,000 for married filing jointly before the phase-out. The phase-out reduces the credit by $50 for each $1,000 or fraction of excess modified AGI. A filer exactly at the $200,000 non-joint threshold with one qualifying child has no income phase-out yet, so the starting credit is $2,200 before tax-liability and refundability rules.
publishAt: '2026-10-30'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: starting CTC = qualifying children × $2,200; phase-out reduction = $50 × each $1,000 or fraction of MAGI above the filing-status threshold
limits:
- This is a calculation, not tax or financial advice; it cannot verify a child’s age, relationship, residency, support, Social Security number, dependent status, earned income, or filing status.
- The refundable amount is limited separately and can depend on earned income and tax liability. The IRS determines eligibility; this page does not guarantee a credit or refund.
- Credit amounts and rules can change by tax year. Confirm Schedule 8812 and current IRS guidance or ask a CPA before filing.
sources:
- label: IRS — Child Tax Credit
  url: https://www.irs.gov/credits-deductions/individuals/child-tax-credit
  verifiedDate: '2026-09-27'
- label: IRS — 2026 inflation adjustments
  url: https://www.irs.gov/irb/2025-45_IRB
  verifiedDate: '2026-09-27'
- label: IRS IRM — CTC phase-out mechanics
  url: https://www.irs.gov/irm/part21/irm_21-006-003r
  verifiedDate: '2026-09-27'
faq:
- q: How much is the Child Tax Credit for 2026?
  a: The maximum is $2,200 per qualifying child for 2026, subject to all eligibility and income rules.
- q: How much of the 2026 Child Tax Credit can be refundable?
  a: The Additional Child Tax Credit is capped at $1,700 per qualifying child for 2026, subject to earned-income and other refundability rules.
- q: Is the full $2,200 Child Tax Credit refundable?
  a: No. The Additional Child Tax Credit has its own refundable limit; the IRS lists up to $1,700 per qualifying child, subject to eligibility rules.
- q: What income gets the full Child Tax Credit?
  a: The IRS lists the full-credit income ceiling as $200,000 for most filers and $400,000 for married couples filing jointly, assuming the other eligibility rules are met.
related:
- /en/money/dependent-care-fsa-limit/
- /en/money/childcare-cost-2026/
draft: false
---
## The 2026 official figures

| Rule | 2026 amount |
| --- | ---: |
| Maximum Child Tax Credit per qualifying child | **$2,200** |
| Maximum refundable ACTC per qualifying child | **$1,700** |
| Earned-income floor for ACTC eligibility | **$2,500** |
| Full-credit income line — most filing statuses | **$200,000** |
| Full-credit income line — married filing jointly | **$400,000** |
| Phase-out reduction | **$50 per $1,000 or fraction of excess MAGI** |

The nonrefundable Child Tax Credit and refundable Additional Child Tax Credit are connected but not identical. A household can start with a $2,200 per-child maximum and still have the usable or refundable amount limited by the rest of the return.

## The formula

    starting CTC = number of qualifying children × $2,200
    phase-out reduction
    = $50 × each $1,000 (or fraction) of MAGI above the threshold

Then apply tax-liability, ACTC earned-income and other Schedule 8812 rules.

## Worked example: exactly at the income threshold

Use a non-joint filer with:

- One qualifying child.
- MAGI of **$200,000**.
- 2026 maximum credit: **$2,200**.

Because MAGI is **at**, not above, the **$200,000** full-credit line:

- Excess MAGI: **$0**.
- Income phase-out reduction: **$0**.
- Starting CTC: **1 × $2,200 = $2,200**.

That does not mean $2,200 is automatically refunded. The refundable portion is separately capped at **$1,700 per qualifying child** and the ACTC calculation uses earned-income and other rules, including the **$2,500** earned-income floor.

## The mistake people make: confusing the credit with the refundable amount

“Up to $2,200 per child” and “up to $1,700 refundable” describe different limits. A household can qualify for the Child Tax Credit yet be unable to turn the entire headline amount into a refund if federal income-tax liability is low. The Additional Child Tax Credit also has earned-income rules, so the refund calculation is not simply number of children multiplied by $2,200. Income phase-outs add another layer: being above the full-credit threshold does not automatically make the credit zero, but it can reduce it. For planning, separate three questions: does the child qualify, how much nonrefundable credit is available against tax, and how much refundable ACTC—if any—can be claimed.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **MAGI rises above $200,000 or $400,000 joint.** The $50-per-$1,000 phase-out begins.
- **The child does not meet all qualifying-child rules.** The $2,200 maximum is irrelevant if eligibility fails.
- **Federal income-tax liability is low.** The nonrefundable piece can be limited, making the ACTC rules more important.
- **Earned income is too low for ACTC.** Refundability can be smaller than the headline $1,700 cap.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $2,200 CTC, $1,700 ACTC, $2,500 earned-income floor | https://www.irs.gov/credits-deductions/individuals/child-tax-credit | The Child Tax Credit is worth up to $2,200 per qualifying child. If you have little or no federal income tax liability, you may qualify for the Additional Child Tax Credit, up to $1,700 per qualifying child depending on your income. You must have earned income of at least $2,500 to be eligible for the ACTC. |
| $200,000 / $400,000 full-credit income line | https://www.irs.gov/credits-deductions/individuals/child-tax-credit | You qualify for the full amount of the Child Tax Credit for each qualifying child if you meet all eligibility factors and your annual income is not more than $200,000 ($400,000 if filing a joint return). |
| $50 per $1,000 phase-out mechanism | https://www.irs.gov/credits-deductions/tax-year-2021-filing-season-2022-child-tax-credit-frequently-asked-questions-topic-a-2021-child-tax-credit-basics | The second phaseout reduces, down to zero, the Child Tax Credit by $50 for each $1,000 (or fraction thereof) by which your modified AGI exceeds the income threshold described above that applies to you. |

### File: self-employment-tax.md

```markdown
---
contentType: brief
briefSlug: self-employment-tax
locale: en
cluster: earning
title: 'Self-Employment Tax: 15.3% on 92.35% Explained'
description: Self-employment tax generally applies to 92.35% of net earnings at 15.3%, with a filing threshold of $400. Half of the SE tax is deductible.
answer: 'Self-employment tax is generally 15.3%: 12.4% Social Security plus 2.9% Medicare, applied to 92.35% of net earnings from self-employment, subject to the Social Security wage-base interaction and other rules. A person generally must file Schedule SE when net earnings from self-employment are $400 or more. At exactly $400 of net earnings, the simplified base is $369.40 and 15.3% produces about $56.52 of self-employment tax. One-half, about $28.26 in that example, is deductible in figuring adjusted gross income.'
publishAt: '2026-10-31'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/salary-converter/
relatedToolLabel: salary converter
formula: simplified SE tax = net self-employment earnings × 92.35% × 15.3%
limits:
- This is a calculation, not tax, business, or financial advice; it cannot account for wage-base coordination, multiple businesses, church income, optional methods, partnerships, or Additional Medicare Tax.
- The 15.3% shortcut is not exact in every case because the Social Security portion has an annual wage base and wages can use part of it. The IRS determines liability; this page does not guarantee a tax amount.
- Business deductions affect net earnings before this calculation. Confirm Schedule SE and current IRS instructions or ask a CPA before filing.
sources:
- label: IRS Topic 554 — Self-employment tax
  url: https://www.irs.gov/taxtopics/tc554
  verifiedDate: '2026-09-27'
faq:
- q: What is the self-employment tax rate?
  a: 'The combined rate is 15.3%: 12.4% for Social Security and 2.9% for Medicare, generally applied after the 92.35% net-earnings adjustment.'
- q: When do I have to pay self-employment tax?
  a: The IRS says Schedule SE generally applies when net earnings from self-employment are $400 or more, subject to special rules.
- q: Is self-employment tax 15.3% of gross revenue?
  a: No. The IRS generally applies the calculation to 92.35% of net earnings from self-employment, not gross receipts.
- q: Do I also owe income tax on self-employment profit?
  a: Potentially yes. Self-employment tax and federal income tax are separate calculations that can both apply to the same business profit.
related:
- /en/money/estimated-tax-safe-harbor/
- /en/money/no-tax-on-tips-deduction/
draft: false
---
## The federal self-employment tax figures

| Rule | Amount |
| --- | ---: |
| Net-earnings multiplier | **92.35%** |
| Social Security component | **12.4%** |
| Medicare component | **2.9%** |
| Combined rate | **15.3%** |
| General net-earnings filing threshold | **$400** |
| Deduction for SE tax | **one-half** of the self-employment tax |

The familiar “15.3% self-employment tax” is therefore not simply 15.3% of gross revenue. Business expenses first affect net profit, and Schedule SE generally applies the 92.35% adjustment before the tax rates.

## The formula

    simplified SE tax
    = net self-employment earnings × 92.35% × 15.3%

The actual Schedule SE calculation can differ when Social Security wages, the annual Social Security wage base, Additional Medicare Tax or other special rules apply.

## Worked example at the $400 threshold

Use the official general net-earnings threshold of **$400**.

- Adjusted SE base: **$400 × 92.35% = $369.40**.
- Simplified self-employment tax: **$369.40 × 15.3% = $56.5182**, or about **$56.52**.
- Deductible half: **$56.52 ÷ 2 = $28.26**.

The deduction for half the self-employment tax reduces adjusted gross income; it is not a refund of half the tax.

The IRS also lists Additional Medicare Tax thresholds of **$250,000** for married filing jointly, **$125,000** for married filing separately and **$200,000** for other filers, but that is a separate layer from the basic 15.3% illustration.

## The mistake people make: applying 15.3% directly to gross receipts

Self-employment tax starts from net earnings, not top-line business revenue, and the IRS formula generally applies the 92.35% factor before the 15.3% rate. That means a freelancer with $80,000 of receipts and $20,000 of deductible business expenses does not calculate SE tax on $80,000. Income tax is a separate layer: the same net profit can create both self-employment tax and federal income tax. Estimated payments therefore need to cover more than one tax system. Keep business expense records current, calculate net profit first, then estimate SE tax and income tax together so a quarterly payment is not based on the wrong base.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **You also have W-2 wages.** Wages can use part of the Social Security wage base and change the Schedule SE result.
- **Net business profit changes.** The tax is based on net self-employment earnings, not revenue.
- **Income reaches the Additional Medicare Tax threshold.** Another Medicare-tax layer can apply.
- **A special Schedule SE rule applies.** Optional methods and certain specialized income categories can change the calculation.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $400 threshold and 92.35% base | https://www.irs.gov/taxtopics/tc554 | You usually must pay self-employment tax if you had net earnings from self-employment of $400 or more. Generally, the amount subject to self-employment tax is 92.35% of your net earnings from self-employment. |
| 15.3% rate | https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes | The self-employment tax rate is 15.3%. |

### File: estimated-tax-safe-harbor.md

```markdown
---
contentType: brief
briefSlug: estimated-tax-safe-harbor
locale: en
cluster: earning
title: 'Estimated Tax Safe Harbor: 100% or 110% of Prior Tax'
description: Estimated-tax safe harbor generally uses 90% of current-year tax or 100% of prior-year tax, rising to 110% at higher prior-year AGI.
answer: A taxpayer generally needs estimated payments when expected tax due after withholding and credits is at least $1,000 and withholding is below the safe-harbor tests. One route is paying at least 90% of current-year tax; another is 100% of prior-year tax, increased to 110% when prior-year AGI exceeds $150,000, or $75,000 if married filing separately. In the IRS example, 90% of $71,253 is $64,128, while 110% of $42,581 is $46,839, so the lower required annual amount is $46,839.
publishAt: '2026-11-01'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: required annual payment for safe-harbor comparison = smaller of 90% of current-year tax or 100%/110% of prior-year tax, subject to the IRS rules
limits:
- This is a calculation, not tax or financial advice; it cannot determine withholding, credits, annualized income, farming/fishing rules, due dates, prior-year filing status, or penalty exceptions.
- Meeting a safe harbor can reduce underpayment-penalty exposure but does not mean the final tax bill is fully paid. The IRS determines penalties; this page does not guarantee penalty protection.
- Estimated-tax rules can change and quarterly timing matters. Confirm Publication 505 or ask a CPA before scheduling payments.
sources:
- label: IRS Publication 505 — Tax Withholding and Estimated Tax
  url: https://www.irs.gov/publications/p505
  verifiedDate: '2026-09-27'
faq:
- q: What is the estimated tax safe harbor?
  a: A common federal test is paying at least 90% of current-year tax or 100% of prior-year tax, with the prior-year percentage increased to 110% for certain higher-income taxpayers.
- q: When does the 110% prior-year rule apply?
  a: Publication 505 uses 110% when prior-year AGI exceeds $150,000, or $75,000 if married filing separately, subject to the rest of the estimated-tax rules.
- q: Does safe harbor mean I will owe nothing at filing?
  a: No. It is an underpayment-penalty benchmark, not a guarantee that your prepaid tax equals your final liability.
- q: When does the 110% prior-year rule apply?
  a: IRS Publication 505 says taxpayers above the specified prior-year AGI threshold substitute 110% for 100% in the prior-year safe-harbor calculation.
related:
- /en/money/self-employment-tax/
- /en/money/federal-tax-brackets/
draft: false
---
## The federal safe-harbor figures

| Rule | Amount |
| --- | ---: |
| General current-year test | **90%** of current-year tax |
| General prior-year test | **100%** of prior-year tax |
| Higher-income prior-year test | **110%** of prior-year tax |
| Prior-year AGI line for 110% | **$150,000** |
| Prior-year AGI line for 110% — MFS | **$75,000** |
| General expected balance-due trigger | **$1,000** |

The safe harbor is about avoiding or reducing an **underpayment penalty**. It is not a promise that you will owe nothing when you file.

## The formula

    current-year target = current-year tax × 90%
    prior-year target = prior-year tax × 100%
    higher-income prior-year target = prior-year tax × 110%
    safe-harbor comparison amount = smaller applicable target

Withholding and payment timing then matter separately.

## Worked example: a freelancer planning quarterly payments

Assume a freelancer had **$18,000 of total tax** on the prior-year return and expects **$24,000 of total tax** this year. Prior-year AGI was **$120,000**, so this example uses the 100% prior-year rule rather than 110%.

    90% of current-year tax = $24,000 × 90% = $21,600
    100% of prior-year tax = $18,000
    safe-harbor target = min($21,600, $18,000) = $18,000

If the freelancer expects **$2,000 of withholding**, the remaining target is **$16,000**. Dividing evenly across four installments would be **$4,000 each**. This is a penalty-planning example, not a prediction of the final balance due. If income arrives unevenly, annualized-income calculations may produce a different timing result.

## The mistake people make: safe harbor is not the same as final tax due

A safe harbor is designed to reduce or avoid an underpayment penalty; it does not promise that the amount paid during the year equals the final tax bill. A freelancer can meet the prior-year safe harbor and still owe a large balance if current-year profit jumps. The opposite can also happen: using the current-year 90% method may require less prepayment when income falls, but it requires a credible current-year projection. Withholding also matters because it is generally credited through the year differently from a late estimated payment. For uneven or seasonal income, the annualized-income method can change the penalty calculation, so four identical quarterly payments are not always the only workable pattern.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Prior-year AGI is not above the higher-income line.** The prior-year percentage can be 100% instead of 110%.
- **Income is uneven during the year.** The annualized-income installment method can change required installment timing.
- **Withholding is already high enough.** Additional estimated payments may not be needed.
- **Special farmer or fisherman rules apply.** Different estimated-tax rules can apply.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 90% current-year / 100% prior-year rule | https://www.irs.gov/publications/p505 | The total amount you must pay is the smaller of: 1. 90% of your total expected tax for 2026, or 2. 100% of the total tax shown on your 2025 return. Your 2025 tax return must cover all 12 months. |
| 110% higher-income rule | https://www.irs.gov/publications/p505 | If your AGI for 2025 was more than $150,000 ($75,000 if your filing status for 2026 is Married filing separately), substitute 110% for 100% in (2) above. |

### File: sep-ira-vs-solo-401k.md

```markdown
---
contentType: brief
briefSlug: sep-ira-vs-solo-401k
locale: en
cluster: earning
title: 'SEP IRA vs Solo 401(k): 2026 Contribution Math'
description: For 2026, SEP employer contributions can reach 25% of compensation and $72,000. A solo 401(k) also has a $24,500 employee deferral.
answer: For 2026, SEP employer contributions are generally limited to the lesser of 25% of compensation or $72,000, and a traditional SEP does not add an employee elective-deferral layer. A one-participant 401(k) uses the regular 401(k) employee deferral limit of $24,500 plus an employer contribution, while total annual additions are generally limited to the lesser of 100% of compensation or $72,000 before catch-up rules. For a corporation owner-employee with $72,000 of W-2 compensation in this simplified example, 25% is $18,000; adding a $24,500 employee deferral gives $42,500 in the solo 401(k), versus $18,000 as the SEP employer contribution.
publishAt: '2026-11-02'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: SEP employer contribution ≈ min(25% × eligible W-2 compensation, $72,000); solo 401(k) total = employee deferral + employer contribution, capped by annual-additions rules
limits:
- This is a calculation, not tax, retirement-plan, legal, or financial advice; it cannot determine entity type, compensation, controlled-group status, employees, plan terms, or self-employed contribution adjustments.
- Self-employed sole proprietors use a special rate calculation rather than simply multiplying net profit by 25%. The IRS determines plan limits; this page does not guarantee a contribution amount.
- Catch-up contributions and plan-design rules can change the result. Confirm IRS plan guidance or ask a retirement-plan professional before funding.
sources:
- label: IRS — SEP contribution limits
  url: https://www.irs.gov/retirement-plans/plan-participant-employee/sep-contribution-limits-including-grandfathered-sarseps
  verifiedDate: '2026-09-27'
- label: IRS — 401(k) contribution limits
  url: https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits
  verifiedDate: '2026-09-27'
faq:
- q: What is the SEP IRA contribution limit for 2026?
  a: SEP employer contributions are generally limited to the lesser of 25% of eligible compensation or $72,000 for 2026, subject to the self-employed calculation and plan rules.
- q: Why can a solo 401(k) allow more at moderate compensation?
  a: A solo 401(k) can combine an employee elective deferral with an employer contribution, while a traditional SEP uses employer contributions without that separate employee deferral layer.
- q: Do SEP IRA and Solo 401(k) have the same 2026 overall ceiling?
  a: Both can run into the 2026 defined-contribution limit of $72,000, but the path to that limit differs because a solo 401(k) can include employee deferrals.
- q: Can a SEP IRA use employee salary deferrals?
  a: A traditional SEP is funded through employer contributions; employee elective salary deferrals are not the normal SEP contribution mechanism.
related:
- /en/money/roth-ira-income-limits/
- /en/money/401k-contribution-limits/
draft: false
---
## The 2026 contribution layers

| Rule | SEP | Solo 401(k) |
| --- | ---: | ---: |
| Employer contribution rate for an employee | up to **25% of compensation** | up to **25% of compensation** under the employer rules |
| 2026 annual-additions dollar limit | **$72,000** | **$72,000** |
| 2026 employee elective deferral | none in a traditional SEP | **$24,500** |

A solo 401(k) can create more room at moderate compensation because the owner can contribute in two capacities: employee and employer. A SEP generally uses only the employer-contribution layer.

## The formula

For a corporation owner-employee with W-2 compensation:

    SEP employer contribution
    = min(25% × eligible compensation, $72,000)

    solo 401(k) total
    = employee deferral + employer contribution
    subject to the annual-additions and compensation limits

A sole proprietor's employer-equivalent percentage is calculated differently; do not use the simple W-2 formula on Schedule C net profit.

## Worked example using an official 2026 dollar amount

Use **$72,000 of W-2 compensation** for a corporation owner-employee and assume no catch-up contribution.

SEP:

- **$72,000 × 25% = $18,000** employer contribution.

Solo 401(k):

- Employee deferral: **$24,500**.
- Employer contribution: **$18,000**.
- Combined: **$24,500 + $18,000 = $42,500**.
- That is below the **$72,000** annual-additions dollar limit and below 100% of the compensation used in the example.

This is why the answer is often driven by compensation level and entity type, not by the headline $72,000 limit alone.

## The mistake people make: comparing only the $72,000 plan ceiling

The shared defined-contribution ceiling does not mean a SEP IRA and a one-participant 401(k) produce the same contribution for every business owner. A solo 401(k) can include an employee elective-deferral layer in addition to the employer contribution, while a SEP is employer-funded under its contribution rules. At moderate self-employment income, that employee layer can make a large difference even though both plans eventually run into the same overall dollar ceiling. Entity type and compensation definition also change the employer-side math. Compare contribution capacity at **your actual compensation or net self-employment income**, not by putting the two headline maximums side by side.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **The business has eligible employees.** A one-participant 401(k) may no longer be the simple owner-only plan in this comparison.
- **The owner is a sole proprietor rather than a W-2 employee of a corporation.** The employer contribution calculation changes.
- **Compensation is much higher.** Both plans can run into the same $72,000 annual-additions ceiling.
- **Catch-up eligibility applies.** 401(k) catch-up rules can add another contribution layer outside the ordinary annual-additions limit.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 SEP/defined-contribution/401(k) limits | https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions | SEP maximum contribution &#124; 72,000 &#124; 70,000 &#124; 69,000 &#124; 66,000<br>Elective deferrals &#124; 24,500 &#124; 23,500 &#124; 23,000 &#124; 22,500<br>Defined contribution plan limit &#124; 72,000 &#124; 70,000 &#124; 69,000 &#124; 66,000 |
| SEP employer contribution rate | https://www.irs.gov/retirement-plans/plan-participant-employee/sep-contribution-limits-including-grandfathered-sarseps | Contributions an employer can make to an employee’s SEP-IRA cannot exceed the lesser of: 25% of the employee’s compensation, or $72,000 for 2026 ($70,000 for 2025; $69,000 for 2024; $66,000 for 2023; $61,000 for 2022; $58,000 for 2021). |

### File: i-bonds-rate.md

```markdown
---
contentType: brief
briefSlug: i-bonds-rate
locale: en
cluster: rates
title: 'I Bonds Rate: 4.26% for May–October 2026'
description: 'I bonds issued May–October 2026 have a 4.26% composite rate: 0.90% fixed plus a 3.34% annualized inflation component. The lock is one year.'
answer: Series I savings bonds issued from May through October 2026 have a 4.26% composite rate, built from a 0.90% fixed rate and a 3.34% annualized inflation component. The six-month inflation change used in the formula is 1.67%. An I bond cannot be redeemed for the first 12 months; if redeemed before five years, the owner gives up the last three months of interest. Electronic I-bond purchases are generally limited to $10,000 per Social Security number or EIN per calendar year.
publishAt: '2026-11-03'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: composite rate = fixed rate + (2 × semiannual inflation rate) + (fixed rate × semiannual inflation rate)
limits:
- This is a calculation, not investment, tax, or financial advice; it cannot compare I bonds with your liquidity needs, tax bracket, other yields, or portfolio risk.
- The composite rate resets every six months according to the Treasury formula while the fixed rate for a bond stays with that bond. Treasury determines rates; this page does not guarantee future returns.
- Redemption and purchase rules can change. Confirm TreasuryDirect terms before buying or redeeming.
sources:
- label: TreasuryDirect — May 2026 I bond rates
  url: https://treasurydirect.gov/news/2026/release-05-01-rates/
  verifiedDate: '2026-09-27'
- label: TreasuryDirect — I bonds
  url: https://www.treasurydirect.gov/savings-bonds/i-bonds/
  verifiedDate: '2026-09-27'
faq:
- q: What is the I bond rate right now for bonds issued May through October 2026?
  a: The Treasury announced a 4.26% composite rate for Series I bonds issued from May through October 2026.
- q: How long are I bonds locked?
  a: You cannot redeem an I bond during the first 12 months. If you redeem before five years, you lose the last three months of interest.
- q: Can I cash an I Bond after six months?
  a: No. TreasuryDirect says an I Bond is redeemable after 12 months.
- q: What happens if I redeem before five years?
  a: TreasuryDirect says bonds held less than five years are subject to a three-month interest penalty.
related:
- /en/money/treasury-bills-vs-high-yield-savings/
- /en/money/savings-vs-cd-2026/
draft: false
---
## The May–October 2026 official rate

| Component | Rate |
| --- | ---: |
| Composite I bond rate | **4.26%** |
| Fixed rate | **0.90%** |
| Annualized inflation component | **3.34%** |
| Six-month inflation change used in formula | **1.67%** |
| Minimum holding period | **12 months** |
| Early-redemption interest penalty before 5 years | **last 3 months of interest** |
| Electronic purchase limit per calendar year | **$10,000** |
| Minimum electronic purchase | **$25** |

The fixed rate stays with the bond. The inflation component resets as Treasury updates inflation rates, so the composite rate can change every six months for an existing bond.

## The formula

    composite rate
    = fixed rate
      + (2 × semiannual inflation rate)
      + (fixed rate × semiannual inflation rate)

## Worked example: rebuild the announced 4.26%

Use the official May 2026 components:

- Fixed rate: **0.90% = 0.009**.
- Semiannual inflation rate: **1.67% = 0.0167**.

Then:

    0.009 + (2 × 0.0167) + (0.009 × 0.0167)
    = 0.009 + 0.0334 + 0.0001503
    = 0.0425503
    = 4.25503%

Rounded under Treasury's rate convention, that is the announced **4.26% composite rate**.

I-bond interest is subject to federal income tax but not state or local income tax. Tax timing has separate rules, so the after-tax result depends on the owner.

## The mistake people make: treating 4.26% as a permanent APY

The composite rate for an I Bond changes because the inflation component resets every six months, while the fixed component stays with that bond. A buyer who sees 4.26% should therefore not project that exact rate for five or ten years. Liquidity also matters: an I Bond cannot be treated like a checking-account substitute because redemption is unavailable during the first 12 months, and redemption before five years generally gives up the last three months of interest. The tradeoff is different from a savings account or Treasury bill: I Bonds offer inflation-linked mechanics and federal tax treatment, but with stricter access rules. Match the holding period to the cash need before comparing headline yields.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **You need the cash inside 12 months.** I bonds fail that liquidity requirement because redemption is unavailable during the first year.
- **You may redeem before five years.** The three-month interest penalty changes the realized return.
- **A later six-month inflation rate is different.** Your bond's composite rate will reset even though its fixed component stays the same.
- **Another safe-cash option has a better after-tax, after-liquidity result.** Compare like-for-like time horizons rather than headline APYs.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| May–October 2026 I Bond composite rate | https://treasurydirect.gov/news/2026/release-05-01-rates/ | Series EE savings bonds issued from May 2026 through October 2026 will earn an annual fixed rate of 2.40% and Series I savings bonds will earn a composite rate of 4.26%, a portion of which is indexed to inflation every six months. |
| rate components | https://treasurydirect.gov/news/2026/release-05-01-rates/ | The 4.26% composite rate for I bonds issued from May 2026 through October 2026 applies for the first six months after the issue date. The composite rate combines a 0.90% fixed rate of return with the 3.34% annualized rate of inflation as measured by the Consumer Price Index for all Urban Consumers (CPI-U). The CPI-U increased from 324.8 in September 2025 to 330.213 in March 2026, a six-month change of 1.67%. |
| rate-setting schedule and early-redemption penalty | https://treasurydirect.gov/news/2026/release-05-01-rates/ | Rates for savings bonds are set each May 1 and November 1. Interest accrues monthly and compounds semiannually. Bonds held less than five years are subject to a three-month interest penalty. |
| 12-month minimum holding period | https://www.treasurydirect.gov/research-center/history-of-savings-bond/comparing-tips-to-i/ | Redeemable after 12 months with three months interest penalty. No penalty after 5 years. |
| electronic I Bond purchase minimum and maximum | https://www.treasurydirect.gov/indiv/help/treasurydirect-help/faq/ | When purchasing EE and I Bonds through TreasuryDirect, there is a minimum purchase amount of $25 and a maximum purchase amount of $10,000. |

### File: federal-tax-brackets.md

```markdown
---
contentType: brief
briefSlug: federal-tax-brackets
locale: en
cluster: earning
title: 'Federal Tax Brackets: 2026 Marginal vs Effective Rate'
description: The 2026 single brackets run from 10% through 37%. A single filer with $105,700 taxable income owes $17,966 before credits in this bracket example.
answer: The IRS has published the 2026 federal ordinary-income tax brackets; 2027 brackets were not yet officially released when this brief was reviewed on September 27, 2026. For a single filer, the first $12,400 of taxable income is in the 10% bracket, the next band through $50,400 is 12%, and the next band through $105,700 is 22%. At exactly $105,700 of taxable income, those three layers produce $17,966 of federal income tax before credits and other special rules. The marginal rate is 22%, while the effective rate on that taxable income is about 17.0%.
publishAt: '2026-11-04'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/salary-converter/
relatedToolLabel: salary converter
formula: federal tax = sum of (taxable income inside each bracket × that bracket rate); effective rate = total tax ÷ taxable income
limits:
- This is a calculation, not tax or financial advice; it uses taxable income and does not calculate deductions, credits, preferential capital-gain rates, AMT, NIIT, self-employment tax, or state tax.
- A marginal bracket applies only to the slice of taxable income inside that bracket, not to all income. The IRS determines liability; this page does not guarantee a tax amount.
- Bracket thresholds change by tax year. Confirm the latest IRS inflation-adjustment release or ask a CPA before filing or withholding decisions.
sources:
- label: IRS — 2026 federal tax brackets
  url: https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers
  verifiedDate: '2026-09-27'
faq:
- q: What are the 2026 federal tax brackets for a single filer?
  a: The seven rates are 10%, 12%, 22%, 24%, 32%, 35%, and 37%, with 2026 single thresholds of $12,400, $50,400, $105,700, $201,775, $256,225 and $640,600 between the bands.
- q: What is the difference between marginal and effective tax rate?
  a: The marginal rate is the rate on the next taxable dollar within the current bracket; the effective rate is total tax divided by taxable income in this simplified bracket calculation.
- q: Does entering the 22% bracket tax all my income at 22%?
  a: No. Only the taxable-income slice inside that bracket is taxed at 22%; lower slices keep their lower rates.
- q: What is the difference between marginal and effective tax rate?
  a: Marginal rate is the rate on the next dollar of taxable income; effective rate is total tax divided by an income base.
related:
- /en/money/standard-deduction/
- /en/money/capital-gains-zero-percent-bracket/
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



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Taxable income changes.** Deductions affect taxable income before the bracket calculation.
- **Preferential income is present.** Long-term capital gains and qualified dividends can use separate rate schedules.
- **Credits apply.** Credits can reduce tax after the bracket calculation.
- **The IRS releases 2027 brackets.** This evergreen page should then be updated in place rather than mixing projections with official figures.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 federal ordinary-income bracket thresholds | https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | For tax year 2026, the top tax rate remains 37% for individual single taxpayers with incomes greater than $640,600 ($768,700 for married couples filing jointly). The other rates are: 35% for incomes over $256,225 ($512,450 for married couples filing jointly); 32% for incomes over $201,775 ($403,550 for married couples filing jointly); 24% for incomes over $105,700 ($211,400 for married couples filing jointly); 22% for incomes over $50,400 ($100,800 for married couples filing jointly); 12% for incomes over $12,400 ($24,800 for married couples filing jointly). The lowest rate is 10% for incomes of single individuals with incomes of $12,400 or less ($24,800 for married couples filing jointly). |
