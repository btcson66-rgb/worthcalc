import type { ContentLocale, CoreLocale } from '../consts';
import { localizedPath } from '../i18n/utils';

/**
 * Locales the money-brief cluster publishes into.
 *
 * en and zh only, matching HUB_LOCALES in src/lib/topics.ts and the i18n
 * expansion freeze in README.md. The reason is where the measured demand is,
 * not that the other locales have none: in the 3-month GSC window recorded in
 * docs/audits/worthcalc-disposition-2026-09-15.csv, en and zh took 760 of the
 * 873 impressions across the kept set (87%) on 163 of its 304 URLs, while es,
 * fr and de took 113 on the other 141. Writing a new cluster where 87% of the
 * demand already is beats spreading it five ways.
 *
 * Do not read this as "es/fr/de are dead" — that claim was in this comment
 * until 2026-09-19 and the same CSV disproves it. German in particular has the
 * highest hit rate on the site: 15 of its 17 kept URLs earned impressions (88%),
 * against 49% for en and 33% for zh. On that evidence de is the most
 * under-built locale here, not the most expendable, and the case for adding
 * content there should be made from GSC data rather than from this freeze.
 */
export const BRIEF_LOCALES: readonly CoreLocale[] = ['en', 'zh'];

export type BriefCluster = 'rates' | 'protection' | 'ownership' | 'earning';

export const BRIEF_CLUSTERS: readonly BriefCluster[] = ['rates', 'protection', 'ownership', 'earning'];

export function moneyHubPath(locale: ContentLocale): string {
  return localizedPath(locale, '/money');
}

interface BriefCopy {
  hubTitle: string;
  hubDescription: string;
  hubLead: string;
  answerLabel: string;
  runIt: string;
  relatedHeading: string;
  method: string;
  updatedLabel: string;
  clusterNames: Record<BriefCluster, string>;
  clusterIntros: Record<BriefCluster, string>;
}

const COPY: Record<'en' | 'zh', BriefCopy> = {
  en: {
    hubTitle: 'Money briefs',
    hubDescription:
      'Dated, sourced reference figures for everyday money decisions — 2026 interest rates, electricity prices, mileage rates, insurance and subscription costs — each with the arithmetic that turns the number into a decision.',
    hubLead:
      'Every brief opens with one figure from a primary source and the date it was checked, shows the arithmetic that turns that figure into a decision, states what would reverse the conclusion, and links to the calculator that runs it on your own numbers. Figures move; each page carries its own verification date so you can tell how stale it is.',
    answerLabel: 'Short answer:',
    runIt: 'Run your own numbers in the',
    relatedHeading: 'Related briefs',
    method:
      'This page states a figure from a named primary source with the date it was verified, then applies it to the arithmetic shown on the page.',
    updatedLabel: 'Checked',
    clusterNames: {
      rates: 'Rates and prices in 2026',
      protection: 'Insurance and protection',
      ownership: 'Owning, financing and upgrading',
      earning: 'Earning, saving and time',
    },
    clusterIntros: {
      rates:
        'The published figures that change what a decision costs: lending and savings rates, energy prices, statutory mileage rates, and the subscription and membership fees that quietly reset every year.',
      protection:
        'Break-evens for cover you buy against a risk you may never face — deductibles, claims, warranties and policies where the right answer depends on the odds, not on the premium alone.',
      ownership:
        'Whether to buy, hold, refinance, repair or replace, once the financing cost and the timing are in the arithmetic rather than left out of it.',
      earning:
        'What income, a raise, a side job or a move is worth after the costs that come attached to it — including the hours.',
    },
  },
  zh: {
    hubTitle: '金錢速查',
    hubDescription:
      '有日期、有出處的生活金錢決策參考數字——2026 年的利率、電價、里程費率、保險與訂閱成本——每一頁都附上把數字變成決定的算式。',
    hubLead:
      '每一篇都以一個來自官方出處的數字與查核日期開頭，接著示範把這個數字變成決定的算式，說明什麼條件會讓結論翻轉，並連到可以用你自己的數字重算的計算機。數字會變，所以每一頁都標示自己的查核日期，讓你知道它有多舊。',
    answerLabel: '一句話結論：',
    runIt: '用你自己的數字重算：',
    relatedHeading: '相關速查',
    method: '本頁先列出具名官方出處的數字與查核日期，再把這個數字帶入頁面所示的算式。',
    updatedLabel: '查核於',
    clusterNames: {
      rates: '2026 年的費率與價格',
      protection: '保險與風險保障',
      ownership: '持有、貸款與換新',
      earning: '收入、儲蓄與時間',
    },
    clusterIntros: {
      rates:
        '會改變一個決定要花多少錢的公告數字：借貸與存款利率、能源價格、法定里程費率，以及每年悄悄調漲的訂閱與會員費。',
      protection:
        '為了可能永遠不會發生的風險而買的保障，它的回本點——自付額、理賠、保固與保單，正確答案取決於機率，而不是只看保費。',
      ownership:
        '該買、該留、該轉貸、該修還是該換：把融資成本與時間點放進算式裡，而不是把它們略過。',
      earning:
        '一份收入、一次加薪、一個副業或一次搬遷，在扣掉隨之而來的成本（包括時間）之後，實際值多少。',
    },
  },
};

export function briefCopy(locale: ContentLocale): BriefCopy {
  return COPY[(locale === 'zh' ? 'zh' : 'en')];
}
