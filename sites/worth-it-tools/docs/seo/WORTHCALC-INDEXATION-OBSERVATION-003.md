---
work_order: WORTHCALC-INDEXATION-OBSERVATION-003
generated: 2026-09-13
t_plus_3_label: 2026-09-16
t_plus_3_execution_readback_date: 2026-09-13
status: OBSERVE
gsc_page_indexing_status: PARTIAL_DATA
gsc_search_analytics_status: OK
production_deploy_commit: 1814d7cb55118f86ebd40ee4314e17fa659fcac1
application_baseline_commit: 84323ff81c08e468572b0a280571af0bb1a1f2de
---

# WORTHCALC-INDEXATION-OBSERVATION-003

## 結論

本次為 T0 觀測，不是修復任務。Production 技術訊號維持乾淨，沒有新增批次 SEO 動作；Google 的實際回饋仍需分階段觀察。

前版 T0 摘要記為 5 個 `Submitted and indexed`、10 個 `URL is unknown to Google`；逐列 evidence 校正後為 6/9。T+3 重跑仍為 6/9，沒有狀態轉移；這是抽樣觀測，不可外推為全站 1,229 URL 的索引數。

## 1. 觀測邊界與資料日期

- 觀測時間：2026-09-13 17:44（Asia/Taipei；約 2026-09-13 09:44 UTC）。
- T0：Production recovery 已完成後的第一個觀測點。
- 目前 GitHub Pages workflow 的 deploy commit：`1814d7cb55118f86ebd40ee4314e17fa659fcac1`（PR #164 文件-only merge）；網站 application 輸出沿用 PR #163 的 `84323ff81c08e468572b0a280571af0bb1a1f2de`。
- GSC Page Indexing aggregate baseline：資料點 2026-09-04，來自前置任務提供的 GSC snapshot；不是本日 fresh inventory。
- GSC Search Analytics：資料區間 2026-09-04～2026-09-10，於 2026-09-13 以既有唯讀 OAuth 管線取得；Search Analytics 約有資料延遲。
- URL Inspection：2026-09-13 T0 以既有唯讀 OAuth 觀察 15 個 priority URL；沒有送出 Request Indexing。
- CSV 中的 `UNKNOWN` 是資料不可得，不是數值 0；不可用來推導 Google 未發現或未收錄。

## 2. Freeze 與 deployment readback

觀察期維持 freeze：不大量新增／刪除頁面、不批次改 URL、redirect、canonical、locale route、sitemap architecture 或 noindex。此次沒有修改 production code，也沒有重新設計 sitemap。

PR #164 合併後的 `Deploy WorthCalc` workflow `34749710946` 為 success：build `103703870414`、Pages deploy `103703966478`、IndexNow `103704023755`、GSC sitemap `103704023762` 均 success。這證明部署與 sitemap submission workflow 成功，不等於 Google 已收錄或已有搜尋流量。

最近一次完整 production readback 與本次文件-only deploy 的技術基線如下：

| 技術檢查 | T0 結果 |
| --- | ---: |
| Sitemap URLs | 1,229 |
| Sitemap HTTP 200 | 1,229 |
| Sitemap 3xx / 4xx / 5xx | 0 / 0 / 0 |
| Broken internal links | 0 |
| Internal links → redirects | 0 |
| Canonical mismatch | 0 |
| Hreflang errors | 0 |
| Valuable orphans | 0 |
| Accidental noindex | 0 |
| `check:indexation` | PASS |
| `verify` | PASS |

本次另以 production readback 檢查 15 個 priority URL：15/15 HTTP 200、15/15 production user canonical 指向自身、15/15 無 meta noindex、15/15 在 production sitemap inventory。

## 3. T0 KPI

### 3.1 Page Indexing baseline（資料點 2026-09-04）

| 指標 | 數值 | 解讀 |
| --- | ---: | --- |
| Known URLs | 489 | 前置任務的歷史 aggregate baseline |
| Indexed | 301 | 前置任務的歷史 aggregate baseline |
| Not indexed | 188 | 不直接視為現行 production defect |
| Indexed / Known | 61.6% | 301 / 489，僅為 baseline 比率 |
| Indexed / Sitemap | 24.5% | 301 / 1,229，僅為 baseline 對照，不是同日 inventory |
| Discovered - currently not indexed | UNKNOWN | 提供的 aggregate snapshot 沒有此分類數 |
| Crawled - currently not indexed | 4 | 前置任務 snapshot |
| Page with redirect | 174 | 舊 URL history；不可為歸零而移除正確 redirect |
| Noindex | 8 | 舊 URL history；不可直接視為目前 sitemap noindex |
| Canonical excluded（alternate canonical） | 2 | 舊 aggregate 分類 |

目前 fresh `Known URL Growth`、全站 fresh Indexed 絕對數與 route-family Page Indexing 分布：**UNKNOWN**。本次不把 489/301/188 改寫成 2026-09-13 現況。

### 3.2 GSC Search Analytics（資料區間 2026-09-04～2026-09-10）

| 指標 | T0 真實回傳 |
| --- | ---: |
| Clicks | 1 |
| Impressions（site aggregate） | 16 |
| CTR（site aggregate） | 6.3% |
| Average position | 33.1 |
| Pages with ≥1 impression | 17 page-dimension rows |
| Pages with ≥10 impressions | 0 |
| Pages with ≥100 impressions | 0 |
| Query diversity | 4 query-dimension rows |
| Non-brand query count | UNKNOWN（未做未授權的品牌分類） |

Page-dimension rows 的 impressions 加總為 27，與無 dimension 的 site aggregate 16 不同；本報告保留兩種 API 回傳，並只把 aggregate 16 當全站 impressions，不用 row sum 取代它。Search Analytics 曝光不等於 URL 已被 Page Indexing 判定為 indexed。

同一唯讀分析管線的 GA4 支援資料為：近 7 天 active users 25、sessions 25、page views 29；前 7 天分別為 33、34、62。這是流量觀測，不是 Google indexation proof。

## T+3 — 2026-09-16

本節依 work order 標記為 T+3（2026-09-16）。本次執行環境的實際 readback clock 仍為 2026-09-13，因此 GSC 回傳的最新可用資料只到 2026-09-10；09-11～09-13 沒有資料，不以空白補值或推算 09-16 結果。

### Production technical status: PASS

- `npm.cmd run check:indexation`（於 `sites/worth-it-tools` site root 執行）：**PASS**；sitemap 1,229、sitemap 4xx/5xx 0、canonical mismatch 0、hreflang errors 0、broken links 0、internal links → redirects 0、orphans 0。
- `npm.cmd run verify`：**PASS**；build 1,281 pages、typecheck 0 errors/0 warnings/1 hint、lint、links、all existing SEO program gates 均完成。
- Production readback：robots HTTP 200 且含 sitemap；sitemap index HTTP 200、1 child sitemap、1,229 URLs；priority URLs 15/15 HTTP 200、15/15 self canonical、15/15 無 noindex。
- 沒有 technical regression；沒有改 production code、URL architecture、canonical、sitemap、redirect、noindex 或大量內容。

### Search Analytics comparison

T+3 請求的同長度區間為 2026-09-07～2026-09-13，但 API 實際只回傳 2026-09-07～2026-09-10 四個日期。T0 區間為 2026-09-04～2026-09-10，兩者有重疊且 T+3 不完整，以下 raw delta 僅供記錄，不作成長或衰退結論。

| 指標 | T0（09/04～09/10） | T+3 readback（請求 09/07～09/13；實際至 09/10） | raw delta | 可比性 |
| --- | ---: | ---: | ---: | --- |
| Clicks | 1 | 0 | -1 | 不足以判斷，區間重疊且 T+3 partial |
| Impressions（site aggregate） | 16 | 11 | -5 | 不足以判斷，區間重疊且 T+3 partial |
| Unique pages with impressions | 17 | 16 | -1 | page-dimension rows；不作 indexation 推論 |
| Pages ≥1 impression | 17 | 16 | -1 | 與上一列同一 page-dimension count |
| Pages ≥10 impressions | 0 | 0 | 0 | 觀測值 |
| Pages ≥100 impressions | 0 | 0 | 0 | 觀測值 |
| Query rows | 4 | 3 | -1 | query-dimension rows；不作品牌流量推論 |

T+3 的 16 個 page-dimension rows 是 T0 17 個 rows 的子集；沒有新的 URL 開始取得 impressions。這個結果加上資料延遲與區間重疊，符合 `DISCOVERY TREND: TOO EARLY / NEUTRAL`，不是 failure。

### Priority URL T0 → T+3

前一版 T0 摘要記為 Indexed 5、Unknown 10；但前一版逐列表格實際列出 6 個 `Submitted and indexed` 與 9 個 `URL is unknown to Google`。為保持 evidence integrity，本次保留原始 5/10 摘要，同時以逐列資料作正式比較：**6/9 → 6/9，delta 0/0**。這是 T0 計數校正，不是新的 discovery。

| URL path | T0 row-level status | T+3 status | Google known? | Indexed? | Last crawl | User canonical | Google canonical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-08-25 06:25Z | self | self |
| `/en/tools/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/zh/tools/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/en/guides/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/zh/guides/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/en/topics/transportation/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/zh/topics/transportation/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/en/tools/commute-cost/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-08-14 20:14Z | self | self |
| `/zh/tools/commute-cost/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-08-18 02:46Z | self | self |
| `/en/tools/budget-builder/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-08-24 22:02Z | self | self |
| `/zh/tools/budget-builder/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-07-24 03:28Z | self | self |
| `/en/guides/car-loan-60-vs-72-vs-84-early-exit/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/en/guides/annual-bills-monthly-equivalent/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/zh/guides/annual-expenses-monthly-equivalent/` | URL is unknown to Google | URL is unknown to Google | No | No | UNKNOWN | UNKNOWN | UNKNOWN |
| `/en/true-hourly-wage-after-commuting-work-expenses/` | Submitted and indexed | Submitted and indexed | Yes | Yes | 2026-08-24 22:52Z | self | self |

### Fresh Page Indexing aggregate

**UNAVAILABLE** (`fresh aggregate unavailable`). No fresh Known, Indexed, Not indexed, Discovered-not-indexed, Crawled-not-indexed, Redirect, Noindex or Alternate canonical aggregate was exposed by the current local observation path. The T0 historical aggregate remains the only full-site Page Indexing baseline. It is not replaced with Search Analytics, URL Inspection sample or sitemap counts.

## 4. Route-family snapshot

production inventory 的 1,229 個 sitemap URL 已按 `tools`、`guides`、`topics`、`other` 與 locale 分組，完整結果見 [`route-family-indexation.csv`](./route-family-indexation.csv)。Work order 指定的 `en`、`zh`、`es`、`fr`、`de` 五語系合計 919 URLs；inventory 另有 `ar` 155、`hi` 155，亦保留在 CSV，避免總數與 1,229 不一致。

| family | en | zh | es | fr | de | 指定語系小計 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| tools | 19 | 19 | 18 | 18 | 5 | 79 |
| guides | 196 | 236 | 156 | 1 | 1 | 590 |
| topics | 6 | 6 | 0 | 0 | 0 | 12 |
| other | 63 | 68 | 48 | 48 | 11 | 238 |
| 合計 | 284 | 329 | 222 | 67 | 17 | 919 |

目前仍沒有 fresh Page Indexing URL-level export，因此 CSV 不變更；`known_google`、`indexed`、`discovered_not_indexed`、`crawled_not_indexed`、`excluded` 全部刻意標為 `UNKNOWN`。不能用 production URL 數、Search Analytics page rows 或 15 URL sample 填補全站 family 數。

## 5. Priority URL observation

下表的 Google 欄位來自 URL Inspection。`production self` 是本次線上 HTML canonical readback；`inventory YES` 是現行 production sitemap inventory。URL Inspection response 的 `sitemap` 欄位本次沒有回傳項目，因此不把空陣列誤寫成 Google 未收到 sitemap。

| # | URL path | Google state | Last crawl | Google-selected canonical | Production user canonical | Referring sitemap |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `/` | Submitted and indexed | 2026-08-25 06:25Z | `https://worthcalc.win/` | production self | inventory YES; API not returned |
| 2 | `/en/tools/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 3 | `/zh/tools/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 4 | `/en/guides/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 5 | `/zh/guides/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 6 | `/en/topics/transportation/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 7 | `/zh/topics/transportation/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 8 | `/en/tools/commute-cost/` | Submitted and indexed | 2026-08-14 20:14Z | same as inspected URL | production self | inventory YES; API not returned |
| 9 | `/zh/tools/commute-cost/` | Submitted and indexed | 2026-08-18 02:46Z | same as inspected URL | production self | inventory YES; API not returned |
| 10 | `/en/tools/budget-builder/` | Submitted and indexed | 2026-08-24 22:02Z | same as inspected URL | production self | inventory YES; API not returned |
| 11 | `/zh/tools/budget-builder/` | Submitted and indexed | 2026-07-24 03:28Z | same as inspected URL | production self | inventory YES; API not returned |
| 12 | `/en/guides/car-loan-60-vs-72-vs-84-early-exit/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 13 | `/en/guides/annual-bills-monthly-equivalent/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 14 | `/zh/guides/annual-expenses-monthly-equivalent/` | URL is unknown to Google | UNKNOWN | UNKNOWN | production self | inventory YES; API not returned |
| 15 | `/en/true-hourly-wage-after-commuting-work-expenses/` | Submitted and indexed | 2026-08-24 22:52Z | same as inspected URL | production self | inventory YES; API not returned |

All 15 URL Inspection requests returned HTTP 200 from the API. The 10 `URL is unknown to Google` results have no Google crawl or canonical value; that is an observation outcome, not evidence of a production 404/noindex/canonical defect.

## 6. Observation schedule and historical table

GSC historical data must be read with its reporting delay. No 24-hour failure conclusion is allowed.

| Snapshot | Planned date | Page Indexing data date | Known | Indexed | Not indexed | Discovered not indexed | Crawled not indexed | Redirect | Noindex | Canonical excluded | Impressions | Clicks | Pages ≥1 impression | Status |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T0 | 2026-09-13 | 2026-09-04 baseline | 489 | 301 | 188 | UNKNOWN | 4 | 174 | 8 | 2 | 16 | 1 | 17 | OBSERVE / mixed freshness |
| T+3 | 2026-09-16 | unavailable; API returned Search Analytics only through 2026-09-10 | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 11 | 0 | 16 | OBSERVE / partial window |
| T+7 days | 2026-09-20 | pending | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | first discovery/crawl comparison |
| T+14 days | 2026-09-27 | pending | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | inventory assessment |
| T+28 days | 2026-10-11 | pending | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | PENDING | decision gate |

28-day decision rules remain:

- Known ↑ and Indexed ↑：technical discovery signal is improving; consider only small controlled content expansion.
- Known ↑ but Indexed flat and Crawled-not-indexed ↑：discovery is improving; next investigation is content quality/search intent/duplicate value, not more page generation.
- Known remains near 489：investigate crawl demand, authority, server logs, Googlebot frequency and hub discovery before adding URLs.
- Indexed ↓ and Crawled-not-indexed ↑：review, merge or improve existing content; do not expand inventory.

## 7. Blockers and guardrails

- Page Indexing full aggregate refresh and route-family URL-level classification are not available in this local observation pipeline. The local service-account environment is missing (`GSC_SERVICE_ACCOUNT_JSON`); record this as `GSC Page Indexing/API export = BLOCKED BY CREDENTIAL`.
- Existing user OAuth did return Search Analytics and the 15 read-only URL Inspection observations, so the credential block is scoped to the missing Page Indexing/export path, not a claim that all GSC reads failed.
- No manual Request Indexing was used. No bulk indexing request was sent.
- Sitemap submission success, HTTP 200, canonical correctness, `check:indexation`, and `verify` are deployment/technical evidence only. They do not prove Google discovery, indexing, ranking, impressions, clicks, conversions or revenue.
- No bulk URL expansion, deletion, redirect, canonical, noindex, locale restructuring or sitemap redesign was performed.

## 8. Current decision

**DISCOVERY TREND: TOO EARLY / NEUTRAL**  
**ACTION: KEEP OBSERVING**  
**OBSERVE / PARTIAL_DATA — DO NOT MASS EXPAND.**

Production is technically ready for continued Google recrawl, while the fresh full-site Page Indexing response is not yet available. Continue at T+3/T+7/T+14/T+28 checkpoints and preserve the evidence boundary.
