---
contentType: article
articleSlug: "scanner-electricity-cost-per-scanning-session-used"
locale: "zh"
title: "掃描器每次工作電費：計入燈管與待機能源"
description: "用喚醒、燈管、送紙與待機的實測能源估算掃描器每次工作成本，再按實際掃描的頁數或文件分攤。"
relatedTool: "/zh/tools/budget-builder/"
canonical: "https://worthcalc.win/zh/guides/scanner-electricity-cost-per-scanning-session-used/"
lastReviewed: "2026-09-03"
draft: false
---

# 掃描器每次工作電費：計入燈管與待機能源

> **先說結論：** 用喚醒、燈管、送紙與待機的實測能源估算掃描器每次工作成本，再按實際掃描的頁數或文件分攤。 這是成本估算，不是節省、產品表現、排名或家庭結果保證。

## 會改變結果的輸入值

掃描器的每個掃描工作的成本，要先定義牆上電表的開始與結束。記錄 喚醒、燈管預熱、送紙、擷取、傳輸與睡眠，並保留設備狀態、亮度或音量、周邊、工作量、完成頁數或時間、費率單位與日期。額定瓦數、產品說明的典型值與工作時間都不能取代你這次的 kWh 讀值。

用插座電表做至少三次可重複測試；若是短時間或低負載，就合併多次再平均。若讀值包含螢幕、電腦、路由器或 USB 充電，應在紀錄中拆出每一項，否則不同設備的比較會把邊界差異誤認成效率差異。

## 公式與實際算例

每次成本＝指定開始點到指定結束點的實測牆上 kWh × 已交付電力費率。每個掃描工作的成本＝該次電費 ÷ 實際完成的掃描工作數量。25 頁掃描工作若實測 0.05 kWh、電價每 kWh 0.18，電費是 0.009，每頁約 0.00036。平台式單頁與自動送紙工作，若喚醒和送紙邊界不同，不宜直接比較。 這是示範分攤方法，不是任何型號、費率或家庭設備組合的預測。

不要把額定功率乘上整段工作或觀看時間，除非電表確認設備全程以該負載運轉。喚醒、加熱、顯示、馬達、音量、網路、電源供應器與自動睡眠都可能改變實測值；同一台設備也不會在每種內容或模式下消耗相同能源。

## 比較實際使用情境

把冷機啟動、連續一疊與重掃分開。解析度、色彩深度、雙面、送紙阻力、文件大小與電腦傳輸都可能改變邊界；要註明電表是否也涵蓋電腦。 比較時一次只改變一個條件，並明確寫出是每次工作、每頁、每件、每小時或整套系統。若想回答整體桌面或客廳成本，就把主機、顯示器、喇叭與網路設備分別量測後再加總；不要把單一設備的數字包裝成全套結果。

同群組可延伸閱讀：[3D 印表機每件列印成本](/zh/guides/3d-printer-electricity-cost-per-print-used/)、[遊戲主機每小時電費](/zh/guides/gaming-console-electricity-cost-per-gaming-hour-used/)、[Soundbar 每觀看小時電費](/zh/guides/soundbar-electricity-cost-per-watched-hour-used/)、[桌上型喇叭每聆聽小時電費](/zh/guides/desktop-speakers-electricity-cost-per-listening-hour-used/)。這些頁面分別處理列印、掃描、3D 列印、遊戲與音訊的單位成本，互鏈是為了幫讀者選對分母與設備邊界。

## 限制與常見誤區

電壓、費率方案、室溫、韌體、內容負載、解析度、亮度、音量、睡眠設定、耗材、電表解析度與固定費都可能影響結果。若要算完整持有成本，另列設備價格、耗材、維修、訂閱、紙張、材料與人工時間；不要把它們藏在電費一欄。這是成本估算，不是節省、產品表現、排名或家庭結果保證。

## 常見問題

### 電腦要算進掃描器電費嗎？

若問題是整個掃描工作站，就可以另列；比較掃描器時應先單獨量測掃描器，電腦分攤另設一個邊界。

## 來源閱讀

費率背景可參考 EIA 的[已交付電力價格說明](https://www.eia.gov/tools/faqs/faq.php?id=507)與[家庭用電概覽](https://www.eia.gov/energyexplained/use-of-energy/electricity-use-in-homes.php)。ENERGY STAR 的[影像設備資料](https://www.energystar.gov/products/imaging_equipment)與[電腦資料](https://www.energystar.gov/products/computers)說明產品類別、運作模式與電源管理；這些是類別與認證背景，不代表本設備的具體表現。CFPB 的[支出指南](https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/)適合用來把結果當作家庭決策的一項輸入。
