---
contentType: brief
briefSlug: "electricity-price-per-kwh-2026"
locale: "en"
cluster: "rates"
title: "US Electricity Is About 18.3¢ per kWh in 2026 — What That Does to an Appliance Bill"
description: "The US residential average is roughly 18.3 cents per kilowatt-hour in September 2026, up about 5% year on year. Here is how to turn that into the running cost of a specific appliance."
answer: "The US residential average is about 18.3¢ per kWh (EIA, September 2026), up roughly 5% on a year earlier. Running cost = watts ÷ 1,000 × hours × rate — so a 1,500 W heater run six hours a day for a 120-day winter costs about $198 at that rate, and more in a state above the average."
publishAt: "2026-09-18"
lastReviewed: "2026-09-18"
relatedTool: "/en/tools/appliance-running-cost/"
relatedToolLabel: "appliance running cost calculator"
formula: "running cost = (rated watts ÷ 1,000) × hours used × price per kWh; annual cost = running cost per day × days used per year"
limits:
  - "This is a calculation, not advice. The national average is a starting point for a rough estimate, not a bill: your own rate is on your bill and can differ from the average by more than a factor of two between states."
  - "Rated wattage is a maximum, not a measurement. Anything with a thermostat or a motor that cycles — a fridge, a heat pump, an air conditioner — draws its rated power only part of the time, so multiplying the nameplate by hours overstates the cost."
  - "Many bills mix a per-kWh energy charge with fixed monthly charges, delivery charges and tiered or time-of-use rates. Dividing your total bill by your total kWh gives an all-in rate that is usually higher than the advertised energy rate."
  - "Figures are the published national averages on the verification date below. Electricity prices move monthly and seasonally; check your own bill before relying on a number from any national source."
sources:
  - label: "U.S. Energy Information Administration — Electric Power Monthly (average retail price of electricity)"
    url: "https://www.eia.gov/electricity/monthly/"
    verifiedDate: "2026-09-18"
  - label: "U.S. Energy Information Administration — Electricity explained: electricity use in homes"
    url: "https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php"
    verifiedDate: "2026-09-18"
faq:
  - q: "Why is my rate so different from the national average?"
    a: "Because electricity price is mostly local. Generation mix, fuel costs, transmission distance, state regulation and utility rate design all vary, and the spread between the cheapest and most expensive states is routinely more than two to one. The national average is useful for comparing appliances against each other, not for predicting your bill."
  - q: "Should I use the rate printed on my bill or the total divided by kWh?"
    a: "For deciding between two appliances, use the energy rate: that is the number that actually changes when you use one more kilowatt-hour. For budgeting the whole bill, divide the total by the kilowatt-hours, because fixed and delivery charges are real money even though they do not move with usage."
  - q: "Does an appliance's rated wattage tell me what it costs to run?"
    a: "Only for things that run flat out whenever they are on — a kettle, a hair dryer, an incandescent bulb, a resistive space heater. Anything thermostatically controlled runs in cycles, so its average draw over an hour is well below the nameplate. For those, an energy label's annual kWh figure or a plug-in meter gives a far better number than the rating plate."
  - q: "Electricity went up about 5% — is that enough to change a decision?"
    a: "It changes decisions that were already close. A 5% rise makes the payback period on an efficiency upgrade about 5% shorter, which rarely flips a ten-year payback into a good one. Where it matters is high-consumption, always-on loads: on 1,000 kWh a month, a 5% rise is roughly $11 a month, or $132 a year, of new permanent cost."
related:
  - "/en/money/solar-payback-2026/"
  - "/en/money/heat-pump-payback-2026/"
  - "/en/energy-efficient-appliance-payback/"
draft: false
---

## The figure

The US residential average retail price of electricity is about **18.3 cents per kilowatt-hour** as of September 2026, roughly 5% higher than a year earlier. The Energy Information Administration publishes this monthly in the Electric Power Monthly series, by state and by sector.

Two things about that number matter more than the number itself.

It is an **average of averages**. Residential rates range from under 12 cents in some states to over 30 cents in others. Using 18.3¢ to estimate your own bill in a high-rate state understates it badly, and in a low-rate state overstates it.

It is an **energy rate**, not a bill. Most residential bills add a fixed monthly customer charge and, in many markets, separate delivery or distribution charges. The rate that matters for "what does one more hour of this appliance cost" is the per-kWh energy rate; the rate that matters for "what will my bill be" is the total divided by the kilowatt-hours.

## The arithmetic

    running cost = (rated watts ÷ 1,000) × hours used × price per kWh

Worked example — a resistive space heater, the appliance this arithmetic is most reliable for, because it draws its rated power the whole time it is on.

- Rated power: 1,500 W → 1.5 kW
- Use: 6 hours a day, 120 days of the heating season = 720 hours
- Energy: 1.5 × 720 = **1,080 kWh**
- Cost at 18.3¢: 1,080 × $0.183 = **$197.64**

At 12¢ that same heater costs $129.60 for the season. At 30¢ it costs $324. The heater did not change; the state did. This is why a cost-per-hour figure copied from an article is worth less than the same arithmetic run on the rate printed on your own bill.

## Where the nameplate lies

The formula above is exact for anything that runs at full power whenever it is switched on: kettles, toasters, hair dryers, resistive heaters, incandescent lighting.

It is wrong — often by a factor of three or more — for anything thermostatically controlled. A fridge rated 150 W does not use 150 W for 24 hours; its compressor cycles, and its real consumption is closer to its energy-label annual figure of a few hundred kilowatt-hours a year. The same applies to air conditioners, heat pumps, freezers and anything with a duty cycle.

For those appliances, use one of these instead of the rating plate:

1. The annual kWh figure on the energy label, divided by the hours you actually run it.
2. A plug-in energy meter, left in place for a full week of normal use.
3. Your own bill, compared before and after a month with the appliance unplugged.

## What would reverse the conclusion

A 5% rate rise is small in percentage terms and can still be decisive at the margins:

- **On an efficiency upgrade**, a higher rate shortens the payback period proportionally. A 5% rise turns a 10-year payback into about 9.5 years. If a decision hinged on that difference, it was too close to call either way.
- **On an always-on load**, the rise is pure recurring cost. At 1,000 kWh a month, 5% is about $11 a month — small monthly, $132 a year, and permanent.
- **On switching fuels**, it moves the line directly. Electric resistance heating competes with gas on a price ratio, so an electricity rise and a flat gas price both push the same way; a heat pump, which delivers several units of heat per unit of electricity, is far less sensitive to the same rise.
