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
    '## 核心計算公式速查（Formula & Decision Rules）',
    '',
    '- **信用卡年費回本門檻**：`每年回本合格刷卡額 = 淨年費 ÷ (年費卡有效回饋率 − 免年費替代卡回饋率)`，其中 `淨年費 = 牌告年費 − 一定用得到的確定權益折現值`（詳見：' + url('/zh/annual-fee-card-breakeven/') + '、' + url('/zh/tools/cashback-breakeven/') + '）。',
    '- **信用卡回饋上限與真正回饋率**：`封頂門檻 = 加碼回饋上限 ÷ 加碼回饋率`；超過封頂後，`真正回饋率 = (基本回饋金額 + min(消費 × 加碼率, 加碼上限)) ÷ 總消費`（詳見：' + url('/zh/cashback-caps-real-reward-rate/') + '）。',
    '- **分期手續費與開辦費之實質總費用年百分率（APR）**：先扣開辦費或帳管費時，`實際入帳本金 = 合約借款金額 − 先扣費用`，須以實際拿到的淨額與每期月付金反推內部報酬率（IRR × 12）作為實質年化成本（詳見：' + url('/zh/upfront-fees-financing-cost/') + '、' + url('/zh/bnpl-vs-credit-card-installments/') + '）。',
    '- **房貸提前還款省息與寬限期後月付比較**：寬限期內僅繳息（`本金 × 月利率`），寬限期結束後本金須壓縮在 `剩餘年數 = 總年數 − 寬限年數` 內本息攤還；提前還本可選擇「縮短年期（月付不變、省息最多）」或「降低月付（年期不變、釋放每月現金流）」（詳見：' + url('/zh/extra-mortgage-payments-guide/') + '、' + url('/zh/tools/mortgage-payoff/') + '）。',
    '- **購屋負擔能力（1/3 收支比與央行成數上限）**：`房貸安全月付上限 = 家庭穩定月收入 × 1/3 − 既有固定月負債`，再依央行信用管制貸款成數上限（首購、第二戶、高價住宅）加上買方契稅、代書費、仲介費與裝修預備金，決定自備款與可購總價取較低者（詳見：' + url('/zh/how-much-home-can-you-afford/') + '、' + url('/zh/tools/home-affordability/') + '）。',
    '- **負債比與金管會 DBR 22 倍**：`總負債收支比（DTI）= 每月固定負債總月付 ÷ 穩定稅後月收`（安全線建議 ≤ 33%，加房貸後總月付建議 ≤ 40%）；無擔保債務（信貸、卡債、預借現金）餘額受金管會 `DBR ≤ 平均月收入 22 倍` 硬上限規範（詳見：' + url('/zh/how-to-calculate-dti/') + '、' + url('/zh/tools/dti-calculator/') + '）。',
    '- **汽車持有總成本與車貸月付反推**：將車貸月付、牌照稅、燃料費、乙式／丙式車體險、強制險、第三人責任險、車位租金、油資／電費、保養輪胎與折舊全數折算為單一月成本，或由每月養車預算上限反推可負擔車價（詳見：' + url('/zh/true-cost-of-car-ownership/') + '、' + url('/zh/tools/car-affordability/') + '）。',
    '- **延長保固與家電維修換新決策**：`延保損益兩平故障機率 = 延保費用 ÷ (預期單次維修費 − 自付額)`；家電維修則比較 `維修後每延壽 1 年成本 = 維修報價 ÷ 預期延壽年數` 與 `換新機每年平均持有成本 = (新機淨價 − 節電年省 × 壽命) ÷ 新機壽命`（詳見：' + url('/zh/is-an-extended-warranty-worth-it/') + '、' + url('/zh/repair-or-replace-decision-formula/') + '）。',
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
