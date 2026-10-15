---
type: audit
date: 2026-10-15
site: worthcalc.win
work_order: P1b-WC
---

# WorthCalc P1b：依核准處置清單執行刪除與合併（2026-10-15）

依據：`worthcalc-rebuild-p1-disposition-2026-10-15.csv`（CEO 已核准）與 P1 驗收裁決。驗證指令：`npm run verify`（含新增的 `check:rebuild-p1b`）。

## 結果

| 項目 | 前 | 後 |
|---|---|---|
| sitemap URL | 143 | 89（= keep 69 + rewrite 20） |
| `maxUrls` | 425 | 160 |
| 建置 HTML | 426 | 356（含 33 個 stub） |
| 全站 `<html lang>` | 首頁 zh-Hant-TW、其餘 zh-TW | 全部 zh-TW（/en/ 為 en） |

## remove（35 頁，刪除並回 404；英文鏡像一併刪除）

- `/zh/apr-vs-apy/`
- `/zh/bulk-buying-vs-small-packages/`
- `/zh/bulk-buying-waste-math/`
- `/zh/cost-per-use-expensive-item/`
- `/zh/how-to-calculate-net-worth/`
- `/zh/how-to-calculate-savings-rate/`
- `/zh/loan-term-vs-total-interest/`
- `/zh/meal-prep-vs-takeout-cost/`
- `/zh/money/airline-points-cash-value/`
- `/zh/money/auto-loan-rate-by-credit-score-2026/`
- `/zh/money/buy-now-or-wait-price-increase/`
- `/zh/money/childcare-cost-2026/`
- `/zh/money/credit-card-apr-2026/`
- `/zh/money/credit-score-points-dollar-value/`
- `/zh/money/electricity-price-per-kwh-2026/`
- `/zh/money/employer-match-vs-debt-payoff/`
- `/zh/money/heat-pump-payback-2026/`
- `/zh/money/home-warranty-break-even/`
- `/zh/money/idle-cash-cost-2026/`
- `/zh/money/insurance-deductible-break-even/`
- `/zh/money/irs-mileage-rate-2026/`
- `/zh/money/lease-buyout-break-even/`
- `/zh/money/mortgage-rate-2026-payment-impact/`
- `/zh/money/moving-for-a-job-full-cost/`
- `/zh/money/pet-insurance-break-even/`
- `/zh/money/pmi-removal-timing/`
- `/zh/money/rental-car-insurance-decline/`
- `/zh/money/should-i-file-an-insurance-claim/`
- `/zh/money/side-hustle-true-hourly-rate/`
- `/zh/money/solar-payback-2026/`
- `/zh/money/streaming-prices-2026/`
- `/zh/money/tsa-precheck-break-even/`
- `/zh/price-per-wear-clothing-shoes/`
- `/zh/reusable-vs-disposable-break-even/`
- `/zh/tools/latte-factor/`

## merge_into（19 頁，改為 redirect stub）

stub：`noindex,follow`、canonical 與 meta refresh 指向目標、無廣告載入器／hreflang／結構化資料、不進 sitemap。英文鏡像若有對應的英文目標頁也改為 stub（共 13 個），否則刪除。

| 被併頁 | 目標頁 | 搬到目標頁的重點 |
|---|---|---|
| `/zh/annual-vs-monthly-billing/` | `/zh/monthly-vs-annual-subscription/` | 退訂條款三類、新服務先月繳、折扣約 15% 門檻、年繳進行事曆、多人方案席次比（標為本站經驗法則）→ monthly-vs-annual-subscription |
| `/zh/emergency-fund-irregular-income/` | `/zh/emergency-fund-how-much/` | 收入底線與必要支出缺口、三種錢分帳、大額入帳分配順序 → emergency-fund-how-much |
| `/zh/emergency-fund-vs-debt-payoff/` | `/zh/emergency-fund-how-much/` | 最低付款→小型緩衝→分流→擴大安全墊四步、A/B 情境、整合債務拉長期限提醒 → emergency-fund-how-much |
| `/zh/emergency-fund-vs-sinking-fund/` | `/zh/emergency-fund-how-much/` | 可預測性/急迫性兩問、每月存 = 預計總額 ÷ 月數、年度已知支出缺口、重複計算 → emergency-fund-how-much |
| `/zh/extended-warranty-math/` | `/zh/is-an-extended-warranty-worth-it/` | 三個快篩（經驗法則）、三種例外、信用卡/法定保障先查、自保基金 → is-an-extended-warranty-worth-it |
| `/zh/is-costco-executive-membership-worth-it/` | `/zh/tools/costco-membership/` | 無需搬移：目標頁已涵蓋門檻公式、排除項目、四項查核 → tools/costco-membership |
| `/zh/money/emergency-fund-size-2026/` | `/zh/emergency-fund-how-much/` | 無需搬移：必要支出 vs 總支出的觀念目標頁已有，其餘為美國利率與美元算例 → emergency-fund-how-much |
| `/zh/money/pay-off-car-loan-early-or-invest/` | `/zh/money/car-loan-vs-cash/` | 提前還清 = 確定報酬、打平點 = 貸款利率、流動性成本、先索取清償金額 → money/car-loan-vs-cash |
| `/zh/simple-vs-compound-interest/` | `/zh/how-compound-growth-works/` | 單利複利公式與算例、複利頻率與 APY、信用卡每日週期利率、負攤還 → how-compound-growth-works |
| `/zh/tools/cashback-breakeven/` | `/zh/annual-fee-card-breakeven/` | 多類別回饋公式與打平月消費算式（計算機本身不搬，見待判斷事項）→ annual-fee-card-breakeven |
| `/zh/tools/cost-per-mile/` | `/zh/tools/commute-cost/` | 完整每公里持有成本公式、折舊算法、固定成本分攤 → tools/commute-cost |
| `/zh/tools/ev-vs-gas/` | `/zh/ev-vs-gas-total-cost/` | 電動機車 vs 125cc 油車算法（購車價、補助、電池資費、40 km/L）→ ev-vs-gas-total-cost |
| `/zh/tools/rent-vs-buy/` | `/zh/rent-vs-buy-breakeven-year/` | 無需搬移：目標頁計算機與來源更完整 → rent-vs-buy-breakeven-year |
| `/zh/topics/debt-credit/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |
| `/zh/topics/everyday/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |
| `/zh/topics/housing/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |
| `/zh/topics/income-savings/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |
| `/zh/topics/memberships/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |
| `/zh/topics/transportation/` | `/` | 六個主題目錄頁的連結已由首頁情境分組取代；無內容可搬 |

## 檢查變更（逐條）

- 新增 `check:rebuild-p1b`（已併入 verify）：remove 頁不存在（含英文鏡像）、merge 頁是正確的 stub、目標頁為 sitemap 內的真頁面、registry 與 dist 的 stub 一致、全站沒有連到 remove 頁或 stub 的內部連結、sitemap = keep+rewrite、`<html lang>`、退役語系無殘留內容。做過突變測試（還原被刪頁、把 stub 換成真頁、連到 stub、首頁 lang、stub canonical 錯誤，皆會失敗）。
- `check:rebuild-p1`：CSV 中 remove／merge 的列必須「不在」sitemap（原本要求每一列都在）；首頁 lang 改為 zh-TW。
- 縮減清單（頁面確實已不存在）：`check-multilingual-editorial`（少 5 個題目）、`check-five-language-shell`（少 4 個工具、2 個補充頁）、`audit-editorial-brief-coverage`（題目 29→24、變體 58→48、工具頁底線 40→30，並把 stub 獨立計類，不計入底線）、`check-s4-title-overrides`（63→31 對）、`check-growth-content`（只驗 en／zh）。
- 感知 stub：`check-guide-index`、`check-indexation-recovery`（stub 的 canonical 指向目標是設計，不算 collision；移除已不存在的 topic hub 路由）、`generate-guide-index`。
- 未停用任何仍適用的檢查。

## 退役語系（es／fr／de／hi／ar）實體刪除

- 內容：`growth-articles/{es,fr,de,hi,ar}`（10+10+10+14+14）、`growth-tools/{es,fr,de}`（10+10+10）。
- 資料：465 個 schema JSON、465 張 OG 圖（es／hi／ar）、405 筆 seoPackage 登錄與 3 個套件內的逐語系翻譯列。
- 程式內嵌翻譯：以 AST 機械移除（`decisionGuides`、`home`、`topics`、`ui`、30 個 `[locale]/*.astro` 頁與計算機元件等），`Locale` 型別收斂為 `en | zh`；`coreToolContent.ts`、`legalContent.ts`、`LocalizedCoreCalculator.astro` 因只服務退役語系而刪除。
- 驗證：刪除前後各做一次乾淨建置，356 個 HTML 在忽略 `<style>`、資產雜湊與元素順序後完全相同；sitemap、robots、ads.txt 相同。
- 未動：`scripts/create-seo-program-*.mjs`（一次性套件產生器，內含舊翻譯，輸出早已提交，不要重跑）、`docs/` 底下的歷史稽核紀錄、`deindexed-urls.json` 的歷史 URL 清單。
