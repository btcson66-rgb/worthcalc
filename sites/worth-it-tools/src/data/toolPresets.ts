/*
 * 台灣常見情境一鍵帶入 -- preset buttons above the calculator (2026-11-08, task pack TP-20261108-P2-WORTHCALC).
 *
 * GA4 engagement on the calculator pages was 4.97%: most visitors read the example values and left. A preset
 * fills the page's own inputs and fires the same `input`/`change` events a keystroke would, so the existing
 * calculator script recomputes with no new math and no second code path.
 *
 * Rules for editing
 *   - Presets are EXAMPLES. The component labels them as such; they are not benchmarks, quotes or claims.
 *   - A preset must set the same keys as its siblings (use `common` + overrides), so switching between presets
 *     never leaves a stale value from the previous one.
 *   - Any rate or amount here is either a value the page already ships as its own default, or a figure the
 *     site already sources (the money briefs / rates files). `npm run check:tool-presets` checks that every
 *     key is the id of a real field on the built page.
 */

export interface ToolPreset {
  label: string;
  /** One line shown after the click: what the example assumes. */
  note: string;
  values: Record<string, string | number | boolean>;
}

export interface ToolPresetSet {
  presets: ToolPreset[];
}

function expand(common: Record<string, string | number | boolean>, presets: { label: string; note: string; values: Record<string, string | number | boolean> }[]): ToolPresetSet {
  return { presets: presets.map((p) => ({ ...p, values: { ...common, ...p.values } })) };
}

export const TOOL_PRESETS: Record<string, ToolPresetSet> = {
  'cashback-breakeven': expand(
    { 'annual-fee': 3000, 'welcome-bonus': 1000, 'category-one-spend': 12000, 'category-one-rate': 3, 'category-two-spend': 8000, 'category-two-rate': 2, 'category-three-spend': 10000, 'category-three-rate': 1.2 },
    [
      { label: '餐飲為主的上班族', note: '年費 3,000、首刷禮 1,000；餐飲 15,000 元回饋 3%、網購 5,000 元回饋 2%、其他 8,000 元回饋 1.2%。', values: { 'category-one-spend': 15000, 'category-two-spend': 5000, 'category-three-spend': 8000 } },
      { label: '重度網購族', note: '年費 1,800、首刷禮 500；餐飲 6,000 元回饋 2%、網購 15,000 元回饋 3%、其他 8,000 元回饋 1%。', values: { 'annual-fee': 1800, 'welcome-bonus': 500, 'category-one-spend': 6000, 'category-one-rate': 2, 'category-two-spend': 15000, 'category-two-rate': 3, 'category-three-spend': 8000, 'category-three-rate': 1 } },
      { label: '刷得不多的新鮮人', note: '年費 1,200、無首刷禮；餐飲 5,000 元與網購 3,500 元回饋 2%、其他 4,000 元回饋 1%。', values: { 'annual-fee': 1200, 'welcome-bonus': 0, 'category-one-spend': 5000, 'category-one-rate': 2, 'category-two-spend': 3500, 'category-two-rate': 2, 'category-three-spend': 4000, 'category-three-rate': 1 } },
    ],
  ),
  'costco-membership': expand(
    { 'monthly-spend': 8000, 'eligible-annual-spend': 96000, 'savings-rate': 15 },
    [
      { label: '單身、偶爾採購', note: '每月消費 3,500 元、一年合格消費 42,000 元、實測省錢率 10%。年費與回饋率沿用頁面現行官網數字。', values: { 'monthly-spend': 3500, 'eligible-annual-spend': 42000, 'savings-rate': 10 } },
      { label: '雙人小家庭', note: '每月消費 8,000 元、一年合格消費 96,000 元、實測省錢率 15%。年費與回饋率沿用頁面現行官網數字。', values: {} },
      { label: '多人家庭集中採購', note: '每月消費 20,000 元、一年合格消費 240,000 元、實測省錢率 15%。年費與回饋率沿用頁面現行官網數字。', values: { 'monthly-spend': 20000, 'eligible-annual-spend': 240000 } },
    ],
  ),
  'mortgage-payoff': expand(
    { 'mg-principal': 10000000, 'mg-rate': 2, 'mg-years': 30, 'mg-grace': 0, 'mg-method': 'annuity', 'mg-income': 100000 },
    [
      { label: '新青安 1,000 萬・40 年・寬限 5 年', note: '1,000 萬元、年利率 2.275%、40 年、寬限期 5 年、月收入 150,000 元；利率採本站新青安短文的條件，補貼期的優惠利率沒有計入。', values: { 'mg-rate': 2.275, 'mg-years': 40, 'mg-grace': 5, 'mg-income': 150000 } },
      { label: '一般首購 600 萬・30 年', note: '600 萬元、年利率 2%（本頁預設的示範值）、30 年、無寬限期、月收入 80,000 元。', values: { 'mg-principal': 6000000, 'mg-income': 80000 } },
      { label: '雙薪換屋 1,500 萬・30 年', note: '1,500 萬元、年利率 2%（本頁預設的示範值）、30 年、無寬限期、月收入 200,000 元。', values: { 'mg-principal': 15000000, 'mg-income': 200000 } },
    ],
  ),
  'credit-card-payoff': expand(
    { 'cc-balance': 30000, 'cc-apr': 15, 'cc-days': 30, 'cc-payment': 3000, 'cc-minpct': 5, 'cc-floor': 0, 'cc-free1000': false },
    [
      { label: '小額循環 3 萬', note: '本金 30,000 元、年利率 15%（銀行法規定的循環利率上限，不是你卡片的利率）、每月固定繳 3,000 元。', values: {} },
      { label: '旅遊刷爆 8 萬', note: '本金 80,000 元、年利率 15%（法定上限，請換成帳單上的利率）、每月固定繳 5,000 元。', values: { 'cc-balance': 80000, 'cc-payment': 5000 } },
      { label: '長期循環 15 萬', note: '本金 150,000 元、年利率 15%（法定上限，請換成帳單上的利率）、每月固定繳 8,000 元。', values: { 'cc-balance': 150000, 'cc-payment': 8000 } },
    ],
  ),
  'dti-calculator': expand(
    { 'dbr-income': 80000, 'dbr-card': 0, 'dbr-cashcard': 0, 'dbr-loan': 0, 'dbr-mortgage': 0, 'dbr-other': 0 },
    [
      { label: '輕負債', note: '月收入 80,000 元；信用卡餘額 10,000 元、信貸 30,000 元；房貸月付 15,000 元。', values: { 'dbr-card': 10000, 'dbr-loan': 30000, 'dbr-mortgage': 15000 } },
      { label: '有信貸又要申請房貸', note: '月收入 80,000 元；信用卡餘額 80,000 元、信貸 400,000 元；房貸月付 26,000 元；信貸月付 12,000 元。與〈負債比怎麼算〉的案例相同。', values: { 'dbr-card': 80000, 'dbr-loan': 400000, 'dbr-mortgage': 26000, 'dbr-other': 12000 } },
      { label: '無擔保負債偏高', note: '月收入 80,000 元；信用卡餘額 240,000 元、信貸 1,600,000 元；房貸月付 30,000 元。', values: { 'dbr-card': 240000, 'dbr-loan': 1600000, 'dbr-mortgage': 30000 } },
    ],
  ),
  'car-affordability': expand(
    { 'car-income': 90000, 'car-debt': 0, 'car-living': 40000, 'car-savings': 10000, 'car-drive': 'petrol', 'car-cc': 1800, 'car-hp': 200, 'car-exempt': false, 'car-optional': 18000, 'car-fuel': 3500, 'car-maint': 1500, 'car-parking': 2500, 'car-down': 200000, 'car-trade': 0, 'car-apr': 3, 'car-term': 60, 'car-cap': 15 },
    [
      { label: '月實領 9 萬・1,800cc 汽油', note: '與〈養車一個月多少錢〉的案例相同：必要生活支出 40,000、儲蓄 10,000、頭期款 20 萬、利率 3%、60 期、交通上限 15%。', values: {} },
      { label: '同薪水改買電動車', note: '同樣月實領 9 萬，改 200 HP 電動車、所在縣市免徵牌照稅；電費 1,200、保養 1,000 元／月。免不免徵由各縣市決定，請自行確認。', values: { 'car-drive': 'ev', 'car-exempt': true, 'car-fuel': 1200, 'car-maint': 1000 } },
      { label: '月實領 6 萬・1,200cc 小車', note: '必要生活支出 30,000、儲蓄 8,000、任意險 12,000 元／年、油費 2,500、保養 1,200、停車 1,500 元／月、頭期款 15 萬。', values: { 'car-income': 60000, 'car-living': 30000, 'car-savings': 8000, 'car-cc': 1200, 'car-optional': 12000, 'car-fuel': 2500, 'car-maint': 1200, 'car-parking': 1500, 'car-down': 150000 } },
    ],
  ),
  'budget-builder': expand(
    { 'bud-incomes': '85000, 140000, 30000, 110000, 95000, 70000', 'bud-mode': 'average', 'bud-fixed': 40000, 'bud-withhold': 0, 'bud-months': 6, 'bud-balance': 0 },
    [
      { label: '接案族（收入忽高忽低）', note: '近 6 個月收入 3 萬到 14 萬不等，預算以最低三個月的平均為基準；每月固定支出 40,000 元、預備金 6 個月。', values: { 'bud-mode': 'lowest3' } },
      { label: '穩定月薪族', note: '近 6 個月月薪都是 62,000 元；每月固定支出 32,000 元、預備金 6 個月、目前已存 100,000 元。', values: { 'bud-incomes': '62000, 62000, 62000, 62000, 62000, 62000', 'bud-fixed': 32000, 'bud-balance': 100000 } },
      { label: '業績獎金族', note: '近 6 個月收入 3.8 萬到 9 萬不等，預算以最差的一個月為基準；每月固定支出 30,000 元、預備金 6 個月。', values: { 'bud-incomes': '45000, 52000, 38000, 90000, 41000, 47000', 'bud-mode': 'worst', 'bud-fixed': 30000 } },
    ],
  ),
};
