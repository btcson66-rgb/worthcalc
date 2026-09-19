---
contentType: brief
briefSlug: "savings-vs-cd-2026"
locale: "en"
cluster: "rates"
title: "CD or High-Yield Savings in 2026: A 0.4% Premium Is Worth About $100 on $25,000"
description: "A 12-month CD near 4.6% against a high-yield savings account near 4.2% earns about $100 more on $25,000 — and costs you the right to withdraw. The early-withdrawal penalty is usually three to six months of interest."
answer: "On $25,000, a 12-month CD at 4.6% earns about $100 more than a high-yield savings account at 4.2%. That $100 is the price of the option to withdraw. A six-month early-withdrawal penalty on the same CD costs about $575 — more than five times the premium — so the CD only wins if you are certain you will not need the money."
publishAt: "2026-11-07"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/compound-growth/"
relatedToolLabel: "compound growth calculator"
formula: "premium = balance × (CD rate − savings rate) × term in years; early-withdrawal penalty ≈ balance × CD rate × (penalty months ÷ 12)"
limits:
  - "Advertised rates move. Both figures here are September 2026 market observations, not fixed properties of the products, and the whole comparison changes if one leg reprices."
  - "Penalty structures differ materially between institutions — some charge a set number of months of interest, some a flat fee, and some can take principal if the CD is broken early enough. Read the specific disclosure rather than assuming the common case."
  - "A savings rate is variable by construction and can be cut without notice. The comparison assumes it holds for the term, which is precisely the assumption a CD exists to remove."
  - "Interest from both is taxable in the year it is credited unless held in a tax-advantaged account, so the spread narrows on an after-tax basis by your marginal rate."
sources:
  - label: "US FDIC — National rates and rate caps"
    url: "https://www.fdic.gov/national-rates-and-rate-caps"
    verifiedDate: "2026-09-19"
  - label: "US CFPB — Regulation DD (Truth in Savings), § 1030.2 definitions"
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1030/2/"
    verifiedDate: "2026-09-19"
faq:
  - q: "Why is the premium so small if a CD locks my money for a year?"
    a: "Because the bank is not paying much for the lock at present. The premium reflects what the institution expects rates to do, and in a market where short rates are not expected to fall sharply, a term deposit is worth only a little more than an instant-access one. A large CD premium is a signal about expectations, not generosity."
  - q: "When does the CD clearly win?"
    a: "When the money has a date attached and that date is beyond the term: a tax bill due in fourteen months, a deposit for a purchase already scheduled. The lock costs nothing if you were not going to touch it, and the premium is then free money. The CD is a poor emergency fund and a good sinking fund."
  - q: "What if rates fall during the term?"
    a: "That is the CD's actual argument, and it is worth more than the headline premium. If savings rates drop from 4.2% to 3.0% after three months, the CD holder keeps 4.6% for the full year while the savings balance earns roughly 3.3% blended. On $25,000 that is about $325 rather than $100 — so the premium understates the value of the lock when a cut is genuinely likely."
  - q: "Is a CD ladder a way to get both?"
    a: "Largely, yes, and it is the standard answer. Splitting the balance across terms maturing at intervals means part of it is always near maturity, so the effective penalty for needing cash falls sharply while most of the balance still earns the term rate. It costs a little yield against a single long CD and removes most of the liquidity objection."
related:
  - "/en/money/idle-cash-cost-2026/"
  - "/en/money/emergency-fund-size-2026/"
  - "/en/money/employer-match-vs-debt-payoff/"
draft: false
---

## What you are actually buying

A CD pays more than instant-access savings for one reason: you give up the right to withdraw. So the comparison is not between two interest rates, it is between a small amount of extra yield and an option.

    premium  = balance × (CD rate − savings rate) × term
    penalty  ≈ balance × CD rate × (penalty months ÷ 12)

On $25,000 for twelve months, with a CD at 4.6% and savings at 4.2%:

| | Amount |
| --- | ---: |
| CD interest over the term | $1,150 |
| Savings interest over the term | $1,050 |
| **Premium for locking it up** | **$100** |
| Penalty if broken at month 5 (6 months' interest) | **$575** |

The asymmetry is the point. You are paid $100 to accept a $575 contingent cost. That is a good trade if the probability of needing the money is near zero, and a bad one at any probability above about 17%.

## The break-even probability

    break-even probability of needing the money = premium ÷ penalty

    $100 ÷ $575 = 17.4%

Across common structures:

| Balance | Rate gap | Premium | Penalty (6 months) | Break-even probability |
| ---: | ---: | ---: | ---: | ---: |
| $10,000 | 0.40% | $40 | $230 | 17.4% |
| $25,000 | 0.40% | $100 | $575 | 17.4% |
| $25,000 | 0.80% | $200 | $575 | 34.8% |
| $25,000 | 0.40% (3-month penalty) | $100 | $288 | 34.7% |

The balance cancels out, which is worth noticing: the decision does not depend on how much money you have. It depends on two ratios — the rate gap and the penalty length — and on one judgment, which is how likely you are to need the cash.

## The argument the premium understates

The table above assumes the savings rate holds. It is variable, so it need not. If rates are cut, the CD's value is not the $100 premium, it is the difference between a locked rate and a falling one:

| Savings rate path over 12 months | Savings interest earned | CD interest | CD advantage |
| --- | ---: | ---: | ---: |
| Flat at 4.2% | $1,050 | $1,150 | $100 |
| 4.2% falling to 3.5% at month 6 | $963 | $1,150 | $187 |
| 4.2% falling to 3.0% at month 3 | $825 | $1,150 | $325 |
| 4.2% rising to 4.8% at month 6 | $1,125 | $1,150 | $25 |

So the honest framing is that the CD is insurance against a rate cut, priced at the premium — and the premium is small because the market does not expect a large cut. If your own view differs from that, the CD is the instrument that expresses it.

## What would reverse the conclusion

- **The money is your emergency fund.** Then the option to withdraw is the entire purpose of the balance, and $100 is nowhere near enough to sell it. Emergency money belongs in instant access regardless of the spread.
- **A dated need beyond the term.** A known bill fourteen months out makes the lock costless, and the premium becomes free. This is the case the product is built for.
- **A wider gap.** At a 0.80% premium the break-even probability doubles to roughly 35%, which covers most people's honest assessment of whether they will touch a given balance.
- **A no-penalty CD.** These exist at a lower rate, typically giving up much of the premium. If the reduced rate still beats savings, they remove the only real objection — but check whether the rate survives the comparison at all, because often it does not.
