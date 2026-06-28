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

const htmlFiles = walkHtml(distDir);
const broken = [];
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
  }
}

if (broken.length > 0) {
  console.error(`Checked ${checked} internal links; found ${broken.length} broken links:`);
  for (const item of broken) {
    console.error(`- ${item.file}: ${item.link}`);
  }
  process.exit(1);
}

console.log(`All ${checked} internal links OK`);
