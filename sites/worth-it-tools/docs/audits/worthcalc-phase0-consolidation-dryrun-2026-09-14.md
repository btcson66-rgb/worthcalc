---
title: WorthCalc Phase 0 C consolidation dry-run
date: 2026-09-14
status: COMPLETE
scope: soft-deindex, hreflang, orphan guard, disposition planning
---

# WorthCalc Phase 0 C：Consolidation dry-run

## 結論

本次只讀驗證與工具實作完成。原始 50 筆 `deindexed-urls.json` registry 已恢復，沒有套用任何 keep、deindex 或 merge disposition，沒有新增 redirect 規則，也沒有部署或提交 sitemap／要求索引。

本次發現並修正一個 hreflang 邊界：原本只有 German cohort 會從其他語言的 translation cluster 移除；現在所有被 soft-deindex 的 sibling locale 都會被移除，避免 indexable 頁面宣告 noindex sibling。

## Scope 與現況盤點

- 分支：`codex/worthcalc-phase0-consolidation-dryrun-20260914`，基於 `origin/main`。
- 原始 registry：`src/data/deindexed-urls.json` 共 50 筆、50 筆唯一 URL；dry-run 後已恢復。
- 主要 consumer：`src/lib/seo.ts`（robots／canonical／hreflang）、`astro.config.mjs`（sitemap 排除）、`scripts/deindexing.mjs`（檢查期望 hreflang）、生成後的 guide index。
- `src/data/seo-redirects.json` 不存在，`public/_redirects` 不存在；目前沒有可讀回的 301 registry／consumer。
- `.github/workflows/deploy-worthcalc.yml` 有 build、Pages deploy、IndexNow 與 GSC sitemap submit，但沒有執行 `npm run verify` 的 workflow gate；本次未修改 workflow。

## 三筆 soft-deindex dry-run

暫時加入以下三種語言 URL，執行完整 build 後再恢復 registry：

- `/en/return-to-office-cost/`
- `/zh/return-to-office-cost/`
- `/es/annual-fee-card-breakeven/`

結果：build exit 0；sitemap 從 1,233 降至 1,230，且只移除上述三筆。三頁 HTML head 均為 `noindex,follow`，保留 self canonical，沒有 alternate／hreflang。檢查 guide、tool、topic directory 與 hub index 的直接引用均為 0。

## 800+ 容量測試

暫時加入 800 筆不重複、原本不在 registry 的 sitemap URL，使 registry 總數達 850 筆。

- build exit 0，耗時約 18.5 秒。
- `npm run check:guide-index` exit 0：1,156 個 editorial pages 全部可由 internal link 到達。
- `npm run check:links` exit 0：33,135 條 internal links 通過，2,570 個 social image references resolve。
- 測試 registry 已恢復原始 50 筆。

## Reverse-test：true orphan

暫時在 `dist/en/guides/true-orphan/index.html` 放入一個 indexable 測試頁，未建立任何 inbound link。`npm run check:guide-index` 正確 exit 1，列出 `/en/guides/true-orphan/`；測試檔已移除。

## hreflang 修正驗證

暫時將 `es/fr/de/hi/ar` 的 `annual-cost-savings-calculator` sibling 加入 registry。修正前，en／zh 頁面仍會宣告部分已 soft-deindex 的 ar、es、hi sibling，證實原 German-only filter 不足。

修正後：

- `src/lib/seo.ts` 改為 generic filter，任何 soft-deindexed alternate 都不再進入 indexable translation cluster。
- `scripts/deindexing.mjs` 改用完整 locale／hreflang map，逐一排除 soft-deindexed sibling；soft-deindexed 當頁的 expected hreflang 為空。
- en／zh 測試頁 robots 均為 `index,follow`，alternate 僅保留 `en`、`zh-Hant`、`x-default`，其中 x-default 指向 en。
- 暫時的五筆 sibling 已移除，registry 恢復 50 筆。

## Disposition planner 與 redirect 邊界

新增 `scripts/apply-disposition.mjs`，預設為 dry-run；支援 `keep`、`deindex`、`merge_into:<target-url>`，會驗證 URL、重複來源、空 reason、自我 merge、已下架 target 與既有 redirect 衝突。只有明確傳入 `--apply` 才會寫 registry／redirect 檔案。

新增 `tests/apply-disposition.test.mjs` 與 fixture，`npm run test:disposition` 結果為 3/3 pass。實際 fixture dry-run 結果為：input 3、keep 1、deindex 1（新增 1）、merge 1（新增 1），writes 為空；未產生 `seo-redirects.json`。

由於目前沒有 redirect registry 或 runtime consumer，本次無法宣稱 merge 已端到端回傳 301。這是 Phase 1 執行 merge 前的 blocker／風險，必須先建立並驗證 redirect contract，再允許 `--apply`。

## Final gates

- `npm run test:disposition`：PASS，3/3。
- `npm run verify`：PASS，exit 0。
- final sitemap：1,233 URLs。
- final link check：33,135 internal links OK；2,570 social image references resolve。
- final indexation metrics：canonicalMismatch 0、hreflangErrors 0、brokenInternalLinks 0、orphanIndexableUrls 0、failures []。
- 未部署、未執行下架／合併、未提交 sitemap、未要求索引、未修改 production。
