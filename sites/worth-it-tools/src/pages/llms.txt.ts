import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getCollection } from 'astro:content';
import { getCalculators } from '../lib/catalog';
import { isPublished, publishCutoff } from '../lib/publication';

export const prerender = true;

/*
 * llms.txt used to be a hand-maintained file in public/. It listed 18 tools and
 * three guides while the site had 49 English guides, so anything reading it saw
 * a fraction of the site and no way to tell what it was missing. That is the same
 * drift that left 106 pages with no internal link: a list a human has to remember
 * to update is a list that goes stale.
 *
 * It is generated from the same catalogue the pages render from now, so it
 * cannot disagree with them. Since the 2026-10-15 rebuild it describes only the
 * Traditional Chinese (Taiwan) site.
 */

export const GET = async ({ site }: APIContext): Promise<Response> => {
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  const url = (path: string) => `${origin}${path}`;
  // 2026-10-15 rebuild: the site is Traditional Chinese (Taiwan). Only the
  // indexed locale is described here; English is built but noindex, and the
  // other languages no longer exist.
  const calculators = (await getCalculators('zh')).sort((left, right) => left.title.localeCompare(right.title, 'zh-Hant'));
  // Read from the collection rather than from the generated guide index: that
  // index is committed from a previous build, and this file is what answer
  // engines read to learn what the site holds.
  const briefCutoff = publishCutoff();
  const briefs = (await getCollection('moneyBriefs', ({ data }) => !data.draft))
    .filter((entry) => entry.data.locale === 'zh' && isPublished(entry.data.publishAt, briefCutoff))
    .sort((left, right) => right.data.lastReviewed.getTime() - left.data.lastReviewed.getTime());

  const lines: string[] = [
    `# ${SITE.name} (worthcalc.win)`,
    '',
    '> WorthCalc 是台灣人的金錢決策計算機：信用卡與分期、會員與訂閱、交通與通勤、',
    '> 大型支出（房貸、購車）、退休與勞保勞退。公式攤開在頁面上，頁面標明引用的官方來源與查核日期。',
    '> 沒有帳號、沒有後端；所有計算都在瀏覽器本機執行。',
    '',
    '- 作者與審核：Benson Lai。作者頁說明數字如何查核、如何更正與回報錯誤：' + url('/zh/about/'),
    '- 所有計算機免費、不需註冊。輸入與結果留在瀏覽器，不會上傳。',
    '- 範例中的數字是可修改的示意預設值，不是市場報價；頁面上的官方來源旁邊標有查核日期。',
    '- 本站內容是一般資訊與試算，不構成財務、投資、稅務、保險或法律建議。',
    '',
    `- 首頁（繁體中文，台灣）：${url('/')}`,
    '',
    '## 計算機',
    '',
    `- 全部計算機索引：${url('/zh/tools/')}`,
    '',
  ];
  for (const tool of calculators) {
    lines.push(`- [${tool.title}](${url(`/zh${tool.path}/`)}): ${tool.description}`);
  }

  if (briefs.length > 0) {
    lines.push('', '## 金錢速查（附日期與出處的數字）', '');
    lines.push(`- 索引：${url('/zh/money/')}`, '');
    lines.push(
      '每一篇都以一個來自具名官方出處的數字與查核日期開頭，接著示範把這個數字變成決定的算式。',
      '',
    );
    for (const brief of briefs) {
      const checked = brief.data.lastReviewed.toISOString().slice(0, 10);
      lines.push(`- [${brief.data.title}](${url(`/zh/money/${brief.data.briefSlug}/`)}) — 查核於 ${checked}。${brief.data.answer}`);
    }
  }

  lines.push(
    '',
    '## 網站索引',
    '',
    `- Sitemap: ${url('/sitemap-index.xml')}`,
    `- 全部指南：${url('/zh/guides/')}`,
    `- 作者與查核方式：${url('/zh/about/')}`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
