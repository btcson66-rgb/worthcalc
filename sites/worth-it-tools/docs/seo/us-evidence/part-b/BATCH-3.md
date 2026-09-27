# WorthCalc Part B — Batch 3

Revised and re-verified: 2026-09-27

Evidence rule: the third column reproduces the exact sentence or table-row text captured from the official page. Hypothetical worked-example inputs are explicitly labeled as reader assumptions in the article and are not represented as government figures.

### File: used-ev-after-tax-credit.md

```markdown
---
contentType: brief
briefSlug: used-ev-after-tax-credit
locale: en
cluster: ownership
title: Used EV Cost After the Federal Credit Ended
description: The federal used-EV credit ended for purchases after Sept. 30, 2025. Compare a 2023 Bolt EV with a 2023 Corolla using current EIA energy prices.
answer: For a 2026 used-EV purchase, do not subtract the expired federal previously-owned clean vehicle credit. A practical comparison is purchase-price difference plus energy cost per mile. Using July 2026 U.S. residential electricity at 18.31¢/kWh, Sept. 21, 2026 regular gasoline at $4.478/gal, EPA/DOE efficiency of 28 kWh/100 miles for a 2023 Chevrolet Bolt EV and 35 mpg for a 2023 Toyota Corolla, the national energy-cost inputs are about 5.13¢/mile for the Bolt and 12.79¢/mile for the Corolla.
publishAt: '2026-10-24'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/ev-vs-gas/
relatedToolLabel: ev vs gas
formula: break-even years = purchase-price premium / annual energy-cost savings
limits:
- This is a calculation, not tax, vehicle, or financial advice; it does not estimate state incentives, dealer discounts, taxes, fees, charging costs, insurance, maintenance, or resale value.
- The old federal credit had vehicle, buyer, dealer-reporting and income rules. The IRS decides eligibility; this page does not guarantee any historical or current credit.
- State and utility incentives can change independently of the federal credit. Confirm current programs before buying.
sources:
- label: IRS — Used Clean Vehicle Credit
  url: https://www.irs.gov/credits-deductions/used-clean-vehicle-credit
  verifiedDate: '2026-09-27'
- label: EIA — U.S. residential electricity price, July 2026
  url: https://www.eia.gov/electricity/monthly/
  verifiedDate: '2026-09-27'
- label: EIA — U.S. weekly regular gasoline price
  url: https://www.eia.gov/dnav/pet/pet_pri_gnd_dcus_nus_w.htm
  verifiedDate: '2026-09-27'
- label: FuelEconomy.gov — 2023 Chevrolet Bolt EV
  url: https://www.fueleconomy.gov/feg/noframes/45751.shtml
  verifiedDate: '2026-09-27'
- label: FuelEconomy.gov — 2023 Toyota Corolla
  url: https://www.fueleconomy.gov/feg/noframes/45931.shtml
  verifiedDate: '2026-09-27'
faq:
- q: Is the $4,000 federal used-EV credit available in 2026?
  a: No for a 2026 acquisition. The IRS says the Previously-Owned Clean Vehicle Credit is not available for vehicles acquired after September 30, 2025.
- q: How much electricity does a 2023 Chevrolet Bolt EV use?
  a: FuelEconomy.gov lists 28 kWh per 100 miles and 120 combined MPGe for the 2023 Chevrolet Bolt EV.
- q: What is the EPA combined MPG for a 2023 Toyota Corolla?
  a: FuelEconomy.gov lists 35 combined mpg for the referenced 2023 Toyota Corolla configuration.
- q: Is a 2.18-year break-even guaranteed?
  a: No. It is a worked example using hypothetical purchase prices and mileage plus official national energy and efficiency inputs. Your actual prices can be very different.
related:
- /en/money/gas-vs-ev-cost-per-mile-2026/
- /en/money/car-loan-interest-deduction/
draft: false
---
## The federal credit is gone for a 2026 purchase

The IRS says the Previously-Owned Clean Vehicle Credit is **not available for vehicles acquired after September 30, 2025**. So a 2026 used-EV comparison should not show a $4,000 federal credit in the purchase-price column.

For an energy-cost example, use two named 2023 models and current national energy inputs:

| Input | Official figure used |
| --- | ---: |
| U.S. residential electricity, July 2026 | **18.31¢/kWh** |
| U.S. regular gasoline, Sept. 21, 2026 | **$4.478/gal** |
| 2023 Chevrolet Bolt EV | **28 kWh/100 miles** |
| 2023 Toyota Corolla | **35 mpg combined** |

## The formula

    EV cost/mile = (kWh per 100 miles ÷ 100) × electricity price per kWh
    gas cost/mile = gasoline price per gallon ÷ mpg
    annual energy savings = (gas cost/mile - EV cost/mile) × annual miles
    break-even years = purchase-price premium ÷ annual energy savings

## Worked example: used Bolt EV vs used Corolla

Assume two actual dealer quotes available to a reader are **$19,500 for the used Bolt EV** and **$17,500 for the used Corolla**, a **$2,000 EV purchase-price premium**. Those purchase prices are hypothetical shopping inputs, not government averages. Assume **12,000 miles per year**.

Bolt energy cost:

    28 kWh/100 mi × $0.1831/kWh = $5.1268 per 100 mi = 5.13¢/mi

Corolla fuel cost:

    $4.478/gal ÷ 35 mpg = 12.79¢/mi

Annual energy savings:

    (12.79¢ - 5.13¢) × 12,000 ≈ $919 per year

Simple energy-only break-even:

    $2,000 ÷ $919 ≈ 2.18 years

This is not a total-cost-of-ownership verdict. Insurance, charging installation, public-charging prices, repairs, tires, depreciation, financing, and resale value can move the answer substantially.

## The mistake people make: subtracting an expired $4,000 credit from a 2026 deal

For vehicles acquired after September 30, 2025, the federal previously-owned clean vehicle credit is no longer available. That changes the used-EV comparison from “price minus credit” to ordinary ownership math: purchase-price premium or discount, energy cost per mile, insurance, charging access, maintenance, depreciation, and expected holding period. Energy prices are also time-sensitive. The EIA electricity and gasoline figures below are national snapshots, not promises about your utility tariff or local gas station. A buyer with cheap overnight charging can break even faster than the national example; a renter relying on expensive public fast charging can break even much later—or not at all.

## What would flip the answer

- **Your purchase-price gap changes.** A cheaper Bolt or more expensive Corolla shortens the simple break-even period.
- **You pay public fast-charging rates instead of a home residential rate.** EV cost per mile can be much higher.
- **Your local gasoline price is lower or higher than the national EIA snapshot.** The gas-car cost per mile moves directly with that price.
- **You drive fewer miles.** Lower annual mileage stretches the time needed for energy savings to recover an upfront premium.
- **Insurance, depreciation, repairs, or financing differ materially.** Energy-only break-even is only one part of ownership cost.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| federal used-EV credit end date | https://www.irs.gov/credits-deductions/used-clean-vehicle-credit | Update: The Previously-Owned Clean Vehicle Credit is not available for vehicles acquired after Sept. 30, 2025. |
| July 2026 U.S. residential electricity price | https://www.eia.gov/electricity/monthly/ | Residential &#124; 169,666 &#124; 168,011 &#124; 1.0% &#124; 31,071 &#124; 29,324 &#124; 6.0% &#124; 18.31 &#124; 17.45 &#124; 4.9% |
| Sept. 21, 2026 U.S. regular gasoline price | https://www.eia.gov/dnav/pet/pet_pri_gnd_dcus_nus_w.htm | Regular &#124; 4.049 &#124; 4.085 &#124; 4.071 &#124; 4.157 &#124; 4.319 &#124; 4.478 |
| 2023 Chevrolet Bolt EV efficiency | https://www.fueleconomy.gov/feg/noframes/45751.shtml | Electricity Combined MPG:120 combined city/highway MPGe City MPG:131 city Highway MPG:109 highway 28 kWh/100 miles |
| 2023 Toyota Corolla efficiency | https://www.fueleconomy.gov/feg/noframes/45931.shtml | Regular Gasoline Combined MPG:35 combined city/highway MPG City MPG:32 city Highway MPG:41 highway 2.9 gals/100 miles |

### File: capital-gains-zero-percent-bracket.md

```markdown
---
contentType: brief
briefSlug: capital-gains-zero-percent-bracket
locale: en
cluster: earning
title: '0% Capital Gains Bracket: 2026 Income Limits'
description: For 2026, the 0% long-term capital-gains threshold is $49,450 for most single filers and $98,900 for joint filers. See the stacking math.
answer: For tax year 2026, the maximum taxable-income amount for the 0% long-term capital-gains rate is $49,450 for most single filers and $98,900 for married filing jointly. Capital gains stack on top of ordinary taxable income. A single filer with $12,400 of ordinary taxable income has $37,050 of remaining room below the $49,450 zero-rate ceiling. If that filer realizes $49,450 of long-term gain, $37,050 fits in the 0% band and the remaining $12,400 is above it, subject to the capital-gain rate worksheet and other rules.
publishAt: '2026-10-25'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: 0% gain room = max(0, 0%-rate taxable-income ceiling - ordinary taxable income - other preferential income)
limits:
- This is a calculation, not tax, investment, or financial advice; it cannot determine holding period, basis, qualified dividends, special-rate gains, deductions, or filing status.
- The 0% rate is based on taxable-income stacking, not the size of the gain alone. The IRS determines tax treatment; this page does not guarantee a 0% rate.
- Capital-gain thresholds change by tax year. Confirm the current Schedule D instructions or ask a CPA before realizing gains for tax reasons.
sources:
- label: IRS — 2026 inflation adjustments, capital-gain rate thresholds
  url: https://www.irs.gov/irb/2025-45_IRB
  verifiedDate: '2026-09-27'
- label: IRS — 2026 ordinary tax brackets
  url: https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers
  verifiedDate: '2026-09-27'
faq:
- q: What is the 0% capital gains threshold for a single filer in 2026?
  a: The 2026 maximum zero-rate taxable-income amount for most non-joint, non-head-of-household individual filers is $49,450.
- q: Is the first $49,450 of capital gain always tax-free?
  a: No. Long-term gains and qualified dividends stack on top of ordinary taxable income, so ordinary income can use part or all of the 0% band.
- q: Do wages use up the 0% capital-gains bracket?
  a: Ordinary taxable income sits below long-term capital gains in the stacking calculation, so it can leave less room in the 0% capital-gains band.
- q: Does a 0% capital-gains rate mean the sale has no other tax effect?
  a: Not always. A realized gain can raise AGI and can interact with other income-based tax or benefit rules even if the federal long-term capital-gain rate on part of the gain is 0%.
related:
- /en/money/tax-loss-harvesting-limit/
- /en/money/roth-ira-income-limits/
draft: false
---
## The 2026 0% long-term capital-gain thresholds

| Filing status | Maximum taxable income in 0% band |
| --- | ---: |
| Married filing jointly / surviving spouse | **$98,900** |
| Married filing separately | **$49,450** |
| Head of household | **$66,200** |
| All other individuals | **$49,450** |

The same IRS release also sets the upper end of the **15%** long-term capital-gain band at **$613,700** for joint filers, **$306,850** for married filing separately, **$579,600** for heads of household and **$545,500** for other individuals.

## The formula

    0% gain room
    = max(0, 0%-rate taxable-income ceiling
             - ordinary taxable income
             - other preferential income already stacked there)

## Worked example: why “$49,450 tax-free gain” is wrong

Use a single filer with ordinary **taxable income** of **$12,400**. That number is the top of the 2026 10% ordinary bracket and is used here as an official input.

- 2026 0% capital-gain ceiling: **$49,450**.
- Ordinary taxable income: **$12,400**.
- Remaining 0% room: **$49,450 - $12,400 = $37,050**.

Now add **$49,450** of long-term capital gain:

- Gain fitting in the 0% band: **$37,050**.
- Gain above the 0% band: **$49,450 - $37,050 = $12,400**.

The exact tax on the remaining gain depends on the Schedule D tax computation, other preferential income, and any special-rate categories.

## The mistake people make: applying the 0% ceiling to gains alone

The 0% long-term capital-gain band sits on top of taxable income; it is not a separate bucket that starts at zero for every investor. Wages, pension income, taxable interest, short-term gains, and other ordinary taxable income can use up the lower part of the taxable-income stack before a long-term gain is added. A sale can therefore be partly in the 0% band and partly in the 15% band. Another interaction is timing: realizing a gain can raise AGI even when the federal long-term capital-gain rate on that slice is 0%, which can matter for other income-tested provisions. Use the threshold as a ceiling for total taxable income after stacking, not as a promise that a gain of the same size is tax-free.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **Ordinary taxable income is higher.** It uses more of the 0% space before the gain is stacked.
- **Qualified dividends are present.** They also occupy preferential-rate space.
- **The gain is short-term.** Short-term gains generally use ordinary income-tax rates instead.
- **Special gain categories apply.** Collectibles and unrecaptured section 1250 gain can use different maximum rates.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 long-term capital-gain 0% thresholds | https://www.irs.gov/irb/2025-45_IRB | Married Individuals Filing Joint Returns and Surviving Spouse &#124; $98,900 &#124; $613,700<br>Married Individuals Filing Separate Returns &#124; $49,450 &#124; $306,850<br>Heads of Household &#124; $66,200 &#124; $579,600<br>All Other Individuals &#124; $49,450 &#124; $545,500 |

### File: tax-loss-harvesting-limit.md

```markdown
---
contentType: brief
briefSlug: tax-loss-harvesting-limit
locale: en
cluster: earning
title: 'Tax-Loss Harvesting Limit: $3,000 and Wash Sales'
description: Net capital losses can offset up to $3,000 of ordinary income, or $1,500 if married filing separately. The wash-sale rule can defer a loss.
answer: If capital losses exceed capital gains, the federal return can generally deduct the smaller of the net loss or $3,000 against ordinary income, or $1,500 for married filing separately, with excess loss carried forward. A wash sale can disallow a current loss when substantially identical securities are bought within 30 days before or after the loss sale. In an IRS example, a $1,000 loss on 100 shares is fully disallowed when replacement purchases cover the shares inside the wash-sale window, and the disallowed loss is added to replacement-share basis.
publishAt: '2026-10-26'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: ordinary-income offset = min(net capital loss after netting, $3,000); carryforward = remaining net capital loss
limits:
- This is a calculation, not tax, investment, or financial advice; it cannot identify substantially identical securities, basis adjustments, transaction ordering, or your complete capital-gain netting.
- Wash-sale rules can defer a loss instead of permanently erasing its economic effect. The IRS determines tax treatment; this page does not guarantee deductibility.
- Broker reporting may not capture every cross-account or spouse transaction. Confirm basis and wash-sale treatment with IRS guidance or a tax professional.
sources:
- label: IRS Topic 409 — Capital gains and losses
  url: https://www.irs.gov/taxtopics/tc409
  verifiedDate: '2026-09-27'
- label: IRS Publication 550 — Investment income and expenses
  url: https://www.irs.gov/publications/p550
  verifiedDate: '2026-09-27'
faq:
- q: How much capital loss can reduce ordinary income each year?
  a: Generally up to $3,000, or $1,500 if married filing separately, after capital gains and losses are netted under the tax rules.
- q: What is the wash-sale window?
  a: The rule can apply when substantially identical stock or securities are acquired within 30 days before or 30 days after a sale at a loss.
- q: Do capital losses first offset capital gains?
  a: Yes. Net capital losses are determined after offsetting capital gains; only the remaining net loss is considered for the annual ordinary-income deduction limit.
- q: How long can unused capital losses carry forward?
  a: IRS Publication 550 says unused net capital loss beyond the annual limit can carry to later years until used, subject to the tax rules that apply.
related:
- /en/money/capital-gains-zero-percent-bracket/
- /en/money/roth-ira-income-limits/
draft: false
---
## The federal loss limit

| Rule | Amount |
| --- | ---: |
| Ordinary-income deduction for excess net capital loss | up to **$3,000** |
| Married filing separately | up to **$1,500** |
| Wash-sale replacement window | **30 days before or after** the loss sale |

The $3,000 number is not a limit on how much loss you may realize. It is the annual amount of excess net capital loss that can generally reduce ordinary income after capital gains and losses are netted. Remaining loss carries forward under the tax rules.

## The formula

    ordinary-income offset = min(net capital loss after netting, $3,000)
    carryforward = net capital loss after netting - ordinary-income offset

For married filing separately, substitute the **$1,500** annual limit.

## Worked example: $4,000 of gains and $11,000 of losses

Assume an investor realizes **$4,000 of capital gains** and **$11,000 of capital losses** during the year, with no other capital transactions.

    net capital result = $4,000 - $11,000 = -$7,000
    current-year ordinary-income deduction = min($7,000, $3,000) = $3,000
    loss remaining to carry forward = $7,000 - $3,000 = $4,000

The investor can use **$3,000** of the net capital loss against ordinary income under the annual federal limit and carries **$4,000** forward, subject to the normal rules. If the investor buys substantially identical securities inside the wash-sale window, some loss can be deferred instead of immediately recognized.

## The mistake people make: harvesting a loss and immediately buying the same investment back

The $3,000 ordinary-income deduction is only part of the tax-loss-harvesting story. Capital losses first offset capital gains; only a remaining net capital loss reaches the annual ordinary-income deduction limit. Unused losses can carry forward. The wash-sale rule can also defer a loss when substantially identical stock or securities are acquired within the 30-day window before or after the sale. That means an investor can execute a trade that looks like a tax loss in a brokerage screen but does not produce an immediately deductible loss. Review gains, losses, replacement purchases, and account activity—including IRAs—before counting the tax benefit.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **You have capital gains.** Losses first offset gains under the netting rules; the $3,000 ordinary-income limit applies to the excess net loss.
- **A wash sale applies.** The current deduction can be disallowed and shifted into basis.
- **You file married filing separately.** The annual ordinary-income offset limit is $1,500.
- **The replacement security is not substantially identical.** The wash-sale conclusion can change, but that is a facts-and-circumstances tax question.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| $3,000 annual capital-loss deduction | https://www.irs.gov/publications/p550 | Your allowable capital loss deduction, figured on Schedule D (Form 1040), is the lesser of: $3,000 ($1,500 if you are married and file a separate return), or Your total net loss as shown on line 16 of Schedule D (Form 1040). |
| carryforward of unused capital loss | https://www.irs.gov/publications/p550 | If you have a total net loss on line 16 of Schedule D (Form 1040) that is more than the yearly limit on capital loss deductions, you can carry over the unused part to the next year and treat it as if you had incurred it in that next year. |
| wash-sale 30-day rule | https://www.irs.gov/publications/p550 | A wash sale occurs when you sell or trade stock or securities at a loss and within 30 days before or after the sale you: Buy substantially identical stock or securities, |

### File: required-minimum-distributions.md

```markdown
---
contentType: brief
briefSlug: required-minimum-distributions
locale: en
cluster: earning
title: 'Required Minimum Distributions: Your First RMD Math'
description: RMDs generally begin at age 73. The first IRA deadline is April 1 after the year you turn 73. See the balance-divided-by-factor formula.
answer: Required minimum distributions generally begin at age 73 under current IRS rules. For an IRA, the first RMD is generally due by April 1 of the year after the calendar year in which the owner turns 73, although delaying that first payment can create two taxable distributions in one year. The basic calculation divides the prior December 31 account balance by the applicable life-expectancy factor. In the IRS example, $34,800 divided by 26.5 produces a 2026 RMD of about $1,313.
publishAt: '2026-10-27'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: RMD = prior December 31 account balance ÷ applicable life-expectancy factor
limits:
- This is a calculation, not tax, retirement, or financial advice; it cannot determine your applicable table, beneficiary status, account type, prior-year balance adjustments, or exceptions.
- RMD timing differs for some employer plans and account owners, and Roth IRA rules differ during the owner’s lifetime. The IRS decides compliance; this page does not guarantee an RMD amount.
- Missed-RMD excise-tax relief can depend on correction timing and facts. Confirm Form 5329 and current IRS guidance or ask a CPA before acting.
sources:
- label: IRS — Required minimum distributions
  url: https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-required-minimum-distributions-rmds
  verifiedDate: '2026-09-27'
- label: IRS Publication 590-B
  url: https://www.irs.gov/publications/p590b
  verifiedDate: '2026-09-27'
faq:
- q: At what age do RMDs start?
  a: Under current federal rules, RMDs generally begin at age 73, with the first IRA distribution generally due by April 1 of the following calendar year.
- q: What is the penalty for missing an RMD?
  a: The IRS states the excise tax can be 25% of the amount not taken, reduced to 10% if the missed amount is corrected within the statutory correction window and conditions are met.
- q: What balance is used for an RMD?
  a: The usual calculation starts with the prior year-end account balance and divides by the applicable IRS life-expectancy factor.
- q: Can I take one RMD from any retirement account?
  a: Aggregation rules vary by account type. Do not assume all IRAs and employer plans can be combined the same way.
related:
- /en/money/401k-early-withdrawal-cost/
- /en/money/roth-ira-income-limits/
draft: false
---
## The official RMD framework

| Rule | Current federal figure |
| --- | ---: |
| General RMD starting age | **73** |
| First IRA RMD deadline | **April 1** after the calendar year you turn 73 |
| Missed-RMD excise tax | **25%** of the shortfall |
| Reduced excise tax after timely correction under the rule | **10%** |

The basic RMD amount is mechanical once you have the correct prior-year balance and life-expectancy factor.

## The formula

    RMD = prior December 31 account balance ÷ applicable life-expectancy factor

## Worked example: $480,000 at age 73

Assume an IRA owner is **73** and the relevant prior December 31 account balance is **$480,000**. The IRS Uniform Lifetime Table factor for age 73 is **26.5**.

    RMD = $480,000 ÷ 26.5 = $18,113.21

Rounded to cents, the calculated RMD is about **$18,113.21**. The $480,000 balance is a reader example; the 26.5 divisor comes from the IRS table. A different prior-year balance changes the result dollar for dollar, and a different applicable table can change the divisor. The distribution also becomes taxable-income planning input, so its effect can extend beyond the withdrawal itself.

## The mistake people make: using the current balance instead of the prior year-end balance

For a standard RMD calculation, the account balance used is generally tied to the prior December 31 value, while the divisor comes from the applicable IRS life-expectancy table. A midyear market drop does not automatically rewrite the starting balance for that year’s RMD. Multiple retirement accounts can also have aggregation rules that differ by account type, so “add everything and take one withdrawal anywhere” is not a universal shortcut. The planning interaction is taxable income: an RMD can affect marginal brackets, taxation of Social Security, Medicare IRMAA, and other income-based items. Estimate the distribution early enough to see those interactions before year-end.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **A different IRS life-expectancy table applies.** The divisor changes.
- **The prior December 31 balance changes because of an allowed adjustment.** The numerator changes.
- **The account is a current-employer plan with different start timing.** Some workplace-plan rules differ from IRA timing.
- **A missed RMD is corrected promptly.** The excise-tax rate can fall from 25% to 10% when the statutory correction rules are satisfied.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| RMD required beginning date | https://www.irs.gov/retirement-plans/plan-participant-employee/401k-resource-guide-plan-participants-general-distribution-rules | The required beginning date is April 1 of the first year after the later of the following years: Calendar year in which you reach age 73; Calendar year in which you retire. |
| Uniform Lifetime Table factor at age 73 | https://www.irs.gov/publications/p590b | 73 &#124; 26.5 |

### File: 401k-early-withdrawal-cost.md

```markdown
---
contentType: brief
briefSlug: 401k-early-withdrawal-cost
locale: en
cluster: earning
title: '401(k) Early Withdrawal Cost: 10% Plus Income Tax'
description: A taxable 401(k) withdrawal before 59½ can face a 10% additional tax plus ordinary income tax. See a $24,500 worked example at 22%.
answer: A taxable distribution from a qualified retirement plan before age 59½ can generally face a 10% additional tax unless an exception applies, on top of ordinary federal income tax. Using the 2026 401(k) employee deferral limit of $24,500 only as an official example amount, a fully taxable $24,500 withdrawal that falls entirely in the 22% bracket produces $5,390 of regular federal income tax plus $2,450 of additional tax, or $7,840 total before state tax. That leaves $16,660 in the simplified calculation.
publishAt: '2026-10-28'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: simplified net cash = taxable withdrawal - ordinary federal income tax - 10% additional tax
limits:
- This is a calculation, not tax, retirement, or financial advice; it cannot determine whether an exception applies, how much is taxable, your marginal rate, plan withholding, or state tax.
- Withholding from a distribution is not the same as final tax liability. The IRS determines tax treatment; this page does not guarantee the 10% additional tax applies.
- Exceptions and plan distribution rules are fact-specific. Confirm IRS Topic 558, the plan document, or a qualified tax professional before withdrawing.
sources:
- label: IRS Topic 558 — Additional tax on early distributions
  url: https://www.irs.gov/taxtopics/tc558
  verifiedDate: '2026-09-27'
- label: IRS — 401(k) contribution limits
  url: https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits
  verifiedDate: '2026-09-27'
- label: IRS — 2026 tax brackets
  url: https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers
  verifiedDate: '2026-09-27'
faq:
- q: What is the early-withdrawal penalty on a 401(k)?
  a: A taxable early distribution can generally be subject to a 10% additional federal tax before age 59½ unless an exception applies.
- q: Is the 10% penalty the only tax on a 401(k) cash-out?
  a: No. A taxable distribution is generally included in income as well, so ordinary federal income tax and possibly state tax can be added to the 10% additional tax.
- q: Does an exception make the withdrawal tax-free?
  a: Not necessarily. An exception can remove the 10% additional tax while the taxable portion of the distribution can still be included in ordinary income.
- q: Is age 59½ the only rule that matters?
  a: No. Plan type, distribution reason, Roth basis, and statutory exceptions can change the result, so verify the specific distribution with IRS guidance.
related:
- /en/money/required-minimum-distributions/
- /en/money/roth-ira-income-limits/
draft: false
---
## The federal cost stack

| Item | Federal rule used |
| --- | ---: |
| General early-distribution age line | **59½** |
| Additional tax when no exception applies | **10%** |
| 2026 401(k) employee deferral limit used as example withdrawal | **$24,500** |
| Marginal bracket used in worked example | **22%** |

The 10% amount is an **additional tax**, not a replacement for regular income tax.

## The formula

    ordinary federal tax on withdrawal ≈ taxable withdrawal × marginal rate
    additional tax = taxable early distribution × 10%
    simplified net cash = withdrawal - ordinary federal tax - additional tax

## Worked example: $24,500 fully taxable cash-out

Use **$24,500** as the withdrawal amount because it is the official 2026 401(k) employee deferral limit, and assume for this narrow example that the entire distribution lands in the **22%** federal bracket and no exception applies.

- Ordinary federal income tax: **$24,500 × 22% = $5,390**.
- 10% additional tax: **$24,500 × 10% = $2,450**.
- Combined federal amount in this simplified example: **$5,390 + $2,450 = $7,840**.
- Simplified cash left before state tax: **$24,500 - $7,840 = $16,660**.

This example deliberately ignores state tax, withholding timing, tax-bracket spillover and investment opportunity cost. Its purpose is to show why “10% penalty” understates the immediate federal tax stack.

## The mistake people make: treating the 10% tax as the whole cost

The 10% additional tax is only one layer. A taxable early distribution can also increase ordinary taxable income, push part of the withdrawal into a higher marginal bracket, change eligibility for income-based credits, and permanently remove money from tax-deferred compounding. That is why the useful comparison is **cash received now versus total tax cost plus lost retirement value**, not “10% penalty versus no penalty.” If an exception to the additional tax applies, the distribution can still be taxable income. And if the money is coming from a Roth account, basis and ordering rules can change the result. Before withdrawing, compare the amount you actually need with the gross distribution required to produce that cash after taxes.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **An IRS exception applies.** The 10% additional tax may be avoided even though regular income tax can still apply.
- **Part of the distribution is not taxable.** After-tax basis or other account facts can change the taxable amount.
- **Your marginal rate is not 22%.** The regular-income-tax piece changes.
- **You roll the money over instead of taking a taxable distribution.** A valid rollover can change the immediate tax result entirely.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 10% additional tax and age 59½ | https://www.irs.gov/taxtopics/tc558 | To discourage the use of retirement funds for purposes other than normal retirement, the law imposes a 10% additional tax on certain early distributions from certain retirement plans. The additional tax is equal to 10% of the portion of the distribution that's includible in gross income. Generally, early distributions are those you receive from a qualified retirement plan or deferred annuity contract before reaching age 59½. |
| 2026 401(k) elective-deferral limit | https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500 | The annual contribution limit for employees who participate in 401(k), 403(b), governmental 457 plans, and the federal government’s Thrift Savings Plan is increased to $24,500, up from $23,500 for 2025. |

### File: roth-ira-income-limits.md

```markdown
---
contentType: brief
briefSlug: roth-ira-income-limits
locale: en
cluster: earning
title: 'Roth IRA Income Limits: 2026 Phase-Out Math'
description: The 2026 Roth IRA phase-out is $153,000–$168,000 for single/HOH and $242,000–$252,000 joint. The IRA limit is $7,500.
answer: For 2026, the IRA contribution limit is $7,500, or $8,600 for someone age 50 or older. Direct Roth IRA contributions phase out from $153,000 to $168,000 of MAGI for single and head-of-household filers and from $242,000 to $252,000 for married filing jointly. A single filer at the midpoint, $160,500 MAGI, is halfway through the $15,000 phase-out range, so the unrounded proportional calculation reduces a $7,500 maximum by 50% to $3,750 before applying the IRS rounding rules and other eligibility conditions.
publishAt: '2026-10-29'
lastReviewed: '2026-09-27'
relatedTool: /en/tools/compound-growth/
relatedToolLabel: compound growth
formula: reduced Roth limit ≈ annual IRA limit × (1 - (MAGI - phase-out start) ÷ phase-out range), then apply IRS rounding rules
limits:
- This is a calculation, not tax, retirement, or investment advice; it cannot verify compensation, filing status, spouse rules, prior contributions, or the IRS rounding steps for your return.
- The annual IRA limit is shared across traditional and Roth IRAs. The IRS determines contribution eligibility; this page does not guarantee that the calculated amount can be contributed.
- Income ranges and contribution limits change by tax year. Confirm Publication 590-A or ask a tax professional before contributing near a phase-out line.
sources:
- label: IRS Publication 590-A — IRA contributions
  url: https://www.irs.gov/publications/p590a
  verifiedDate: '2026-09-27'
faq:
- q: What is the Roth IRA income phase-out for a single filer in 2026?
  a: For 2026, direct Roth IRA contributions phase out from $153,000 to $168,000 of MAGI for single and head-of-household filers.
- q: What is the 2026 IRA contribution limit?
  a: The combined traditional-and-Roth IRA contribution limit is $7,500 for 2026, or $8,600 for an eligible person age 50 or older, subject to compensation and other rules.
- q: What is the 2026 Roth IRA limit?
  a: The IRA contribution limit is $7,500 for 2026 before considering age-based catch-up and income restrictions.
- q: What if my income lands inside the Roth phase-out range?
  a: Your maximum direct Roth IRA contribution is reduced rather than immediately falling to zero; use the IRS worksheet for the exact permitted amount.
related:
- /en/money/401k-contribution-limits/
- /en/money/ira-vs-401k-priority-2026/
draft: false
---
## The 2026 official figures

| Filing status / rule | 2026 amount |
| --- | ---: |
| IRA contribution limit | **$7,500** |
| Age 50+ IRA limit | **$8,600** |
| Single / head of household Roth phase-out | **$153,000–$168,000 MAGI** |
| Married filing jointly / qualifying surviving spouse | **$242,000–$252,000 MAGI** |
| Married filing separately while living with spouse | **$0–$10,000 MAGI** |

The contribution limit is shared across all of your traditional and Roth IRA contributions for the year.

## The formula

For a quick check inside the phase-out range:

    tentative reduced limit
    = annual IRA limit × (1 - (MAGI - phase-out start) ÷ phase-out range)

The IRS then applies its specific reduction and rounding rules, so use Publication 590-A for the filing calculation.

## Worked example: midpoint of the single phase-out

The single/HOH range is **$153,000 to $168,000**, a width of:

    $168,000 - $153,000 = $15,000

Its midpoint is:

    $153,000 + $7,500 = $160,500

At **$160,500 MAGI**:

- Position in range: **$7,500 ÷ $15,000 = 50%**.
- Tentative remaining share: **50%**.
- Tentative reduced maximum: **$7,500 × 50% = $3,750**.

That is a clean proportional illustration. The filed amount still needs the IRS worksheet and rounding rules, and the taxpayer must have enough eligible compensation.

## The mistake people make: checking salary instead of modified AGI

Roth IRA eligibility uses modified AGI, not simply gross salary or the number shown on a pay stub. Bonuses, investment income, self-employment results, and certain deductions can move the final figure. That creates a practical problem for people near the phase-out range: a contribution made early in the year can become partly excess once the full-year MAGI is known. The contribution limit and the income phase-out are also separate limits; being allowed to contribute does not mean every taxpayer can contribute the full $7,500. If income is uncertain, track projected MAGI during the year and understand correction or recharacterization options before the filing deadline.



## How to use this number in a real decision

Treat the official figure as a boundary condition, not as a complete personal answer. Start with the government rule, substitute your own filing status, income, account balance, purchase price, or spending amount, and keep hypothetical inputs separate from official inputs. Then test at least one downside case. Small changes near a threshold can matter more than a large change far from it. Finally, check whether the calculation changes cash flow now, tax at filing, or eligibility later; those are different effects and should not be combined into one “savings” number.

## What would flip the answer

- **MAGI is below the phase-out range.** The income phase-out does not reduce the annual limit.
- **MAGI is above the range.** A direct Roth IRA contribution can be reduced to zero.
- **Traditional IRA contributions have already used part of the annual limit.** The remaining Roth room shrinks dollar for dollar.
- **Filing status changes.** The phase-out range can change dramatically, especially for married filing separately.
```

**Evidence**

| Figure | Source URL | Exact sentence from the page |
|---|---|---|
| 2026 IRA contribution limit | https://www.irs.gov/publications/p590a | IRA contribution limit increased for 2026. Beginning in 2026, the IRA contribution limit is increased to $7,500 ($8,600 for individuals age 50 or older) from $7,000 ($8,000 for individuals age 50 or older). |
| 2026 Roth IRA phase-out ranges | https://www.irs.gov/publications/p590a | Your filing status is married filing jointly or qualifying surviving spouse and your modified AGI is at least $242,000. You can’t make a Roth IRA contribution if your modified AGI is $252,0000 or more.<br>Your filing status is single, head of household, or married filing separately and you didn’t live with your spouse at any time in 2026 and your modified AGI is at least $153,000. You can’t make a Roth IRA contribution if your modified AGI is $168,000 or more. |
