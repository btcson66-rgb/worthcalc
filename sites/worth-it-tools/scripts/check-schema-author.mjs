import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const allowedSameAsHosts = new Set(['funnytools.win', 'roomfeng.win']);
const failures = [];
const htmlFiles = [];
let authorObjects = 0;
let schemaBlocks = 0;
const sampleFiles = new Set();

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

function decodeHtml(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function addFailure(file, message) {
  failures.push(relative(siteDir, file) + ': ' + message);
}

function visit(value, file, path = '$') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, file, path + '[' + index + ']'));
    return;
  }
  if (!value || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    if (key === 'author') {
      authorObjects += 1;
      if (!child || typeof child !== 'object' || Array.isArray(child)) {
        addFailure(file, path + '.author is not an object');
      } else {
        const author = child;
        if (author['@type'] === 'Person') addFailure(file, path + '.author contains @type Person');
        if (author.name !== 'Btcson Lab') addFailure(file, path + '.author.name is not Btcson Lab');
        if (author['@type'] === 'Organization' && author.name === 'Btcson Lab' && sampleFiles.size < 10) {
          sampleFiles.add(relative(siteDir, file));
        }
      }
    }
    if (key === 'sameAs') {
      if (!Array.isArray(child)) {
        addFailure(file, path + '.sameAs is not an array');
      } else {
        for (const sameAs of child) {
          try {
            const host = new URL(String(sameAs)).hostname.toLowerCase().replace(/^www\./, '');
            if (!allowedSameAsHosts.has(host)) addFailure(file, path + '.sameAs contains ' + sameAs);
          } catch {
            addFailure(file, path + '.sameAs contains an invalid URL');
          }
        }
      }
    }
    visit(child, file, path + '.' + key);
  }
}

await walk(distDir);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const matches = html.matchAll(/<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of matches) {
    schemaBlocks += 1;
    try {
      visit(JSON.parse(decodeHtml(match[1].trim())), file);
    } catch (error) {
      addFailure(file, 'invalid JSON-LD: ' + error.message);
    }
  }
}

if (authorObjects < 10) failures.push('fewer than 10 author objects found (' + authorObjects + ')');
if (failures.length > 0) {
  console.error('[schema-author] FAIL');
  failures.slice(0, 20).forEach((failure) => console.error('  ' + failure));
  if (failures.length > 20) console.error('  ... ' + (failures.length - 20) + ' more');
  process.exit(1);
}

console.log('[schema-author] PASS — ' + htmlFiles.length + ' HTML files, ' + schemaBlocks + ' JSON-LD blocks, ' + authorObjects + ' Organization authors; sameAs whitelist PASS');
console.log('[schema-author] sample 10 — author @type Organization; name Btcson Lab');
for (const file of sampleFiles) console.log('  ' + file);
