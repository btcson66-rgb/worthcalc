export interface SeoPackage011GuideMeta {
  key: string;
  packageId: '011';
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

type Entry = {
  locale: SeoPackage011GuideMeta['locale'];
  title: string;
  description: string;
  excerpt: string;
  alt: string;
};

const image = '/images/guides/annual-bills-monthly-equivalent-og.webp';

const definitions: { slug: string; entries: Entry[] }[] = [
  {
    slug: 'subscription-price-increase-annual-impact',
    entries: [
      { locale: 'en', title: 'Subscription Price Increase: Calculate the Annual Impact on Your Budget', description: 'Measure how a monthly subscription price increase changes your annual cost, cash flow, and comparison with alternatives.', excerpt: 'A small monthly increase belongs in the months when it applies. Calculate the new total before deciding whether to switch.', alt: 'annual impact of a subscription price increase' },
      { locale: 'es', title: 'Subida del precio de una suscripción: calcula su impacto anual', description: 'Mide cómo una subida mensual cambia el coste anual, el flujo de caja y la comparación con otras opciones.', excerpt: 'Una subida pequeña se acumula en los meses en que aplica. Calcula el nuevo total antes de cambiar.', alt: 'impacto anual de una subida de suscripción' },
      { locale: 'zh', title: '訂閱漲價一年多付多少？把生效日期與實際使用期算進預算', description: '計算訂閱月費上調對年度總成本、現金流與替代方案損益兩平的實際影響。', excerpt: '先按生效月份重算年度總額，再比較留下或更換方案的未來成本。', alt: '訂閱漲價對年度預算的影響' },
      { locale: 'hi', title: 'सब्सक्रिप्शन की कीमत बढ़े तो सालाना असर कैसे गिनें', description: 'मासिक शुल्क बढ़ने से वार्षिक खर्च, नकदी प्रवाह और विकल्प की तुलना पर होने वाला असर निकालें।', excerpt: 'बढ़ोतरी को उन्हीं billing months में लगाएँ जहाँ वह लागू है, फिर नया total compare करें।', alt: 'सब्सक्रिप्शन कीमत बढ़ने का सालाना असर' },
      { locale: 'ar', title: 'زيادة سعر الاشتراك: احسب أثرها السنوي على ميزانيتك', description: 'قِس كيف تغيّر الزيادة الشهرية التكلفة السنوية والسيولة ومقارنة الاشتراك ببديل آخر.', excerpt: 'طبّق الزيادة على الأشهر التي تسري فيها ثم قارن التكلفة المستقبلية بالبديل.', alt: 'الأثر السنوي لزيادة سعر الاشتراك' },
    ],
  },
  {
    slug: 'free-trial-auto-renewal-first-charge',
    entries: [
      { locale: 'en', title: 'Free Trial Auto-Renewal Cost: Calculate the First Charge Before You Start', description: 'Turn a free trial into a realistic first-period cost by checking renewal price, fees, cancellation timing, and actual use.', excerpt: 'A trial headline can hide shipping or a first renewal. Put the deadline and possible charge on your calendar.', alt: 'free trial and first auto-renewal cost' },
      { locale: 'es', title: 'Coste de una prueba gratuita con renovación automática: calcula el primer cargo', description: 'Convierte una prueba gratuita en un coste realista revisando renovación, cuotas, fecha límite de cancelación y uso.', excerpt: 'Una prueba puede ocultar envío o la primera renovación. Anota el plazo y el cargo posible.', alt: 'coste de prueba gratuita y primera renovación' },
      { locale: 'zh', title: '免費試用自動續費會扣多少？先算第一筆可能的實際成本', description: '把免費試用的續約價、運費、稅費、取消期限與實際使用量放進第一期成本比較。', excerpt: '試用畫面寫 0 元不代表沒有運費或續約風險；先把最晚取消日放入行事曆。', alt: '免費試用與第一筆自動續費成本' },
      { locale: 'hi', title: 'फ्री ट्रायल की ऑटो-रिन्यू लागत: पहला संभावित चार्ज पहले गिनें', description: 'रिन्यूअल कीमत, फीस, cancellation deadline और वास्तविक उपयोग से फ्री ट्रायल का पहला खर्च निकालें।', excerpt: 'Free दिखने वाले trial में shipping या renewal हो सकता है; deadline को calendar में रखें।', alt: 'फ्री ट्रायल और पहला ऑटो-रिन्यू चार्ज' },
      { locale: 'ar', title: 'تكلفة التجربة المجانية والتجديد التلقائي: احسب أول خصم محتمل', description: 'حوّل التجربة المجانية إلى تكلفة واقعية بمراجعة سعر التجديد والرسوم وموعد الإلغاء والاستخدام الفعلي.', excerpt: 'قد يخفي العرض رسماً أو تجديداً أولاً؛ سجّل موعد الإلغاء والخصم المحتمل.', alt: 'تكلفة التجربة المجانية وأول تجديد تلقائي' },
    ],
  },
  {
    slug: 'pause-vs-cancel-membership-cost',
    entries: [
      { locale: 'en', title: 'Pause vs Cancel a Membership: Compare the Cost of Keeping Access', description: 'Compare a membership pause with cancellation by adding pause fees, reactivation costs, lost credits, and expected return time.', excerpt: 'A free cancellation today may carry a joining fee later. Compare the whole gap, not just the next charge.', alt: 'pause versus cancel membership cost' },
      { locale: 'es', title: 'Pausar o cancelar una membresía: compara el coste de conservar el acceso', description: 'Compara pausa y cancelación sumando cuotas temporales, reactivación, créditos perdidos y la fecha probable de regreso.', excerpt: 'Cancelar puede ser gratis hoy y cobrar al volver. Compara todo el intervalo sin uso.', alt: 'coste de pausar o cancelar una membresía' },
      { locale: 'zh', title: '會員暫停還是取消比較省？比較保留資格與重新加入的成本', description: '把暫停費、重新啟用費、失效額度與預計回來使用的時間放在同一張會員成本比較表。', excerpt: '不要只看今天是否免費；把停用期和回來時的費用放在同一個情境。', alt: '會員暫停與取消成本比較' },
      { locale: 'hi', title: 'Membership pause या cancel: access बनाए रखने की लागत की तुलना', description: 'Pause fee, reactivation cost, खोए credits और वापसी के समय को जोड़कर membership विकल्प compare करें।', excerpt: 'आज का free cancellation बाद में joining fee ला सकता है; पूरे gap की तुलना करें।', alt: 'membership pause और cancel की लागत' },
      { locale: 'ar', title: 'إيقاف العضوية أم إلغاؤها: قارن تكلفة الاحتفاظ بالوصول', description: 'قارن بين الإيقاف والإلغاء بإضافة رسوم التجميد وإعادة التفعيل والأرصدة المفقودة وموعد العودة المتوقع.', excerpt: 'قد يكون الإلغاء مجانياً اليوم لكنه يفرض رسماً عند العودة؛ قارن فترة الانقطاع كاملة.', alt: 'مقارنة تكلفة إيقاف العضوية وإلغائها' },
    ],
  },
  {
    slug: 'family-plan-break-even-members',
    entries: [
      { locale: 'en', title: 'Family Plan Break-Even: How Many Members Make the Upgrade Worth It?', description: 'Calculate when a family or multi-user plan costs less than separate accounts using actual active members and usage.', excerpt: 'Available seats are not active users. Count the accounts the shared plan really replaces.', alt: 'family plan break-even active members' },
      { locale: 'es', title: 'Punto de equilibrio de un plan familiar: ¿cuántos usuarios lo justifican?', description: 'Calcula cuándo un plan familiar cuesta menos que cuentas separadas usando usuarios activos, cuotas e impuestos.', excerpt: 'Las plazas disponibles no son usuarios activos. Cuenta las cuentas que el plan sustituye de verdad.', alt: 'usuarios activos para el equilibrio de un plan familiar' },
      { locale: 'zh', title: '家庭方案幾個人用才划算？算出多人會員的損益兩平人數', description: '用實際活躍人數、額外席次、稅費與促銷後價格，比較家庭方案和分開帳號的真實成本。', excerpt: '可用席次不等於活躍使用者；只計算家庭方案真正取代的帳號。', alt: '家庭方案活躍人數損益兩平' },
      { locale: 'hi', title: 'Family plan break-even: कितने active members पर upgrade सही है?', description: 'अलग accounts की जगह family plan लेने से पहले active users, fees, tax और उपयोग से break-even members गिनें।', excerpt: 'Available seats को active users न मानें; केवल replace होने वाले accounts गिनें।', alt: 'family plan के break-even active members' },
      { locale: 'ar', title: 'نقطة التعادل للخطة العائلية: كم عضواً يجعل الترقية مجدية؟', description: 'احسب متى تصبح الخطة العائلية أوفر من الحسابات المنفصلة وفق الأعضاء النشطين والرسوم والاستخدام الفعلي.', excerpt: 'المقاعد المتاحة ليست أعضاء نشطين؛ احسب الحسابات التي تستبدلها الخطة فعلاً.', alt: 'الأعضاء النشطون لنقطة تعادل الخطة العائلية' },
    ],
  },
  {
    slug: 'prepaid-balance-expiration-cost',
    entries: [
      { locale: 'en', title: 'Prepaid Balance Expiration Cost: Measure What Unused Credits Really Cost', description: 'Calculate the effective cost of prepaid credits or visits when part of the balance expires or is unlikely to be used.', excerpt: 'The advertised unit price assumes full use. Divide by the credits you can realistically complete.', alt: 'prepaid credits and expiration cost per use' },
      { locale: 'es', title: 'Coste de saldo prepago que caduca: mide lo que realmente usas', description: 'Calcula el coste efectivo de créditos o visitas prepagadas cuando una parte caduca o no se utilizará.', excerpt: 'El precio unitario supone uso completo. Divide por los créditos que realmente completarás.', alt: 'saldo prepago caducado y coste por uso' },
      { locale: 'zh', title: '預付額度到期怎麼算？找出用不完點數的實際成本', description: '計算預付點數、堂數或次數在到期前只能用掉一部分時的有效單位成本。', excerpt: '廣告單價假設全部用完；應除以有效期間內實際完成的數量。', alt: '預付點數到期與每次實際成本' },
      { locale: 'hi', title: 'Prepaid balance expiry cost: unused credits की असली लागत गिनें', description: 'जब prepaid credits या visits का कुछ हिस्सा expire हो जाए या इस्तेमाल न हो, तब effective cost निकालें।', excerpt: 'Advertised unit price full use मानता है; realistic completed uses से divide करें।', alt: 'prepaid credits expiry और effective cost' },
      { locale: 'ar', title: 'تكلفة الرصيد المدفوع مسبقاً عند انتهاء الصلاحية: احسب الاستخدام الفعلي', description: 'احسب التكلفة الفعلية للأرصدة أو الزيارات المدفوعة مسبقاً عندما ينتهي جزء منها أو يصعب استخدامه.', excerpt: 'السعر المعلن يفترض استخدام الكمية كلها؛ اقسم على الاستخدام المكتمل واقعياً.', alt: 'انتهاء الرصيد المدفوع مسبقاً وتكلفة الاستخدام' },
    ],
  },
  {
    slug: 'minimum-spend-fee-waiver-break-even',
    entries: [
      { locale: 'en', title: 'Minimum Spend Fee Waiver: Calculate Whether the Threshold Saves Money', description: 'Find the break-even point for a fee waiver without treating unnecessary spending as a saving.', excerpt: 'A waived fee is useful only when the qualifying purchases were already needed.', alt: 'minimum spend threshold and fee waiver break-even' },
      { locale: 'es', title: 'Exención por gasto mínimo: calcula si el umbral realmente ahorra', description: 'Encuentra el punto de equilibrio de una exención de cuota sin llamar ahorro al gasto innecesario.', excerpt: 'La exención ayuda solo cuando las compras válidas ya eran necesarias.', alt: 'umbral de gasto mínimo y equilibrio de exención' },
      { locale: 'zh', title: '滿額免手續費真的省嗎？用必要消費算損益兩平門檻', description: '計算滿額免運或免手續費是否真的降低成本，並把為了達標而增加的非必要消費分開。', excerpt: '免掉的費用只有在必要消費本來就會發生時才是真正節省。', alt: '滿額免手續費與損益兩平門檻' },
      { locale: 'hi', title: 'Minimum spend fee waiver: threshold से पहले असली saving जाँचें', description: 'Fee waiver का break-even निकालें और threshold के लिए किए गए अनावश्यक खर्च को saving न मानें।', excerpt: 'Waiver तभी value है जब eligible खरीद पहले से जरूरी थी।', alt: 'minimum spend और fee waiver break-even' },
      { locale: 'ar', title: 'الإعفاء عند حد أدنى للإنفاق: احسب هل يوفر المال فعلاً', description: 'احسب نقطة التعادل للإعفاء من الرسم من دون اعتبار الإنفاق غير الضروري توفيراً.', excerpt: 'يكون الإعفاء مفيداً عندما كانت المشتريات المؤهلة مخططة أصلاً.', alt: 'حد الإنفاق الأدنى ونقطة تعادل الإعفاء' },
    ],
  },
  {
    slug: 'billing-date-cash-flow-overlap',
    entries: [
      { locale: 'en', title: 'Billing Date Cash-Flow Overlap: Plan for Large Charges in the Same Week', description: 'Map subscription and annual bill dates to find temporary cash-flow pressure without confusing timing with annual cost.', excerpt: 'Close billing dates can create a low balance even when the twelve-month total is unchanged.', alt: 'billing date overlap and cash-flow low point' },
      { locale: 'es', title: 'Solapamiento de fechas de cobro: planifica cargos grandes en la misma semana', description: 'Ordena renovaciones y facturas anuales para detectar presión temporal de liquidez sin confundirla con el coste anual.', excerpt: 'Fechas cercanas pueden bajar el saldo aunque el total anual no cambie.', alt: 'solapamiento de cobros y punto bajo de liquidez' },
      { locale: 'zh', title: '帳單日撞在同一週怎麼辦？分清現金流壓力與年度總成本', description: '把訂閱續費、年繳帳單與收入日放到實際日期，找出短期現金流低點。', excerpt: '扣款靠近可能壓低餘額，但不代表十二個月總額增加。', alt: '帳單日重疊與現金流低點' },
      { locale: 'hi', title: 'Billing dates overlap: एक ही week में बड़े charges के लिए cash-flow plan', description: 'Subscription और annual bill dates को map करके temporary cash pressure पहचानें, बिना extra annual cost समझे।', excerpt: 'पास-पास charges balance घटा सकते हैं, भले annual total वही रहे।', alt: 'billing date overlap और cash-flow low point' },
      { locale: 'ar', title: 'تداخل مواعيد الخصم: خطط للرسوم الكبيرة في الأسبوع نفسه', description: 'رتّب مواعيد التجديد والفواتير السنوية لاكتشاف ضغط السيولة المؤقت من دون خلطه بالتكلفة السنوية.', excerpt: 'تقارب الخصومات قد يخفض الرصيد رغم بقاء المجموع السنوي نفسه.', alt: 'تداخل مواعيد الخصم وأدنى رصيد نقدي' },
    ],
  },
];

function relatedFor(locale: SeoPackage011GuideMeta['locale'], slug: string): string[] {
  const budget = ['en', 'es', 'zh'].includes(locale) ? `/${locale}/tools/budget-builder/` : '/en/tools/budget-builder/';
  const annual = `/${locale}/guides/annual-cost-savings-calculator/`;
  const recurring = `/${locale}/guides/recurring-costs-annual-total/`;
  const sibling = slug === 'recurring-costs-annual-total' ? annual : recurring;
  return [budget, annual, sibling];
}

export const seoPackage011Guides: Record<string, SeoPackage011GuideMeta> = {};

for (const definition of definitions) {
  for (const entry of definition.entries) {
    const key = `${entry.locale}/${definition.slug}`;
    seoPackage011Guides[key] = {
      key, packageId: '011', locale: entry.locale, articleSlug: definition.slug,
      title: entry.title, seoTitle: `${entry.title} | WorthCalc`, metaDescription: entry.description,
      excerpt: entry.excerpt, canonical: `https://worthcalc.win/${entry.locale}/guides/${definition.slug}/`, robots: 'index,follow',
      ogTitle: entry.title, ogDescription: entry.description, ogImage: image, imageAlt: entry.alt,
      imageBrief: `Editorial cost comparison diagram for ${definition.slug}.`, lastReviewed: '2026-09-02',
      related: relatedFor(entry.locale, definition.slug), breadcrumbLabel: entry.title,
      schemaFile: `011__${entry.locale}__${definition.slug}.json`,
    };
  }
}
