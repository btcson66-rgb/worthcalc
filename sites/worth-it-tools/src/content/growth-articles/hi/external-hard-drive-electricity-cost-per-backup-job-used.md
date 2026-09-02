---
contentType: article
articleSlug: "external-hard-drive-electricity-cost-per-backup-job-used"
locale: "hi"
title: "External hard drive electricity cost per backup job: transfer और idle समय गिनें"
description: "Spin-up, transfer, USB और post-job idle की measured energy से completed backup job की बिजली लागत निकालें।"
relatedTool: "/hi/tools/budget-builder/"
canonical: "https://worthcalc.win/hi/guides/external-hard-drive-electricity-cost-per-backup-job-used/"
lastReviewed: "2026-09-03"
draft: false
---

# External hard drive electricity cost per backup job: transfer और idle समय गिनें

> **निष्कर्ष:** Actual copied और verified files से backup job define करें। Connection से safe removal तक drive की measured energy लें और completed jobs से divide करें। Routine में copy के बाद drive on रहती है तो idle भी boundary में रखें। यह cost estimate है, saving, performance, safety, health या income guarantee नहीं।

## Inputs जो answer बदलते हैं

Drive type, capacity, interface, enclosure, source size, copied files, verification, transfer/idle minutes, measured kWh, tariff और date लिखें। Full backup workstation न माप रहे हों तो computer और software load अलग रखें। Small incremental और large first backup compare करें। Spin-up, transfer, verification और safe eject शामिल करें; interrupted copy completed job नहीं है। Label planning में मदद करता है, measured wall energy cost का आधार है।

## Formula और measured example

cost per completed backup job = defined drive measured kWh × delivered rate ÷ verified completed jobs. Verified backup 0.012 kWh लेता है और rate 0.20/kWh है तो charge 0.0024 है। Error के कारण दोबारा copy को extra work लिखें, average में छिपाएं नहीं।

## Real use cases compare करें

Incremental, full और verification-heavy backup compare करें; file size और job definition लिखें ताकि photo sync और full archive अंधे ढंग से compare न हों। Related measured-use guides:[webcam per meeting hour](/hi/guides/webcam-electricity-cost-per-meeting-hour-used/)、[docking station per workday](/hi/guides/laptop-docking-station-electricity-cost-per-workday-used/)、[USB hub per charging session](/hi/guides/usb-charging-hub-electricity-cost-per-charging-session-used/)、[document camera per presentation hour](/hi/guides/document-camera-electricity-cost-per-presentation-hour-used/) हर page अपने device, completed unit और measurement window का उपयोग करता है; समान kWh होने से results interchangeable नहीं हो जाते।

## Limits और common mistakes

Sleep timer, USB power management, enclosure fan, cable, file count, encryption, antivirus और retries reading बदलते हैं। कम electricity cost को data safety या quality न समझें। 先固定費率、設備邊界、開始與結束時間，再做至少三次可重複的實測；若需要比較，保留原始 kWh 與量測日期。

## Frequently asked question

### क्या computer को drive cost में जोड़ें?

उत्तर: Full workstation figure में जोड़ें; drive-only figure में enclosure isolate करके computer अलग दिखाएं।

## Source reading

[EIA delivered electricity price FAQ](https://www.eia.gov/tools/faqs/faq.php?id=507)、[EIA household electricity use](https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php)、[ENERGY STAR product list](https://www.energystar.gov/products/products-list)、[ENERGY STAR computers](https://www.energystar.gov/products/computers)、[ENERGY STAR monitors](https://www.energystar.gov/products/monitors)、[ENERGY STAR imaging equipment](https://www.energystar.gov/products/imaging_equipment)、[CFPB spending guide](https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/)。EIA delivered price और household use का context देता है। ENERGY STAR product categories और power management समझाता है，CFPB recurring spending को wider budget में रखने में मदद करता है। कोई source आपकी tariff या device की measured reading की जगह नहीं लेता।
