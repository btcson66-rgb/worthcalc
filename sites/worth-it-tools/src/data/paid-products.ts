export type PaidProductId = 'PRODUCT-003' | 'PRODUCT-005';
export type PaidProductLocale = 'en' | 'zh';
export type PaidProvider = 'payhip' | 'gumroad';

export interface PaidProduct {
  id: PaidProductId;
  name: string;
  price: string;
  value: Record<PaidProductLocale, string>;
  landing: Record<PaidProductLocale, string>;
  providers: Record<PaidProvider, string>;
}

// Keep these IDs aligned with the FunnyTools portfolio registry. Provider URLs
// are current, already-live checkout URLs; do not replace them with guessed
// listing slugs or create new products from this file.
export const paidProducts: Record<PaidProductId, PaidProduct> = {
  'PRODUCT-003': {
    id: 'PRODUCT-003',
    name: 'Freelancer Pricing Decision Engine',
    price: 'US$19',
    value: {
      en: 'Model hidden hours, overhead, risk, and quote options before accepting freelance work.',
      zh: '把不可計費時間、成本、風險與報價選項放進同一個接案決策模型。',
    },
    landing: {
      en: '/en/freelancer-pricing-decision-engine/',
      zh: '/zh/freelancer-pricing-decision-engine/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=tVdur',
      gumroad: 'https://gumroad.com/checkout?product=spgrvp&quantity=1',
    },
  },
  'PRODUCT-005': {
    id: 'PRODUCT-005',
    name: 'Job Offer True Value Decision Engine',
    price: 'US$19',
    value: {
      en: 'Compare salary, benefits, commute, time, and fit instead of judging an offer by salary alone.',
      zh: '比較薪資、福利、通勤、時間與生活適配度，而不是只看 offer 數字。',
    },
    landing: {
      en: '/en/job-offer-true-value-decision-engine/',
      zh: '/zh/job-offer-true-value-decision-engine/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=NDfro',
      gumroad: 'https://gumroad.com/checkout?product=xbsnpk&quantity=1',
    },
  },
};
