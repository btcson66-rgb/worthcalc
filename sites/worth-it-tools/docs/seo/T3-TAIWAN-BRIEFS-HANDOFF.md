# T3 交接：台灣政策題中文 money briefs

接手的 session 從這裡開始讀。這份文件自成一體，不需要前一個對話的記憶。

## 已經完成的事

- **T1**（好市多費率修正 + `data/rates.json` + `scripts/verify-rates.mjs` 掛在 prebuild）
- **T2**（es/fr/de 退出索引、中文標 `zh-TW`）

兩者都在 PR #173，已合併進 main。

## 這次要做的事

寫**至少 28 篇**台灣政策題的中文 money brief，每天發布 2 篇，連續 14 天。

- 位置：`src/content/money-briefs/zh/<slug>.md`
- 格式：照現有 brief，範本看 `src/content/money-briefs/zh/401k-contribution-limits-2026.md`
- Schema：`src/content.config.ts` 的 `moneyBriefs`（`sources` 必填且每筆要 `verifiedDate`、`faq` 至少 2 題、`limits` 至少 1 條、`cluster` 只能是 `rates` / `protection` / `ownership` / `earning`）

現有 52 篇中文 brief **全部是美國題目**（401k、IRS、Medicare、社會安全），台灣題目一篇都沒有。這就是缺口。

## 第一步：先測網路

```
WebFetch https://www.taipower.com.tw/
```

前一個 session 因為環境網路是 Trusted，所有 `*.gov.tw` 與台電都被擋。使用者已改設定，但新設定只對新 session 生效。

**如果還是 `EGRESS_BLOCKED`：停下來回報，不要繼續寫。** 不要拿商周、遠見這類二手媒體的轉述充當官方來源。

## 硬規則

1. **每個數字都要來自你實際打開過的官方頁面。** `verifiedDate` 寫你真的打開那天。沒打開過的網址不准寫 `verifiedDate`——那是偽造查核紀錄，正是 T1 修掉的問題（好市多頁面標 2026 卻寫漲價前的費率，錯了將近一年沒人發現）。
2. **只寫中文。** `AGENTS.md` 規定不擴張英文。只寫 zh 的 brief 沒問題：`src/pages/[locale]/money/[slug].astro` 會從實際已發布的語系算 `alternateLocales`，不需要英文配對。
3. **不給投資建議、不做預測。** 全站定位是「把算式攤開讓你自己驗算」。每篇的 `limits` 要有：非財務建議、不保證核准、不取代專業意見。
4. **一個搜尋意圖一篇。** 不要把同一題拆成多個變體（例如「冷氣 1 噸」「冷氣 2 噸」各一篇）。2026 年 3 月與 6 月的 Google 核心更新專門打這種量產頁，跌幅 50–80%。
5. **不要跟現有頁面重複。** 下面有清單。
6. `relatedTool` 只能指向現有的 zh 工具：
   `appliance-electricity-cost` `budget-builder` `car-affordability` `cashback-breakeven` `commute-cost` `compound-growth` `cost-per-mile` `costco-membership` `credit-card-payoff` `debt-strategy` `dti-calculator` `ev-vs-gas` `home-affordability` `installment-true-apr` `latte-factor` `mortgage-payoff` `rent-vs-buy` `salary-converter` `subscription-audit`
   路徑格式 `/zh/tools/<slug>/`。
7. `related` 可以互相引用尚未發布的 brief：頁面會自動濾掉還沒上線的連結，不會出現 404。

## 發布排程

- `publishAt`：**2026-09-26 起，每天 2 篇，到 2026-10-09**（14 天 × 2 = 28 篇）
- 每天 03:20 UTC 的 cron（`.github/workflows/deploy-worthcalc.yml`）會自動建置發布，**不需要另外設定**。`check-due-briefs.mjs` 有 2 天緩衝，GitHub 漏跑一晚會在隔晚補上。
- ⚠️ **如果 PR 合併日晚於第一個 `publishAt`**，過期的那幾篇會在合併當天一起冒出來。合併前檢查，必要時整批往後移。

## 網址額度

`config/url-budget.json`：目前 sitemap 177 個，`maxUrls` 425。現有排程全部發完是 271，加 28 篇是 299，在額度內。

## 候選題目（挑 28 個你能找到官方來源的）

依搜尋時機大致排序。**需要官方費率表的題目，先確認能打開官方頁面再寫。**

| 題目 | 需要的官方來源 | 建議 relatedTool |
|---|---|---|
| 台電夏季電價：冷氣一個月電費怎麼算 | 台電 住宅累進電價表 | appliance-electricity-cost |
| 夏月 vs 非夏月：同樣度數差多少 | 台電 | appliance-electricity-cost |
| 時間電價 vs 累進電價：什麼用電型態划算 | 台電 | appliance-electricity-cost |
| 冷氣一級能效 vs 三級：價差多久回本 | 台電 + 經濟部能源署能效分級 | appliance-electricity-cost |
| 首購房貸寬限期結束，月付跳多少 | 金管會／銀行寬限期說明（公式本身是本息攤還） | mortgage-payoff |
| 央行升息半碼，房貸月付增加多少 | 央行利率決議 | mortgage-payoff |
| 房貸提前還款 vs 投資 | 銀行提前清償條款說明 | mortgage-payoff |
| 新青安貸款 vs 一般房貸 | 財政部／公股銀行 新青安方案 | home-affordability |
| 年終獎金扣繳：會被扣多少 | 財政部 各類所得扣繳率標準 | salary-converter |
| 綜所稅：列舉 vs 標準扣除額 | 財政部 當年度免稅額與扣除額 | salary-converter |
| 扶養親屬免稅額的實際節稅效果 | 財政部 | salary-converter |
| 勞退自提 6%：節稅效果怎麼算 | 勞保局 勞退新制、財政部 | compound-growth |
| 勞退月提繳工資分級表：雇主提 6% 是多少 | 勞保局 | salary-converter |
| 勞保老年給付：一次請領 vs 年金 | 勞保局 | compound-growth |
| 國民年金 vs 勞保 | 勞保局 | budget-builder |
| 二代健保補充保費：什麼收入會被扣 | 健保署 | salary-converter |
| 健保投保金額分級：保費怎麼算 | 健保署 | salary-converter |
| TPASS 通勤月票划不划算 | 交通部 TPASS | commute-cost |
| 汽車燃料費 + 牌照稅：養車固定成本 | 監理服務網、財政部 | car-affordability |
| 電動機車 vs 燃油機車（含補助） | 環境部／經濟部 補助公告 | ev-vs-gas |
| 房屋稅：自住 vs 非自住 | 財政部 房屋稅條例 | rent-vs-buy |
| 地價稅：自用住宅優惠稅率 | 財政部 | rent-vs-buy |
| 定存中途解約，利息會少多少 | 銀行定存解約計息規定 | compound-growth |
| 儲蓄險 IRR 自己算 | 金管會 保險商品資訊揭露 | compound-growth |
| 租金補貼：資格與金額 | 內政部國土管理署 | rent-vs-buy |
| 車貸 vs 現金買車 | 銀行車貸說明（公式是攤還） | car-affordability |
| 手機綁約 vs 買空機＋自選資費 | 電信業者資費頁（公式為總持有成本） | subscription-audit |
| ETC 國道計程：通勤一個月多少 | 高公局 收費費率 | commute-cost |

## 現有頁面（不要重複）

中文獨立頁：`annual-fee-card-breakeven` `annual-vs-monthly-billing` `average-commuting-cost` `bulk-buying-waste-math` `costco-math` `extended-warranty-math` `free-shipping-threshold` `installment-apr-table` `opportunity-cost-everyday` `price-in-work-hours` `rent-vs-buy-guide` `return-to-office-cost` `rule-of-72-explained` `subscription-creep` `sunk-cost-fallacy-everyday` `zero-interest-installments-truth`

現有 brief slug 用 `ls src/content/money-briefs/zh/` 看。

## 驗收

- [ ] `SITE_URL=https://worthcalc.win PUBLIC_ADSENSE_CLIENT=ca-pub-9117672212804270 npm run verify` 全綠（CI 就是這樣跑）
- [ ] `PUBLISH_AS_OF=2026-10-09 npx astro build` 之後 28 篇全部出現在 `dist/zh/money/`，而且 `npm run check:links` 通過
- [ ] 每篇 `sources` 的網址都是你實際打開過的官方頁面
- [ ] 開 PR 到 main，描述列出每篇的 `publishAt`、題目與官方來源
