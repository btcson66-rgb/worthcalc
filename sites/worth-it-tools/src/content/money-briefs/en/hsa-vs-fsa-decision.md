---
contentType: brief
briefSlug: "hsa-vs-fsa-decision"
locale: "en"
cluster: "protection"
title: "HSA or FSA: Elect the Amount You Are 90% Sure You'll Spend, Not Your Average"
description: "An FSA saves tax but forfeits the unspent balance; an HSA rolls over forever. At a 30% combined rate, a $2,500 FSA election with a 25% chance of underspending by $800 nets less than a $1,700 election that never forfeits."
answer: "The HSA and the FSA save the same tax on the same dollar. They differ in what happens to the dollar you did not spend: the HSA keeps it forever, the FSA takes it back. That makes the FSA election an expected-value problem — elect the amount you are about 90% confident you will spend, which is always below your average, not at it."
publishAt: "2026-10-27"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/budget-builder/"
relatedToolLabel: "budget builder"
formula: "net FSA benefit = election × combined tax rate − expected forfeiture, where expected forfeiture = probability of underspending × the average shortfall when it happens"
limits:
  - "This is a calculation, not tax or medical advice. Eligibility for an HSA requires a qualifying high-deductible plan and the absence of disqualifying coverage — including, for many people, a general-purpose FSA held by a spouse."
  - "Employers may offer a limited carryover or a grace period on a health FSA, and the two options are mutually exclusive. A carryover reduces forfeiture risk but does not remove it, and the amount is set by the plan within an IRS cap."
  - "Contribution limits are adjusted annually. Use the current figures on the IRS pages below rather than carrying a prior year's number into this year's election."
  - "Dependent care FSAs are a separate account with separate rules and their own limit. Nothing here applies to them."
sources:
  - label: "IRS — Publication 969, Health Savings Accounts and Other Tax-Favored Health Plans"
    url: "https://www.irs.gov/publications/p969"
    verifiedDate: "2026-09-19"
  - label: "HealthCare.gov — Deductible"
    url: "https://www.healthcare.gov/glossary/deductible/"
    verifiedDate: "2026-09-19"
faq:
  - q: "Why elect below my expected spending rather than at it?"
    a: "Because the payoff is asymmetric. Under-electing costs you the tax saving on the gap — around 30 cents per dollar. Over-electing costs you the whole dollar. Since one error is roughly three times as expensive as the other, the amount that maximises expected value sits well below the middle of your range."
  - q: "Does a carryover fix the problem?"
    a: "It shrinks it rather than fixing it. A carryover converts forfeiture into deferral for amounts under the cap, so the risk now applies only to the excess. It also comes at a price in many plans: an employer that offers a carryover cannot also offer a grace period, and a general-purpose carryover balance can make you ineligible to contribute to an HSA."
  - q: "Can I have both an HSA and a health FSA?"
    a: "Not both in their general-purpose forms — a general-purpose health FSA is disqualifying coverage for HSA contributions, and this catches people whose spouse elects one. A limited-purpose FSA restricted to dental and vision is the usual way to hold both, and it is the only version of this pairing worth building a plan around."
  - q: "If the HSA is better, why does anyone use an FSA?"
    a: "Because the HSA is not available to most people. It requires a qualifying high-deductible plan, and if your employer does not offer one, or the high-deductible plan is the wrong risk trade for your household, the FSA is the only tax-advantaged account on the table. The comparison is usually between an FSA and nothing."
related:
  - "/en/money/hsa-contribution-limits/"
  - "/en/money/insurance-deductible-break-even/"
  - "/en/money/emergency-fund-size-2026/"
draft: false
---

## The one structural difference

Both accounts take money before tax and spend it on qualified medical costs. On a dollar you definitely spend, they are identical. The difference shows up only on the dollar you did not:

| | Health FSA | HSA |
| --- | --- | --- |
| Unspent at year end | Forfeited, beyond any carryover the plan allows | Stays, indefinitely |
| If you change jobs | Generally ends with the employment | Yours, it moves with you |
| Requires a specific health plan | No | Yes — a qualifying high-deductible plan |
| Available to elect mid-year | Only on a qualifying life event | Can be started or stopped at any time |

That row about forfeiture is the whole brief. It converts "how much should I elect?" from a budgeting question into a probability question.

## The arithmetic of an FSA election

    net benefit = election × combined tax rate − expected forfeiture

where the combined rate is your marginal income tax plus the 7.65% payroll tax an FSA deduction also escapes. At a 22% federal bracket, call it 30% all-in.

Worked example. Your medical spending over the last three years was $1,600, $2,300 and $3,600 — an average of $2,500, with real variance.

**Election of $2,500 (at the average).** Roughly a coin flip on underspending. Say a 40% chance of coming in short by an average of $700:

- Tax saved: $2,500 × 0.30 = **$750**
- Expected forfeiture: 0.40 × $700 = **$280**
- Net: **$470**

**Election of $1,700 (near the bottom of the range).** Nearly certain to be spent; call the forfeiture risk 5% on an average $200 shortfall:

- Tax saved: $1,700 × 0.30 = **$510**
- Expected forfeiture: 0.05 × $200 = **$10**
- Net: **$500**

The smaller election nets more. That result is not a quirk of these numbers — it follows from the 3:1 asymmetry. Missing a dollar of shelter costs 30 cents; forfeiting a dollar costs 100.

## Where the break-even actually sits

Raising the election by one more dollar is worth it only while:

    tax rate > probability that this particular dollar goes unspent

At a 30% combined rate, the last dollar is worth electing while it has better than a 70% chance of being spent. So the correct election is not your average spend and not your best case — it is roughly your 30th-percentile year. In practice, the lowest of your last three years is a decent proxy, and it is almost always lower than the number people first write down.

## What would reverse the conclusion

- **A known, dated expense.** Scheduled surgery, orthodontics, a birth — a committed cost removes the probability term entirely, and the election should cover it in full. This is the case where electing the maximum is straightforwardly correct.
- **A carryover you will genuinely use.** If your plan allows one and your spending is chronic rather than episodic, the forfeiture term applies only above the carryover cap, which pushes the optimal election up.
- **You qualify for an HSA.** Then the comparison is not close: the same tax treatment without the forfeiture term, plus portability and no deadline. If both are available and you hold a qualifying plan, the HSA wins before the arithmetic starts.
- **A very high marginal rate.** At a 45% combined rate the last dollar is worth electing at better than a 55% chance of use, which moves the optimal election substantially closer to your average.
