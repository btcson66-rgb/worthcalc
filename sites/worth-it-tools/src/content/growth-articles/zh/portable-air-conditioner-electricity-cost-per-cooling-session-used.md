---
contentType: article
articleSlug: "portable-air-conditioner-electricity-cost-per-cooling-session-used"
locale: "zh"
title: "可攜式冷氣每冷卻小時電費：把壓縮機循環算進去"
description: "分開壓縮機、送風與待機，估算可攜式冷氣每個完成冷卻小時的電費。"
relatedTool: "/zh/tools/budget-builder/"
canonical: "https://worthcalc.win/zh/guides/portable-air-conditioner-electricity-cost-per-cooling-session-used/"
lastReviewed: "2026-09-03"
draft: false
---

# 可攜式冷氣每冷卻小時電費：把壓縮機循環算進去

> **先說結論:** 分開壓縮機、送風與待機，估算可攜式冷氣每個完成冷卻小時的電費。

## 會改變結果的輸入

可攜式冷氣可能在壓縮機、送風、恆溫暫停、排風與待機之間切換。機身額定功率不等於一個完成冷卻小時的實際 kWh。記錄房間狀態、設定溫度、風速、排風配置、冷凝水處理，以及量測是否包含啟動與停止。 記錄設備狀態、起訖讀值、實測 kWh、到戶電價與完整量測窗口。 計算前先定義一個完成單位，並列出共用插座的負載，不要假設它是零。

## 公式與實測算例

每個完成冷卻小時成本＝實測 kWh × 實際到戶電價 ÷ 完成冷卻小時數。 例如實測 1.4 kWh、每 kWh 電價 0.22，量測期間完成 2 個冷卻小時，示例結果是每小時 0.154。這是算式示例，不是產品平均值。 請把原始讀值、貨幣、日期與費率放在結果旁，方便他人重現。 沒有量測邊界的四捨五入數字，不能算是可複核的家庭成本。

## 比較實際使用情境

可比較熱房間剛啟動、達到設定溫度後維持，以及壓縮機循環穩定後的短時段。房間、門窗、設定溫度與電表邊界要一致；只有送風的一小時應另列，不能當成冷卻小時。 相關實測設備指南: [pool-pump-electricity-cost-per-filtration-cycle-used](/zh/guides/pool-pump-electricity-cost-per-filtration-cycle-used/)、[dehumidifier-electricity-cost-per-laundry-drying-session-used](/zh/guides/dehumidifier-electricity-cost-per-laundry-drying-session-used/)、[electric-fireplace-electricity-cost-per-heating-hour-used](/zh/guides/electric-fireplace-electricity-cost-per-heating-hour-used/)、[garage-door-opener-electricity-cost-per-cycle-used](/zh/guides/garage-door-opener-electricity-cost-per-cycle-used/). 每個相關頁面都有自己的設備、完成單位與量測區間；共用 kWh 公式不代表答案可以互換。

## 量測方法

用插座電表或牆上電表，記錄開始／結束溫度、設定溫度、壓縮機狀態、風速、實測 kWh、電價與完整時間窗。房間穩定後再重測，也要保留首次降溫的資料，不要藏進維持平均。 若負載是估算而非實測，請標成假設並說明它如何改變結果。 重複可比較的量測窗口，但不要為了讓數字整齊而抹去真實的運轉差異。

## 限制與常見錯誤

冷卻效果、噪音、排水與舒適度和電費是不同問題。不能把額定瓦數直接換成個人帳單，也不能在房間、天氣、設定或完成單位不同時比較兩台設備。 請把電費與維護、水、耗材、維修及任何效果宣稱分開。 至少三次可比較讀值能顯示差異，但重複量測不會把小樣本變成通用產品結論。

## 常見問題

### 額定功率較低，就一定代表每冷卻小時較省嗎？

不一定。壓縮機循環、房間熱負載、設定溫度、送風、待機與你的實際電價都會改變結果，應量測相同的完成單位再比較。

### 什麼時候要重新計算？

季節、房間、設定溫度、排風方式、電價或恆溫行為改變時，重新計算。 這些來源提供電價、家庭用電、產品分類與支出背景，不取代你的電價或實測結果。

## 來源

[EIA delivered electricity price FAQ](https://www.eia.gov/tools/faqs/faq.php?id=507) 與 [EIA household electricity use](https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php), [ENERGY STAR product list](https://www.energystar.gov/products/products-list) 與 [CFPB spending guide](https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/). 這些來源提供電價、家庭用電、產品分類與支出背景，不取代你的電價或實測結果。
