import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const slug = "heat-pump-cost-per-heating-hour-used";
const image = "/images/guides/annual-bills-monthly-equivalent-og.webp";
const source = [
  "https://www.energystar.gov/products/air_source_heat_pumps/key-product-criteria",
  "https://www.eia.gov/tools/faqs/faq.php?id=507",
];
const locales = ["en", "es", "zh", "hi", "ar"];
const related = (locale) => [
  "/" + locale + "/guides/hvac-cost-per-operating-hour-used/",
  "/" + locale + "/guides/electric-space-heater-cost-per-heating-hour-used/",
  "/" + locale + "/guides/electricity-cost-per-kwh-used/",
  "/" + locale + "/guides/room-air-conditioner-cost-per-cooling-hour-used/",
];
const data = {
  en: {
    title: "Heat Pump Cost Per Heating Hour Used: Separate Capacity, Runtime, and Weather",
    description: "Estimate a heat pump's cost per occupied heating hour from measured watts, full-power-equivalent runtime, electricity rates, auxiliary heat, maintenance, and equipment allocation rather than treating the rating as a household bill.",
    inputs: "Record measured input watts, compressor and fan runtime, full-power-equivalent hours, electricity rate, delivery charges, auxiliary or resistance heat, outdoor temperature, thermostat setting, service, purchase price, useful life, and the hours the room was actually occupied.",
    formula: "effective occupied heating-hour cost = (heat-pump energy + auxiliary-heat energy + delivery charges + maintenance + equipment allocation) ÷ occupied heating hours. Keep electrical input kWh separate from the heat output or capacity label so the denominator answers a real use question.",
    example: "A system averaging 2.4 kW for 6 full-power-equivalent hours uses 14.4 kWh. At $0.20 per kWh, energy is $2.88 before fixed charges, auxiliary heat, maintenance, and equipment allocation. If the room was occupied for 10 hours, the visible cost is $0.288 per occupied hour, not $0.48 unless the denominator is six active hours.",
    scenarios: "Compare a mild day, a cold day with auxiliary heat, and a setback-recovery period. The EIA explains the kWh unit, while your tariff and actual duty cycle determine the bill. A heat pump's comfort, capacity, and operating cost are different measurements.",
    limits: "Do not convert an efficiency rating directly into a guaranteed bill or claim that a heat pump is always cheaper than every fuel or resistance system. Defrost cycles, backup heat, insulation, airflow, thermostat control, weather, and local rates can change both energy and useful occupied hours.",
    question: "Should I divide by compressor hours or occupied hours?",
    answer: "Report both when possible. Compressor or full-power-equivalent hours explain equipment use; occupied hours answer what the household paid to heat a lived-in space. Showing only one can hide cycling, standby use, or an empty-room schedule.",
  },
  es: {
    title: "Coste de la bomba de calor por hora de calefacción: potencia, ciclo y clima",
    description: "Calcula el coste de una bomba de calor por hora ocupada con vatios medidos, horas equivalentes a plena potencia, tarifa, calefacción auxiliar, mantenimiento y equipo; una etiqueta de capacidad no es tu factura.",
    inputs: "Registra vatios medidos, horas del compresor y ventilador, horas equivalentes, tarifa eléctrica, distribución, apoyo eléctrico, temperatura exterior, termostato, servicio, precio, vida útil y horas reales de ocupación.",
    formula: "coste efectivo por hora ocupada = (energía de la bomba + apoyo auxiliar + distribución + mantenimiento + equipo) ÷ horas de calefacción ocupadas. Separa los kWh de entrada de la capacidad térmica anunciada para que el denominador represente el uso.",
    example: "Un sistema que promedia 2,4 kW durante 6 horas equivalentes usa 14,4 kWh. A 0,20 por kWh, la energía cuesta 2,88 antes de cargos fijos, apoyo, mantenimiento y equipo. Si la habitación estuvo ocupada 10 horas, el coste visible es 0,288 por hora ocupada, no 0,48 salvo que uses seis horas activas.",
    scenarios: "Compara un día templado, un día frío con apoyo auxiliar y la recuperación después de bajar el termostato. EIA explica la unidad kWh, pero la tarifa y el ciclo real determinan la factura. Confort, capacidad y coste son medidas distintas.",
    limits: "No conviertas una clasificación de eficiencia en una factura garantizada ni digas que siempre es más barata que cualquier combustible o resistencia. Deshielo, apoyo, aislamiento, flujo de aire, control, clima y tarifas cambian la energía y las horas útiles.",
    question: "¿Divido entre horas del compresor u horas ocupadas?",
    answer: "Muestra ambas cuando puedas. Las horas del compresor explican el uso del equipo; las horas ocupadas responden cuánto costó calentar un espacio vivido. Mostrar solo una puede ocultar ciclos, espera o una habitación vacía.",
  },
  zh: {
    title: "熱泵每暖房一小時成本：分開容量、運轉時間與天氣",
    description: "用實測瓦數、全功率等效時數、電價、輔助熱源、維護與設備分攤，估算熱泵每個有人使用暖房小時的成本，不要把額定能力直接當成家庭帳單。",
    inputs: "記錄實測輸入瓦數、壓縮機與風扇時數、全功率等效時數、電價、輸配費、電熱或其他輔助熱源、室外溫度、恆溫器設定、保養、購買價格、使用年限與實際有人使用的時數。",
    formula: "每個有人使用暖房小時有效成本＝（熱泵能源＋輔助熱源能源＋輸配費＋維護＋設備分攤）÷ 有人使用暖房時數。把輸入 kWh 與產品標示的熱容量分開，分母才是在回答真實使用問題。",
    example: "若系統平均 2.4 kW、6 小時全功率等效運轉，使用 14.4 kWh；每 kWh 0.20 時能源費為 2.88，尚未計固定費、輔助熱源、維護與設備分攤。若房間實際使用 10 小時，每個有人使用小時是 0.288，而不是只有 6 個主動運轉小時時的 0.48。",
    scenarios: "比較溫和天氣、需要輔助熱源的寒冷天，以及調低溫度後重新升溫的時段。EIA 說明 kWh 單位，但真正決定帳單的是費率與啟停週期。舒適度、容量與運轉成本是不同指標。",
    limits: "不要把效率標示直接換算成保證帳單，也不要宣稱熱泵一定比所有燃料或電阻式暖氣便宜。除霜、備用熱源、隔熱、風量、控制、天氣與當地費率都可能改變耗電與有效使用時數。",
    question: "應該除以壓縮機時數還是有人使用時數？",
    answer: "可以的話兩者都報告。壓縮機或全功率等效時數說明設備用了多少；有人使用時數回答家庭為實際生活空間付了多少。只顯示其中一個，可能掩蓋啟停、待機或空房排程。",
  },
  hi: {
    title: "Heat pump cost per heating hour used: capacity, runtime और weather अलग करें",
    description: "Measured watts, full-power-equivalent runtime, electricity tariff, auxiliary heat, maintenance और equipment allocation से occupied heating hour cost निकालें; rating household bill नहीं है।",
    inputs: "Measured input watts, compressor और fan runtime, equivalent hours, electricity rate, delivery charges, auxiliary या resistance heat, outdoor temperature, thermostat, service, purchase price, useful life और occupied hours record करें।",
    formula: "effective occupied heating-hour cost = (heat-pump energy + auxiliary energy + delivery charges + maintenance + equipment allocation) ÷ occupied heating hours. Electrical input kWh को advertised heat capacity से अलग रखें ताकि denominator वास्तविक use बताये।",
    example: "System 2.4 kW average पर 6 full-power-equivalent hours चले तो 14.4 kWh लगता है। $0.20/kWh पर energy $2.88 है, fixed charges, backup heat, maintenance और equipment से पहले। Room 10 hours occupied हो तो visible cost $0.288 per occupied hour है; केवल 6 active hours से divide करने पर $0.48 होगा।",
    scenarios: "Mild day, auxiliary heat वाला cold day और thermostat setback recovery compare करें। EIA kWh unit समझाता है, लेकिन tariff और actual duty cycle bill तय करते हैं। Comfort, capacity और operating cost अलग measurements हैं।",
    limits: "Efficiency rating को guaranteed bill में न बदलें और heat pump को हर fuel या resistance system से हमेशा सस्ता न कहें। Defrost, backup heat, insulation, airflow, thermostat, weather और local rates energy और useful hours बदल सकते हैं।",
    question: "Compressor hours या occupied hours से divide करें?",
    answer: "सम्भव हो तो दोनों दिखाएं। Compressor या equivalent hours equipment use बताते हैं; occupied hours बताते हैं कि रहने वाले space को heat करने में कितना खर्च आया। सिर्फ एक दिखाने से cycling, standby या खाली room schedule छिप सकता है।",
  },
  ar: {
    title: "تكلفة المضخة الحرارية لكل ساعة تدفئة: افصل السعة والوقت والطقس",
    description: "قدّر تكلفة المضخة الحرارية لكل ساعة تدفئة مشغولة من القدرة المقاسة وساعات القدرة الكاملة المكافئة والتعرفة والتدفئة المساعدة والصيانة وحصة المعدات، لا من التصنيف وحده.",
    inputs: "سجّل القدرة المقاسة ووقت الضاغط والمروحة وساعات القدرة المكافئة والتعرفة ورسوم التوصيل والتدفئة المساعدة وحرارة الخارج وإعداد الثرموستات والصيانة والسعر والعمر وساعات إشغال الغرفة.",
    formula: "التكلفة الفعلية لكل ساعة تدفئة مشغولة = (طاقة المضخة + طاقة التدفئة المساعدة + التوصيل + الصيانة + حصة المعدات) ÷ ساعات التدفئة المشغولة. افصل kWh الكهربائي عن سعة الحرارة المعلنة حتى يجيب المقام عن الاستخدام الحقيقي.",
    example: "نظام بمتوسط 2.4 kW لمدة 6 ساعات قدرة كاملة مكافئة يستهلك 14.4 kWh. بسعر 0.20 لكل kWh تكون الطاقة 2.88 قبل الرسوم الثابتة والتدفئة المساعدة والصيانة والمعدات. إذا كانت الغرفة مشغولة 10 ساعات فالتكلفة 0.288 لكل ساعة مشغولة، لا 0.48 إلا إذا استخدمت ست ساعات فعالة.",
    scenarios: "قارن يوماً معتدلاً ويوماً بارداً مع تدفئة مساعدة وفترة استعادة الحرارة بعد خفض الثرموستات. تشرح EIA وحدة kWh، لكن التعرفة ودورة التشغيل تحددان الفاتورة. الراحة والسعة والتكلفة مقاييس مختلفة.",
    limits: "لا تحوّل تصنيف الكفاءة إلى فاتورة مضمونة ولا تقل إن المضخة أرخص دائماً من كل وقود أو نظام مقاومة. إزالة الجليد والتدفئة الاحتياطية والعزل وتدفق الهواء والتحكم والطقس والتعرفة تغيّر الطاقة والساعات المفيدة.",
    question: "هل أقسم على ساعات الضاغط أم ساعات الإشغال؟",
    answer: "اعرض الاثنين إن أمكن. تشرح ساعات الضاغط استخدام الجهاز، بينما تجيب ساعات الإشغال عن تكلفة تدفئة مساحة مستخدمة. عرض واحد فقط قد يخفي التدوير أو الاستعداد أو جدول غرفة فارغة.",
  },
};
const labels = {
  en: ["Inputs that change the result", "Formula and worked example", "Compare real use cases", "Limits and common mistakes", "Frequently asked questions", "Source reading"],
  es: ["Datos que cambian el resultado", "Fórmula y ejemplo", "Compara usos reales", "Límites y errores comunes", "Preguntas frecuentes", "Fuentes para consultar"],
  zh: ["會改變結果的輸入值", "公式與實際算例", "比較實際使用情境", "限制與常見誤區", "常見問題", "來源閱讀"],
  hi: ["Result बदलने वाले inputs", "Formula और worked example", "Actual use cases compare करें", "Limits और common mistakes", "अक्सर पूछे जाने वाले प्रश्न", "स्रोत पढ़ें"],
  ar: ["المدخلات التي تغيّر النتيجة", "المعادلة والمثال", "قارن حالات الاستخدام الفعلية", "الحدود والأخطاء الشائعة", "الأسئلة الشائعة", "مصادر للقراءة"],
};
const esc = (value) => value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
const sourceText = {
  en: "Read [ENERGY STAR air-source heat-pump criteria](" + source[0] + ") and the [EIA electricity explanation](" + source[1] + "). They provide measurement context, not a universal rate or guaranteed saving.",
  es: "Consulta los [criterios de ENERGY STAR para bombas de calor](" + source[0] + ") y la [explicación de electricidad de EIA](" + source[1] + "). Dan contexto de medición, no una tarifa universal ni ahorro garantizado.",
  zh: "可閱讀 [ENERGY STAR 空氣源熱泵標準](" + source[0] + ") 與 [EIA 電力說明](" + source[1] + ")。它們提供測量背景，不代表通用費率或保證節省。",
  hi: "[ENERGY STAR air-source heat-pump criteria](" + source[0] + ") और [EIA electricity explanation](" + source[1] + ") पढ़ें। ये measurement context देते हैं, universal rate या guaranteed saving नहीं।",
  ar: "اقرأ [معايير ENERGY STAR للمضخات الهوائية](" + source[0] + ") و[شرح EIA للكهرباء](" + source[1] + "). توفر سياق القياس لا تعرفة عامة أو توفيراً مضموناً.",
};
const metaEntries = [];
for (const locale of locales) {
  const d = data[locale];
  const l = labels[locale];
  const canonical = "https://worthcalc.win/" + locale + "/guides/" + slug + "/";
  const r = related(locale);
  const links = locale === "zh"
    ? "可延伸閱讀 [HVAC 每運轉小時指南](" + r[0] + ")、[電暖器指南](" + r[1] + ")、[每 kWh 電費指南](" + r[2] + ")與[室內冷氣指南](" + r[3] + ")。"
    : locale === "ar"
      ? "تابع مع [دليل تكلفة HVAC لكل ساعة](" + r[0] + ") و[دليل المدفأة الكهربائية](" + r[1] + ") و[دليل تكلفة وحدة الكهرباء](" + r[2] + ") و[دليل مكيف الغرفة](" + r[3] + ")."
      : locale === "es"
        ? "Continúa con la [guía de HVAC por hora](" + r[0] + "), la [guía del calefactor eléctrico](" + r[1] + "), la [guía de coste eléctrico por unidad](" + r[2] + ") y la [guía del aire acondicionado](" + r[3] + ")."
        : locale === "hi"
          ? "[HVAC operating-hour guide](" + r[0] + "), [electric heater guide](" + r[1] + "), [electricity unit-cost guide](" + r[2] + ") और [room AC guide](" + r[3] + ") से तुलना आगे बढ़ाएं।"
          : "Continue with the [HVAC operating-hour guide](" + r[0] + "), [electric heater guide](" + r[1] + "), [electricity unit-cost guide](" + r[2] + "), and [room AC guide](" + r[3] + ").";
  const frontmatter = [
    "---", "contentType: article", 'articleSlug: "' + slug + '"', 'locale: "' + locale + '"',
    'title: "' + esc(d.title) + '"', 'description: "' + esc(d.description) + '"',
    'relatedTool: "/' + locale + '/tools/budget-builder/"', 'canonical: "' + canonical + '"',
    'lastReviewed: "2026-09-02"', "draft: false", "---",
  ].join("\n");
  const answerLabel = locale === "zh" ? "先說結論" : locale === "es" ? "Respuesta breve" : locale === "hi" ? "संक्षिप्त उत्तर" : locale === "ar" ? "الخلاصة" : "Quick answer";
  const markdown = frontmatter + "\n\n# " + d.title + "\n\n> **" + answerLabel + ":** " + d.description + "\n\n## " + l[0] + "\n\n" + d.inputs + "\n\n## " + l[1] + "\n\n" + d.formula + " " + d.example + "\n\n## " + l[2] + "\n\n" + d.scenarios + "\n\n" + links + "\n\n## " + l[3] + "\n\n" + d.limits + "\n\n## " + l[4] + "\n\n### " + d.question + "\n\n" + d.answer + "\n\n## " + l[5] + "\n\n" + sourceText[locale] + "\n";
  mkdirSync(join(root, "src", "content", "growth-articles", locale), { recursive: true });
  writeFileSync(join(root, "src", "content", "growth-articles", locale, slug + ".md"), markdown, "utf8");
  metaEntries.push("  '" + locale + "/" + slug + "': { key: '" + locale + "/" + slug + "', packageId: '035', locale: '" + locale + "', articleSlug: '" + slug + "', title: \"" + esc(d.title) + "\", seoTitle: \"" + esc(d.title) + " | WorthCalc\", metaDescription: \"" + esc(d.description) + "\", excerpt: \"" + esc(d.description) + "\", canonical: '" + canonical + "', robots: 'index,follow', ogTitle: \"" + esc(d.title) + "\", ogDescription: \"" + esc(d.description) + "\", ogImage: '" + image + "', imageAlt: \"" + esc(d.title) + "\", imageBrief: '" + slug + " comparison', lastReviewed: '2026-09-02', related: " + JSON.stringify(r) + ", breadcrumbLabel: \"" + esc(d.title) + "\", schemaFile: '035__" + locale + "__" + slug + ".json' },");
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": canonical + "#article", headline: d.title, description: d.description, inLanguage: locale, mainEntityOfPage: { "@type": "WebPage", "@id": canonical }, author: { "@type": "Organization", name: "WorthCalc" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "WorthCalc", item: "https://worthcalc.win/" + locale + "/" }, { "@type": "ListItem", position: 2, name: d.title, item: canonical }] },
  ] };
  const schemaDir = join(root, "src", "data", "seo-packages-002-005", "schema");
  mkdirSync(schemaDir, { recursive: true });
  writeFileSync(join(schemaDir, "035__" + locale + "__" + slug + ".json"), JSON.stringify(schema) + "\n", "utf8");
}
const metaPath = join(root, "src", "data", "seoPackage035.ts");
writeFileSync(metaPath, [
  "import type { ContentLocale } from '../consts';", "",
  "export interface SeoPackage035GuideMeta { key: string; packageId: '035'; locale: ContentLocale; articleSlug: string; title: string; seoTitle: string; metaDescription: string; excerpt: string; canonical: string; robots: 'index,follow'; ogTitle: string; ogDescription: string; ogImage: string; imageAlt: string; imageBrief: string; lastReviewed: string; related: string[]; breadcrumbLabel: string; schemaFile: string; }", "",
  "export const seoPackage035Guides: Record<string, SeoPackage035GuideMeta> = {",
  metaEntries.join("\n"),
  "};", "",
].join("\n"), "utf8");
console.log("Created program 035: 5 localized heat-pump heating-hour guides and schemas.");
