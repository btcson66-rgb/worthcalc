---
contentType: brief
briefSlug: "internet-plan-cost-2026"
locale: "en"
cluster: "rates"
title: "That $40 Internet Plan Costs $70 a Month: Pricing a Promo Cliff Properly"
description: "A 12-month promotional rate of $40 that reverts to $85, plus a $15 equipment rental, averages $70 a month over two years. The advertised number is never the number you should compare plans on."
answer: "Price an internet plan over the full contract, not the promotional window. A $40 promo that reverts to $85 after 12 months, with a $15/month router rental throughout, costs $1,680 over 24 months — an effective $70 a month. That is 75% above the advertised figure, and it is the only number worth comparing against a rival offer."
publishAt: "2026-10-29"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/subscription-audit/"
relatedToolLabel: "subscription audit calculator"
formula: "effective monthly cost = (promo rate × promo months + standard rate × remaining months + monthly fees × total months + one-off charges) ÷ total months"
limits:
  - "Taxes and regulatory surcharges are excluded here and vary by jurisdiction. They are charged on the underlying rate, so they scale with the post-promotional price rather than the promotional one."
  - "Data caps and overage charges are not in this arithmetic. A cheap capped plan can cost more than an expensive uncapped one for a household that streams, and the overage line only shows up after you have committed."
  - "Advertised speeds are a maximum, not a guarantee. A plan that does not deliver what a household needs is not cheap at any price, and this page cannot tell you which speed tier that is."
  - "Early termination fees change the arithmetic of leaving mid-contract. Check the remaining balance before treating a switch as free."
sources:
  - label: "US FTC — What to know about free trials and negative option subscriptions"
    url: "https://consumer.ftc.gov/articles/what-know-about-free-trials-and-negative-option-subscriptions"
    verifiedDate: "2026-09-19"
  - label: "US CFPB — Budgeting tools"
    url: "https://www.consumerfinance.gov/consumer-tools/budgeting/"
    verifiedDate: "2026-09-19"
  - label: "US BLS — Consumer Price Index"
    url: "https://www.bls.gov/cpi/"
    verifiedDate: "2026-09-19"
faq:
  - q: "Why is the promotional rate advertised at all if it is not the price?"
    a: "Because it is the number that wins a comparison table, and comparison tables are where the decision is made. The promotional rate is real for the months it applies to; the problem is that the entry that beat it on the table may have a shorter cliff or a smaller step, and the table has no column for either."
  - q: "Is renting the router really that expensive?"
    a: "It is the clearest arithmetic on this page. At $15 a month it is $360 over two years for hardware that sells for $120 to $180. It is a rental at roughly double the purchase price per year, and unlike the promotional rate it never expires. Check first that the provider permits a customer-owned device, because some services do not."
  - q: "Can I just call and re-negotiate when the promotion ends?"
    a: "Often, and it usually works — which is precisely why the plan should be priced on the assumption that you will not. A discount you have to remember to ask for every twelve months is a real discount with a real failure rate. Price the plan at the standard rate, then treat any renegotiation as an upside rather than as the base case."
  - q: "How do I compare two plans with different promotional lengths?"
    a: "Put both over the same window, ideally the longer of the two contracts, and use the effective monthly formula above. A 6-month promo at $30 and a 12-month promo at $45 are not comparable until both are spread over 24 months — and on that basis the second usually wins even though it loses on the advertised figure."
related:
  - "/en/money/streaming-prices-2026/"
  - "/en/money/buy-now-or-wait-price-increase/"
  - "/en/money/electricity-price-per-kwh-2026/"
draft: false
---

## The formula

An internet bill has four parts, and only the first is ever in the advertisement:

    effective monthly = (promo rate × promo months
                       + standard rate × remaining months
                       + recurring fees × total months
                       + one-off charges) ÷ total months

Worked example over a 24-month horizon:

| Component | Amount |
| --- | ---: |
| Promotional rate, months 1–12 | $40 × 12 = $480 |
| Standard rate, months 13–24 | $85 × 12 = $1,020 |
| Equipment rental, 24 months | $15 × 24 = $360 |
| Installation, one-off | $99 |
| Promotional credit applied | −$279 |
| **Total** | **$1,680** |
| **Effective monthly** | **$70.00** |

The advertised number is $40. The number you will actually average is $70. Comparing two plans on the first figure is comparing two things that are not the price.

## Why the second year does the damage

Look at where the money is. The promotional window contributes $480 of the $1,680 — 29% of the cost for 50% of the time. Everything after month 12 contributes $1,020, and the equipment rental quietly adds another $360 that no promotional window ever touches.

That distribution is what makes the promo cliff the wrong thing to optimise. Shaving $10 off the promotional rate saves $120 over the contract. Shaving $10 off the **standard** rate saves $120 in the second year alone and again every year you stay after that. The negotiation that matters is about the number nobody advertises.

## The router line, isolated

    two-year rental cost = monthly rental × 24
    purchase cost        = device price (one-off)

At $15 a month that is **$360** against $120–$180 to buy a comparable device outright. The rental pays for the hardware roughly every ten months and then keeps charging. It also survives every promotional cycle: when the introductory rate ends, the rental does not.

Two caveats before acting on it. Some providers require their own equipment for a particular service tier, and some bundle support in a way that a customer-owned device forfeits. Check both before buying, because the saving only exists if the substitution is actually permitted.

## What would reverse the conclusion

- **A genuine no-contract plan at a flat rate.** If there is no cliff, the advertised rate is the effective rate and this arithmetic collapses to one line. A flat $65 beats a $40 promo that averages $70, and that inversion is exactly what the effective-monthly formula is for.
- **You move often.** If you will not be at the address when the promotional rate ends, the promo rate really is your price. Someone moving annually should optimise the first twelve months and ignore everything after them.
- **A bundle whose other legs you would buy anyway.** A bundled discount is real when the bundled service is one you were already paying for separately. It is not real when the bundle is what created the second service.
- **An early-termination fee.** It changes what switching costs, and a plan that looks worse on effective monthly can still be the right one to stay on if leaving triggers a balloon charge.
