---
date: 2026-09-15
status: PASS_LOCAL_READBACK
site: worthcalc.win
scope: S3 appliance hub and Taiwan charging calculator
---

# WorthCalc S3 資料與邊界驗收

## 來源邊界

工單要求的 CEO 裁決檔 `Company Vault/10_Web_Department/Evidence/2026-09-14-gsc/s3-reference/CEO-裁決.md` 與 fallback `appliances-wattage-reference.csv` 在本機、既有 worktree 與 Downloads 唯讀搜尋均未找到，因此標記為 `UNKNOWN / NOT AVAILABLE`，沒有把搜尋摘要或未驗證 CSV 寫入程式。家電資料只合併 repo 現有 895 份指南中能對應的 watt anchor；未找到可追溯錨點的 dryer、washing machine、dishwasher、water heater、hot tub、EV home charging 沒有硬塞進清單。

## Gate readback

```text
npm.cmd run build
[url-count] 306 URLs in the sitemap (no change since 2026-09-15).
[s3-appliances] 43 entries; source_url 43/43; verified_date 43/43; banned rate 8.12 0; PASS
[s3-boundary] 3/3 pages; required input/output markers present; banned rate 8.12 0; PASS
```

`src/data/appliances.json` 共 43 筆；43/43 有 `source_url`，43/43 有 `verified_date`，瓦數範圍與預設值皆通過有限非負數檢查。每筆清單列均輸出名稱、瓦數範圍、來源連結與查核日。兩個新 hub 與中文充電頁均有輸入、公式／輸出、來源與 no-banned-rate 邊界檢查。

## 官方費率查核

- 台電官方簡要電價表標示 `2025-10-01` 起實施；住宅非時間 331–500 度為夏月 NT$3.80、非夏月 NT$3.13／度。
- 台電簡易型時間電價：夏月（6/1–9/30）尖峰／離峰 NT$5.16／2.06；非夏月尖峰／離峰 NT$4.93／1.99／度，頁面也列出適用時段並讓使用者改填自己的契約與帳單。
- [台電官方簡要電價表](https://www.taipower.com.tw/media/dhuhrppu/%E7%B0%A1%E8%A6%81%E9%9B%BB%E5%83%B9%E8%A1%A8.pdf?mediaDL=true) 為查核來源；程式與內容沒有使用錯誤的 `8.12`。
- [EIA 官方月表](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_03) 的 2026 年 6 月住宅平均為 18.34 cents/kWh（preliminary），英文 hub 以 `$0.1834/kWh` 作可編輯起點。
- [U-POWER 官方 FAQ](https://www.u-power.com.tw/qa/charge.html) 查核到會員離峰 NT$6.9、尖峰 NT$13.5、假日 NT$8.5、非會員全時 NT$14／度；頁面明示場站與 APP 可能不同，公共價格仍是使用者輸入。

## 功能與限制

家電 hub 提供 43 筆下拉選單、可編輯瓦數／每日時數／電價、每小時／日／30 日／365 日輸出、同一電價下的清單排序、完整來源表，以及保留署名與 backlink 的 iframe embed snippet。台灣頁提供車輛 kWh/100km、每月公里、台電方案／家用單價、公共單價、家充工程成本輸入，並輸出每月／每年、每 kWh 與能源差額回本比較。

這是本機 build 與本機瀏覽器 readback；未部署、未送出 IndexNow／GSC、未宣稱排名、索引、流量或轉換。
