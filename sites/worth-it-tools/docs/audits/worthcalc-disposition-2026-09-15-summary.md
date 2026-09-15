---
date: 2026-09-15
status: APPLIED_LOCAL_VERIFIED
site: worthcalc.win
branch: sprint/worthcalc-consolidation-20260915
---

# WorthCalc S1 consolidation disposition 摘要

## Go 狀態與邊界

S1 v2 GO 已收到並完成本機套用、建置、抽驗與完整 verify。只推送 sprint branch，不部署、不推送 main、不觸發生產發布。

v2 已裁決：本次 duplicate sources 全是 Google 未辨識、90d 0 曝光頁，不使用 merge_into，不建立 301 規則；只做 soft deindex 與 sitemap 收斂。301 consumer 留給未來已索引頁的內容合併任務。

## 資料來源與交叉檢查

- A inventory：1,233 筆，來源為 sites/worth-it-tools/docs/audits/worthcalc-url-inventory-2026-09-14.csv。
- B GSC index-state：1,233 筆；Google 無法辨識的網址 1,017；已提交並建立索引 215；已檢索 - 目前尚未建立索引 1；90d 欄位保留原值，不估算。
- keep-list：157 筆，其中結尾斜線 112 筆、無結尾斜線 45 筆；無斜線列視為 301 殼，不進處置表。
- keep-list 交叉檢查：結尾斜線 keep-list 有 111 筆在 A inventory；1 筆不在 A/B inventory（https://worthcalc.win/de/tools/mortgage-payoff/）。
- B 主資料另有 5 筆 90d positive 未出現在 keep-list，依 v2 規則 6 保留，不把差異抹平。

## CEO 60 筆改判

- 讀取 CEO CSV：60 筆；驗證原判定全為 deindex、改判全為 keep、URL 全部存在且原 action 全為 deindex：PASS。
- 改判分布：en=16、es=9、fr=9、zh=26；全部改為一般 keep，不改為 keep-priority。
- 改判理由與字數／來源數已寫入 disposition CSV，作為 S1 追溯欄位。

## 最終處置總數

- keep：205
- keep-priority：99（全部為已索引但 90d 0／無資料）
- deindex：929
- merge_into：0 組；不產生 301。
- 預估套用後 sitemap：304 URLs（locale：ar=0、de=17、en=77、es=62、fr=62、hi=0、zh=86）。

CEO 改判前基線為 keep 145、keep-priority 99、deindex 989、sitemap 244；本次 60 筆 deindex→keep 後收斂為上述總數。

## Locale matrix

矩陣欄位為 disposition action 數量。

| locale | keep | keep-priority | deindex |
|---|---:|---:|---:|
| ar | 0 | 0 | 155 |
| de | 17 | 0 | 0 |
| en | 64 | 13 | 209 |
| es | 33 | 29 | 160 |
| fr | 25 | 37 | 5 |
| hi | 0 | 0 | 155 |
| zh | 66 | 20 | 245 |

## Route matrix

| route_type | keep | keep-priority | deindex |
|---|---:|---:|---:|
| guide | 0 | 0 | 895 |
| home | 5 | 0 | 0 |
| index | 117 | 71 | 34 |
| legal | 16 | 9 | 0 |
| tool | 55 | 19 | 0 |
| topic-hub | 12 | 0 | 0 |

## 六個未被辨識的 tool 資產

以下 6 筆均 action=keep；規則 2 優先於 coverageState，S2 需補 internal links：

- https://worthcalc.win/en/tools/cost-per-mile/
- https://worthcalc.win/es/tools/costco-membership/
- https://worthcalc.win/zh/tools/compound-growth/
- https://worthcalc.win/zh/tools/cost-per-mile/
- https://worthcalc.win/zh/tools/dti-calculator/
- https://worthcalc.win/zh/tools/home-affordability/

## 十二個 topic-hub

以下均 action=keep；v2 將其視為資訊架構骨幹，不按 Google coverage 下架：

- https://worthcalc.win/en/topics/debt-credit/
- https://worthcalc.win/en/topics/everyday/
- https://worthcalc.win/en/topics/housing/
- https://worthcalc.win/en/topics/income-savings/
- https://worthcalc.win/en/topics/memberships/
- https://worthcalc.win/en/topics/transportation/
- https://worthcalc.win/zh/topics/debt-credit/
- https://worthcalc.win/zh/topics/everyday/
- https://worthcalc.win/zh/topics/housing/
- https://worthcalc.win/zh/topics/income-savings/
- https://worthcalc.win/zh/topics/memberships/
- https://worthcalc.win/zh/topics/transportation/

## 已索引但 internal_inbound_links=0（22 筆）

這些是 homes/legal/footer 造成的 checker 排除項；本 S1 不修，S2／S4 再依工單處理：

- https://worthcalc.win/
- https://worthcalc.win/de/
- https://worthcalc.win/de/terms/
- https://worthcalc.win/en/changelog/
- https://worthcalc.win/en/terms/
- https://worthcalc.win/es/
- https://worthcalc.win/es/about/
- https://worthcalc.win/es/changelog/
- https://worthcalc.win/es/contact/
- https://worthcalc.win/es/disclaimer/
- https://worthcalc.win/es/privacy/
- https://worthcalc.win/es/terms/
- https://worthcalc.win/fr/
- https://worthcalc.win/fr/about/
- https://worthcalc.win/fr/changelog/
- https://worthcalc.win/fr/contact/
- https://worthcalc.win/fr/disclaimer/
- https://worthcalc.win/fr/privacy/
- https://worthcalc.win/fr/terms/
- https://worthcalc.win/zh/
- https://worthcalc.win/zh/changelog/
- https://worthcalc.win/zh/terms/

## apply／驗證結果

- dry-run：`input=1233`、`keep=304`、`deindex=929`、`merge=0`、`writes=[]`；registry hash 前後不變。
- `--apply`：寫入 `src/data/deindexed-urls.json`（新增 929 筆）與空的 `src/data/seo-redirects.json`（0 rules）。
- 20 筆 deindex head：noindex,follow、自 canonical、不在 sitemap、不出現在任何 hreflang alternate：PASS。
- 10 筆 keep head：index,follow（允許既有 `max-image-preview:large` 附加 directive）、在 sitemap，hreflang 僅指向 kept locale siblings 與 x-default：PASS。
- 10 筆 CEO 改判頁：index,follow、自 canonical、在 sitemap：PASS。
- build：exit 0；sitemap 304 筆，locale 分布 `ar=0、de=17、en=77、es=62、fr=62、hi=0、zh=86`。
- guide-index：1,156 editorial pages 全部可由 internal link 到達：PASS；links：33,135 internal links、2,570 social image references：PASS。
- 完整 `npm.cmd run verify`：exit 0；0 errors、0 warnings、canonical mismatch 0、hreflang errors 0、orphan indexable URLs 0、failures=[]。
- 為使既有 package/program gates 與 S1 registry 一致，33 個 SEO gate 改為保留頁完整驗證、soft-deindexed 頁驗證 noindex／不在 sitemap。

## 重要預期管理

將 929 個 URL 軟下架，主要是 Google 未辨識且 90d 0 曝光的 guide／index；對 Google 端多數是 no-op，因為 Google 本來就沒看過那些頁。目的不是讓 Google 重新評估，而是把 sitemap 從 1,233 收斂到 304，將 crawl budget 集中到保留頁。

## 執行邊界

- disposition CSV 已更新為 CEO v2 後版本，並已完成本機 apply/build/抽驗/verify。
- 不修 22 筆零 inbound 的 home/legal；robots 與 canonical 語義不變；僅補上 x-default 不得指向 soft-deindexed target 的 hreflang 過濾，不部署，不推送 main。
