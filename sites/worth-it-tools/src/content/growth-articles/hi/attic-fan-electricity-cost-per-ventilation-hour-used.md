---
contentType: article
articleSlug: "attic-fan-electricity-cost-per-ventilation-hour-used"
locale: "hi"
title: "Attic fan electricity cost per ventilation hour used: duty cycle मापें"
description: "Measured kWh, thermostat duty cycle, weather window और delivered electricity rate से attic-fan ventilation-hour cost निकालें।"
relatedTool: "/hi/tools/budget-builder/"
canonical: "https://worthcalc.win/hi/guides/attic-fan-electricity-cost-per-ventilation-hour-used/"
lastReviewed: "2026-09-03"
draft: false
---

# Attic fan electricity cost per ventilation hour used: duty cycle मापें

> **संक्षिप्त उत्तर:** Measured kWh, thermostat duty cycle, weather window और delivered electricity rate से attic-fan ventilation-hour cost निकालें।

## Result बदलने वाले inputs

Ventilation hour को वह clock hour define करें जिसमें fan चल सकता है, जरूरी नहीं कि full power पर चले। Outdoor और attic temperature, thermostat setting, mode, start/stop, measured kWh, roof/gable setup और shared controller या circuit record करें। Home cooling को fan reading में तभी रखें जब combined question हो।

## Formula और measured example

cost per ventilation hour = defined window में fan-system kWh ÷ ventilation hours × delivered electricity rate. अगर एक-hour window में fan 38 minutes चला, तो allowed hour और powered runtime दोनों denominator रखें। छह घंटे की गर्म दोपहर में meter 0.18 kWh दिखाता है, लेकिन thermostat ने 4.5 powered hours दिए। $0.22/kWh पर window cost $0.0396 है; allowed-hour $0.0066 और powered-hour $0.0088। Denominator label करें।

## Real-use windows compare करें

Warm afternoon fixed-speed fan, cooler evening thermostat cycling और separate controller वाले solar-attic setup compare करें। Airflow, circuit boundary, weather और house cooling behavior record रखें। Ventilation runtime और indoor comfort अलग outcomes हैं।

[cooling guide](/hi/guides/portable-air-conditioner-electricity-cost-per-cooling-session-used/), [filtration guide](/hi/guides/dehumidifier-electricity-cost-per-laundry-drying-session-used/), [humidity guide](/hi/guides/bathroom-ventilation-fan-electricity-cost-per-shower-used/) और [daily-cost guide](/hi/guides/electric-fireplace-electricity-cost-per-heating-hour-used/) से आगे तुलना करें। हर link की measured unit अलग है; denominators न मिलाएं।

## Limits और common mistakes

Roof insulation, intake ventilation, attic volume, weather, thermostat hysteresis, motor, speed, controller draw, wiring, voltage और maintenance energy बदलते हैं। Lower fan bill indoor temperature, moisture control, roof life या whole-home savings साबित नहीं करता। HVAC को बिना measurement न जोड़ें।

## अक्सर पूछे जाने वाले प्रश्न

### क्या rated wattage से hourly cost निकल जाएगा?

Rough upper-bound scenario बन सकता है, पर duty cycle और controller draw नहीं पता चलता। Defined weather window में wall meter cycling और standby पकड़ता है; rate, window और denominator लिखें।

## Sources

Context के लिए EIA की [electricity price explanation](https://www.eia.gov/tools/faqs/faq.php?id=507), ENERGY STAR की [product information](https://www.energystar.gov/products/products-list) और CFPB की [home spending guidance](https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/) पढ़ें। ये circuit measurement या local tariff का विकल्प नहीं हैं।
