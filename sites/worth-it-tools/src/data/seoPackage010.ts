export interface SeoPackage010GuideMeta {
  key: string;
  packageId: '010';
  locale: 'en' | 'es' | 'zh' | 'hi' | 'ar';
  articleSlug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  canonical: string;
  robots: 'index,follow';
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

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';

export const seoPackage010Guides: Record<string, SeoPackage010GuideMeta> = {
  'en/annual-cost-savings-calculator': {
    key: 'en/annual-cost-savings-calculator', packageId: '010', locale: 'en', articleSlug: 'annual-cost-savings-calculator',
    title: 'Annual Cost Savings Calculator: Compare Real Savings After Fees, Waste, and Usage',
    seoTitle: 'Annual Cost Savings Calculator | WorthCalc',
    metaDescription: 'Calculate annual savings from a switch using recurring fees, one-time costs, waste, and actual usage instead of a headline discount.',
    excerpt: 'A cheaper price is not automatically a saving. Compare the old and new annual totals, then subtract switching costs and unused capacity.',
    canonical: 'https://worthcalc.win/en/guides/annual-cost-savings-calculator/', robots: 'index,follow',
    ogTitle: 'Annual Cost Savings Calculator: Count the Costs That Actually Repeat',
    ogDescription: 'A practical annual comparison for subscriptions, insurance, utilities, memberships, and household services.', ogImage: image,
    imageAlt: 'annual cost savings comparison with recurring fees and actual usage', imageBrief: 'Two annual cost columns with fees, waste, and usage adjustments.', lastReviewed: '2026-09-02',
    related: ['/en/tools/budget-builder/', '/en/guides/annual-bills-monthly-equivalent/', '/en/guides/annual-bills-cash-flow-low-point/'], breadcrumbLabel: 'Annual Cost Savings Calculator', schemaFile: '010__en__annual-cost-savings-calculator.json',
  },
  'es/annual-cost-savings-calculator': {
    key: 'es/annual-cost-savings-calculator', packageId: '010', locale: 'es', articleSlug: 'annual-cost-savings-calculator',
    title: 'Calculadora de ahorro anual: compara el ahorro real tras comisiones y uso', seoTitle: 'Calculadora de ahorro anual | WorthCalc',
    metaDescription: 'Compara el coste anual actual y el nuevo incluyendo cuotas, gastos de cambio, desperdicio y uso real.', excerpt: 'El precio anunciado no es el ahorro. Suma lo que pagarás de verdad durante doce meses y compara escenarios.',
    canonical: 'https://worthcalc.win/es/guides/annual-cost-savings-calculator/', robots: 'index,follow', ogTitle: 'Calculadora de ahorro anual: del descuento anunciado al coste real', ogDescription: 'Método práctico para comparar suscripciones, seguros, suministros y servicios del hogar.', ogImage: image, imageAlt: 'comparación anual de gastos y ahorro real', imageBrief: 'Comparación anual con cuotas, costes de cambio y consumo.', lastReviewed: '2026-09-02',
    related: ['/es/tools/budget-builder/', '/en/guides/annual-bills-monthly-equivalent/', '/en/guides/annual-bills-cash-flow-low-point/'], breadcrumbLabel: 'Calculadora de ahorro anual', schemaFile: '010__es__annual-cost-savings-calculator.json',
  },
  'zh/annual-cost-savings-calculator': {
    key: 'zh/annual-cost-savings-calculator', packageId: '010', locale: 'zh', articleSlug: 'annual-cost-savings-calculator',
    title: '年度省下多少錢怎麼算？把手續費、耗損與實際使用算進來', seoTitle: '年度省錢計算器：比較真實年成本 | WorthCalc',
    metaDescription: '比較更換方案前後的年度總成本，納入固定費、一次性費用、未使用額度與實際使用量。', excerpt: '標價變便宜不等於真的省錢；要比較的是一年內實際付出的總額。',
    canonical: 'https://worthcalc.win/zh/guides/annual-cost-savings-calculator/', robots: 'index,follow', ogTitle: '年度省錢計算器：從折扣價算到真實年成本', ogDescription: '適合訂閱、保險、公用服務與家庭方案的年度成本比較方法。', ogImage: image, imageAlt: '年度方案成本與實際省下金額比較', imageBrief: '以固定費、轉換成本與使用量調整兩組年度成本。', lastReviewed: '2026-09-02',
    related: ['/zh/tools/budget-builder/', '/zh/guides/annual-expenses-monthly-equivalent/', '/zh/guides/annual-bill-cluster-cash-low-point/'], breadcrumbLabel: '年度省錢計算器', schemaFile: '010__zh__annual-cost-savings-calculator.json',
  },
  'hi/annual-cost-savings-calculator': {
    key: 'hi/annual-cost-savings-calculator', packageId: '010', locale: 'hi', articleSlug: 'annual-cost-savings-calculator',
    title: 'वार्षिक बचत कैलकुलेटर: शुल्क और वास्तविक उपयोग के बाद असली बचत', seoTitle: 'वार्षिक बचत कैलकुलेटर | WorthCalc',
    metaDescription: 'किसी योजना को बदलने से पहले शुल्क, एकमुश्त लागत, कम उपयोग और बारह महीनों का वास्तविक खर्च जोड़कर तुलना करें।', excerpt: 'सिर्फ कम कीमत देखकर बचत तय न करें। पूरे साल में होने वाला वास्तविक भुगतान तुलना का आधार है।',
    canonical: 'https://worthcalc.win/hi/guides/annual-cost-savings-calculator/', robots: 'index,follow', ogTitle: 'वार्षिक बचत कैलकुलेटर: छूट से आगे वास्तविक लागत', ogDescription: 'सब्सक्रिप्शन, बीमा और घरेलू सेवाओं के लिए सालाना लागत तुलना की सरल विधि।', ogImage: image, imageAlt: 'वार्षिक लागत और वास्तविक बचत की तुलना', imageBrief: 'शुल्क, बदलाव की लागत और उपयोग के आधार पर सालाना तुलना।', lastReviewed: '2026-09-02',
    related: ['/en/tools/budget-builder/', '/en/guides/annual-bills-monthly-equivalent/', '/en/guides/annual-bills-cash-flow-low-point/'], breadcrumbLabel: 'वार्षिक बचत कैलकुलेटर', schemaFile: '010__hi__annual-cost-savings-calculator.json',
  },
  'ar/annual-cost-savings-calculator': {
    key: 'ar/annual-cost-savings-calculator', packageId: '010', locale: 'ar', articleSlug: 'annual-cost-savings-calculator',
    title: 'حاسبة التوفير السنوي: احسب التوفير الحقيقي بعد الرسوم والاستخدام', seoTitle: 'حاسبة التوفير السنوي | WorthCalc',
    metaDescription: 'قارن التكلفة السنوية الحالية والجديدة بعد إضافة الرسوم والتكاليف لمرة واحدة والهدر والاستخدام الفعلي.', excerpt: 'السعر الأقل لا يعني تلقائياً توفيراً. قارن ما ستدفعه فعلياً خلال عام كامل.',
    canonical: 'https://worthcalc.win/ar/guides/annual-cost-savings-calculator/', robots: 'index,follow', ogTitle: 'حاسبة التوفير السنوي: من الخصم المعلن إلى التكلفة الفعلية', ogDescription: 'طريقة عملية لمقارنة الاشتراكات والتأمين والخدمات المنزلية على أساس سنوي.', ogImage: image, imageAlt: 'مقارنة التكلفة السنوية والتوفير الفعلي', imageBrief: 'مقارنة سنوية تشمل الرسوم وتكلفة التغيير والاستخدام.', lastReviewed: '2026-09-02',
    related: ['/en/tools/budget-builder/', '/en/guides/annual-bills-monthly-equivalent/', '/en/guides/annual-bills-cash-flow-low-point/'], breadcrumbLabel: 'حاسبة التوفير السنوي', schemaFile: '010__ar__annual-cost-savings-calculator.json',
  },
};
