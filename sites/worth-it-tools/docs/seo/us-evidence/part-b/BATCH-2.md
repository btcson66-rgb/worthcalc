# WorthCalc Part B — Batch 2

Revised and re-verified: 2026-09-27

Evidence rule: the third column reproduces the exact sentence or table-row text captured from the official page. Hypothetical worked-example inputs are explicitly labeled as reader assumptions in the article and are not represented as government figures.

### File: aca-premium-tax-credit-cliff.md

```markdown
---
contentType: brief
briefSlug: aca-premium-tax-credit-cliff
locale: en
cluster: protection
title: 'ACA Premium Tax Credit Cliff: 2027 400% FPL Limits'
description: For 2027 Marketplace coverage, 400% FPL is $63,840 for one person and $132,000 for four in the contiguous U.S. See the 2026 comparison.
answer: For 2027 Marketplace coverage, using the 2026 HHS poverty guidelines for the contiguous states and D.C., 400% of FPL is $63,840 for one person and $132,000 for a family of four. For 2026 coverage, using the 2025 guidelines, the comparable lines are $62,600 and $128,600. This brief treats the 400% line as an eligibility boundary, not a tax bracket.
publishAt: '2026-10-18'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: 400% FPL line = applicable HHS poverty guideline × 4
limits:
- This is a calculation, not tax, insurance, or financial advice; it cannot verify household size, tax-family rules, immigration status, employer coverage, or Marketplace eligibility.
- The amount of premium tax credit depends on benchmark premiums and other eligibility rules, so this page does not guarantee a subsidy amount or Marketplace eligibility.
- Poverty guidelines and premium-tax-credit rules can change by year. Confirm the current Marketplace and IRS rules before enrolling or filing.
sources:
- label: HHS ASPE — prior poverty guidelines and Federal Register references
  url: https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references
  verifiedDate: '2026-09-27'
- label: IRS — Premium Tax Credit questions and answers
  url: https://www.irs.gov/affordable-care-act/individuals-and-families/questions-and-answers-on-the-premium-tax-credit
  verifiedDate: '2026-09-27'
faq:
- q: What is 400% of FPL for one person for 2027 Marketplace coverage?
  a: Using the 2026 HHS guideline of $15,960 for the contiguous states and D.C., four times that amount is $63,840.
- q: What is 400% of FPL for a family of four for 2027 coverage?
  a: Using the 2026 HHS guideline of $33,000, four times that amount is $132,000.
- q: Which poverty guidelines apply to 2027 Marketplace coverage?
  a: This brief uses the 2026 HHS poverty guidelines for the 2027 coverage-year comparison, as requested for Open Enrollment planning.
- q: Is 400% FPL a federal income-tax bracket?
  a: No. It is an ACA income-eligibility boundary used in the premium-tax-credit analysis, not a marginal federal income-tax bracket.
related:
- /en/money/dependent-care-fsa-limit/
- /en/money/medicare-irmaa-brackets/
draft: false
---
## Official figures for the 2027 coverage-year check

| Coverage-year comparison | One person | Family of four | 400% FPL line |
| --- | ---: | ---: | ---: |
| **2027 coverage — 2026 HHS guideline** | **$15,960** | **$33,000** | **$63,840 / $132,000** |
| 2026 coverage — 2025 HHS guideline | $15,650 | $32,150 | $62,600 / $128,600 |

The important reset for Open Enrollment is the guideline year. For the 2027 coverage comparison, start with the **2026 HHS poverty guideline** for household size, then multiply by four. Keep the 2026 coverage row only as a backward-looking comparison; do not carry its dollar line into a 2027 estimate.

## The formula

    400% FPL line = applicable HHS poverty guideline × 4

For one person in the contiguous states and D.C.:

    $15,960 × 4 = $63,840

For a family of four:

    $33,000 × 4 = $132,000

## Worked example: income near the 2027 line

Assume a one-person household expects **$63,500** of household income for 2027 coverage. The 400% FPL comparison line in this brief is **$63,840**, leaving a **$340 cushion**. If a year-end capital-gain distribution adds **$1,000**, projected income becomes **$64,500**, which is **$660 above** the line.

    starting projection = $63,500
    plus additional income = $1,000
    revised projection = $64,500
    distance from 400% FPL = $64,500 - $63,840 = $660

The example is intentionally simple: premium-tax-credit eligibility and reconciliation depend on the full ACA tax rules, not just this subtraction. The point is that a small income change near the boundary can change the planning question.

## The mistake people make: using the wrong poverty-guideline year

Marketplace subsidy math is tied to a coverage year, and the poverty-guideline year used for that coverage can differ from the calendar year in which you are shopping. That is why a 2027 Open Enrollment decision should not reuse the 2025 guideline table from a 2026 article. Household size also matters: the 400% line is not a single national dollar amount for every family. A second trap is treating the 400% line as the amount of income that is “taxed.” It is an eligibility boundary for the premium tax credit under the rules described here; it is not a tax bracket. If your projected household income is close to the line, update the estimate when wages, self-employment income, retirement distributions, or capital gains change.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Household size changes.** The poverty-guideline amount changes with household size.
- **You are using Alaska or Hawaii guidelines.** Those states have different HHS poverty amounts.
- **Household income changes.** Wages, self-employment income, retirement distributions, or investment gains can move the final percentage of FPL.
- **The law or Marketplace guidance changes for the coverage year.** Re-check current IRS and Marketplace rules before enrollment and tax filing.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 poverty guideline — one person and family of four | https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references | 2026 &#124; $15,960 &#124; $5,680 &#124; $33,000 &#124; Federal Register 2026 |
| 2025 poverty guideline — one person and family of four | https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines/prior-hhs-poverty-guidelines-federal-register-references | 2025 &#124; $15,650 &#124; $5,500 &#124; ($32,150) &#124; Federal Register 2025 |

### File: salt-deduction-cap.md

```markdown
---
contentType: brief
briefSlug: salt-deduction-cap
locale: en
cluster: ownership
title: 'SALT Deduction Cap: $40,400 in 2026'
description: The 2026 SALT deduction cap is $40,400, with a MAGI phase-down above $505,000. Compare it with the $32,200 joint standard deduction.
answer: For tax year 2026, the federal state-and-local-tax deduction cap is $40,400, or $20,200 for married filing separately. The higher cap begins to phase down above $505,000 of MAGI, or $252,500 for married filing separately, but not below $10,000 or $5,000 respectively. The 2026 married-joint standard deduction is $32,200. Before counting any other itemized deductions, $40,400 of deductible SALT is $8,200 above that joint standard deduction.
publishAt: '2026-10-19'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/home-affordability/
relatedToolLabel: home affordability
formula: itemizing advantage = total allowable itemized deductions - applicable standard deduction
limits:
- This is a calculation, not tax or financial advice; it cannot determine which state and local taxes are deductible or whether itemizing is best for your return.
- The SALT cap can be reduced at higher MAGI and itemized deductions interact with other tax rules. The IRS determines deductibility; this page does not guarantee a tax benefit.
- Use the tax-year-specific standard deduction and SALT rules. Confirm the return instructions or ask a CPA before filing.
sources:
- label: IRS — 2026 SALT deduction correction
  url: https://www.irs.gov/forms-pubs/correction-to-state-and-local-income-tax-deduction-amount-in-the-2026-form-1040-es
  verifiedDate: '2026-09-27'
- label: IRS — 2026 inflation adjustments
  url: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
  verifiedDate: '2026-09-27'
faq:
- q: What is the SALT deduction cap for 2026?
  a: The 2026 cap is $40,400, or $20,200 for married filing separately, before the high-income phase-down.
- q: Does hitting the SALT cap automatically mean I should itemize?
  a: No. Itemizing is useful only when your total allowable itemized deductions beat your applicable standard deduction after all relevant rules are applied.
- q: Do I have to itemize to benefit from the SALT deduction?
  a: Yes. SALT is an itemized deduction, so the itemized total must be compared with the standard deduction.
- q: Is the 2026 SALT cap $40,400 for everyone?
  a: No. The IRS lists $40,400 for most filers and $20,200 for married filing separately, with a MAGI-based reduction above specified thresholds.
related:
- /en/money/standard-deduction/
- /en/money/mortgage-rate-2026-payment-impact/
draft: false
---
## The 2026 official figures

| Rule | 2026 amount |
| --- | ---: |
| SALT cap | **$40,400** |
| SALT cap — married filing separately | **$20,200** |
| MAGI phase-down begins | **$505,000** |
| MAGI phase-down begins — MFS | **$252,500** |
| Minimum cap after phase-down | **$10,000** |
| Minimum cap after phase-down — MFS | **$5,000** |
| Standard deduction — married filing jointly | **$32,200** |
| Standard deduction — single / MFS | **$16,100** |
| Standard deduction — head of household | **$24,150** |

The SALT number is only one part of the itemizing decision. Mortgage interest, qualifying charitable gifts, medical-expense rules and other Schedule A items can also matter.

## The formula

    itemizing advantage = total allowable itemized deductions - applicable standard deduction

If the result is positive, itemizing produces a larger deduction **before considering other tax interactions**. If it is negative, the standard deduction is larger.

## Worked example: high-tax-state married couple

Assume a married couple filing jointly has **$22,000 of state income tax**, **$16,000 of property tax**, **$8,500 of deductible mortgage interest**, and **$2,000 of charitable gifts**. Their SALT total is **$38,000**, below the 2026 $40,400 cap in this simplified example.

    SALT deduction = $22,000 + $16,000 = $38,000
    total itemized deductions = $38,000 + $8,500 + $2,000 = $48,500
    2026 MFJ standard deduction = $32,200
    itemized amount above standard deduction = $48,500 - $32,200 = $16,300

The tax benefit is **not $16,300 of tax saved**. It is $16,300 more deduction than the standard-deduction alternative, before other return-specific limitations and tax-rate effects.

## The mistake people make: assuming a bigger SALT cap automatically lowers tax

The SALT cap matters only inside the itemized-deduction decision. A married couple can have substantial state income and property taxes and still receive no incremental federal benefit from itemizing if total itemized deductions do not exceed the standard deduction. Conversely, mortgage interest and charitable gifts can push the household well above the standard deduction, making more of the SALT amount relevant. The cap is also a ceiling, not a credit: a $1 increase in deductible SALT does not reduce federal tax by $1. Compare **total itemized deductions** with the standard deduction first, then apply the SALT limit and any MAGI reduction rules.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Your qualifying SALT is below the cap.** The cap is a ceiling, not an automatic deduction.
- **MAGI is above $505,000.** The higher 2026 cap begins to phase down.
- **Other itemized deductions change.** A taxpayer with modest SALT can still itemize if other allowable deductions make the total exceed the standard deduction.
- **Filing status changes.** Both the SALT cap and standard deduction can change.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 SALT cap and MAGI reduction line | https://www.irs.gov/forms-pubs/correction-to-state-and-local-income-tax-deduction-amount-in-the-2026-form-1040-es | The text for the Reminder, State and local income tax deduction increased should read: The overall limit on the deduction for state and local income, sales, and property taxes has increased. For 2026, the limit is $40,400 ($20,200 if married filing separately) and the overall limit is reduced if your modified adjusted gross income is more than $505,000 ($252,500 if married filing separately) but will not be reduced below $10,000 ($5,000 if married filing separately). |
| 2026 standard deduction | https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | Standard Deduction. For tax year 2026, the standard deduction increases to $32,200 for married couples filing jointly. For single taxpayers and married individuals filing separately, the standard deduction rises to $16,100 for tax year 2026, and for heads of households, the standard deduction will be $24,150. |

### File: trump-account-vs-529.md

```markdown
---
contentType: brief
briefSlug: trump-account-vs-529
locale: en
cluster: earning
title: 'Trump Account vs 529: The $1,000 Seed Changes the Math'
description: Eligible children born 2025–2028 can receive a $1,000 federal Trump Account seed. Compare the $5,000 annual contribution cap with 529 rules.
answer: For an eligible child born in 2025 through 2028, the federal Trump Account pilot can provide a one-time $1,000 government contribution. Other annual Trump Account contributions are generally capped at $5,000, with up to $2,500 of employer contributions eligible for the special exclusion and counted toward that annual cap. A 529 plan has no federal income restriction on contributors, and its tax benefit is tied to qualified education distributions. For an eligible pilot child, a $5,000 annual contribution plus the separate $1,000 seed can put $6,000 into the Trump Account in that comparison year.
publishAt: '2026-10-20'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: Trump Account inflow for an eligible pilot child = eligible annual contributions + separate $1,000 federal seed
limits:
- This is a calculation, not investment, tax, or financial advice; it cannot determine account eligibility, qualified distributions, state tax treatment, or investment suitability.
- The $1,000 seed is limited to eligible children under the federal pilot rules, and 529 tax treatment depends on qualified uses. The agencies decide eligibility; this page does not guarantee a benefit.
- Contribution, distribution, and investment rules can change. Confirm current IRS and Treasury guidance or ask a qualified adviser before acting.
sources:
- label: IRS — Trump Account regulations
  url: https://www.irs.gov/irb/2026-38_irb
  verifiedDate: '2026-09-27'
- label: IRS — Publication 970, Qualified Tuition Programs
  url: https://www.irs.gov/publications/p970
  verifiedDate: '2026-09-27'
faq:
- q: How much is the federal Trump Account seed?
  a: The pilot provides a one-time $1,000 federal contribution for an eligible U.S. citizen child born in 2025 through 2028 who meets the program requirements.
- q: Does the $1,000 seed use up the $5,000 annual contribution cap?
  a: The IRS guidance treats the pilot seed separately from the $5,000 annual contribution limit, so an eligible account can receive both in the comparison year.
- q: When can Trump Accounts be funded?
  a: IRS guidance says Trump Accounts cannot be funded before July 4, 2026.
- q: Are 529 withdrawals always tax-free?
  a: No. IRS Publication 970 says tax can be due when a distribution exceeds the beneficiary’s adjusted qualified education expenses.
related:
- /en/money/roth-ira-income-limits/
- /en/money/i-bonds-rate/
draft: false
---
## The official figures

| Feature | Trump Account | 529 plan |
| --- | ---: | ---: |
| Federal pilot seed for eligible child born 2025–2028 | **$1,000 once** | **$0** |
| Annual Trump Account contribution cap | **$5,000** | Not the same federal annual cap |
| Employer amount eligible for special exclusion | up to **$2,500** | Not applicable |
| Federal income restriction on who may contribute | Program-specific rules | IRS says **no income restriction** on contributors |

The two accounts are not interchangeable. The Trump Account rules control contribution sources, timing and investments. A 529 is an education-focused tax vehicle whose federal tax benefit depends on qualified education distributions.

## The formula

    Trump Account inflow for an eligible pilot child
    = eligible annual contributions + separate $1,000 federal seed

## Worked example: the first $6,000 of account inflow

Use only the official federal figures:

- Annual non-seed Trump Account contribution: **$5,000**.
- Federal pilot seed for an eligible child: **$1,000**.
- Combined account inflow in that comparison year: **$5,000 + $1,000 = $6,000**.

For a 529, a family could contribute the same **$5,000** comparison amount, but there is no matching federal $1,000 pilot seed. The 529's federal advantage instead centers on tax treatment of earnings when distributions are used for qualified education expenses.

That does **not** make one account universally better. The extra seed is a real starting-value difference for an eligible child, while the permitted uses, distribution rules, time horizon and tax treatment can matter more than the first-year balance.

## The mistake people make: treating the $1,000 seed as a reason to replace a 529

A Trump Account and a 529 solve different planning problems. The federal $1,000 seed can be valuable because it starts compounding without a family contribution, but a 529 has education-specific tax treatment that can be powerful when distributions match qualified education expenses. Contribution rules, investment choices, access timing, and permitted uses differ. The useful question is therefore allocation: after any government seed and employer/family contributions, where should the **next** family dollar go given the child’s likely education needs and the household’s flexibility goals? Do not compare only first-year balances; compare the restrictions and tax treatment attached to future withdrawals.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **The child is not eligible for the $1,000 pilot contribution.** Then the first-year headline advantage disappears.
- **The money is specifically for qualified education.** A 529's education-focused tax treatment can become the central comparison.
- **Employer contributions are available.** Up to $2,500 can qualify for the Trump Account employer-contribution exclusion and counts toward the annual cap.
- **The intended withdrawal does not fit the account's tax-favored rules.** The tax result can outweigh the contribution-limit comparison.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $1,000 federal seed, $5,000 annual contributions, funding date | https://www.irs.gov/newsroom/working-families-tax-cuts | Trump Accounts cannot be funded before July 4, 2026<br>The federal government will make a one-time $1,000 contribution for each eligible child’s account<br>Authorized contributions from individuals and employers are allowed up to $5,000 per year |
| $2,500 employer contribution special limit | https://www.irs.gov/instructions/i4547 | During the growth period, section 128 employer contributions are subject to a $2,500 limit (subject to cost-of-living adjustments after 2027). Section 128 employer contributions plus contributions from other sources (other than a pilot program contribution, qualified general contributions, and qualified rollover contributions) are subject to a $5,000 annual limit. |
| 529 qualified-distribution tax rule | https://www.irs.gov/publications/p970 | No tax is due on a distribution from a QTP unless the amount distributed is greater than the beneficiary’s adjusted qualified education expenses (AQEE). |

### File: dependent-care-fsa-limit.md

```markdown
---
contentType: brief
briefSlug: dependent-care-fsa-limit
locale: en
cluster: earning
title: 'Dependent Care FSA Limit: $7,500 in 2026'
description: The 2026 dependent care FSA exclusion rises to $7,500. See how excluded benefits can reduce expenses available for the child care credit.
answer: For 2026, the federal dependent-care benefit exclusion rises to $7,500. The child and dependent care credit still uses an expense ceiling of $3,000 for one qualifying person or $6,000 for two or more, and excluded dependent-care benefits reduce the expenses available for the credit calculation. With two or more qualifying people, $7,500 of excluded benefits can fully absorb the $6,000 federal credit expense ceiling, leaving $0 of that ceiling for a credit calculation in the simplified example.
publishAt: '2026-10-21'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/budget-builder/
relatedToolLabel: budget builder
formula: credit-eligible expense base = max(0, applicable credit expense ceiling - excluded dependent-care benefits allocable to those expenses)
limits:
- This is a calculation, not tax, benefits, or financial advice; it cannot verify qualifying people, earned-income requirements, eligible expenses, plan elections, or employer-plan rules.
- The FSA exclusion and child/dependent care credit have different eligibility rules and interact on the return. The IRS decides eligibility; this page does not guarantee either benefit.
- Employer plan limits and tax rules can change. Confirm your plan document, IRS instructions, or a CPA before electing or filing.
sources:
- label: IRS — 2026 dependent care benefits exclusion correction
  url: https://www.irs.gov/forms-pubs/correction-to-the-dependent-care-benefits-exclusion-amount-in-the-2026-general-instructions-for-forms-w-2-and-w-3
  verifiedDate: '2026-09-27'
- label: IRS — Publication 505
  url: https://www.irs.gov/publications/p505
  verifiedDate: '2026-09-27'
- label: IRS — Topic 602
  url: https://www.irs.gov/taxtopics/tc602
  verifiedDate: '2026-09-27'
faq:
- q: What is the dependent care FSA limit for 2026?
  a: The federal dependent-care benefits exclusion is $7,500 for 2026, subject to plan and tax eligibility rules.
- q: Can I use the same child care expense for both the FSA exclusion and the credit?
  a: No. Excluded dependent-care benefits reduce the work-related expenses available for the child and dependent care credit calculation, preventing double use of the same expense.
- q: Can I use the same expense for a dependent care FSA and the child-care credit?
  a: Generally, the same expense cannot be counted twice. Employer-provided dependent-care benefits reduce the expenses available for the credit calculation.
- q: Does choosing the $7,500 maximum always save the most tax?
  a: No. The best election depends on eligible expenses, plan rules, tax rates, and how the FSA coordinates with the child and dependent care credit.
related:
- /en/money/childcare-cost-2026/
- /en/money/child-tax-credit/
draft: false
---
## The 2026 official figures

| Rule | 2026 amount |
| --- | ---: |
| Dependent-care benefits exclusion | **$7,500** |
| Credit expense ceiling — one qualifying person | **$3,000** |
| Credit expense ceiling — two or more | **$6,000** |
| Maximum credit rate before income adjustments | **50%** |

The important interaction is that tax-favored employer dependent-care benefits and the child/dependent care credit cannot both use the same dollar of expense.

## The formula

    credit-eligible expense base
    = max(0, applicable credit expense ceiling - excluded dependent-care benefits allocable to those expenses)

The actual credit is then the eligible expense base multiplied by the percentage allowed for the taxpayer's income, subject to the rest of the credit rules.

## Worked example: two or more qualifying people

Use the official federal ceilings:

- 2026 excluded dependent-care benefits: **$7,500**.
- Credit expense ceiling for two or more qualifying people: **$6,000**.
- Simplified remaining credit expense base: **max(0, $6,000 - $7,500) = $0**.

In that simplified case, the excluded benefits are already larger than the credit's federal expense ceiling, so none of that **$6,000 ceiling** remains for the credit calculation.

That does not mean “FSA always beats the credit.” A household's actual FSA election, eligible expenses, earned income, tax rate, employer plan and credit percentage all matter. The calculation is about avoiding double counting.

## The mistake people make: double-counting the same child-care expense

A dependent care FSA and the child/dependent care credit can both matter, but the same dollar of care expense generally cannot be used twice. That makes the salary-reduction election a coordination problem, not just a “take the $7,500” decision. A household should compare marginal tax rates, payroll-tax treatment, expected eligible care costs, employer-plan rules, and the portion of expenses left for any credit calculation. Another practical risk is over-electing: dependent care FSAs are employer plans with plan-year and reimbursement rules, so unused amounts may not behave like ordinary cash savings. Build the estimate from expenses you reasonably expect to incur for qualifying care, not from the maximum election alone.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Your FSA election is below the credit expense ceiling.** Some expense base may remain for the credit.
- **You have only one qualifying person.** The federal credit expense ceiling is $3,000 rather than $6,000.
- **Your employer plan allows less than the federal exclusion.** The plan document controls what you can elect through payroll.
- **Some expenses are not eligible.** The tax treatment depends on qualifying care and work-related rules.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 dependent-care exclusion | https://www.irs.gov/forms-pubs/correction-to-the-dependent-care-benefits-exclusion-amount-in-the-2026-general-instructions-for-forms-w-2-and-w-3 | P.L. 119-21, section 70404, increased the maximum amount of the exclusion to $7,500 beginning in 2026. |
| $3,000 / $6,000 expense ceilings and 50% maximum rate | https://www.irs.gov/publications/p505 | Changes to the child and dependent care credit. For 2026, recent legislation has enhanced the credit for qualifying child and dependent care expenses paid for the care of an eligible child. The credit amount remains $3,000 ($6,000 for two or more qualifying children) but the maximum credit rate has increased from 35% to 50% of your qualifying expenses. |

### File: rap-student-loan-payment.md

```markdown
---
contentType: brief
briefSlug: rap-student-loan-payment
locale: en
cluster: earning
title: 'RAP Student Loan Payment: The 2026 Formula'
description: RAP applications begin July 1, 2026. Payments use an AGI-based annual amount, divided by 12, minus $50 per dependent, with a $10 minimum.
answer: The Repayment Assistance Plan, or RAP, becomes available for applications beginning July 1, 2026. Its base annual payment ranges from a fixed $120 at AGI of $10,000 or less to 10% of AGI above $100,000, with intermediate percentage tiers. The monthly amount is the annual base divided by 12, then reduced by $50 for each dependent, with a $10 monthly minimum. At $50,000 AGI, the 4% tier gives $2,000 a year or $166.67 a month before the dependent adjustment.
publishAt: '2026-10-22'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/debt-strategy/
relatedToolLabel: debt strategy
formula: monthly RAP payment = max($10, annual tier amount ÷ 12 - $50 × number of dependents)
limits:
- This is a calculation, not student-loan, tax, legal, or financial advice; it cannot verify loan type, borrower eligibility, AGI, family size, or enrollment status.
- RAP has program-specific rules for qualifying loans, payment credit, forgiveness, and transitions. Federal Student Aid and the servicer decide eligibility; this page does not guarantee a payment amount.
- Program implementation can change. Confirm the current RAP rules with StudentAid.gov or your federal loan servicer before making repayment decisions.
sources:
- label: Federal Student Aid / Edfinancial — RAP information center
  url: https://edfinancial.studentaid.gov/income-driven-repaymentinformation-center/rap
  verifiedDate: '2026-09-27'
faq:
- q: When can borrowers apply for RAP?
  a: The official federal-servicer guidance says RAP applications begin July 1, 2026.
- q: How does RAP calculate the monthly payment?
  a: RAP starts with an AGI-based annual amount, divides by 12, subtracts $50 per dependent, and applies a $10 monthly minimum.
- q: What is the minimum RAP payment?
  a: The official RAP information center lists a minimum monthly payment of $10 after applying the income and dependent formula.
- q: How long before RAP forgiveness?
  a: The official servicer information states that a remaining balance may be forgiven after 30 years of qualifying payments if the loan has not been repaid in full.
related:
- /en/money/student-loan-rate-2026/
- /en/money/student-loan-degree-roi/
draft: false
---
## The RAP payment schedule

Applications for RAP begin **July 1, 2026**. The annual base payment uses these AGI tiers:

| AGI | Annual base payment |
| --- | ---: |
| $10,000 or less | **$120** |
| over $10,000 to $20,000 | **1% of AGI** |
| over $20,000 to $30,000 | **2%** |
| over $30,000 to $40,000 | **3%** |
| over $40,000 to $50,000 | **4%** |
| over $50,000 to $60,000 | **5%** |
| over $60,000 to $70,000 | **6%** |
| over $70,000 to $80,000 | **7%** |
| over $80,000 to $90,000 | **8%** |
| over $90,000 to $100,000 | **9%** |
| over $100,000 | **10%** |

The monthly payment is reduced by **$50 per dependent**, but it cannot fall below **$10 per month**.

## The formula

    monthly RAP payment = max($10, annual tier amount ÷ 12 - $50 × dependents)

## Worked example at $50,000 AGI

At **$50,000 AGI**, the official table uses **4%**.

- Annual base: **$50,000 × 4% = $2,000**.
- Monthly base: **$2,000 ÷ 12 = $166.67**.
- With one dependent: **$166.67 - $50 = $116.67 per month**.
- The result is above the **$10 minimum**, so the floor does not change it.

RAP also has a principal-support feature: for a borrower making full and on-time payments, if the payment does not reduce principal by at least the required amount under the program, the government can make a matching principal payment under the program rules. RAP forgiveness is tied to a **30-year** repayment period under the official description.

## The mistake people make: comparing RAP only with today’s payment

A lower monthly payment can improve cash flow without being the lowest lifetime-cost path. RAP ties payment to AGI and dependents, and remaining balance can persist for many years. Future income growth can therefore raise payments, while a long repayment period can increase the amount of time interest is relevant. Borrowers should compare the monthly payment, expected income path, interest behavior, forgiveness horizon, and any tax consequences that apply under then-current law. A payment formula is most useful as a budget tool: recalculate when AGI or dependent count changes instead of assuming the first RAP payment will stay fixed.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **AGI crosses a tier boundary.** The percentage applied to AGI changes.
- **The number of dependents changes.** Each dependent changes the monthly calculation by $50 until the $10 floor is reached.
- **The loan is not eligible for RAP.** The formula does not create program eligibility.
- **A different federal repayment plan applies.** The lowest required payment is not the only relevant factor; term, interest and forgiveness rules differ.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| RAP payment formula and dependent reduction | https://edfinancial.studentaid.gov/income-driven-repaymentinformation-center/rap | A percentage of your adjusted gross income (AGI) up to 10%, divided by 12<br>Reduced by $50 for each dependent on your federal tax return<br>Total monthly payment may not be less than $10 |
| 30-year forgiveness horizon | https://edfinancial.studentaid.gov/income-driven-repaymentinformation-center/rap | Any outstanding balance will be forgiven if you haven’t repaid your loan in full after 30 years of qualifying payments. |

### File: treasury-bills-vs-high-yield-savings.md

```markdown
---
contentType: brief
briefSlug: treasury-bills-vs-high-yield-savings
locale: en
cluster: rates
title: Treasury Bills vs High-Yield Savings After State Tax
description: Compare the Sept. 24, 2026 4-week T-bill investment rate with savings after state tax. Illinois and 0%-state-tax examples show the break-even.
answer: The Sept. 24, 2026 Treasury 28-day bill auction reported a 3.915% investment rate. Treasury marketable-security interest is subject to federal tax but exempt from state and local income taxes. That can make a T-bill more attractive than a taxable savings yield in a state with income tax, while a 0%-state-tax resident gets no state-tax edge.
publishAt: '2026-10-23'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: taxable-bank break-even yield = Treasury gross yield × (1 - federal rate) ÷ (1 - federal rate - state rate)
limits:
- This is a calculation, not investment, tax, or financial advice; it does not compare current bank offers, FDIC coverage, liquidity needs, reinvestment rates, or individual deductions.
- The state-tax benefit depends on your state and tax situation, and Treasury interest remains federally taxable. Tax authorities decide treatment; this page does not guarantee an after-tax return.
- Auction yields and savings-account rates change. Confirm current Treasury auction results, bank terms, and tax rules before acting.
sources:
- label: TreasuryDirect — Sept. 24, 2026 28-day bill auction result
  url: https://www.treasurydirect.gov/instit/annceresult/press/preanre/2026/R_20260924_2.pdf
  verifiedDate: '2026-09-27'
- label: TreasuryDirect — Tax forms and tax withholding
  url: https://www.treasurydirect.gov/marketable-securities/tax-forms-and-withholding/
  verifiedDate: '2026-09-27'
- label: Illinois Department of Revenue — individual income tax rate
  url: https://tax.illinois.gov/research/taxrates/income.html
  verifiedDate: '2026-09-27'
faq:
- q: Are Treasury-bill earnings exempt from state income tax?
  a: TreasuryDirect says earnings from Treasury marketable securities are exempt from state and local income taxes, while federal tax still applies.
- q: What was the Sept. 24, 2026 4-week T-bill investment rate?
  a: The Treasury auction result for the 28-day bill reported a 3.915% investment rate.
- q: What savings APY matches 3.915% in Illinois after state tax?
  a: Using a 4.95% Illinois income-tax rate in a simplified state-tax-only comparison, the break-even savings APY is about 4.12%.
- q: What happens in a 0%-state-income-tax state?
  a: The state-tax break-even becomes the same 3.915% because neither side loses yield to state income tax in this simplified comparison.
related:
- /en/money/i-bonds-rate/
- /en/money/savings-vs-cd-2026/
draft: false
---
## The most recent 4-week auction input

The Sept. 24, 2026 Treasury auction for a **28-day bill** reported a **3.915% investment rate**. That is the current auction input for this comparison, not the June result used in the earlier draft. TreasuryDirect also states that earnings from Treasury marketable securities are subject to federal tax but exempt from state and local income taxes.

| Input | Figure |
| --- | ---: |
| 4-week bill auction date | **Sept. 24, 2026** |
| 28-day bill investment rate | **3.915%** |
| Illinois individual income-tax rate used in example | **4.95%** |

## The formula

    T-bill after-state-tax yield ≈ Treasury yield
    savings after-state-tax yield ≈ savings APY × (1 - state income-tax rate)
    savings break-even APY ≈ Treasury yield ÷ (1 - state income-tax rate)

This isolates state tax only. Federal tax, compounding conventions, bank-rate changes, bill discount mechanics, and liquidity still matter.

## Worked example: Illinois and a 0%-tax state

Using the **3.915%** T-bill investment rate and Illinois’s **4.95%** income-tax rate:

    savings break-even APY = 3.915% ÷ (1 - 0.0495) ≈ 4.119%

So, before federal-tax and product differences, a taxable savings account would need roughly **4.12% APY** to match a 3.915% Treasury yield after Illinois state income tax in this simplified comparison.

Now use a **0% state-income-tax** case:

    savings break-even APY = 3.915% ÷ (1 - 0) = 3.915%

With no applicable state income tax, the Treasury loses this particular tax advantage; quoted yield, liquidity, FDIC coverage structure, purchase timing, and rate-reset risk become the bigger comparison points.

## The mistake people make: comparing quoted yields before state tax

A Treasury bill and a bank savings account can have similar quoted annual yields but different state-income-tax treatment. Treasury marketable-security interest is subject to federal tax but exempt from state and local income taxes, while bank interest is generally taxable under ordinary federal and applicable state rules. The advantage therefore depends on the saver’s state tax rate. In a 0%-income-tax state there is no state-tax edge to the T-bill; in a state such as Illinois, the exemption can raise the Treasury’s after-state-tax equivalent yield. Liquidity and rate-reset timing still differ, so tax treatment should be one line in the comparison, not the entire decision.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **The savings APY changes.** Bank rates can move at any time, while a bill’s auction terms are fixed for that security.
- **Your state income-tax rate is 0%.** Then there is no state-income-tax edge in this comparison.
- **You need instant liquidity.** A bank savings account and a Treasury bill have different access and sale mechanics.
- **You compare a different bill auction.** Re-run the math with the latest official Treasury auction result when you are ready to buy.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| Sept. 24, 2026 28-day bill auction result | https://www.treasurydirect.gov/instit/annceresult/press/preanre/2026/R_20260924_2.pdf | Term and Type of Security 28-Day Bill. CUSIP Number 912797VN4. High Rate 3.850%. Investment Rate 3.915%. Issue Date September 29, 2026. Maturity Date October 27, 2026. Bid-to-Cover Ratio 2.61. |
| Treasury state/local tax exemption | https://www.treasurydirect.gov/marketable-securities/tax-forms-and-withholding/ | What you earn from your Treasury marketable securities is subject to federal tax but is exempt from state and local taxes. |
| Illinois 2026 income-tax withholding rate | https://tax.illinois.gov/forms/withholding/currentyear/il-700-t-withholding-guide-tables.html | Effective January 1, 2026, Tax Rate 4.95% |
