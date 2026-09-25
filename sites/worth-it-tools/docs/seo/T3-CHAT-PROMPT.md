# 貼給 Claude chat 的指令（整段複製）

---

你要幫 worthcalc.win 寫 **28 篇台灣政策題的繁體中文 money brief**（Markdown + YAML front matter）。寫完我會交給另一個工程流程做格式檢查與上線。

## 最重要的規則：只用你這次真的打開過的官方頁面

1. 每個數字（費率、級距、金額、利率）都必須來自你**在這次對話中實際用網頁工具打開**的官方頁面：`*.gov.tw`、`www.taipower.com.tw`、公股銀行官網、電信業者官方資費頁。
2. **不准**用新聞、部落格、商周、遠見等二手轉述當來源，也不准憑記憶寫數字。
3. `verifiedDate` 填你打開該頁的日期（今天）。沒打開過的網址不准出現在 `sources`。
4. 打不開官方頁面的題目**直接跳過、換下一題**，不要硬寫。在最後回報哪些題目跳過、原因。
5. 每篇文章後面附一張**證據表**（不放進檔案裡，放在檔案外面）：

   | 數字 | 來源網址 | 頁面上的原句（逐字複製） |
   |---|---|---|

   表中要涵蓋文章裡每一個來自官方的數字。這張表是人工抽查用的，一定要逐字。

## 內容規則

- 只寫繁體中文（台灣用語）。
- 不給投資建議、不做預測。定位是「把算式攤開讓讀者自己驗算」。
- 一個搜尋意圖一篇，不要把同一題拆成變體（例如「冷氣 1 噸」「冷氣 2 噸」各一篇）。
- 每篇 `limits` 至少包含三件事：這是計算不是財務建議；不保證核准／資格；不取代專業意見（會計師、銀行、主管機關）。
- 內文要有：官方數字表、公式（用縮排程式碼區塊）、一個具體算例、「什麼條件會讓結論翻轉」。長度與範本相近。

## 欄位規則（格式錯了會建置失敗）

- `contentType: brief`、`locale: "zh"`、`draft: false`
- `briefSlug`：英文小寫加連字號，與檔名相同，例如 `taipower-summer-rates-ac-bill`
- `cluster`：只能是 `rates` / `protection` / `ownership` / `earning` 其中之一
- `publishAt`：照下面排程；`lastReviewed`：今天
- `relatedTool`：只能從下列選一個，格式 `/zh/tools/<slug>/`：
  `appliance-electricity-cost` `budget-builder` `car-affordability` `cashback-breakeven` `commute-cost` `compound-growth` `cost-per-mile` `costco-membership` `credit-card-payoff` `debt-strategy` `dti-calculator` `ev-vs-gas` `home-affordability` `installment-true-apr` `latte-factor` `mortgage-payoff` `rent-vs-buy` `salary-converter` `subscription-audit`
- `relatedToolLabel`：該工具的中文名稱
- `sources`：至少 1 筆，每筆有 `label`、`url`、`verifiedDate`（YYYY-MM-DD）
- `faq`：至少 2 題
- `limits`：至少 1 條（照上面要求實際要 3 條以上）
- `related`：可列 2–3 篇同批其他 brief，格式 `/zh/money/<slug>/`
- YAML 字串一律用雙引號；字串內若有雙引號請改用「」。

## 排程（每天 2 篇）

2026-09-26 起到 2026-10-09，每天兩篇，共 28 篇。依你實際寫出的順序填就好，日期之後可能整批往後移。

## 候選題目（挑你找得到官方來源的 28 個）

| 題目 | 需要的官方來源 | relatedTool |
|---|---|---|
| 台電夏季電價：冷氣一個月電費怎麼算 | 台電 住宅累進電價表 | appliance-electricity-cost |
| 夏月 vs 非夏月：同樣度數差多少 | 台電 | appliance-electricity-cost |
| 時間電價 vs 累進電價：什麼用電型態划算 | 台電 | appliance-electricity-cost |
| 冷氣一級能效 vs 三級：價差多久回本 | 台電 + 經濟部能源署能效分級 | appliance-electricity-cost |
| 首購房貸寬限期結束，月付跳多少 | 金管會／銀行寬限期說明 | mortgage-payoff |
| 央行升息半碼，房貸月付增加多少 | 央行利率決議 | mortgage-payoff |
| 房貸提前還款 vs 投資 | 銀行提前清償條款 | mortgage-payoff |
| 新青安貸款 vs 一般房貸 | 財政部／公股銀行 新青安方案 | home-affordability |
| 年終獎金扣繳：會被扣多少 | 財政部 各類所得扣繳率標準 | salary-converter |
| 綜所稅：列舉 vs 標準扣除額 | 財政部 當年度免稅額與扣除額 | salary-converter |
| 扶養親屬免稅額的實際節稅效果 | 財政部 | salary-converter |
| 勞退自提 6%：節稅效果怎麼算 | 勞保局、財政部 | compound-growth |
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
| 車貸 vs 現金買車 | 銀行車貸說明 | car-affordability |
| 手機綁約 vs 買空機＋自選資費 | 電信業者資費頁 | subscription-audit |
| ETC 國道計程：通勤一個月多少 | 高公局 收費費率 | commute-cost |

站上已有這些主題，**不要重複**：年費卡回本、年繳月繳、通勤成本平均、囤貨浪費、好市多、延長保固、免運門檻、分期 APR 表、機會成本、工時換算價格、租 vs 買總論、回辦公室成本、72 法則、訂閱膨脹、沉沒成本、零利率分期。

## 輸出方式

- 分 4 批，每批 7 篇；每批一則回覆。我說「繼續」你再寫下一批。
- 每篇格式：

  ````
  ### 檔名：<slug>.md
  ```markdown
  （完整檔案內容）
  ```
  **證據表**
  | 數字 | 來源網址 | 頁面上的原句 |
  ...
  ````

- 全部寫完後，給一張總表：publishAt｜slug｜題目｜官方來源網址。

## 範本（照這個結構與語氣寫，內容換成台灣題目）

```markdown
---
contentType: brief
briefSlug: "401k-contribution-limits-2026"
locale: "zh"
cluster: "earning"
title: "2026 年 401(k) 上限 24,500 美元——而 60 到 63 歲那個窗口過期不補"
description: "2026 年員工提撥上限升至 24,500 美元，50 歲追加額為 8,000 美元，而 11,250 美元的較高追加額只適用 60 至 63 歲。那四年的窗口價值 13,000 美元的額外免稅空間，之後就關閉。"
answer: "2026 年 401(k) 員工提撥上限為 24,500 美元，50 歲以上追加額 8,000 美元，而 60 至 63 歲適用較高的 11,250 美元追加額——那四年最多可提撥 35,750 美元。每年多出來的 3,250 美元只存在四年，事後無法補提：13,000 美元的免稅空間，64 歲那年就關上。"
publishAt: "2026-10-15"
lastReviewed: "2026-09-19"
relatedTool: "/zh/tools/compound-growth/"
relatedToolLabel: "複利成長計算機"
formula: "當年遞延稅額 = 提撥額 × 邊際稅率；單一年度額外提撥的未來值 = 金額 ×(1 + 報酬率)^年數"
limits:
  - "這是計算，不是稅務或投資建議。你能不能提滿上限，取決於你所屬計畫自己的規則、你的薪酬，以及本頁看不到的反歧視測試。"
  - "員工提撥上限與「含雇主提撥的年度總增額上限」是兩回事。達到其中一個，不代表達到另一個。"
  - "遞延稅不等於免稅。傳統型提撥在提領時課稅，所以利益是「現在的稅率」與「將來的稅率」之間的差額，不是完整的邊際稅率。"
sources:
  - label: "IRS Newsroom — 2026 年 401(k) 上限升至 24,500 美元、IRA 升至 7,500 美元"
    url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
    verifiedDate: "2026-09-19"
faq:
  - q: "什麼是「超級追加提撥」？為什麼只有四年？"
    a: "它是較高的追加提撥額——2026 年為 11,250 美元，相對於一般的 8,000 美元——只在你滿 60、61、62、63 歲的那幾個曆年適用。"
  - q: "該先提滿 401(k) 還是先還債？"
    a: "只有在拿滿雇主配比之後才考慮，因為配比的報酬遠高於這裡任何一項。"
related:
  - "/zh/money/hsa-limits-2026/"
  - "/zh/money/employer-match-vs-debt-payoff/"
draft: false
---

## 2026 年的數字

| 項目 | 2026 年 |
| --- | ---: |
| 401(k) 員工提撥 | **24,500 美元** |
| 追加提撥，50 歲以上 | 8,000 美元 |
| 追加提撥，僅限 60–63 歲 | **11,250 美元** |

## 那個會過期的數字

60 至 63 歲的追加提撥額是 **11,250 美元，相對於一般的 8,000 美元**——每年多 3,250 美元，只有四個曆年。

    額外免稅空間 = 3,250 × 4 年 = 13,000 美元

## 邊際一塊錢的提撥值多少

    當年遞延稅額 = 提撥額 × 邊際稅率

以 1,000 美元、22% 邊際稅率計算，從今年稅單上拿掉 **220 美元**。

## 什麼條件會讓結論翻轉

- **現在的稅率低於將來。** 如果你預期提領時落在更高的稅級，Roth 的價值高於這筆扣除。
- **計畫規則低於法定上限。** IRS 的上限是天花板，不是你的權利。
```
