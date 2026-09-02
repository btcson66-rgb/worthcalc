---
contentType: article
articleSlug: "router-electricity-cost-per-month-used"
locale: "zh"
title: "路由器每月用電成本：分開全天供電與網路服務費"
description: "用路由器與數據機實測瓦數、連線時數、備援設備與電價，估算每月用電成本；不要把電費與網路月租混為一談。"
relatedTool: "/zh/tools/budget-builder/"
canonical: "https://worthcalc.win/zh/guides/router-electricity-cost-per-month-used/"
lastReviewed: "2026-09-02"
draft: false
---

# 路由器每月用電成本：分開全天供電與網路服務費

> **先說結論:** 用路由器與數據機實測瓦數、連線時數、備援設備與電價，估算每月用電成本；不要把電費與網路月租混為一談。

## 會改變結果的輸入值

分別或整體量測數據機、路由器、Mesh 節點、光纖終端與備援電池的插座輸入，記錄連線時數、夜間關機、訪客設備、電價、輸配費，以及備援是否支援保全或工作。

## 公式與實際算例

路由器每月用電成本＝實測平均瓦數 × 連線小時 ÷ 1,000 × 已交付電力費率。每個常開節點都要加入，備援轉換損耗另列；網路月租維持在電費之外。 12 W 的數據機與路由器組合連續運作 30 天，耗電 8.64 kWh；每 kWh 0.20 時直接能源費約每月 1.73。Mesh 節點、光纖終端或電池備援會改變結果，應量測整套牆上輸入。

## 比較實際使用情境

比較小宅一台閘道器、大宅閘道器加兩個 Mesh 節點，以及夜間關閉的網路。EIA 說明家庭用電取決於設備與時間，而費率來自當地帳單；沒有通用路由器瓦數可套用。

可延伸閱讀[下一篇充電指南](/zh/guides/phone-charger-cost-per-charge-used/)、[季節使用指南](/zh/guides/electric-blanket-cost-per-night-used/)、[待機指南](/zh/guides/standby-power-cost-per-day-used/)與[電費指南](/zh/guides/electricity-cost-per-kwh-used/)。

## 限制與常見誤區

Wi-Fi 流量、頻段、USB、散熱、韌體、Mesh 回程、備援轉換損耗與排程都會改變耗電。關閉網路可能影響攝影機、警報、通話、更新或工作，不要把定時器說成保證省電。

## 常見問題

### 網路月租要算進來嗎？

若問題是用電成本，不要算。把月租獨立列為連線成本；若要做完整網路預算，再合併兩者，但保留電力與服務兩個成本來源。

## 來源閱讀

可閱讀 EIA 的[電力價格說明](https://www.eia.gov/tools/faqs/faq.php?id=507)與[家庭用電指南](https://www.eia.gov/tools/faqs/faq.php?id=96&t=1)，以實測設備耗電與自己的已交付電力費率計算。
