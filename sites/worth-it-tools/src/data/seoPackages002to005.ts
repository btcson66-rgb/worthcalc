export interface SeoPackageGuideMeta {
  key: string;
  packageId: string;
  locale: 'en' | 'zh';
  articleSlug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  imageAlt: string;
  imageBrief: string;
  lastReviewed: string;
  related: string[];
  breadcrumbLabel: string;
  schemaFile: string;
}

export const seoPackageGuides: Record<string, SeoPackageGuideMeta> = {
  "en/childcare-return-to-work-break-even": {
    "key": "en/childcare-return-to-work-break-even",
    "packageId": "006",
    "locale": "en",
    "articleSlug": "childcare-return-to-work-break-even",
    "title": "Childcare vs. Returning to Work: A Take-Home Pay Break-Even Framework",
    "seoTitle": "Childcare vs. Returning to Work: Break-Even Framework | WorthCalc",
    "metaDescription": "Compare returning to work with childcare using take-home pay, care costs, commute, work expenses, employer benefits, and work-related tax inputs without pretending career value is a single number.",
    "excerpt": "The correct cash-flow question is not salary minus daycare. Compare incremental take-home pay with childcare, commute, work expenses, lost benefits, and verified employer/tax support—then keep career value as a separate noncash decision layer.",
    "canonical": "https://worthcalc.win/en/guides/childcare-return-to-work-break-even/",
    "robots": "index,follow",
    "ogTitle": "Childcare vs. Returning to Work: What Is the Real Cash-Flow Gain?",
    "ogDescription": "Calculate incremental household cash flow after childcare, commute, work expenses, and verified benefits instead of comparing gross salary with daycare alone.",
    "ogImage": "/images/guides/childcare-return-to-work-break-even.webp",
    "imageAlt": "Return-to-work household cash flow showing take-home pay childcare commute work expenses and employer dependent care benefits",
    "imageBrief": "",
    "lastReviewed": "2026-09-02",
    "related": [
      "https://worthcalc.win/en/tools/budget-builder/"
    ],
    "breadcrumbLabel": "Childcare vs. Returning to Work: A Take-Home Pay Break-Even Framework",
    "schemaFile": "006__en__childcare-return-to-work-break-even.json"
  },
  "en/debt-consolidation-break-even": {
    "key": "en/debt-consolidation-break-even",
    "packageId": "004",
    "locale": "en",
    "articleSlug": "debt-consolidation-break-even",
    "title": "Debt Consolidation Break-Even: Lower Payment vs. Lower Total Cost",
    "seoTitle": "Debt Consolidation Break-Even: Payment vs Total Cost | WorthCalc",
    "metaDescription": "A debt consolidation loan can lower your payment while increasing total cost. Compare old-debt cash flows, fees, reset terms, and break-even before deciding.",
    "excerpt": "The clean comparison is not “old APRs versus new APR.” It is the remaining cash flow of the old debts versus the new loan, including fees, reset term, and what you do with any monthly payment relief.",
    "canonical": "https://worthcalc.win/en/guides/debt-consolidation-break-even/",
    "robots": "index,follow",
    "ogTitle": "Debt Consolidation Break-Even",
    "ogDescription": "Compare payment relief, term reset, fees, and remaining total cost before calling consolidation a savings strategy.",
    "ogImage": "/images/guides/debt-consolidation-break-even.webp",
    "imageAlt": "Debt consolidation comparison showing three old debts, one new loan, monthly payment, term, fees, and total remaining cost",
    "imageBrief": "WorthCalc editorial infographic focused on transparent formulas, timelines, scenario comparisons and decision math; do not invent lender quotes, approval claims, market averages or guaranteed investment outcomes.",
    "lastReviewed": "2026-08-31",
    "related": [],
    "breadcrumbLabel": "Debt Consolidation Break-Even: Lower Payment vs. Lower Total Cost",
    "schemaFile": "004__en__debt-consolidation-break-even.json"
  },
  "en/freelance-minimum-billable-rate": {
    "key": "en/freelance-minimum-billable-rate",
    "packageId": "008",
    "locale": "en",
    "articleSlug": "freelance-minimum-billable-rate",
    "title": "Freelance Minimum Billable Rate: Price for Taxes, Non-Billable Time, Benefits and Profit",
    "seoTitle": "Freelance Minimum Billable Rate Formula | WorthCalc",
    "metaDescription": "Calculate a sustainable freelance rate using realistic billable hours, overhead, benefit replacement, tax reserves, unpaid time and utilization stress tests.",
    "excerpt": "Price from the denominator first: only a fraction of working hours are billable. Add personal compensation, business overhead, benefits and tax reserves, then divide by realistic billable hours—not 2,080.",
    "canonical": "https://worthcalc.win/en/guides/freelance-minimum-billable-rate/",
    "robots": "index,follow",
    "ogTitle": "Freelance Minimum Billable Rate Formula | WorthCalc",
    "ogDescription": "Calculate a sustainable freelance rate using realistic billable hours, overhead, benefit replacement, tax reserves, unpaid time and utilization stress tests.",
    "ogImage": "/images/guides/freelance-minimum-billable-rate.webp",
    "imageAlt": "Freelancer annual cost stack divided by realistic billable hours, with utilization stress test and minimum quote",
    "imageBrief": "",
    "lastReviewed": "2026-09-01",
    "related": [
      "https://worthcalc.win/en/budget-with-irregular-income/",
      "https://worthcalc.win/en/tools/budget-builder/"
    ],
    "breadcrumbLabel": "Freelance Minimum Billable Rate: Price for Taxes, Non-Billable Time, Benefits and Profit",
    "schemaFile": "008__en__freelance-minimum-billable-rate.json"
  },
  "en/windfall-debt-vs-cash-allocation": {
    "key": "en/windfall-debt-vs-cash-allocation",
    "packageId": "005",
    "locale": "en",
    "articleSlug": "windfall-debt-vs-cash-allocation",
    "title": "Windfall: Pay Debt or Keep Cash? A Better Framework Than a Fixed Percentage Rule",
    "seoTitle": "Windfall: Pay Debt or Keep Cash? Decision Framework | WorthCalc",
    "metaDescription": "Decide how to split a bonus or tax refund by comparing cash-reserve gaps, costly debt, known bills, and the risk of borrowing again after payoff.",
    "excerpt": "A windfall should not be allocated by a universal 50/30/20 rule. First identify the most dangerous gap: too little cash, expensive debt, or a known bill that will otherwise become new debt.",
    "canonical": "https://worthcalc.win/en/guides/windfall-debt-vs-cash-allocation/",
    "robots": "index,follow",
    "ogTitle": "Windfall: Pay Debt or Keep Cash?",
    "ogDescription": "Compare guaranteed debt-cost reduction with post-payment liquidity and known upcoming expenses before allocating a lump sum.",
    "ogImage": "/images/guides/windfall-debt-vs-cash-allocation.webp",
    "imageAlt": "Windfall allocation decision tree splitting cash among emergency reserve, high-interest debt, and known near-term expenses",
    "imageBrief": "WorthCalc three-bucket allocation graphic; no investment-return promises or fixed recommended percentage.",
    "lastReviewed": "2026-08-31",
    "related": [
      "https://worthcalc.win/en/guides/debt-consolidation-break-even/"
    ],
    "breadcrumbLabel": "Windfall: Debt vs. Cash",
    "schemaFile": "005__en__windfall-debt-vs-cash-allocation.json"
  },
  "zh/childcare-return-to-work-break-even": {
    "key": "zh/childcare-return-to-work-break-even",
    "packageId": "006",
    "locale": "zh",
    "articleSlug": "childcare-return-to-work-break-even",
    "title": "托育費多少才值得回職場？用稅後收入、通勤與福利做 Break-Even",
    "seoTitle": "托育費 vs 回職場：稅後收入、通勤與補助 Break-Even｜WorthCalc",
    "metaDescription": "回職場不能只用薪水減托育費。把稅後收入、托育、通勤、工作支出、補助與雇主育兒支持分開輸入，算家庭現金流損益。",
    "excerpt": "回職場的財務問題不是「薪水大於托育費」就結束。真正要算的是家庭新增稅後收入，扣掉托育、通勤、餐食、工作用品與失去的補助，再把雇主育兒支持列成可核對輸入。",
    "canonical": "https://worthcalc.win/zh/guides/childcare-return-to-work-break-even/",
    "robots": "index,follow",
    "ogTitle": "回職場值得嗎？先算真正的家庭新增現金流",
    "ogDescription": "薪水減托育費不夠；加入通勤、工作支出、補助與雇主育兒支持再看 Break-Even。",
    "ogImage": "/images/guides/childcare-return-to-work-break-even.webp",
    "imageAlt": "回職場損益表，顯示稅後薪資、托育費、通勤、工作成本與補助",
    "imageBrief": "",
    "lastReviewed": "2026-09-02",
    "related": [
      "https://worthcalc.win/zh/tools/budget-builder/"
    ],
    "breadcrumbLabel": "托育費多少才值得回職場？用稅後收入、通勤與福利做 Break-Even",
    "schemaFile": "006__zh__childcare-return-to-work-break-even.json"
  },
  "zh/debt-consolidation-break-even": {
    "key": "zh/debt-consolidation-break-even",
    "packageId": "004",
    "locale": "zh",
    "articleSlug": "debt-consolidation-break-even",
    "title": "債務整合划算嗎？不要只看月付變低，用期限重置與總成本算 Break-Even",
    "seoTitle": "債務整合划算嗎？Break-Even、月付與總成本完整試算｜WorthCalc",
    "metaDescription": "債務整合把多筆付款變成一筆，但月付下降可能只是期限拉長。用舊債剩餘成本、整合費用、新利率與新期限比較 break-even、總利息與現金流。",
    "excerpt": "債務整合最大的陷阱，是把「付款變少」誤認成「成本變低」。真正比較要固定剩餘期間、加回所有費用，再看新期限是否把債務拖得更久。",
    "canonical": "https://worthcalc.win/zh/guides/debt-consolidation-break-even/",
    "robots": "index,follow",
    "ogTitle": "債務整合划算嗎？先拆月付和總成本",
    "ogDescription": "比較舊債剩餘現金流、整合費用、新期限與每月釋放現金，避免被低月付誤導。",
    "ogImage": "/images/guides/debt-consolidation-break-even.webp",
    "imageAlt": "債務整合比較表，顯示多筆舊債、新整合貸款、月付、總利息與期限",
    "imageBrief": "WorthCalc 編輯型資訊圖：以透明公式、時間軸、情境比較與數字決策為核心；不得使用假銀行報價、假核貸結果、假市場平均或保證性投資訊息。",
    "lastReviewed": "2026-08-31",
    "related": [],
    "breadcrumbLabel": "債務整合划算嗎？不要只看月付變低，用期限重置與總成本算 Break-Even",
    "schemaFile": "004__zh__debt-consolidation-break-even.json"
  },
  "zh/extra-payment-personal-loan": {
    "key": "zh/extra-payment-personal-loan",
    "packageId": "002",
    "locale": "zh",
    "articleSlug": "extra-payment-personal-loan",
    "title": "信貸提前還款划算嗎？先算省下利息，再扣違約金與流動性成本",
    "seoTitle": "信貸提前還款划算嗎？省息、縮期、違約金完整試算",
    "metaDescription": "信貸提前還款不能只看「省利息」。用 50 萬、8%、60 期案例試算每月多還 2,000 元，再加入違約金與緊急預備金判斷。",
    "excerpt": "用剩餘本金、後續利息、提前清償成本與流動性比較是否值得提前還個人貸款。",
    "canonical": "https://worthcalc.win/zh/guides/extra-payment-personal-loan/",
    "robots": "index,follow",
    "ogTitle": "信貸提前還款：省下的利息不是你的全部收益",
    "ogDescription": "50 萬、8%、60 期若每月多還 2,000，教學模型約可縮短 11 個月、少付約 2.18 萬利息；但還要扣違約金並確認本金沖抵規則。",
    "ogImage": "/images/guides/extra-payment-personal-loan-og.webp",
    "imageAlt": "信貸提前還款省息縮期與流動性比較圖",
    "imageBrief": "",
    "lastReviewed": "2026-08-30",
    "related": [
      "/zh/guides/amortization-schedule-explained/",
      "/zh/guides/emergency-fund-vs-debt-payoff/",
      "/zh/tools/dti-dbr/"
    ],
    "breadcrumbLabel": "信貸提前還款划算嗎？先算省下利息，再扣違約金與流動性成本",
    "schemaFile": "002__zh__extra-payment-personal-loan.json"
  },
  "zh/fixed-vs-variable-rate-scenario": {
    "key": "zh/fixed-vs-variable-rate-scenario",
    "packageId": "003",
    "locale": "zh",
    "articleSlug": "fixed-vs-variable-rate-scenario",
    "title": "固定利率 vs 浮動利率怎麼比？不要猜未來利率，先做 3 條利率路徑壓力測試",
    "seoTitle": "固定利率 vs 浮動利率：用情境分析比較月付風險｜WorthCalc",
    "metaDescription": "固定利率與浮動利率沒有單一最佳答案。用利率不變、上升、下降三條路徑比較月付、總利息與現金流承受力，不靠預測做決策。",
    "excerpt": "別把「我猜利率會降」當決策模型。把同一筆本金放進利率持平、上升與下降情境，才看得出固定利率買到的是什麼保險、浮動利率承擔的是什麼風險。",
    "canonical": "https://worthcalc.win/zh/guides/fixed-vs-variable-rate-scenario/",
    "robots": "index,follow",
    "ogTitle": "固定 vs 浮動利率：用壓力測試，不用猜方向",
    "ogDescription": "三條利率路徑、同一筆貸款，直接比較月付與總成本如何變化。",
    "ogImage": "/images/guides/fixed-vs-variable-rate-scenario.webp",
    "imageAlt": "固定利率與浮動利率三種利率路徑情境比較圖",
    "imageBrief": "WorthCalc 編輯型資訊圖：以公式、情境比較與數字決策為核心，不使用假金融報價、假市場數據或浮誇投資圖像。",
    "lastReviewed": "2026-08-30",
    "related": [],
    "breadcrumbLabel": "固定利率 vs 浮動利率怎麼比？不要猜未來利率，先做 3 條利率路徑壓力測試",
    "schemaFile": "003__zh__fixed-vs-variable-rate-scenario.json"
  },
  "zh/freelance-minimum-billable-rate": {
    "key": "zh/freelance-minimum-billable-rate",
    "packageId": "008",
    "locale": "zh",
    "articleSlug": "freelance-minimum-billable-rate",
    "title": "接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本",
    "seoTitle": "接案最低報價怎麼算？Freelance 最低時薪完整公式｜WorthCalc",
    "metaDescription": "自由工作者最低報價不能用目標月薪除工作時數。把不可計費時間、軟體、保險、稅款準備、平台抽成、空窗與收款風險放入，反推最低可持續 billable rate。",
    "excerpt": "月薪除 160 會低估接案價格，因為不是每個工作小時都能開帳單。先把目標實領、營運成本、稅款準備與真正 billable hours 放進公式。",
    "canonical": "https://worthcalc.win/zh/guides/freelance-minimum-billable-rate/",
    "robots": "index,follow",
    "ogTitle": "接案最低報價怎麼算？Freelance 最低時薪完整公式 | WorthCalc",
    "ogDescription": "自由工作者最低報價不能用目標月薪除工作時數。把不可計費時間、軟體、保險、稅款準備、平台抽成、空窗與收款風險放入，反推最低可持續 billable rate。",
    "ogImage": "/images/guides/freelance-minimum-billable-rate.webp",
    "imageAlt": "目標實領、營運成本、稅款準備、72 與 55 可計費時數轉換成最低接案時薪的計算圖",
    "imageBrief": "",
    "lastReviewed": "2026-09-01",
    "related": [
      "https://worthcalc.win/en/budget-with-irregular-income/"
    ],
    "breadcrumbLabel": "接案最低報價怎麼算？不要用月薪除 160，小時費率要先補回不可計費時間與營運成本",
    "schemaFile": "008__zh__freelance-minimum-billable-rate.json"
  },
  "zh/rental-deposit-liquidity-cost": {
    "key": "zh/rental-deposit-liquidity-cost",
    "packageId": "006",
    "locale": "zh",
    "articleSlug": "rental-deposit-liquidity-cost",
    "title": "租屋押金要準備多少現金？把資金占用、搬家重疊與退還時間放進現金流",
    "seoTitle": "租屋押金現金怎麼抓？兩個月上限、搬家重疊與流動性試算｜WorthCalc",
    "metaDescription": "台灣住宅租賃押金最高不得超過兩個月租金。除了押金，還要算首月租金、搬家、重疊租期與押金退還時間造成的現金缺口。",
    "excerpt": "押金不是永久成本，但在租期內是被占用的現金。台灣住宅租賃押金不得超過兩個月租金；真正容易爆掉的是新押金、首月租金、舊押金尚未退與搬家費同時發生。",
    "canonical": "https://worthcalc.win/zh/guides/rental-deposit-liquidity-cost/",
    "robots": "index,follow",
    "ogTitle": "租屋不是只準備兩個月押金：先算搬家現金高峰",
    "ogDescription": "把新押金、首月租金、舊押金退還時間與搬家重疊期放到同一張現金流表。",
    "ogImage": "/images/guides/rental-deposit-liquidity-cost.webp",
    "imageAlt": "租屋搬家現金流時間軸，顯示新押金、首月租金、搬家費與舊押金退還",
    "imageBrief": "",
    "lastReviewed": "2026-09-02",
    "related": [
      "https://worthcalc.win/zh/tools/budget-builder/"
    ],
    "breadcrumbLabel": "租屋押金要準備多少現金？把資金占用、搬家重疊與退還時間放進現金流",
    "schemaFile": "006__zh__rental-deposit-liquidity-cost.json"
  },
  "zh/windfall-debt-vs-cash-allocation": {
    "key": "zh/windfall-debt-vs-cash-allocation",
    "packageId": "005",
    "locale": "zh",
    "articleSlug": "windfall-debt-vs-cash-allocation",
    "title": "年終獎金先還債還是留現金？用利率、缺口與再借款風險分配大筆收入",
    "seoTitle": "年終獎金先還債還是存錢？大筆收入分配算法｜WorthCalc",
    "metaDescription": "收到年終、獎金或退稅後，不必硬套 50/30/20。先算現金安全墊缺口、高利率債務節省與未來已知支出，再決定分配順序。",
    "excerpt": "大筆收入最容易被「固定百分比」簡化，但真正需要的是先找最危險的缺口：現金太薄、高利率債務，或已知支出即將到期。",
    "canonical": "https://worthcalc.win/zh/guides/windfall-debt-vs-cash-allocation/",
    "robots": "index,follow",
    "ogTitle": "年終獎金要先還債還是留現金？",
    "ogDescription": "用現金缺口、債務利率與再借款風險做 Before／After 分配。",
    "ogImage": "/images/guides/windfall-debt-vs-cash-allocation.webp",
    "imageAlt": "年終獎金分配決策圖，分成現金安全墊、高利率債務與目標支出三個資金桶",
    "imageBrief": "WorthCalc 三桶資金分配資訊圖；顯示安全墊缺口、債務 APR、未來已知支出，不提供固定百分比建議。",
    "lastReviewed": "2026-08-31",
    "related": [],
    "breadcrumbLabel": "年終獎金還債 vs 留現金",
    "schemaFile": "005__zh__windfall-debt-vs-cash-allocation.json"
  },
};
