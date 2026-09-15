# S2 通勤叢集 SEO 前後對照

日期：2026-09-15

範圍：S2 指定的 4 個 calculator pages；未新增 URL。

## Title 與 description

| 頁面 | Before title | After title | Before description | After description |
| --- | --- | --- | --- | --- |
| `/en/tools/commute-cost/` | `Commute Cost Calculator: Per Mile, Monthly and Annual` | `How Much Does Your Commute Cost Per Mile and Per Year?` | `Calculate commute cost per mile, month, and year for a car, EV, transit, rideshare, or bike. Compare fuel, parking, tolls, and optional time value.` | `How much does your commute really cost per mile, per day, per month, and per year? Compare fuel, parking, tolls, transit, EVs, and time.` |
| `/zh/tools/commute-cost/` | `通勤成本計算機：每公里、每月與全年車馬費` | `通勤每公里花多少？油錢、時間與回辦公室成本計算機` | `計算汽車、電動車、機車、大眾運輸、叫車與單車的每公里、每月及全年通勤成本，可分開比較燃料、停車、過路費與時間成本。` | `你的通勤每公里、每天、每月與全年到底花多少？用台灣公里、公升與新台幣比較油車、電動車、機車、大眾運輸、叫車、單車與時間成本。` |
| `/en/tools/cost-per-mile/` | `Cost Per Mile Calculator: Total Car Cost, Not Just Fuel` | `What Does Your Car Really Cost Per Mile?` | `Calculate total car cost per mile or kilometer, including fuel or electricity, depreciation, maintenance, tires, insurance, fees, and finance interest.` | `What does your car really cost per mile or kilometer? Compare fuel or electricity with depreciation, maintenance, tires, insurance, fees, and finance interest.` |
| `/zh/tools/cost-per-mile/` | `每公里成本計算機：汽車／機車養車總成本` | `這台車每公里到底花多少？完整養車成本計算機` | `計算汽車或機車每公里成本，拆出油錢或電費、折舊、保養維修、輪胎、保險、燃料費、牌照稅、驗車與利息。` | `這台車每公里或每英里到底花多少？把油錢或電費、折舊、保養維修、輪胎、保險、稅費與貸款利息放在一起比較。` |

## Intro source/date evidence

- English commute example uses the [U.S. Energy Information Administration weekly regular-gas series](https://www.eia.gov/dnav/pet/pet_pri_gnd_a_epm0_pte_dpgal_w.htm), checked 2026-09-15; the page keeps the source/date visible next to the example.
- 繁中通勤 example uses [CPC price information](https://vipmbr.cpc.com.tw/mbwebs/showpriceajust.aspx) checked 2026-09-15 and the [Taipower tariff table](https://www.taipower.com.tw/media/dhuhrppu/%E7%B0%A1%E8%A6%81%E9%9B%BB%E5%83%B9%E8%A1%A8.pdf?mediaDL=true) effective 2025-10-01; both source links and dates are visible in the page intro.
- Examples are illustrative inputs, not live production analytics or a claim about a visitor's actual price.

## Local verification

- `npm run verify`: PASS, exit 0.
- Sitemap URL count: 304, unchanged from 2026-09-14.
- No production deployment or Google indexing submission was performed in S2.
