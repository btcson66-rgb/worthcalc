---
date: 2026-09-15
status: COMPLETE_LOCAL_READBACK
site: worthcalc.win
viewport: 375x667
---

# WorthCalc S2 通勤叢集手機驗收

本報告只驗收工單指定的 4 頁，使用本機 build 與 Playwright Chromium，在 375×667 viewport 讀回首個輸入、計算器容器與計算按鈕的 top Y，並附 viewport 截圖。其他 32 頁維持 S4 backlog，不在本次修改。

## 測量結果

| URL | HTTP | first input top Y | first number input top Y | calculator top Y | button top Y | first number above fold | overflow | screenshot | error |
|---|---:|---:|---:|---:|---:|---|---|---|---|
| /en/tools/commute-cost/ | 200 | 641.2 | 641.2 | 547.4 | 3128.7 | PASS | PASS | [s2-en-commute-cost-375.png](assets/s2-en-commute-cost-375.png) |  |
| /zh/tools/commute-cost/ | 200 | 635.5 | 635.5 | 541.7 | 3396.7 | PASS | PASS | [s2-zh-commute-cost-375.png](assets/s2-zh-commute-cost-375.png) |  |
| /en/tools/cost-per-mile/ | 200 | 631 | 631 | 467 | 2410.1 | PASS | PASS | [s2-en-cost-per-mile-375.png](assets/s2-en-cost-per-mile-375.png) |  |
| /zh/tools/cost-per-mile/ | 200 | 507.8 | 507.8 | 382.2 | 2238.3 | PASS | PASS | [s2-zh-cost-per-mile-375.png](assets/s2-zh-cost-per-mile-375.png) |  |

## 判定

- 首個數字輸入在 667px 首屏內，讓使用者可直接開始填寫距離或年度里程。
- 計算按鈕保留在輸入面板，輸入事件仍會即時更新；按鈕提供手動重算入口。
- 水平溢出以 scrollWidth 與 viewport 寬度比對；本次 4 頁應為 0px。
- 本機 layout readback 不等於正式部署、真實裝置或 Google 搜尋結果。
