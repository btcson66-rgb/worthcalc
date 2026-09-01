import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const inputRoot = resolve(process.argv[2] || 'C:/Users/User/Downloads/worthcalc-seo-extracted-20260902');
const siteRoot = resolve(process.argv[3] || 'sites/worth-it-tools');
const aliases = new Map([
  ['/en/guides/apr-vs-apy/', '/en/apr-vs-apy/'],
  ['/en/guides/emergency-fund-irregular-income/', '/en/emergency-fund-irregular-income/'],
  ['/en/guides/loan-term-vs-monthly-payment/', '/en/loan-term-monthly-payment-vs-total-interest/'],
  ['/en/guides/net-worth-vs-liquid-net-worth/', '/en/net-worth-vs-liquid-net-worth/'],
  ['/en/guides/savings-rate-gross-vs-net/', '/en/savings-rate-gross-vs-net/'],
  ['/zh/guides/apr-vs-apy/', '/zh/apr-vs-apy/'],
  ['/zh/guides/emergency-fund-how-much/', '/zh/emergency-fund-how-much/'],
  ['/zh/guides/emergency-fund-irregular-income/', '/zh/emergency-fund-irregular-income/'],
  ['/zh/guides/emergency-fund-vs-debt-payoff/', '/zh/emergency-fund-vs-debt-payoff/'],
  ['/zh/guides/emergency-fund-vs-sinking-fund/', '/zh/emergency-fund-vs-sinking-fund/'],
  ['/zh/guides/installment-zero-interest/', '/zh/zero-interest-installments-truth/'],
  ['/zh/guides/liquid-net-worth/', '/zh/liquid-net-worth-explained/'],
  ['/zh/guides/loan-term-vs-monthly-payment/', '/zh/loan-term-vs-total-interest/'],
  ['/zh/guides/net-worth-how-to-calculate/', '/zh/how-to-calculate-net-worth/'],
  ['/zh/guides/savings-rate-calculation/', '/zh/how-to-calculate-savings-rate/'],
  ['/zh/guides/simple-vs-compound-interest/', '/zh/simple-vs-compound-interest/'],
  ['/zh/guides/subscription-cost/', '/zh/subscription-creep/'],
  ['/en/tools/dti-dbr/', '/en/tools/dti-calculator/'],
  ['/zh/tools/dti-dbr/', '/zh/tools/dti-calculator/'],
]);

function pathOf(value) {
  const raw = value.startsWith('http') ? new URL(value).pathname : value;
  const path = raw.replace(/\/+$/, '') + '/';
  return aliases.get(path) || path;
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && quoted && next === '"') { field += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(field); field = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(field); field = '';
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      continue;
    }
    field += char;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift().map((value) => value.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function sourceFileFor(route) {
  const parts = route.split('/').filter(Boolean);
  const locale = parts[0];
  const slug = parts.at(-1);
  if (!locale || !slug) return null;
  const explicit = join(siteRoot, 'src', 'pages', locale, 'tools', slug + '.astro');
  if (existsSync(explicit)) return explicit;
  const base = join(siteRoot, 'src', 'content');
  const directory = parts[1] === 'tools' ? 'growth-tools' : 'growth-articles';
  const file = join(base, directory, locale, slug + '.md');
  return existsSync(file) ? file : null;
}

function titleFromFile(file) {
  if (!file) return '';
  const source = readFileSync(file, 'utf8');
  return source.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
}

function addBeforeSources(source, addition) {
  if (source.includes(addition)) return source;
  if (source.includes('</ToolLayout>')) {
    const html = addition
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
    const lines = html.split('\n');
    const copy = lines[0];
    const link = lines[2] || '';
    const section = '  <section class="prose">\n    <p>' + copy + '</p>\n    <p>' + link + '</p>\n  </section>\n';
    const rendered = section.replace(/\[([^\]]+)\]\(([^)]+)\)/, '<a href="$2">$1</a>');
    return source.replace(/\s*<\/ToolLayout>\s*$/, '\n' + rendered + '</ToolLayout>\n');
  }
  const marker = source.match(/^##\s+(?:資料來源|資料來源與限制|Sources|Sources & limitations|References)\b/im);
  if (!marker) return source.trimEnd() + '\n\n' + addition + '\n';
  return source.slice(0, marker.index).trimEnd() + '\n\n' + addition + '\n\n' + source.slice(marker.index);
}

let totalRows = 0;
let changedFiles = 0;
for (const packageId of ['002', '003', '004', '005']) {
  const parent = join(inputRoot, packageId);
  const child = readdirSync(parent, { withFileTypes: true }).find((entry) => entry.isDirectory());
  const dir = join(parent, child.name);
  const csv = readFileSync(join(dir, '04_internal_link_patch.csv'), 'utf8');
  for (const row of parseCsv(csv)) {
    const sourceRaw = row.source_path || row.source_url;
    const targetRaw = row.target_path || row.target_url;
    const copy = row.exact_copy_to_add || row.insertion_copy || row.suggested_sentence;
    const sourceRoute = pathOf(sourceRaw);
    const targetRoute = pathOf(targetRaw);
    const file = sourceFileFor(sourceRoute);
    if (!file) throw new Error(packageId + ': source route has no Markdown file: ' + sourceRoute);
    if (!copy) throw new Error(packageId + ': patch has no insertion copy for ' + sourceRaw);
    const anchor = row.anchor_text || titleFromFile(sourceFileFor(targetRoute)) || targetRoute;
    const addition = copy.trim() + '\n\n[' + anchor.trim() + '](' + targetRoute + ')';
    const source = readFileSync(file, 'utf8');
    const updated = addBeforeSources(source, addition);
    if (updated !== source) {
      writeFileSync(file, updated, 'utf8');
      changedFiles += 1;
    }
    totalRows += 1;
  }
}
console.log('Applied ' + totalRows + ' internal-link patches across ' + changedFiles + ' files.');
