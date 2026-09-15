---
date: 2026-09-15
status: PASS_LOCAL_READBACK
site: worthcalc.win
scope: S2 explicit targets and task-B 22-page list
---

# S2 內鏈讀回

以下以本機 build 的 HTML 讀回為準；連結均為正文段落，不是 footer 或 primary navigation，且 build 仍為 304 sitemap URLs。

## 六個 Google 未辨識的 calculator targets

| Source | Target | Paragraph / context | Status |
|---|---|---|---|
| `/en/tools/commute-cost/` | `/en/tools/cost-per-mile/` | `What a year of commuting adds up to`：補充單一車輛 ownership cost per mile 的下一步。 | PASS |
| `/en/tools/ev-vs-gas/` | `/en/tools/cost-per-mile/` | `How it works` 後新增段落：區分單車每 mile 成本與 EV-vs-gas 多年持有比較。 | PASS |
| `/zh/tools/commute-cost/` | `/zh/tools/cost-per-mile/` | `一年通勤會累積多少車馬費`：補充單一車輛每公里持有成本入口。 | PASS |
| `/zh/tools/ev-vs-gas/` | `/zh/tools/cost-per-mile/` | `計算方式` 後新增段落：區分單車每公里成本與整體油電持有比較。 | PASS |
| `/zh/` | `/zh/tools/dti-calculator/`, `/zh/tools/home-affordability/` | 首頁正文 `網站與決策入口`：以住房／負債決策路徑連到兩個工具。 | PASS |
| `/zh/tools/` | `/zh/tools/dti-calculator/`, `/zh/tools/home-affordability/` | 計算機目錄 intro：以房貸與負債壓力的同一決策脈絡連到兩個工具。 | PASS |
| `/zh/tools/latte-factor/` | `/zh/tools/compound-growth/` | `計算方式`：把每月省下金額接到複利期間測試。 | PASS |
| `/es/is-costco-executive-membership-worth-it/` | `/es/tools/costco-membership/` | 西班牙 Costco 文章的「La pregunta útil」段落：用本地會員資料計算器替換假設。 | PASS（原有正文連結確認） |

## Task B 的 22 個已索引但無 inbound link targets

首頁正文 `Site and decision links`／`網站與決策入口` 段落已為每個 target 提供至少一個 contextual inbound link：

| Target | Source paragraph |
|---|---|
| `/` | `/en/` 的 `Site and decision links` |
| `/de/` | `/` 的 `Site and decision links` |
| `/de/terms/` | `/de/` 的 `Website und Entscheidungen` |
| `/en/changelog/` | `/en/` 的 `Site and decision links` |
| `/en/terms/` | `/en/` 的 `Site and decision links` |
| `/es/` | `/` 的 `Site and decision links` |
| `/es/about/` | `/es/` 的 `Sitio y decisiones` |
| `/es/changelog/` | `/es/` 的 `Sitio y decisiones` |
| `/es/contact/` | `/es/` 的 `Sitio y decisiones` |
| `/es/disclaimer/` | `/es/` 的 `Sitio y decisiones` |
| `/es/privacy/` | `/es/` 的 `Sitio y decisiones` |
| `/es/terms/` | `/es/` 的 `Sitio y decisiones` |
| `/fr/` | `/` 的 `Site and decision links` |
| `/fr/about/` | `/fr/` 的 `Le site et vos décisions` |
| `/fr/changelog/` | `/fr/` 的 `Le site et vos décisions` |
| `/fr/contact/` | `/fr/` 的 `Le site et vos décisions` |
| `/fr/disclaimer/` | `/fr/` 的 `Le site et vos décisions` |
| `/fr/privacy/` | `/fr/` 的 `Le site et vos décisions` |
| `/fr/terms/` | `/fr/` 的 `Le site et vos décisions` |
| `/zh/` | `/` 的 `Site and decision links` |
| `/zh/changelog/` | `/zh/` 的 `網站與決策入口` |
| `/zh/terms/` | `/zh/` 的 `網站與決策入口` |

## 邊界與限制

- 這是 build HTML 內鏈讀回，不代表 Google 已重新抓取、索引或產生流量；GSC 結果仍待平台資料。
- 沒有新增 URL；`check:indexation` 回報 `orphanIndexableUrls: 0`、`brokenInternalLinks: 0`、`canonicalMismatch: 0`、`hreflangErrors: 0`。
