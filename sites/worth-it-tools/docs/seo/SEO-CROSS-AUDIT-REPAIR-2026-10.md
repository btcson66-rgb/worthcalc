# SEO-CROSS-AUDIT-AND-REPAIR-2026-10 — worthcalc

**RESULT:**

PARTIAL：local verified；正式交付／部署狀態見下列欄位，未證實 search outcome。

**SITE:**

worthcalc.win

**BING BASELINE:**

Costco short description 1；IndexNow batch 1；Known 146 / Indexed 71 / Warning 41 / Excluded 34。（使用者任務書提供歷史報表，沒有假設console已更新）

**AHREFS BASELINE:**

7 errors / short description 119 / long titles 44 / long descriptions 26 / noindex 399。（同上）

**CURRENT PRODUCTION BASELINE:**

HTML/anchor+sitemap collection 627 content URLs；home-anchor reachable 628（raw CF endpoint計數可能含1）；unique sitemap 227；fetch errors 0。

**GSC BASELINE:**

2026-07-05–2026-10-04，10 clicks / 853 impressions；CTR 1.17%。ZIP SHA-256 69ad2ffe1489814221f100aa2f71497734163399a15d35192ba4eabef9ebea7f。query/page/country/device 為獨立 aggregate，不虛构 joint query-page。

**CONFIRMED ISSUES:**

Costco guide 的 override 覆蓋原本摘要是實際根因；更新為目的、輸入及比較結果。Costco tool 改為 reward-eligible spending，避免把 total spending 誤當回饋資格。Latte 摘要對齊成本、頻率、替代方案和 modeled growth。IndexNow 由全 sitemap 改部署前差分 manifest、50 URL batches、重試／safe logs／production manifest readback；首次建立 baseline 不全量重送。

**STALE ISSUES:**

工具歷史數量與 current production 不一致的部分保留 STALE_CRAWL / DIFFERENT_THRESHOLD；未訪問console設定不標為已修。

**INTENTIONAL CONDITIONS:**

399 content noindex 為 source registry/pruning/locale retirement；/en/ canonical 指向主首頁，屬 canonical duplicate；未 bulk remove。四篇既有 publishAt=2026-10-07 內容在 local build 自動到期（227→231 sitemap），不是本次新增源檔或索引政策變更。

**ROOT CAUSES:**

metadata override與整站批次submission；已於source確認。

**FIXES:**

Costco guide 的 override 覆蓋原本摘要是實際根因；更新為目的、輸入及比較結果。Costco tool 改為 reward-eligible spending，避免把 total spending 誤當回饋資格。Latte 摘要對齊成本、頻率、替代方案和 modeled growth。IndexNow 由全 sitemap 改部署前差分 manifest、50 URL batches、重試／safe logs／production manifest readback；首次建立 baseline 不全量重送。

**FILES CHANGED:**

.github/workflows/deploy-worthcalc.yml、sites/worth-it-tools/.gitignore、sites/worth-it-tools/config/url-budget.json、sites/worth-it-tools/docs/full-audit-002/WORTHCALC-CALCULATOR-E2E-002.json、sites/worth-it-tools/docs/full-audit-002/WORTHCALC-EXPORT-GATE-E2E-002.json、sites/worth-it-tools/package.json、sites/worth-it-tools/scripts/submit-indexnow.mjs、sites/worth-it-tools/src/data/s4TitleOverrides.json；新增 crawler/compare/fixture、CSV、本報告及GSC evidence（raw response gzip僅本機）。

**SITEMAP BEFORE / AFTER:**

227 / 231（production baseline / local output）。Invalid canonical/indexable200 members after=0；active empty errors after=0。

**INDEXABLE BEFORE / AFTER:**

227 / 231 canonical eligibility rows；主表以sitemap authority和compare為準，非Google索引數。

**NOINDEX BEFORE / AFTER:**

399 / 399；source政策沒有重開或移除。

**4XX BEFORE / AFTER:**

0 / 0 content routes；CF email endpoint原raw404為INFO，source mailto+Cloudflare transformation，保留raw證據。

**5XX BEFORE / AFTER:**

0 / 0。

**BROKEN LINKS BEFORE / AFTER:**

0 / 0 content edges。

**SHORT DESCRIPTION BEFORE / AFTER:**

118 / 118（en120/zh70 advisory；不為字數改無關內容）。

**DUPLICATE DESCRIPTION BEFORE / AFTER:**

0 / 0。

**TITLE ISSUES BEFORE / AFTER:**

length signals 31 / 32；missing 0 / 0；duplicate 0 / 0。

**HREFLANG:**

after indexable groups anomalies=0；locale/canonical/robots比對維持；noindex private groups不當成索引缺陷。

**INDEXNOW:**

last-accepted artifact差分與small batch已完成；failure不前進baseline，重試仍保留pending delta；首deploy baseline0URLs，後續changed-only。提交成功≠收錄。

**INTERNAL LINKS:**

after broken=0 / redirect edges=0；orphan-like=0為discovery signal，未批量footer補鏈。FunnyTools所有重要indexable有2+distinct來源（代表contextual需人讀）。

**BUILD:**

PASS (local logs)

**TESTS:**

原 verify PASS 後加 submitter tests 發現 Windows import path 與lint問題，已修復；final verify請以 optimization-verify-final.log 與測試狀態讀回為準。既有 calculator E2E18/18、export gate7/7 PASS。

**SEO CRAWL:**

見 evidence/optimization-regression.json 或 evidence/regression.json；local comparison

**PRODUCTION READBACK:**

基線已取得；modified output未部署，NOT_VERIFIED_AFTER_DEPLOY。

**COMMIT:**

待最後測試後commit

**PR:**

待最後測試後Draft PR

**DEPLOYMENT:**

NOT_DEPLOYED；RoomFeng/WorthCalc須依公司規範由老闆審核PR。

**REMAINING RISKS:**

GSC匯出為三個月aggregate且最後日期10-04；沒有comparable final query-page分群與因果證據。rawCF edge與HTML content分開。RoomFeng crawl config未登入Ahrefs驗證。既有實驗歸因限制保留。

**WHAT BING SHOULD SEE NEXT:**

成功部署後重新crawl可取得修復後有效sitemap/摘要；告知變更是submission signal，不承諾warning即時消失。

**WHAT AHREFS SHOULD SEE NEXT:**

依Domain/Prefix範圍重新crawl，確認工具專案scope與crawl limits；intentional noindex不要求清零。

**MANUAL ACTION REQUIRED:**

Review concrete Draft PR；RoomFeng key已設定，部署後再驗證publickey/changed submit。

資料來源：使用者任務書、四份GSC ZIP、保存之production response與source。技術參考：[IndexNow protocol](https://www.indexnow.org/documentation)、[Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)。
