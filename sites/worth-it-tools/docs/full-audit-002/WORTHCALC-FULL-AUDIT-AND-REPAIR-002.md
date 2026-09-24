# WORTHCALC-FULL-AUDIT-AND-REPAIR-002

RESULT: **SOURCE_READY**（PR #175 候選版；生產尚未部署）

## 身分與邊界

- `origin/main`：`7638b2e8c7dee2ac791716e6abc45b90f35f719e`（2026-09-24 再次 fetch 核對）。
- 最新成功的 WorthCalc deploy run：`35838249397`，head SHA 同上。生產 HTTP `Last-Modified` 為 2026-09-23 08:40:31 GMT，與部署時間相符；本次沒有寫入 production。
- BEFORE 為生產爬測；AFTER 為此分支 build 的本機 preview 爬測。兩者不是同一個環境，不能把 AFTER 當作上線驗證。
- 沒有修改 `deindexed-urls.json`、canonical 架構或 locale disposition。已刻意保留 `/en/` compatibility route。

## A–H 驗收

| 項目 | 結果 | 證據／限制 |
|---|---|---|
| A. canonical `/` 是否仍內鏈 `/en/` | 生產 **YES**；候選版 **NO** | 生產 `/` 與 `/zh/` 各有 alias 內鏈；移除 `HomePage.astro` 的一個 `homeLinks` 項後，181 個 indexable canonical 頁的 build guard 全通過。待 merge/deploy 後再讀回。 |
| B. `/en/` 是否 canonical 到 `/` | **YES** | BEFORE／AFTER 均 HTTP 200，canonical `https://worthcalc.win/`。 |
| C. `/en/` 是否排除 sitemap | **YES** | 生產子 sitemap 179 URL、9/24 候選版 181 URL，皆不含 `/en/`。 |
| D. intentional deindex 是否被誤恢復 | **NO** | 979 條 registry URL 與 es/fr/de locale 退役規則展開後共 1120 個 route；生產及候選版均 0 個意外回 sitemap/hreflang，399 個 HTTP 200 頁保留 noindex。 |
| E. 全核心 calculators 是否 interaction PASS | **YES，18/18** | 18 個 family 均測 route/render/example 或預填值/calculation/空白與負數輸入/locale/mobile/console、fresh context。9 個 GrowthCalculator 的 Reset 均通過；9 個 legacy auto-calculator 原本沒有 Reset 控制，Reset 記為 `NOT_APPLICABLE`，另測編輯後重算及新 context 的乾淨初始狀態。實際計算失敗 0。 |
| F. export/email gate 是否與 Privacy 一致 | **YES，依現行功能** | Growth 的 Copy/CSV/Print 均通過，並修正 4 個工具的空 CSV；Budget Builder save→reload→restore→clear 通過。`downloadGate.ts` 的 mock endpoint 測試涵蓋 email、無效 email 與失敗 fallback，但 18 個正式 calculator 頁均無 email-export 入口，Privacy 已改為描述現有 Copy/CSV/Print，同時保留 newsletter/Brevo 揭露。未發送實際郵件。 |
| G. 全 sitemap 是否逐 URL crawl | **YES** | BEFORE 生產 179/179；AFTER 9/24 本機候選版 181/181，CSV/JSON 逐列保存。 |
| H. broken/canonical/hreflang 是否 0 或完整解釋 | **YES，有解釋** | canonical/hreflang 問題均 0。生產 raw HTTP 的 6 個 broken-link 來源皆為 Cloudflare email-protection 佔位 URL；Playwright 中 contact email 解碼成 `mailto:`。候選版無 Cloudflare，broken links 0。 |

## 其他結果

- 生產 sitemap 1 個子檔、179 個 URL；9/24 候選 build 的既定排程 brief `/en/money/insurance-deductible-break-even/` 與 `/zh/money/insurance-deductible-break-even/` 新釋出 2 個 URL，共 181。這兩份 brief 在 base commit 已存在，PR alias repair 新增 SEO URL 為 0。候選 build 產生 582 個 HTML（581 個 `index.html` route 加 404）；路由清單、sitemap URL、redirect 清單與 hreflang 項另存檔。
- 生產 intentional-deindex 檢查：399 個 200/noindex、720 個 404、1 個 503；503 為 `/en/guides/true-cost-of-free-shipping-threshold/`，隨後兩次重查皆 404。候選版：399 個 200/noindex、721 個 404。404 不視作應恢復的頁面。
- 生產 sitemap URL：0 非 200、0 轉址、0 非 self-canonical、0 noindex、0 orphan、0 missing title/description/H1、0 schema JSON 解析錯誤。候選版同樣為 0。
- 高風險金融計算的瀏覽器固定數值 fixture：mortgage 零利率 1200/12 → 月付 100／12 個月；credit card 零利率 1200、月付 100 → 12 個月／利息 0；DTI 8000 收入與 2400 債務 → 30%，全部通過。`npm run test:growth` 的 engine edge cases 另由 `verify` 執行。
- `GrowthCalculator.astro` 的 Advanced inputs 在 accessibility snapshot 呈現 summary 與內層 fieldset 同名 group；目前沒有修改該結構，避免僅因純文字重複就改動控制項語意。

## 檔案

- `WORTHCALC-FULL-CRAWL-BEFORE-002.{csv,json,md}` 與 `WORTHCALC-FULL-CRAWL-AFTER-002.{csv,json,md}`：逐 URL 原始欄位與彙總。
- `WORTHCALC-FULL-AUDIT-AND-REPAIR-002-DIFF.md`：before/after 比較。
- `WORTHCALC-SITEMAP-URLS-002.csv`、`WORTHCALC-ROUTE-INVENTORY-002.json`、`WORTHCALC-DEINDEXED-REGISTRY-002.json`、`WORTHCALC-REDIRECT-INVENTORY-002.json`、`WORTHCALC-HREFLANG-MATRIX-002.csv`：當前清單。
- `WORTHCALC-CALCULATOR-E2E-002.json` 與 `WORTHCALC-EXPORT-GATE-E2E-002.json`：互動結果。
- `VERIFY-002.md`：`npm run verify`、補充 lint 與 E2E 的退出碼摘要；原始命令日誌保留於本機 worktree，未納入 PR。

## 下一道門檻

本分支的 source gate 已通過，可供 PR 審查。待核准後 merge/deploy，再從 production 重跑同一完整 crawl 及 `/en/` 內鏈 readback。本次沒有新增 legacy Reset UI 或 email-export 入口，也沒有擴大 SEO disposition。
