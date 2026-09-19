---
contentType: brief
briefSlug: "gas-vs-ev-cost-per-mile-2026"
locale: "en"
cluster: "rates"
title: "EV vs Petrol per Mile in 2026: 5.2¢ at Home, 14.6¢ on a Fast Charger"
description: "At the 18.3¢/kWh US residential average, a 3.5 mi/kWh EV costs about 5.2 cents a mile to drive. A 30 mpg petrol car at $3.20 a gallon costs 10.7 cents. Public DC fast charging at 51¢/kWh costs 14.6 cents — more than the petrol car."
answer: "Charging at home, an efficient EV runs at roughly 5.2 cents per mile against about 10.7 cents for a 30 mpg petrol car — a saving of about $660 a year at 12,000 miles. On public DC fast charging at around 51¢/kWh the same EV costs about 14.6 cents a mile, which is more than the petrol car. Where you charge decides the answer, not what you drive."
publishAt: "2026-10-28"
lastReviewed: "2026-09-19"
relatedTool: "/en/tools/ev-vs-gas/"
relatedToolLabel: "EV vs petrol total cost calculator"
formula: "EV cost per mile = price per kWh ÷ miles per kWh; petrol cost per mile = price per gallon ÷ miles per gallon"
limits:
  - "This is energy cost only. Depreciation, insurance, tyres, registration and financing are usually larger than the fuel line for either car, and they do not move in the same direction — an EV often carries higher insurance and steeper early depreciation."
  - "Electricity prices vary by state by more than a factor of two, and a time-of-use tariff can put overnight charging well below the national average or peak charging well above it. The national figure is a starting point, not your rate."
  - "Efficiency figures are real-world, not sticker. Cold weather, motorway speeds and a roof box each move an EV's miles per kWh more than they move a petrol car's mpg."
  - "Charging losses are real. Roughly 10% of the energy drawn from the wall does not reach the battery, so a cost calculated from the car's own energy readout understates what the meter records."
sources:
  - label: "US EIA — Electric Power Monthly, residential price by state"
    url: "https://www.eia.gov/electricity/monthly/"
    verifiedDate: "2026-09-19"
  - label: "US DOE Alternative Fuels Data Center — Charging at home"
    url: "https://afdc.energy.gov/fuels/electricity-charging-home"
    verifiedDate: "2026-09-19"
  - label: "US DOE Alternative Fuels Data Center — Public charging"
    url: "https://afdc.energy.gov/fuels/electricity-charging-public"
    verifiedDate: "2026-09-19"
faq:
  - q: "Why is fast charging more expensive than petrol?"
    a: "Because you are not buying electricity, you are buying the hardware that delivers it quickly. A DC fast charger's price covers demand charges from the utility, the cost of the unit and the land it sits on. At around 51 cents a kWh the energy itself is a minority of what you pay, which is why the per-mile figure lands above a reasonably efficient petrol car."
  - q: "Does this mean an EV only makes sense with a home charger?"
    a: "Financially, mostly yes — that is where the fuel saving lives. Without one, the honest comparison is against petrol at roughly break-even, and the case for the EV has to be made on maintenance, the driving experience or emissions rather than on running cost. A flat with no charger is the single most common reason the arithmetic does not work."
  - q: "How much does cold weather change it?"
    a: "A hard winter can cut real-world miles per kWh by 20 to 30%, because cabin heat comes from the same battery that moves the car. At 2.6 mi/kWh instead of 3.5, home charging rises from 5.2 to 7.0 cents a mile. That is still below the petrol car, but it halves the margin in the months you notice it most."
  - q: "What petrol price would make the two equal at home?"
    a: "At 5.2 cents a mile for the EV, a 30 mpg petrol car matches it at $1.56 a gallon. Nowhere in the US market is currently close, which is why the home-charging comparison is not sensitive to petrol prices — it is sensitive to your electricity tariff."
related:
  - "/en/money/electricity-price-per-kwh-2026/"
  - "/en/money/irs-mileage-rate-2026/"
  - "/en/money/solar-payback-2026/"
draft: false
---

## The two formulas, side by side

Both are division. What makes the comparison slippery is that the units are not the same shape: petrol is priced per gallon and consumed per mile, while electricity is priced per kWh and consumed per mile.

    EV cost per mile     = price per kWh ÷ miles per kWh
    petrol cost per mile = price per gallon ÷ miles per gallon

At the September 2026 US residential average of 18.3¢/kWh, and with petrol near $3.20 a gallon:

| Vehicle and charging source | Rate | Efficiency | Cost per mile |
| --- | ---: | ---: | ---: |
| EV, home charging | 18.3¢/kWh | 3.5 mi/kWh | **5.2¢** |
| EV, home, off-peak tariff | 11.0¢/kWh | 3.5 mi/kWh | **3.1¢** |
| Petrol car, 30 mpg | $3.20/gal | 30 mpg | **10.7¢** |
| Petrol car, 22 mpg | $3.20/gal | 22 mpg | **14.5¢** |
| EV, public DC fast charging | 51¢/kWh | 3.5 mi/kWh | **14.6¢** |

Read the top and bottom rows together. The same car, driven the same way, costs between 3.1 and 14.6 cents a mile depending on nothing but where it is plugged in. That range is wider than the range between the vehicles.

## What it is worth over a year

At 12,000 miles a year:

| Scenario | Annual energy cost |
| --- | ---: |
| EV, home charging | $624 |
| EV, home, off-peak | $372 |
| Petrol car, 30 mpg | $1,284 |
| EV, entirely public fast charging | $1,752 |

Home charging against the 30 mpg car saves about **$660 a year**. An off-peak tariff takes it to about $912. Charging exclusively on the public fast network *costs* about $468 a year more than the petrol car.

## The mistake this arithmetic is meant to catch

The published comparisons almost always use the residential average and a favourable efficiency figure, which produces the 5.2-cent number and nothing else. Two corrections move it:

**Charging losses.** Roughly a tenth of the energy drawn from the wall never reaches the battery. A cost derived from the car's own trip computer therefore understates the meter by about 10% — so 5.2 cents is realistically 5.7.

**Your actual charging mix.** Almost nobody charges 100% at home or 100% in public. Blend it:

    blended cost per mile = (home share × home rate + public share × public rate) ÷ miles per kWh

At 80% home and 20% public, the rate is 0.8 × 18.3 + 0.2 × 51 = 24.8¢/kWh, so 7.1 cents a mile. Still well ahead of petrol, and 37% above the figure most comparisons quote.

## What would reverse the conclusion

- **No home charger.** The saving is the whole case at these fuel prices, and it lives entirely in the home rate. Without one, the energy comparison is a wash at best.
- **A high-price state.** Above about 37¢/kWh, home charging a 3.5 mi/kWh EV matches a 30 mpg petrol car. That is roughly double the national average, so only the most expensive markets approach it — but a peak-period time-of-use rate can reach it on its own.
- **Very low annual mileage.** At 4,000 miles a year the home-charging saving is around $220. That will not repay a purchase premium or a charger installation inside any reasonable horizon, and per-mile arithmetic stops being the right frame — fixed costs dominate.
- **A genuinely efficient petrol car.** A 45 mpg hybrid runs at 7.1 cents a mile, which is level with a realistic blended EV charging mix. Against that comparison the energy argument disappears entirely.
