export interface SeoPackageMeta {
  seoTitle: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  imageAlt: string;
}

export const seoPackage001: Record<string, SeoPackageMeta> = {
  "zh/liquid-net-worth-explained": {"seoTitle":"流動淨資產是什麼？和淨資產差在哪｜WorthCalc","robots":"index,follow","ogTitle":"流動淨資產是什麼？和淨資產差在哪｜WorthCalc","ogDescription":"流動淨資產聚焦可以快速轉成現金的資產，幫你看出「房子很多、現金很少」的流動性風險。完整範例與保守算法。","ogImage":"/images/seo/liquid-net-worth-explained.webp","imageAlt":"總淨資產與流動淨資產雙欄比較圖，房屋與車輛在左，現金與可變現資產在右"},
  "en/net-worth-vs-liquid-net-worth": {"seoTitle":"Net Worth vs Liquid Net Worth: Assets, Liquidity & Worked Example | WorthCalc","robots":"index,follow","ogTitle":"Net Worth vs Liquid Net Worth: Assets, Liquidity & Worked Example | WorthCalc","ogDescription":"Net worth measures assets minus liabilities. Liquid net worth asks how much of that value can become usable cash quickly. Learn a transparent way to track both without double-counting.","ogImage":"/images/seo/net-worth-vs-liquid-net-worth.webp","imageAlt":"Side-by-side household balance sheets showing total net worth with a home and liquid net worth with cash and marketable assets"},
  "en/savings-rate-gross-vs-net": {"seoTitle":"Savings Rate: Gross vs Net Income & What Counts as Saving | WorthCalc","robots":"index,follow","ogTitle":"Savings Rate: Gross vs Net Income & What Counts as Saving | WorthCalc","ogDescription":"Your savings rate depends on the denominator and on what you count as saving. Compare gross-income, take-home, cash-savings, retirement, and debt-principal methods transparently.","ogImage":"/images/seo/savings-rate-gross-vs-net.webp","imageAlt":"Gross-income and take-home savings-rate formulas shown beside separate buckets for cash, retirement, and debt principal"},
  "en/loan-term-monthly-payment-vs-total-interest": {"seoTitle":"Loan Term vs Monthly Payment & Total Interest: 36, 60, 84 Months | WorthCalc","robots":"index,follow","ogTitle":"Loan Term vs Monthly Payment & Total Interest: 36, 60, 84 Months | WorthCalc","ogDescription":"Longer loan terms usually reduce the required monthly payment but can increase total interest and keep you in debt longer. Compare term, APR, finance charge, and total payments together.","ogImage":"/images/seo/loan-term-monthly-payment-vs-total-interest.webp","imageAlt":"Three loan schedules labeled 36, 60, and 84 months with falling monthly payments and rising total-interest bars"},
};
