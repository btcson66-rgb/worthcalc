export interface SeoPackage012GuideMeta {
  key: string; packageId: '012'; locale: 'en' | 'es' | 'zh' | 'hi' | 'ar'; articleSlug: string;
  title: string; seoTitle: string; metaDescription: string; excerpt: string; canonical: string;
  robots: 'index,follow'; ogTitle: string; ogDescription: string; ogImage: string; imageAlt: string;
  imageBrief: string; lastReviewed: string; related: string[]; breadcrumbLabel: string; schemaFile: string;
}

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';
type PackageLocale = SeoPackage012GuideMeta['locale'];
type PackageEntry = { locale: PackageLocale; title: string; description: string; excerpt: string; alt: string };
const definitions: { slug: string; entries: PackageEntry[] }[] = [
  { slug: "costco-executive-break-even-eligible-spend", entries: [
    { locale: "en", title: "Costco Executive Break-Even: How Much Eligible Spending Covers the Upgrade?", description: "Calculate the eligible Costco spending needed to recover an Executive upgrade fee without counting excluded or extra purchases.", excerpt: "Calculate the eligible Costco spending needed to recover an Executive upgrade fee without counting excluded or extra purchases.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Punto de equilibrio de Costco Executive: gasto elegible para recuperar la mejora", description: "Calcula cuánto gasto elegible de Costco cubre la cuota adicional de Executive sin contar compras excluidas o innecesarias.", excerpt: "Calcula cuánto gasto elegible de Costco cubre la cuota adicional de Executive sin contar compras excluidas o innecesarias.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 尊榮會員回本要買多少？用合格消費算升級損益兩平", description: "用符合回饋資格的 Costco 消費、升級費與實際使用情境，計算尊榮會員何時可能回本。", excerpt: "用符合回饋資格的 Costco 消費、升級費與實際使用情境，計算尊榮會員何時可能回本。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco Executive break-even: upgrade fee वसूलने के लिए eligible spending कितना हो?", description: "Excluded और अतिरिक्त खरीद को हटाकर Costco Executive upgrade fee की भरपाई करने वाला eligible खर्च निकालें।", excerpt: "Excluded और अतिरिक्त खरीद को हटाकर Costco Executive upgrade fee की भरपाई करने वाला eligible खर्च निकालें।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "نقطة تعادل Costco Executive: كم يلزم من الإنفاق المؤهل لتغطية الترقية؟", description: "احسب الإنفاق المؤهل في Costco اللازم لتعويض رسم ترقية Executive بعد استبعاد المشتريات غير المؤهلة والزائدة.", excerpt: "احسب الإنفاق المؤهل في Costco اللازم لتعويض رسم ترقية Executive بعد استبعاد المشتريات غير المؤهلة والزائدة.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-membership-fee-break-even-savings", entries: [
    { locale: "en", title: "Costco Membership Fee Break-Even: How Much Shopping Must Be Cheaper?", description: "Estimate the Costco shopping savings needed to recover a membership fee after travel, delivery, waste, and realistic use.", excerpt: "Estimate the Costco shopping savings needed to recover a membership fee after travel, delivery, waste, and realistic use.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Punto de equilibrio de la cuota Costco: ¿cuánto debes comprar para recuperar el coste?", description: "Estima el gasto planificado que necesita una membresía Costco para cubrir su cuota después de transporte, entrega y desperdicio.", excerpt: "Estima el gasto planificado que necesita una membresía Costco para cubrir su cuota después de transporte, entrega y desperdicio.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 會員費要買多少才回本？把實際價差與交通成本一起算", description: "比較 Costco 會員費、原本就會購買的商品價差、交通、配送、囤貨浪費與實際使用量。", excerpt: "比較 Costco 會員費、原本就會購買的商品價差、交通、配送、囤貨浪費與實際使用量。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco membership fee break-even: fee वसूलने के लिए कितनी shopping चाहिए?", description: "Travel, delivery, waste और वास्तविक use के बाद Costco membership fee को cover करने वाली planned shopping का अनुमान लगाएँ।", excerpt: "Travel, delivery, waste और वास्तविक use के बाद Costco membership fee को cover करने वाली planned shopping का अनुमान लगाएँ।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "نقطة تعادل عضوية Costco: كم يجب أن تتسوق لتعويض الرسم؟", description: "قدّر حجم التسوق المخطط الذي يغطي رسم عضوية Costco بعد النقل والتوصيل والهدر والاستخدام الواقعي.", excerpt: "قدّر حجم التسوق المخطط الذي يغطي رسم عضوية Costco بعد النقل والتوصيل والهدر والاستخدام الواقعي.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-household-card-break-even-use", entries: [
    { locale: "en", title: "Costco Household Card Break-Even: When Does Shared Use Add Real Value?", description: "Measure the incremental value of a Costco household card using planned purchases, duplicate fees avoided, and extra travel or spending.", excerpt: "Measure the incremental value of a Costco household card using planned purchases, duplicate fees avoided, and extra travel or spending.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Tarjeta doméstica de Costco: mide cuándo el uso compartido aporta valor real", description: "Calcula el valor incremental de una tarjeta doméstica Costco con compras previstas, costes evitados, viajes y gasto adicional.", excerpt: "Calcula el valor incremental de una tarjeta doméstica Costco con compras previstas, costes evitados, viajes y gasto adicional.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 家庭卡值得嗎？用實際使用量算共用會員的價值", description: "以家庭卡帶來的原本計畫消費、可避免成本、額外交通與新增支出，估算共用會員的實際價值。", excerpt: "以家庭卡帶來的原本計畫消費、可避免成本、額外交通與新增支出，估算共用會員的實際價值。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco household card break-even: shared use का वास्तविक value कैसे मापें", description: "Planned purchases, avoided costs, extra travel और induced spending से Costco household card का incremental value मापें।", excerpt: "Planned purchases, avoided costs, extra travel और induced spending से Costco household card का incremental value मापें।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "بطاقة الأسرة في Costco: كيف تقيس قيمة الاستخدام المشترك فعلياً؟", description: "قِس قيمة بطاقة الأسرة في Costco من خلال المشتريات المخططة والتكاليف المتجنبة والسفر والإنفاق الإضافي.", excerpt: "قِس قيمة بطاقة الأسرة في Costco من خلال المشتريات المخططة والتكاليف المتجنبة والسفر والإنفاق الإضافي.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-gas-detour-break-even", entries: [
    { locale: "en", title: "Costco Gas Detour Break-Even: Is the Lower Price Worth the Extra Drive?", description: "Calculate whether a Costco fuel price gap covers the fuel, time, and route cost of making a detour.", excerpt: "Calculate whether a Costco fuel price gap covers the fuel, time, and route cost of making a detour.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Desvío para gasolina de Costco: calcula si el precio bajo compensa el trayecto", description: "Compara la diferencia de precio del combustible Costco con kilómetros, consumo, peajes, aparcamiento y cuota atribuible.", excerpt: "Compara la diferencia de precio del combustible Costco con kilómetros, consumo, peajes, aparcamiento y cuota atribuible.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 加油繞路划算嗎？把油價差、里程與會員成本算清楚", description: "計算 Costco 加油的每加侖價差是否足以抵銷額外里程、油耗、停車與繞路成本。", excerpt: "計算 Costco 加油的每加侖價差是否足以抵銷額外里程、油耗、停車與繞路成本。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco gas detour break-even: कम fuel price extra drive को कब cover करती है?", description: "Fuel price gap को extra miles, vehicle efficiency, toll, parking और allocated membership cost से compare करें।", excerpt: "Fuel price gap को extra miles, vehicle efficiency, toll, parking और allocated membership cost से compare करें।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "نقطة تعادل الانحراف إلى وقود Costco: هل يعوض السعر الأقل الرحلة؟", description: "قارن فرق سعر الوقود في Costco بالمسافة الإضافية وكفاءة السيارة والرسوم وتكلفة العضوية المنسوبة.", excerpt: "قارن فرق سعر الوقود في Costco بالمسافة الإضافية وكفاءة السيارة والرسوم وتكلفة العضوية المنسوبة.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-reward-exclusion-effective-rate", entries: [
    { locale: "en", title: "Costco Reward Exclusions: Calculate Your Effective Reward Rate", description: "Convert an advertised Costco reward rate into an effective rate after excluded purchases, refunds, taxes, and unused eligibility.", excerpt: "Convert an advertised Costco reward rate into an effective rate after excluded purchases, refunds, taxes, and unused eligibility.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Exclusiones de recompensas Costco: calcula tu tasa efectiva real", description: "Ajusta la tasa anunciada de Costco por compras excluidas, devoluciones, impuestos y saldo que no puedes usar.", excerpt: "Ajusta la tasa anunciada de Costco por compras excluidas, devoluciones, impuestos y saldo que no puedes usar.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 回饋排除項目怎麼算？找出你的實際回饋率", description: "把 Costco 宣稱的回饋率調整為符合資格消費、退貨、稅費與排除項目後的有效回饋率。", excerpt: "把 Costco 宣稱的回饋率調整為符合資格消費、退貨、稅費與排除項目後的有效回饋率。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco reward exclusions: आपकी effective reward rate कितनी है?", description: "Excluded purchases, refunds, taxes और unusable rewards के बाद advertised Costco reward rate को वास्तविक rate में बदलें।", excerpt: "Excluded purchases, refunds, taxes और unusable rewards के बाद advertised Costco reward rate को वास्तविक rate में बदलें।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "استثناءات مكافآت Costco: احسب معدل المكافأة الفعلي لديك", description: "حوّل المعدل المعلن من Costco إلى معدل فعلي بعد الاستثناءات والمرتجعات والضرائب والمكافأة غير القابلة للاستخدام.", excerpt: "حوّل المعدل المعلن من Costco إلى معدل فعلي بعد الاستثناءات والمرتجعات والضرائب والمكافأة غير القابلة للاستخدام.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-reward-cap-usage-break-even", entries: [
    { locale: "en", title: "Costco Reward Cap: Find the Spending Level Where More Purchases Stop Helping", description: "Model a Costco reward cap, qualified spending, and the point where additional purchases no longer increase membership value.", excerpt: "Model a Costco reward cap, qualified spending, and the point where additional purchases no longer increase membership value.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Límite de recompensa Costco: identifica cuándo gastar más deja de ayudar", description: "Modela el límite de recompensa Costco, el gasto elegible y el punto donde las compras adicionales ya no aumentan el beneficio.", excerpt: "Modela el límite de recompensa Costco, el gasto elegible y el punto donde las compras adicionales ya no aumentan el beneficio.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 回饋上限怎麼算？找出超過哪個消費額後不再增加", description: "把 Costco 回饋率、合格消費與年度上限放入公式，找出額外消費不再增加回饋的區間。", excerpt: "把 Costco 回饋率、合格消費與年度上限放入公式，找出額外消費不再增加回饋的區間。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco reward cap: किस spending level के बाद अतिरिक्त खरीद reward नहीं बढ़ाती?", description: "Costco reward rate, qualified spending और annual cap से वह सीमा निकालें जहाँ अतिरिक्त खरीद का reward benefit रुक जाता है।", excerpt: "Costco reward rate, qualified spending और annual cap से वह सीमा निकालें जहाँ अतिरिक्त खरीद का reward benefit रुक जाता है।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "سقف مكافأة Costco: متى يتوقف الإنفاق الإضافي عن زيادة الفائدة؟", description: "استخدم معدل المكافأة والإنفاق المؤهل والسقف السنوي لمعرفة متى لا تضيف المشتريات مكافأة جديدة.", excerpt: "استخدم معدل المكافأة والإنفاق المؤهل والسقف السنوي لمعرفة متى لا تضيف المشتريات مكافأة جديدة.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
  { slug: "costco-renewal-refund-reward-timing", entries: [
    { locale: "en", title: "Costco Renewal, Refund, and Reward Timing: Calculate the Net Membership Cost", description: "Map renewal dates, reward issuance, cancellation, and refunds to estimate the cash cost of changing a Costco membership.", excerpt: "Map renewal dates, reward issuance, cancellation, and refunds to estimate the cash cost of changing a Costco membership.", alt: "Costco membership cost comparison" },
    { locale: "es", title: "Renovación, reembolso y recompensa Costco: calcula el coste neto por fechas", description: "Organiza fechas de mejora, emisión de recompensa, renovación, cancelación y reembolso para estimar el coste de cambiar de nivel.", excerpt: "Organiza fechas de mejora, emisión de recompensa, renovación, cancelación y reembolso para estimar el coste de cambiar de nivel.", alt: "Comparación de costes de membresía Costco" },
    { locale: "zh", title: "Costco 續約、退費與回饋何時發生？計算會員變更的淨成本", description: "把升級、回饋發放、續約、取消、降級與退款日期放在同一條時間線，估算實際現金成本。", excerpt: "把升級、回饋發放、續約、取消、降級與退款日期放在同一條時間線，估算實際現金成本。", alt: "Costco 會員成本比較" },
    { locale: "hi", title: "Costco renewal, refund और reward timing: membership का net cost कैसे निकालें", description: "Upgrade, reward issuance, renewal, cancellation और refund dates को timeline पर रखकर membership change का cash cost समझें।", excerpt: "Upgrade, reward issuance, renewal, cancellation और refund dates को timeline पर रखकर membership change का cash cost समझें।", alt: "Costco membership cost comparison" },
    { locale: "ar", title: "توقيت تجديد Costco والاسترداد والمكافأة: احسب التكلفة الصافية", description: "ضع تواريخ الترقية وإصدار المكافأة والتجديد والإلغاء والاسترداد على خط زمني واحد لتقدير التكلفة النقدية.", excerpt: "ضع تواريخ الترقية وإصدار المكافأة والتجديد والإلغاء والاسترداد على خط زمني واحد لتقدير التكلفة النقدية.", alt: "مقارنة تكلفة عضوية Costco" },
  ] },
];

function relatedFor(locale: SeoPackage012GuideMeta['locale'], slug: string): string[] {
  const annual = `/${locale}/guides/annual-cost-savings-calculator/`;
  const recurring = `/${locale}/guides/recurring-costs-annual-total/`;
  const sibling = slug === 'costco-executive-break-even-eligible-spend'
    ? `/${locale}/guides/costco-membership-fee-break-even-savings/`
    : `/${locale}/guides/costco-executive-break-even-eligible-spend/`;
  return [annual, recurring, sibling];
}

export const seoPackage012Guides: Record<string, SeoPackage012GuideMeta> = {};
for (const definition of definitions) {
  for (const entry of definition.entries) {
    const key = `${entry.locale}/${definition.slug}`;
    seoPackage012Guides[key] = {
      key, packageId: '012', locale: entry.locale, articleSlug: definition.slug,
      title: entry.title, seoTitle: `${entry.title} | WorthCalc`, metaDescription: entry.description,
      excerpt: entry.excerpt, canonical: `https://worthcalc.win/${entry.locale}/guides/${definition.slug}/`,
      robots: 'index,follow', ogTitle: entry.title, ogDescription: entry.description, ogImage: image,
      imageAlt: entry.alt, imageBrief: 'Costco membership cost comparison', lastReviewed: '2026-09-02',
      related: relatedFor(entry.locale, definition.slug), breadcrumbLabel: entry.title,
      schemaFile: `012__${entry.locale}__${definition.slug}.json`,
    };
  }
}
