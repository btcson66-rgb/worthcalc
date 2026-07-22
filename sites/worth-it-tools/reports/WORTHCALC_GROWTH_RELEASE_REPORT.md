# WorthCalc Growth Pack v1 整合報告

- 日期：2026-07-23（Asia/Taipei）
- 狀態：`READY_FOR_PR_REVIEW`，尚未 push、尚未建立 PR、尚未合併或部署
- 範圍：成長包 Batch A + Batch B；Batch C 通膨工具維持封鎖

## 起始狀態

| 項目 | 值 |
|---|---|
| Repository | `D:\網站` |
| Remote | `https://github.com/btcson66-rgb/worthcalc.git` |
| 最新基準 | `origin/main` @ `3bbbb1123edc7b439b18f938433c591e23a835ed` |
| 隔離 worktree | `D:\Fable company-worktrees\worthcalc-growth-v1-20260723` |
| Feature branch | `codex/worthcalc-growth-v1-20260723` |
| Node / npm | Node `v24.14.0` / npm `11.9.0` |
| 原工作樹保護 | `D:\網站` 的未追蹤檔案與既有分支均未修改 |

來源包在整合前已執行 `npm install && npm run verify`，TypeScript、smoke、edge-case 與內容驗證全部通過。

## 10 主題衝突稽核

| 主題 | 現有相鄰內容 | 主要問句差異 | 決策 |
|---|---|---|---|
| Mortgage payoff | rent-vs-buy、rent-vs-buy breakeven | 提前還本金後，期數與利息怎麼變 | 建立新 canonical |
| Credit-card payoff | cashback、installment APR | 固定／最低／目標期數下何時還清 | 建立新 canonical |
| Budget builder | subscription audit | 把收入、必要支出、儲蓄與債務放進同一預算 | 建立新 canonical |
| Debt strategy | installment/BNPL guides | 多筆債務用雪球或雪崩法的順序與總成本 | 建立新 canonical |
| Car affordability | EV vs gas、新舊車、租買 TCO | 從實領現金流反推可負擔車貸與完整月成本 | 建立新 canonical |
| Salary converter | true hourly wage | 單純換算時薪／月薪／年薪，不做稅務引擎 | 建立新 canonical |
| DTI | lending/fee guides | 顯示 front-end/back-end 與排除債務情境，不做核貸判定 | 建立新 canonical |
| Home affordability | rent-vs-buy | 由完整住房月成本反推最高房價與所需現金 | 建立新 canonical |
| Inflation | raise-vs-inflation | 以官方 CPI 序列換算跨期購買力 | `BLOCKED`：未同步五地官方資料 |
| Compound growth | latte factor | 顯示投入、費用、實質金額與目標所需月投入 | 建立新 canonical |

未刪除或改名任何現有 canonical URL。

## 已整合範圍

- 10 個純 TypeScript 公式核心均已納入，其中 inflation 公式只保留為未發布核心。
- 9 個可發布工具 × 5 locales = 45 個互動工具頁。
- 9 篇 companion article × 5 locales = 45 篇文章。
- 5 個 inflation 工具草稿 + 5 篇 inflation 文章保留 `draft: true`、`noindex: true`、`OFFICIAL_CPI_DATA_REQUIRED`，不產生 route、不進 sitemap。
- 計算均在瀏覽器執行；GA4 只送出工具 ID、動作與 page path，不送收入、餘額、房價、債務或列名。
- 工具提供：計算、重設、載入範例、欄位錯誤、結果摘要、假設摘要、複製、CSV、列印、`aria-live`；長表格提供可橫向捲動的語意 table。
- Budget Builder 唯一持久化使用 `localStorage`，重設時會清除。

## URL 清單

下表每列均已對 `en`、`zh`、`es`、`fr`、`de` 五個 locale 產生精確 URL；完整 URL 為 `https://worthcalc.win/{locale}{path}`。

| 類型 | path |
|---|---|
| Tool | `/tools/mortgage-payoff/` |
| Tool | `/tools/credit-card-payoff/` |
| Tool | `/tools/budget-builder/` |
| Tool | `/tools/debt-strategy/` |
| Tool | `/tools/car-affordability/` |
| Tool | `/tools/salary-converter/` |
| Tool | `/tools/dti-calculator/` |
| Tool | `/tools/home-affordability/` |
| Tool | `/tools/compound-growth/` |
| Article | `/extra-mortgage-payments-guide/` |
| Article | `/credit-card-minimum-payment-trap/` |
| Article | `/budget-with-irregular-income/` |
| Article | `/snowball-vs-avalanche/` |
| Article | `/true-cost-of-car-ownership/` |
| Article | `/hourly-vs-annual-salary/` |
| Article | `/how-to-calculate-dti/` |
| Article | `/how-much-home-can-you-afford/` |
| Article | `/how-compound-growth-works/` |

## 公式與內容驗證

- `npm run test:growth`：通過。涵蓋正常、零利率、相同情境、NaN/Infinity/負值、無法攤還、極端有效值、顯示邊界與修正回歸案例。
- `npm run check:growth-content`：通過。50 工具草稿 + 50 文章齊全，五語連結、品質底線、禁止宣稱與 inflation gate 正確。
- 來源包公式未做行為變更；唯一整合修正是把 `Frequency` 改為 type-only import，以符合 repo 的 `verbatimModuleSyntax`。

## 來源複核

2026-07-23 已開啟包內 16 個官方 URL。CFPB DTI/Payoff、Investor.gov、金管會法規、台灣央行、Banco de España、HCSF、Bundesbank、主計總處、BLS、INE、Insee、Destatis 來源仍可識別；其中：

- CFPB 仍將 DTI 定義為每月債務付款除以稅前月收入，並明示不同產品／貸方門檻不同。
- CFPB 仍說明 payoff amount 可能包含指定日期前利息、未付費用與提前清償費，與目前餘額不同。
- Banco de España 的提前攤還工具仍以待償本金、利率、剩餘期數與提前還款額計算新期數／新月付，並揭露法式本息攤還與簡化假設。
- 法國官方 HCSF 頁仍列 35% taux d’effort 與 25 年期限，內容頁保留例外與「不保證核准」限制。
- Bundesbank 仍將 Annuitätendarlehen 說明為固定期付額、利息占比下降而本金占比上升。
- Insee 已明示 2026 年改為 base 2025 = 100；由於五地 CPI 資料檔仍未同步、驗例與 checksum 未建立，通膨頁繼續封鎖。

## SEO、無障礙、行動版與隱私

- `npm run check:growth-release`：通過 45 工具 + 45 文章；每頁恰好一個 H1、自 canonical、完整 reciprocal hreflang（含 x-default）、sitemap 唯一收錄、工具↔文章互鏈。
- `npm run check:links`：6,562 個內部連結全部通過。
- `npm run audit`：76 passed / 0 failed / 1 local GA4 warning；未提供本機 GA ID 時不注入 GA4，屬預期警告。
- Playwright 本機 preview：9 個工具完成「載入範例→計算」，五語代表頁無 console/page error；320px 與 375px 無水平頁面溢出。
- 介面可鍵盤操作、有 focus ring、reduced-motion 沿用全站規則，結果不只依賴顏色。
- 未修改 AdSense publisher ID、consent、`ads.txt` 或廣告策略；廣告元件不放在 label 與 input 中間。

## 既有工具回歸

- Astro build：331 pages。
- `check:multilingual`、`check:shell`、`audit:brief-coverage` 全部通過；原 29 個五語主題仍為 145/145 完整。
- `npm run check:all-locales` 仍被最新 main 已存在的兩個英中限定頁擋住：`annual-vs-monthly-billing`、`extended-warranty-math` 缺 es/fr/de。此次未弱化 gate，也未擴大範圍重寫這兩頁。
- `npm ci` 顯示依賴樹 6 個既有 audit findings（1 low、5 high）；未自動執行可能破壞相容性的 `npm audit fix --force`。

## Commit / PR / CI / Deployment

- Commits：待建立。
- PR：待建立；依公司規範，WorthCalc 不直接 push main。
- CI / deployment / live HTTP：尚未發生，因此不得宣稱已上線。
- 合併前需要使用者核准；合併後才能填入 PR、run ID 與 live 驗證結果。

## 未解風險

1. Inflation Batch C 缺五地官方資料匯入、series metadata、retrieval date、checksum 與官方驗例，維持封鎖。
2. `check:all-locales` 的兩個既有雙語頁需獨立任務決定補齊五語或正式標記為 partial locale。
3. npm audit 的 5 個 high findings 需要獨立相依性風險評估，不應在此內容發布中盲目升級。
4. 尚未 push/PR/CI/deploy/live check；本報告狀態只能是 `READY_FOR_PR_REVIEW`。
