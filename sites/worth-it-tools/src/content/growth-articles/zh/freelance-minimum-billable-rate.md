---
contentType: article
articleSlug: "freelance-minimum-billable-rate"
locale: "zh"
title: "接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本"
description: "自由工作者最低報價不能用目標月薪除工作時數。把不可計費時間、軟體、保險、稅款準備、平台抽成、空窗與收款風險放入，反推最低可持續 billable rate。"
relatedTool: "/zh/tools/budget-builder/"
lastReviewed: "2026-09-01"
draft: false
packageId: "008"
seoTitle: "接案最低報價怎麼算？Freelance 最低時薪完整公式｜WorthCalc"
robots: "index,follow"
canonical: "https://worthcalc.win/zh/guides/freelance-minimum-billable-rate/"
ogTitle: "接案最低報價怎麼算？Freelance 最低時薪完整公式 | WorthCalc"
ogDescription: "自由工作者最低報價不能用目標月薪除工作時數。把不可計費時間、軟體、保險、稅款準備、平台抽成、空窗與收款風險放入，反推最低可持續 billable rate。"
ogImage: "/images/guides/freelance-minimum-billable-rate.webp"
imageAlt: "目標實領、營運成本、稅款準備、72 與 55 可計費時數轉換成最低接案時薪的計算圖"
breadcrumbLabel: "接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本"
---


# 接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本

## 直接答案

「我以前月薪 60,000，所以 60,000 ÷ 160 = 375／小時，接案報 400 就好」通常會嚴重低估。自由工作不是每個工時都能向客戶收費；你還要做開發、報價、會議、行政、修正、收款、學習與空窗。

比較完整的模型：

$$
\text{Required Revenue}
=
\frac{\text{Target Personal Cash＋Business Overhead＋Required Reserves}}{1-\text{Tax Reserve Rate}}
$$
再用：

$$
\text{Minimum Billable Rate}
=
\frac{\text{Required Revenue}}{\text{Realistic Billable Hours}}
$$
如果平台還抽成，要再反推 client-facing price，而不是從你的最低費率裡吸收。

## 為什麼 160 小時不等於 160 個可計費小時？

假設每月工作 160 小時：

- 20 小時找客戶／寫提案
- 15 小時行政、發票、追款
- 15 小時溝通／會議但未必能全計費
- 20 小時空窗、學習與產品維護
- 剩 90 小時才可能交付

若你的實際可計費率是 45%，160 小時只剩 72 billable hours。用 160 當分母會讓你的價格低估超過一倍。

## Input Worksheet

1. 每月希望真正進個人帳戶的金額。
2. 軟體、雲端、設備折舊、網路、保險、會計等 business overhead。
3. 稅款準備：以你所在地實際規則估，不用網路固定百分比冒充最終稅率。
4. 年假／病假／淡季 reserve。
5. 每月可工作時數。
6. 過去 3 個月真正 billable hours。
7. 平台抽成、金流費與壞帳準備。
8. 專案中包含幾輪修正與非計費溝通。

## Worked Example 1：目標 70,000，不是報 500／小時

假設：

- 目標個人可用現金：70,000
- 每月營運成本與 reserve：15,000
- 先以 20% 稅務準備情境測試（僅示例，不是個人最終稅率）

所需收入：

$$
(70,000+15,000)\div(1-0.20)=106,250
$$
若每月 72 billable hours：

$$
106,250\div72\approx1,476\text{／小時}
$$
如果實際只有 55 billable hours：

$$
106,250\div55\approx1,932\text{／小時}
$$
光是可計費率下降，就讓最低可持續費率多 456／小時。

## Worked Example 2：平台抽 15%，對外報價還要再提高

如果你的最低「實收前平台」收入需求是 106,250，而平台抽 15%：

$$
\text{Client Revenue}=106,250\div(1-0.15)=125,000
$$
以 72 billable hours：

$$
125,000\div72\approx1,736\text{／小時}
$$
如果你仍只報 1,476，平台費就會從自己的個人現金或稅款準備中被吃掉。

## Billable Utilization 才是核心敏感度

建議至少測：

| 可計費時數 | Required Revenue 106,250 的最低費率 |
|---:|---:|
| 90 | 1,181 |
| 72 | 1,476 |
| 55 | 1,932 |
| 40 | 2,656 |

這不是「市場價格表」，只是你的生存底線。市場是否願意付，還取決於技能、成果、競爭、信任與客群。如果市場價低於底線，解法可能是提高 billable utilization、降低 overhead、改賣專案價、換客群，而不是硬接虧損工作。

## 從時薪轉成 Project Price

客戶通常買成果，不是你的內部時間。你可以保留 internal floor：

$$
\text{Internal Project Floor}
=
\text{Estimated Billable Hours}\times\text{Minimum Rate}
+\text{Project-specific Costs}
+\text{Risk Buffer}
$$
例如估 30 小時、最低 1,500、專案成本 5,000、風險 buffer 10,000：

$$
30\times1,500+5,000+10,000=60,000
$$
對外可以報固定價 65,000 或 75,000，但至少知道低於 60,000 時，你是在用自己的時間補貼客戶。

## 收款延遲也是成本

一個案子今天完成、60 天後才收款，會占用營運現金。至少追蹤：

- DSO／平均收款天數。
- 逾期比例。
- 是否要先付外包與軟體。
- 是否收訂金／里程碑款。

報價公式不一定要硬加「利息」，但現金底線必須足以支撐收款空窗。

## 稅款準備不要等於最終稅率

美國 IRS 指出自僱或 gig work 可能需要 estimated tax；台灣不同所得性質也有扣繳與申報規則。正確做法是建立 tax reserve bucket，再依實際全年所得與當期規則調整，而不是把示範 20% 寫成人人適用。

## 結論反轉條件

- billable utilization 從 50% 降到 30%。
- 客戶平均付款從 14 天拉到 60 天。
- 平台費由 10% 變 20%。
- 新軟體／保險成為必要固定費。
- 你從副業轉全職，原本雇主福利要自己負擔。
- 專案「不限次修改」，實際工時大幅超標。

這些都應重新計算最低費率。

## Decision Matrix

| 檢查 | 健康 | 危險 |
|---|---|---|
| Billable hours | 有歷史資料 | 用理想 160 小時 |
| Overhead | 已全列 | 只算電腦 |
| 稅款 | 有 reserve | 入帳全部可花 |
| 收款 | 有訂金／期限 | 長帳期且無緩衝 |
| Scope | 修正／交付明確 | 無限制修改 |
| 價格 | 高於 internal floor | 長期低於成本 |

## 常見錯算

月薪÷160；用 2,080 小時當全年可計費；漏掉銷售與行政；平台抽成從自己的收入吸收；把稅款準備當可花；不算病假與淡季；報固定價卻不做 scope control；把市場平均時薪當自己的成本底線。

## Checklist

- [ ] 先定每月 target personal cash。
- [ ] 列 business overhead 與 reserve。
- [ ] 用實際 billable hours，不用總工時。
- [ ] 分開平台／金流費。
- [ ] 建 tax reserve bucket。
- [ ] 建專案 internal floor。
- [ ] 寫清修改次數與 scope。
- [ ] 每月回顧 billable utilization 與收款天數。

## 用「收款」而不是「開發票」做現金流壓力測試

自由工作者報價算得再漂亮，如果客戶 30、60 或 90 天才付款，仍可能在帳面獲利時現金不足。請把 billable rate 模型再加一張收款日曆：專案開始日、里程碑、開票日、付款期限、實際平均延遲天數。最低報價是獲利能力問題；收款條件是營運資金問題，兩者不要混成一個百分比。

例如每月可開票 120,000，但實際平均 45 天收款，當月仍需支付軟體、外包、房租與個人生活費。若現金安全墊只能撐 20 天，就算年收入模型成立，業務也可能需要訂金、分段付款或縮短 payment terms。

## 月度追蹤四個率：報價之外才看得見問題

建議每月記四個率：Billable Utilization＝可計費工時／總工作工時；Collection Rate＝實收／已到期應收；Effective Hourly Rate＝已確認專案收入／實際投入工時；Rework Rate＝未另外收費的返工時數／專案總工時。若最低報價一直提高但 Effective Rate 仍下降，問題可能是 scope creep 而不是定價本身。

## Package Price 的底線算法

若你不想按小時計價，仍可用最低 billable rate 做底層護欄。假設最低可持續率 1,800／小時，某固定包預估 12 小時、直接成本 3,000、需要 20% scope buffer：先算 12×1,800＝21,600，再加直接成本與風險緩衝，而不是直接看競爭者「大家都賣 19,900」。如果市場只願付低於底線的價格，就應調整交付範圍、流程、自動化或客群，而不是假裝自己的時間沒有成本。

## 低利用率反轉條件

新接案者最常高估的不是時薪，而是有多少小時真的能賣出去。若 60% billable utilization 才能支撐 1,500／小時，但實際三個月只有 35%，你可以算出在相同年度收入需求下最低率必須提高多少。這個差距也能告訴你應先解決「沒案源」還是「報價太低」。報價模型每季至少用真實工時重新校準一次。

## 每季用真實資料重估「最低率」，不要只在創業第一天算一次

最低可計費率不是固定終身價格。每季把過去 90 天的總工作時數、真正 billable 時數、實收收入、逾期應收、軟體／外包／設備支出與返工時數填回模型。如果原本假設 60% 利用率，實際只有 42%，就要先判斷是案源不足、估時過低還是非計費行政太多。若有效時薪下降，除了漲價，也可以縮小 scope、提高訂金、標準化交付或淘汰低毛利服務。只有持續用真實數據校準，最低報價才會反映目前的生意，而不是去年的想像。

## 最後校準

另外建立「客戶集中度」欄位。若單一客戶占全年可計費收入過高，表面利用率可能很好，但只要對方延遲付款或停止合作，收入就會突然中斷。可以設定最大可接受集中度作為營運風險限制，而不是把目前高工時直接視為未來穩定需求。報價策略也應區分長約、單次專案與緊急案件，因為同樣時數的排程風險與付款風險並不相同。

若連續兩季實際有效時薪仍低於底線，應把它視為商業模式警訊，而不是單純靠延長工時補洞。

## FAQ

### 接案時薪要比上班時薪高多少？
沒有固定倍數。應由你的不可計費時間、福利替代、營運成本、稅款與市場定位反推。

### 初學者可以低於底線接案累積作品嗎？
可以視為行銷投資，但應清楚知道補貼金額與期限，不要把虧損價變永久客戶期望。

### 報固定價還需要算時薪嗎？
需要，作為內部成本底線與專案結案回顧，不一定要給客戶看。

### 稅率要填多少？
用你的實際制度／會計估算；本文百分比只有情境，不是個人稅務建議。

### 如果市場價低於我的最低費率？
表示商業模式要調整：提高效率、降低成本、改變服務內容／客群，而不是靠更多虧損時數解決。

## Sources & Limitations

IRS 說明 gig work 收入應申報，自僱承包者可能需要 estimated taxes；實際稅務依所在地與個人情況。WorthCalc 不提供客戶願付價格或收入保證。

- https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work
- https://www.irs.gov/forms-pubs/about-form-1040-es

## Related Guides

- [Irregular Income Budget](https://worthcalc.win/en/budget-with-irregular-income/)
- [佣金／接案稅款準備](https://worthcalc.win/zh/guides/commission-income-tax-reserve-cashflow/)
- [True Hourly Wage](https://worthcalc.win/en/price-in-work-hours/)
