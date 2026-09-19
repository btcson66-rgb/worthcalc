---
contentType: brief
briefSlug: "credit-card-apr-2026"
locale: "en"
cluster: "rates"
title: "Credit Card APRs Near 24% in 2026: What a Fixed Monthly Payment Really Costs"
description: "US credit card interest is running close to 24% on accounts that carry a balance in 2026. On a $6,000 balance, paying $150 a month instead of $250 costs 47 extra months and about $3,800 more in interest."
answer: "At roughly 24% APR, a $6,000 balance paid at a fixed $150 a month takes about 80 months and costs about $6,030 in interest — more than the balance itself. The same debt at $250 a month clears in 33 months for about $2,225. The extra $100 a month is worth around $3,800."
publishAt: "2026-09-20"
lastReviewed: "2026-09-18"
relatedTool: "/en/tools/credit-card-payoff/"
relatedToolLabel: "credit card payoff calculator"
formula: "months to clear = −ln(1 − (balance × monthly rate) ÷ payment) ÷ ln(1 + monthly rate), where monthly rate = APR ÷ 12; total interest = payment × months − balance"
limits:
  - "This is a calculation, not advice. It assumes a fixed payment, no new spending on the card, and one interest rate — three assumptions that a real card with a promotional balance, a cash-advance balance and ongoing purchases will break."
  - "Published averages cover accounts assessed interest. A card's own APR is on its statement and in its cardholder agreement, and can be several points either side of any average."
  - "Most cards apply interest daily on an average daily balance, so a real statement will differ slightly from the monthly-compounding arithmetic here. The difference is small; the conclusion is not sensitive to it."
  - "If the payment is smaller than one month's interest, the balance grows and the formula returns no solution. That is not an error in the arithmetic — it is the actual outcome."
sources:
  - label: "Federal Reserve — G.19 Consumer Credit release (commercial bank interest rates on credit card plans)"
    url: "https://www.federalreserve.gov/releases/g19/current/"
    verifiedDate: "2026-09-18"
  - label: "Consumer Financial Protection Bureau — Credit cards: key terms"
    url: "https://www.consumerfinance.gov/consumer-tools/credit-cards/answers/key-terms/"
    verifiedDate: "2026-09-18"
faq:
  - q: "Why did card rates barely fall when the Fed cut?"
    a: "Card APRs are usually variable and priced as the prime rate plus a fixed margin, so a policy cut passes through to the prime component. But issuers have widened margins over the same period, which offsets much of it. The practical consequence is that waiting for rate cuts to fix a card balance is not a plan; the payment is the lever you actually control."
  - q: "Is the minimum payment ever the right choice?"
    a: "Only as a short-term liquidity measure. A minimum is typically set at a small percentage of the balance plus interest and fees, which means it falls as the balance falls, stretching the term deliberately. Paying the minimum on a 24% balance is closer to renting the money indefinitely than to repaying it."
  - q: "Should I pay the card or keep building savings?"
    a: "Above a small cash buffer, paying the card wins on arithmetic that is not close. Clearing a 24% balance is a guaranteed, tax-free 24% return. A high-yield savings account in 2026 pays around 4%. The gap is roughly 20 percentage points a year, which no low-risk investment closes."
  - q: "Does a balance transfer fix this?"
    a: "It can, and it has its own arithmetic. A transfer typically charges 3-5% of the balance up front for a 0% window. On $6,000 at 4%, that is $240 to stop roughly $118 a month of interest — worth it if you actually clear the balance inside the promotional window, and expensive if the balance is still there when the regular rate resumes."
related:
  - "/en/money/employer-match-vs-debt-payoff/"
  - "/en/money/idle-cash-cost-2026/"
  - "/en/credit-card-minimum-payment-trap/"
draft: false
---

## The figure

US credit card interest in 2026 is running close to **24% APR** on accounts that are assessed interest, with the commercial-bank average across all card plans lower — around 21% — because that series includes accounts that never carry a balance. The Federal Reserve publishes both in its G.19 consumer credit release.

The gap between those two numbers is the whole story of card debt: the average card is cheap, and the average *balance* is not.

## The arithmetic

    months to clear = −ln(1 − (balance × r) ÷ payment) ÷ ln(1 + r)

where `r` is the APR divided by 12.

Worked example — $6,000 on a card at 23.79% APR, with no new spending:

| Fixed monthly payment | Months to clear | Total interest |
| --- | ---: | ---: |
| $150 | 80 (6 yr 8 mo) | **$6,034** |
| $250 | 33 (2 yr 9 mo) | **$2,225** |
| Difference | 47 months | **$3,809** |

At $150 a month the interest exceeds the original balance. You pay for the purchases twice and still take nearly seven years to do it.

The first month's interest on that $6,000 is $118.95. A $150 payment therefore reduces the balance by $31.05 — about 21 cents of every dollar paid. A $250 payment reduces it by $131.05, about 52 cents of every dollar. That ratio, not the payment size, is what makes the term collapse.

## Why an extra $100 does so much

Interest is charged on what is left, so every dollar of extra payment removes interest from every remaining month at once. The relationship between payment and term is not proportional: raising the payment by 67% cut the term by 59% and the interest by 63%.

The same asymmetry runs the other way, which is the part people meet by accident. Dropping from $250 to $150 does not make the debt 40% slower. It makes it 142% slower.

## What would reverse the conclusion

- **A genuine 0% promotional rate.** With no interest accruing, every dollar goes to principal and the arithmetic above does not apply for the length of the promotion. Check what happens on the day it ends, and whether interest is deferred rather than waived.
- **New spending on the same card.** The calculation assumes the balance only falls. If the card is still in use, the effective payment toward old debt is the payment minus the new spending, which can be close to zero.
- **A debt with a higher rate.** If a second balance carries a higher APR, paying it first saves more per dollar. The ordering matters more than the total payment when rates differ widely.
- **An employer retirement match you would forfeit.** A match is typically an immediate 50-100% return, which beats even 24%. Capture the match, then attack the card.
