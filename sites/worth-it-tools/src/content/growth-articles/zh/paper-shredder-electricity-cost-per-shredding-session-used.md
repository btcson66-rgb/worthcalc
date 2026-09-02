---
contentType: article
articleSlug: "paper-shredder-electricity-cost-per-shredding-session-used"
locale: "zh"
title: "碎紙機每次碎紙工作電費：計入馬達循環"
description: "用馬達、反轉、清除卡紙與待機的實測能源，估算碎紙機每次工作電費；集屑袋與維護另列。"
relatedTool: "/zh/tools/budget-builder/"
canonical: "https://worthcalc.win/zh/guides/paper-shredder-electricity-cost-per-shredding-session-used/"
lastReviewed: "2026-09-03"
draft: false
---

# 碎紙機每次碎紙工作電費：計入馬達循環

> **先說結論:** 用馬達、反轉、清除卡紙與待機的實測能源，估算碎紙機每次工作電費；集屑袋與維護另列。 這是成本估算，不是節省、產品表現或家庭結果保證。

## 會改變結果的輸入值

碎紙機 的每次 碎紙工作 成本，要先定義牆上電表的開始與結束。先用牆上電表定義開始與結束。記錄設備狀態、負載、連接配件、完成單位、費率單位與量測日期。額定功率或典型值只能協助規劃，不能取代可重複的實測讀值。

每次送入張數、紙張厚度、集屑桶滿度與反轉次數都可能改變時間與能源。應把第一張紙送入定為開始，並固定工作後窗口作為結束。

## 公式與實際算例

電費＝實測牆上 kWh × 已交付電力費率。單位成本＝電費 ÷ 實際完成單位。固定費、稅、耗材、維修、訂閱，以及電腦或網路負載，除非明確納入邊界，否則都應放在分子之外。 若一次工作實測 0.035 kWh、每 kWh 0.18，電費是 0.0063；若成功碎 180 張，每張分攤 0.000035，但主要答案仍是每次工作。

不要把額定功率直接乘上整段時間，除非牆上電表確認設備在整段期間都維持該負載。若工作包含電腦、顯示器、網路、充電器或其他配件，先分開量測再決定是否合併。

## 比較實際使用情境

測試少量、接近額定厚度與含反轉的混合批次；記錄成功碎紙張數，不要只記送入張數，也不要把整條辦公室迴路算給碎紙機。

同群組延伸閱讀：[護貝機每批護貝電費：把預熱與滾輪運轉分開](/zh/guides/laminator-electricity-cost-per-laminating-batch-used/)、[3D 掃描器每次掃描電費：把電腦負載分開量測](/zh/guides/3d-scanner-electricity-cost-per-scanning-session-used/)、[電動升降桌每次調整日電費：計入馬達與待機](/zh/guides/electric-standing-desk-electricity-cost-per-adjusted-day-used/)、[智慧喇叭每聆聽小時電費：分開播放與待機](/zh/guides/smart-speaker-electricity-cost-per-listening-hour-used/)。這些頁面分別處理辦公設備、掃描、桌面調整與音訊的不同分母，互鏈是為了幫讀者先選對單位與邊界。

## 限制與常見誤區

電壓、費率結構、韌體、環境、模式、負載、電表解析度、待機窗口與失敗工作都會改變結果。至少做三次可重複工作；短時間讀值若解析度不足，就合併多次後平均，並一次只改一個條件。 這是成本估算，不是節省、產品表現或家庭結果保證。

## 常見問題

### 反轉要算嗎？若落在開始與結束邊界內就要算，但應另註反轉或卡紙事件，因為那是不同操作條件。

反轉要算嗎？若落在開始與結束邊界內就要算，但應另註反轉或卡紙事件，因為那是不同操作條件。 若要比較，請固定同一個量測邊界與費率日期。

## 來源閱讀

費率背景可參考 [EIA 已交付電力價格 FAQ](https://www.eia.gov/tools/faqs/faq.php?id=507)與 [EIA 家庭用電概覽](https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php)。[ENERGY STAR 電腦](https://www.energystar.gov/products/computers)與[影像設備](https://www.energystar.gov/products/imaging_equipment)提供產品類別與電源管理脈絡，不代表本設備表現。[CFPB 支出指南](https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/)可協助把實測結果當作家庭決策的一項輸入。
