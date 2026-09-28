/**
 * 分潤商品池與工具頁對應表（空位系統）。
 *
 * 啟用方式：在 productPool 填入商品、在 toolAffiliateMap 建立
 * 「工具 slug → 商品 id 陣列」的對應。兩者皆為空時，
 * AffiliateRecs 元件不輸出任何 HTML（AdSense 審查期間保持零輸出）。
 */

/** Shared cross-site shape. Keep one affiliate URL per product. */
export interface AffiliateProduct {
  product_id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  affiliate_url: string;
  affiliate_network: string;
  batch_id: string;
  active: boolean;
}

export const productPool: AffiliateProduct[] = [];

export const toolAffiliateMap: Record<string, string[]> = {};

export function getAffiliateProducts(toolSlug: string): AffiliateProduct[] {
  const ids = toolAffiliateMap[toolSlug] ?? [];
  return ids
    .map((id) => productPool.find((product) => product.product_id === id))
    .filter((product): product is AffiliateProduct => Boolean(product));
}
