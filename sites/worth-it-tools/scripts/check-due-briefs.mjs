// Answers one question for the scheduled deploy: is there anything new to publish today?
//
// The money-brief cluster releases on a date held in each file's frontmatter
// (src/lib/publication.ts), so the site's output changes on release days and is
// byte-identical on every other day. Without this gate the daily cron would run
// the full verify, redeploy an unchanged site and resubmit all ~360 URLs to
// IndexNow every single day — which is wasted CI at best and looks like
// churn to the endpoints being pinged at worst.
//
// The window is two days, not one. GitHub's scheduled events are best-effort and
// are dropped or delayed under load; a one-day window would silently skip a
// release the first time a cron did not fire, and nothing downstream would
// notice. Two days means the next night's run picks it up. Re-deploying an
// already-published day is harmless: the build is deterministic for a given
// date, so the second run produces the same output as the first.
//
// Usage: node scripts/check-due-briefs.mjs [--window N]
// Writes `due=true|false` to $GITHUB_OUTPUT and always exits 0 — "nothing due"
// is a normal answer, not a failure.
import { appendFileSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const briefsDir = join(projectRoot, 'src', 'content', 'money-briefs');

const windowArg = process.argv.indexOf('--window');
const windowDays = windowArg === -1 ? 2 : Number(process.argv[windowArg + 1]);
if (!Number.isInteger(windowDays) || windowDays < 1) {
  console.error(`[due-briefs] --window must be a positive integer, received: ${process.argv[windowArg + 1]}`);
  process.exit(1);
}

// UTC throughout, to agree with src/lib/publication.ts and with cron.
const today = new Date();
const dayKeys = new Set(
  Array.from({ length: windowDays }, (_, offset) => {
    const day = new Date(today);
    day.setUTCDate(day.getUTCDate() - offset);
    return day.toISOString().slice(0, 10);
  }),
);

function markdownFiles(directory) {
  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  });
}

const due = [];
for (const file of markdownFiles(briefsDir)) {
  const source = readFileSync(file, 'utf8');
  const publishAt = source.match(/^publishAt:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const draft = /^draft:\s*true\s*$/m.test(source);
  if (!publishAt || draft) continue;
  if (dayKeys.has(publishAt)) due.push({ file: file.slice(projectRoot.length + 1), publishAt });
}

const isDue = due.length > 0;
console.log(
  `[due-briefs] ${due.length} brief(s) with publishAt inside the last ${windowDays} day(s) (${[...dayKeys].sort().join(', ')}).`,
);
for (const entry of due) console.log(`  ${entry.publishAt}  ${entry.file}`);
if (!isDue) console.log('[due-briefs] Nothing new is due; the scheduled deploy will be skipped.');

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `due=${isDue}\ncount=${due.length}\n`);
}

// A missing collection is a bug, not a quiet day: if the directory were renamed
// or the path went stale, every future scheduled run would report "nothing due"
// and the whole cluster would stop publishing without anything going red.
if (markdownFiles(briefsDir).length === 0) {
  console.error(`[due-briefs] No briefs found under ${briefsDir}. The collection is missing or the path is stale.`);
  process.exit(1);
}
