import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const indexPath = join(distDir, 'sitemap-index.xml');
const robotsPath = join(distDir, 'robots.txt');

function xmlText(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function latestLastmodForChild(childUrl) {
  const filename = basename(new URL(childUrl).pathname);
  if (!/^sitemap-(?!index(?:\.xml)?$).+\.xml$/.test(filename)) {
    throw new Error(`Unsafe or unexpected child sitemap path in index: ${childUrl}`);
  }
  const xml = readFileSync(join(distDir, filename), 'utf8');
  const locCount = [...xml.matchAll(/<loc>[^<]+<\/loc>/g)].length;
  const dates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1].trim());
  if (locCount === 0 || dates.length !== locCount) {
    throw new Error(`${filename} has ${locCount} loc entries but ${dates.length} valid lastmod entries`);
  }
  if (dates.some((date) => Number.isNaN(Date.parse(date)))) {
    throw new Error(`${filename} contains an invalid lastmod value`);
  }
  return dates.sort((left, right) => Date.parse(left) - Date.parse(right)).at(-1);
}

const originalIndex = readFileSync(indexPath, 'utf8');
const sitemapBlocks = [...originalIndex.matchAll(/<sitemap\b[^>]*>[\s\S]*?<\/sitemap>/g)];
if (sitemapBlocks.length === 0) throw new Error('sitemap-index.xml contains no <sitemap> entries');

const childUrls = [];
const rewrittenIndex = originalIndex.replace(/<sitemap\b[^>]*>[\s\S]*?<\/sitemap>/g, (block) => {
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) throw new Error('A sitemap-index child entry has no <loc>');
  const childUrl = xmlText(locMatch[1]);
  childUrls.push(childUrl);
  const lastmod = latestLastmodForChild(childUrl);
  if (/<lastmod>[^<]*<\/lastmod>/.test(block)) {
    return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`);
  }
  return block.replace(/<\/loc>/, `</loc><lastmod>${lastmod}</lastmod>`);
});
writeFileSync(indexPath, rewrittenIndex, 'utf8');

const existingRobots = readFileSync(robotsPath, 'utf8');
const origin = new URL(childUrls[0]).origin;
const nonSitemapLines = existingRobots.split(/\r?\n/).filter((line) => !/^Sitemap:\s*/i.test(line) && line !== '');
const sitemapLines = [
  `Sitemap: ${origin}/sitemap-index.xml`,
  ...childUrls.map((url) => `Sitemap: ${url}`),
];
writeFileSync(robotsPath, `${[...nonSitemapLines, ...sitemapLines].join('\n')}\n`, 'utf8');

console.log(`[sitemap:postbuild] ${childUrls.length} child sitemap(s); index lastmod and robots discovery lines verified.`);
