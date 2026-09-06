/*
 * Reports how every editorial page got its topic, and which same-slug
 * collisions a person has actually reviewed. It does not gate the build.
 *
 * Why it exists: classifyTopic() returns a topic for every slug, so the site
 * looks fully classified. It is not — an unmatched slug falls back to
 * `everyday`, and once the bare TopicId is returned a fallback is
 * indistinguishable from a real match. That made the taxonomy's blind spot
 * invisible: nobody could say whether `everyday` meant "this is an everyday
 * break-even" or "no rule recognised this". The same applies to slug
 * collisions, where a generic match used to be shown to readers as "also on
 * this question" without anyone confirming it was the same question.
 *
 * A fallback is not a defect, so a fallback never fails the build. This exists
 * so the next content inventory knows what it is looking at. Only a genuinely
 * invalid topic — a classifier bug — exits non-zero.
 *
 * Usage: node scripts/audit-topic-classification.mjs [--json] [--samples=N]
 */
import { loadTopicModules } from './load-topic-modules.mjs';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const sampleArg = args.find((arg) => arg.startsWith('--samples='));
// Capped so a CI log gets a usable sample, not several hundred slugs.
const SAMPLE_LIMIT = sampleArg ? Math.max(0, Number(sampleArg.split('=')[1])) : 20;

const {
  classifyTopicDetailed,
  findSlugSiblings,
  isReviewedSiblingPair,
  REVIEWED_SLUG_SIBLING_GROUPS,
  TOPIC_IDS,
  guideIndex,
} = await loadTopicModules();

const validTopics = new Set(TOPIC_IDS);
const locales = Object.keys(guideIndex);
const invalid = [];
const rows = [];
const localeReports = [];

for (const locale of locales) {
  // Directory and hub routes are navigation over the library, not entries in
  // it — the same exclusion getGuides() applies.
  const entries = guideIndex[locale].filter(
    (entry) => entry.path !== '/guides/' && !entry.path.startsWith('/topics/'),
  );

  const counts = { override: 0, rule: 0, fallback: 0 };
  const fallbackSamples = [];

  for (const entry of entries) {
    const { topic, source } = classifyTopicDetailed(entry.path);
    if (!validTopics.has(topic)) invalid.push(`${locale}${entry.path} -> ${topic}`);
    counts[source] += 1;
    if (source === 'fallback') fallbackSamples.push(entry.path);
    if (asJson) rows.push({ locale, path: entry.path, topic, source });
  }

  localeReports.push({
    locale,
    total: entries.length,
    ...counts,
    fallbackPercent: entries.length === 0 ? 0 : Number(((counts.fallback / entries.length) * 100).toFixed(1)),
    fallbackSamples,
  });
}

/* ── Same-slug collisions ───────────────────────────────────────────────── */

const reviewed = new Set();
const unreviewed = new Set();

for (const locale of locales) {
  const paths = guideIndex[locale].map((entry) => entry.path);
  for (const path of paths) {
    for (const sibling of findSlugSiblings(paths, path)) {
      // One row per unordered pair per locale.
      const pair = [path, sibling].sort().join('  ↔  ');
      (isReviewedSiblingPair(path, sibling) ? reviewed : unreviewed).add(`${locale}: ${pair}`);
    }
  }
}

if (asJson) {
  console.log(JSON.stringify({
    locales: localeReports.map((report) => ({
      locale: report.locale,
      total: report.total,
      override: report.override,
      rule: report.rule,
      fallback: report.fallback,
      fallbackPercent: report.fallbackPercent,
    })),
    pages: rows,
    slugCollisions: {
      reviewedGroups: REVIEWED_SLUG_SIBLING_GROUPS,
      reviewed: [...reviewed].sort(),
      unreviewed: [...unreviewed].sort(),
    },
  }, null, 2));
} else {
  console.log('WorthCalc topic classification audit');
  console.log('');
  for (const report of localeReports) {
    console.log(
      `${report.locale}: ${report.total} pages — override ${report.override}, rule ${report.rule}, ` +
        `fallback ${report.fallback} (${report.fallbackPercent}%)`,
    );
  }

  const totalFallback = localeReports.reduce((sum, report) => sum + report.fallback, 0);
  if (totalFallback > 0) {
    const samples = localeReports.find((report) => report.fallbackSamples.length > 0);
    console.log('');
    console.log(
      `[info] ${totalFallback} page(s) across all locales matched no override and no rule, so they ` +
        'carry the fallback topic. That is not a build error — it is the backlog for the next ' +
        'taxonomy review.',
    );
    if (samples) {
      console.log(`Fallback samples (${samples.locale}, first ${Math.min(SAMPLE_LIMIT, samples.fallbackSamples.length)} of ${samples.fallbackSamples.length}):`);
      for (const path of samples.fallbackSamples.slice(0, SAMPLE_LIMIT)) console.log(`- ${path}`);
    }
    console.log('Full per-page detail: node scripts/audit-topic-classification.mjs --json');
  }

  console.log('');
  console.log(`Same-slug collisions — reviewed ${reviewed.size}, unreviewed ${unreviewed.size}`);
  for (const row of [...reviewed].sort()) console.log(`  reviewed   ${row}`);
  for (const row of [...unreviewed].sort().slice(0, SAMPLE_LIMIT)) console.log(`  UNREVIEWED ${row}`);
  if (unreviewed.size > 0) {
    console.log('');
    console.log(
      `[warning] ${unreviewed.size} same-slug collision(s) have not been reviewed. Readers are not ` +
        'shown them: only groups in REVIEWED_SLUG_SIBLING_GROUPS (src/lib/slugSiblings.ts) appear ' +
        'in the page footer. Confirm the pages share one search intent before adding a group.',
    );
  }
}

// A topic outside TOPIC_IDS means the classifier is broken, which is a real
// failure. Fallbacks and unreviewed collisions are findings, not failures.
if (invalid.length > 0) {
  console.error(`\n[topic-audit] ${invalid.length} page(s) resolved to an unknown topic:`);
  for (const row of invalid) console.error(`- ${row}`);
  process.exit(1);
}
