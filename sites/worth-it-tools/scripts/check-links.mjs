import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const distDir = resolve('dist');

if (!existsSync(distDir)) {
  console.error('dist/ does not exist. Build the site before running link checks.');
  process.exit(1);
}

function walkHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walkHtml(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function stripQueryAndHash(value) {
  return value.split('#')[0].split('?')[0];
}

function isSkipped(value) {
  return (
    value === '' ||
    value.startsWith('#') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('//') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('data:') ||
    value.startsWith('javascript:')
  );
}

function toSitePath(file, link) {
  const clean = stripQueryAndHash(link);
  if (clean.startsWith('/')) return clean;

  const fileDir = `/${relative(distDir, file).split(sep).join('/')}`.replace(/\/[^/]*$/, '/');
  return new URL(clean, `https://local.test${fileDir}`).pathname;
}

function candidates(sitePath) {
  const withoutTrailingSlash = sitePath.replace(/\/$/, '');
  const direct = join(distDir, withoutTrailingSlash);
  return [
    direct,
    join(distDir, sitePath, 'index.html'),
    `${direct}.html`,
  ];
}

function existsInternal(sitePath) {
  return candidates(sitePath).some((candidate) => existsSync(candidate));
}

function extractLinks(html) {
  const links = [];
  const attrPattern = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  let match = attrPattern.exec(html);
  while (match !== null) {
    links.push(match[2].trim());
    match = attrPattern.exec(html);
  }
  return links;
}

// A page link is anything that resolves to a rendered HTML document rather
// than an asset. Assets keep their file extension; pages must not have one.
function isPageLink(sitePath) {
  const last = sitePath.split('/').pop() ?? '';
  return !last.includes('.');
}

// Every page link must end in a slash. The site builds with
// build.format: 'directory', so a slashless internal link is served as a 301
// to the slashed form -- a wasted crawl request, and a disagreement with the
// canonical/hreflang URLs emitted by src/lib/seo.ts. In July 2026 this made
// roughly a third of all Googlebot requests redirect hops while the site was
// already under a crawl-budget squeeze.
const htmlFiles = walkHtml(distDir);
const broken = [];
const slashless = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const rawLink of extractLinks(html)) {
    if (isSkipped(rawLink)) continue;

    const sitePath = toSitePath(file, rawLink);
    if (sitePath === '') continue;

    checked += 1;
    if (!existsInternal(sitePath)) {
      broken.push({
        file: relative(distDir, file).split(sep).join('/'),
        link: rawLink,
      });
    }
    if (isPageLink(sitePath) && !sitePath.endsWith('/')) {
      slashless.push({
        file: relative(distDir, file).split(sep).join('/'),
        link: rawLink,
      });
    }
  }
}

let failed = false;

if (broken.length > 0) {
  console.error(`Checked ${checked} internal links; found ${broken.length} broken links:`);
  for (const item of broken) {
    console.error(`- ${item.file}: ${item.link}`);
  }
  failed = true;
}

if (slashless.length > 0) {
  console.error(
    `Found ${slashless.length} internal page links without a trailing slash. ` +
      'Each one costs a 301 redirect on every crawl. Build links with ' +
      'localizedPath()/localizedCorePath() instead of hand-writing the path:',
  );
  for (const item of slashless.slice(0, 40)) {
    console.error(`- ${item.file}: ${item.link}`);
  }
  if (slashless.length > 40) console.error(`  ...and ${slashless.length - 40} more`);
  failed = true;
}

if (failed) process.exit(1);

console.log(`All ${checked} internal links OK (all page links end in a slash)`);
