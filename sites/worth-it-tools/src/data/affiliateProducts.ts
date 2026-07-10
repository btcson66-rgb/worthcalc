/**
 * 分潤商品池與工具頁對應表（空位系統）。
 *
 * 啟用方式：在 productPool 填入商品、在 toolAffiliateMap 建立
 * 「工具 slug → 商品 id 陣列」的對應。兩者皆為空時，
 * AffiliateRecs 元件不輸出任何 HTML（AdSense 審查期間保持零輸出）。
 */

export interface AffiliateProduct {
  id: string;
  name: string;
  price: string;
  shop: string;
  note: string;
  url: string;
}

export const productPool: AffiliateProduct[] = [];

export const toolAffiliateMap: Record<string, string[]> = {};

export function getAffiliateProducts(toolSlug: string): AffiliateProduct[] {
  const ids = toolAffiliateMap[toolSlug] ?? [];
  return ids
    .map((id) => productPool.find((product) => product.id === id))
    .filter((product): product is AffiliateProduct => Boolean(product));
}
