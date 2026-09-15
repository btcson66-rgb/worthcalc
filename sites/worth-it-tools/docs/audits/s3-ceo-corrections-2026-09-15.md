---
date: 2026-09-15
status: COMPLETE_LOCAL_READBACK
scope: S2 CEO correction follow-up
---

# S3 CEO 修正追蹤

指定的 `CEO-裁決.md` 在本機、既有 worktree 與 Downloads 唯讀搜尋均未找到，因此以下以 S2 交付報告列出的 22 個 source paragraph／target pair 做可驗證的修正追蹤；缺失檔案本身仍標記 `UNKNOWN`，未用搜尋摘要補寫。

## 22 個 source paragraph／target 對照

| # | source paragraph | target | 修正後狀態 |
|---:|---|---|---|
| 1 | `/en/` — `Site and decision links` | `/` | 保留首頁連結；不再新增法務正文連結 |
| 2 | `/` — `Site and decision links` | `/de/` | 保留首頁連結；不再新增法務正文連結 |
| 3 | `/de/` — `Website und Entscheidungen` | `/de/terms/` | 移除新增正文連結；footer 保留 |
| 4 | `/en/` — `Site and decision links` | `/en/changelog/` | 移除新增正文連結；footer 保留 |
| 5 | `/en/` — `Site and decision links` | `/en/terms/` | 移除新增正文連結；footer 保留 |
| 6 | `/` — `Site and decision links` | `/es/` | 保留首頁連結；不再新增法務正文連結 |
| 7 | `/es/` — `Sitio y decisiones` | `/es/about/` | 移除新增正文連結；footer 保留 |
| 8 | `/es/` — `Sitio y decisiones` | `/es/changelog/` | 移除新增正文連結；footer 保留 |
| 9 | `/es/` — `Sitio y decisiones` | `/es/contact/` | 移除新增正文連結；footer 保留 |
| 10 | `/es/` — `Sitio y decisiones` | `/es/disclaimer/` | 移除新增正文連結；footer 保留 |
| 11 | `/es/` — `Sitio y decisiones` | `/es/privacy/` | 移除新增正文連結；footer 保留 |
| 12 | `/es/` — `Sitio y decisiones` | `/es/terms/` | 移除新增正文連結；footer 保留 |
| 13 | `/` — `Site and decision links` | `/fr/` | 保留首頁連結；不再新增法務正文連結 |
| 14 | `/fr/` — `Le site et vos décisions` | `/fr/about/` | 移除新增正文連結；footer 保留 |
| 15 | `/fr/` — `Le site et vos décisions` | `/fr/changelog/` | 移除新增正文連結；footer 保留 |
| 16 | `/fr/` — `Le site et vos décisions` | `/fr/contact/` | 移除新增正文連結；footer 保留 |
| 17 | `/fr/` — `Le site et vos décisions` | `/fr/disclaimer/` | 移除新增正文連結；footer 保留 |
| 18 | `/fr/` — `Le site et vos décisions` | `/fr/privacy/` | 移除新增正文連結；footer 保留 |
| 19 | `/fr/` — `Le site et vos décisions` | `/fr/terms/` | 移除新增正文連結；footer 保留 |
| 20 | `/` — `Site and decision links` | `/zh/` | 保留首頁連結；不再新增法務正文連結 |
| 21 | `/zh/` — `網站與決策入口` | `/zh/changelog/` | 移除新增正文連結；footer 保留 |
| 22 | `/zh/` — `網站與決策入口` | `/zh/terms/` | 移除新增正文連結；footer 保留 |

## 實作 readback

- `src/components/HomePage.astro` 已移除 S2 新增的 `siteInfoLinks` 正文區塊；首頁語言入口與決策入口保留。
- 法務 footer 沒有刪除或改成 noindex；terms、privacy、disclaimer、contact、about、changelog 的既有 footer 導航保留。
- S2 報告另列的 `/es/is-costco-executive-membership-worth-it/ → /es/tools/costco-membership/` 是既有決策工具連結，不屬於本次新增法務 link，故保留。
- `npm.cmd run check:links`：`All 33222 internal links OK (all page links end in a slash); 2574 social image references resolve.`
- `npm.cmd run check:indexation`：`canonicalMismatch: 0`、`hreflangErrors: 0`、`brokenInternalLinks: 0`、`orphanIndexableUrls: 0`。
