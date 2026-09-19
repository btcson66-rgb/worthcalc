---
contentType: brief
briefSlug: "ira-vs-401k-priority-2026"
locale: "en"
cluster: "rates"
title: "401(k) or IRA First in 2026? The Order Is Decided by Two Numbers, Not Preference"
description: "With a $24,500 401(k) limit and a $7,500 IRA limit for 2026, the ordering is settled by the employer match rate and the plan's expense ratio. Over 30 years a 0.80% gap costs about $93,000 on $7,500 a year."
answer: "Fund the 401(k) to the full employer match first — a 50% match is a 50% instant return no IRA can match. After that the order is decided by fees: if your plan's funds cost more than an IRA's by about 0.40% or more, the next $7,500 belongs in the IRA. Below that gap the difference is too small to outrank the 401(k)'s higher limit."
publishAt: "2026-10-26"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/compound-growth/"
relatedToolLabel: "compound growth calculator"
formula: "value lost to fees over n years = balance × ((1 + r − f_low)^n − (1 + r − f_high)^n); match value = employer match rate × your contribution, received immediately"
limits:
  - "This is a calculation, not investment or tax advice. Which accounts you are eligible for, and the deductibility of an IRA contribution, depend on income and coverage rules this page does not apply to you."
  - "The figures assume you can afford to fill both. If the total you can save is below the match threshold, there is no ordering question — everything goes to the match."
  - "Fee comparisons only hold if the funds are comparable. A cheap fund tracking a different market is not a cheaper version of the same thing."
  - "Vesting schedules can claw back an employer match if you leave early. A match that is not yet vested is not yet yours, which weakens the case for chasing it at a job you are about to leave."
sources:
  - label: "IRS Newsroom — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500"
    url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
    verifiedDate: "2026-09-19"
  - label: "Investor.gov — Compound interest calculator"
    url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"
    verifiedDate: "2026-09-19"
faq:
  - q: "Is the match really worth more than everything else?"
    a: "Yes, by a margin nothing else on this page comes close to. A 50-cents-on-the-dollar match returns 50% the moment the payroll run clears, before any market return. No fee difference, tax treatment or fund selection produces a number in that range, which is why the match is never the thing you optimise around — it is the thing you take first."
  - q: "How big does the fee gap have to be to matter?"
    a: "About 0.40% is where it starts to bite over a working life, and 0.80% is where it dominates. On $7,500 a year for 30 years at 7%, a 0.80% higher expense ratio costs roughly $93,000 of ending balance. Below 0.20% the gap is real but too small to override the 401(k)'s higher annual limit if you are saving enough to hit it."
  - q: "What if my plan has good funds and low fees?"
    a: "Then the ordering question mostly disappears and the 401(k) wins on capacity: it accepts $24,500 against the IRA's $7,500. The IRA still has a role for fund types your plan does not offer, but chasing it on principle costs you shelter space you cannot reclaim in a later year."
  - q: "Does a Roth option change the order?"
    a: "It changes which account, not which order. Match first, then fees, then the Roth-versus-traditional decision inside whichever wrapper you landed on. Treating Roth as a separate step in the queue is how people end up skipping a match to fund an IRA, which is the one clearly wrong answer."
related:
  - "/en/money/401k-contribution-limits-2026/"
  - "/en/money/roth-vs-traditional-break-even/"
  - "/en/money/employer-match-vs-debt-payoff/"
draft: false
---

## The two numbers that decide it

There is no general answer to "401(k) or IRA first". There are two inputs, and between them they settle it for almost everyone:

1. **The employer match rate** — what the employer adds per dollar you defer, up to a cap.
2. **The expense-ratio gap** — what your plan's funds charge, minus what the same exposure costs in an IRA.

Everything else people argue about — flexibility, fund selection, "control" — moves the answer by less than either of these.

## Step one: the match, and why nothing outranks it

A common structure is 50% of deferrals up to 6% of pay. On a $80,000 salary that is $4,800 deferred and $2,400 added.

    match received = deferral × match rate, capped at (cap % × salary) × match rate

The return on that $4,800 is 50% on the day it lands. Compare it with anything else in this brief:

| Action | First-year return on the money |
| --- | ---: |
| Capture a 50% match | **50%** |
| Move $7,500 from a 0.85% fund to a 0.05% fund | 0.80% |
| Choose a Roth over a traditional contribution | 0% in year one; it is a timing bet |

The gap is two orders of magnitude. This is why "always take the full match" survives as advice even though almost no other rule of thumb does.

## Step two: the fee gap, which compounds instead of arriving

After the match, the 401(k) has no further structural advantage over an IRA except its higher limit. What it often has is a disadvantage: a menu of funds chosen by an employer, sometimes with an administrative layer charged on top.

    ending balance = Σ contribution × (1 + r − f)^(years remaining)

$7,500 a year, 30 years, 7% gross return:

| Expense ratio | Ending balance | Cost of the fee |
| ---: | ---: | ---: |
| 0.05% | $702,000 | — |
| 0.25% | $677,000 | $25,000 |
| 0.85% | $609,000 | **$93,000** |

The 0.85% column is not a hypothetical; small-employer plans in that range are common. Note the shape: the fee is charged on the balance, so it grows as the balance does. A fee gap is the only item here whose cost accelerates over the same period that everything else about the account gets better.

**The rule that falls out:** above roughly a 0.40% gap, send the post-match $7,500 to the IRA. Below about 0.20%, stay in the plan and use the bigger limit. Between the two it is close enough that the deciding factor should be whichever account you will actually keep funding.

## What would reverse the conclusion

- **You cannot fill both.** If your total saving is under the match threshold, the fee comparison is irrelevant — the ordering question only exists above it.
- **Your income makes an IRA contribution non-deductible.** A non-deductible traditional IRA is a substantially worse instrument than a deductible one, and it changes the comparison enough to be worth checking eligibility before assuming the IRA wins on fees.
- **Your plan offers something an IRA cannot buy.** Stable-value funds and certain institutional share classes exist only inside plans. If one of those is the reason you hold the plan, the fee comparison is no longer like-for-like.
- **You are leaving within the vesting period.** An unvested match is a conditional promise. Weighting your ordering around a match you will forfeit in four months is the one way to get step one wrong.
