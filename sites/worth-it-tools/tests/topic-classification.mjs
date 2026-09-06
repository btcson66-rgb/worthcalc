/*
 * Guards the two architectural rails added on 2026-09-06:
 *
 *   1. A fallback classification must be reported as a fallback, never
 *      disguised as a rule match.
 *   2. A same-slug collision must not reach production UI until a person has
 *      reviewed it.
 *
 * Both are invisible in rendered output — a fallback `everyday` looks exactly
 * like a matched `everyday`, and an unreviewed sibling would look exactly like
 * a reviewed one — so they can only be pinned down here.
 */
import assert from 'node:assert/strict';
import { loadTopicModules } from '../scripts/load-topic-modules.mjs';

const {
  classifyTopic,
  classifyTopicDetailed,
  FALLBACK_TOPIC,
  TOPIC_IDS,
  findSlugSiblings,
  isReviewedSiblingPair,
  REVIEWED_SLUG_SIBLING_GROUPS,
} = await loadTopicModules();

/* ── 1. Classification source ───────────────────────────────────────────── */

// An entry in the override table reports itself as an override.
const override = classifyTopicDetailed('/true-hourly-wage-after-commuting-work-expenses/');
assert.deepEqual(override, { topic: 'income-savings', source: 'override' });

// A token rule and a phrase rule both report 'rule'.
const tokenRule = classifyTopicDetailed('/guides/mortgage-recast-vs-refinance-vs-extra-principal/');
assert.equal(tokenRule.topic, 'housing');
assert.equal(tokenRule.source, 'rule');

const phraseRule = classifyTopicDetailed('/guides/balance-transfer-break-even/');
assert.equal(phraseRule.topic, 'debt-credit');
assert.equal(phraseRule.source, 'rule');

// Nothing matches: the topic is the fallback AND it says so. This is the whole
// point — before this, an unmatched slug was indistinguishable from a match.
const unmatched = classifyTopicDetailed('/guides/zzz-not-a-real-worthcalc-slug/');
assert.deepEqual(unmatched, { topic: FALLBACK_TOPIC, source: 'fallback' });
assert.equal(FALLBACK_TOPIC, 'everyday');

// A page deliberately placed in `everyday` by the override table must not be
// reported as a fallback, or the audit's count would be meaningless.
const realEveryday = classifyTopicDetailed('/guides/annual-vs-monthly-insurance-payment/');
assert.equal(realEveryday.topic, 'everyday');
assert.equal(realEveryday.source, 'override');

// Every source is one of the three known values, and every topic is a real one.
for (const path of [
  '/rent-vs-buy-guide/',
  '/guides/costco-gas-detour-break-even/',
  '/tools/dti-calculator',
  '/guides/zzz-unmatched/',
]) {
  const result = classifyTopicDetailed(path);
  assert.ok(['override', 'rule', 'fallback'].includes(result.source), `unknown source for ${path}`);
  assert.ok(TOPIC_IDS.includes(result.topic), `unknown topic for ${path}`);
}

// The old API is unchanged: same signature, same return type, same answers.
for (const path of [
  '/true-hourly-wage-after-commuting-work-expenses/',
  '/guides/balance-transfer-break-even/',
  '/guides/zzz-not-a-real-worthcalc-slug/',
  '/rent-vs-buy-guide/',
]) {
  assert.equal(classifyTopic(path), classifyTopicDetailed(path).topic, `classifyTopic drifted on ${path}`);
  assert.equal(typeof classifyTopic(path), 'string');
}

/* ── 2. Same-slug detection vs production exposure ──────────────────────── */

const paths = [
  '/gym-membership-cost-per-visit/',
  '/guides/gym-membership-cost-per-visit/',
  '/guides/laundry-cost-per-load/',
  '/costco-math/',
  '/guides/costco-gas-detour-break-even/',
];

// The generic detector still finds the collision.
assert.deepEqual(
  findSlugSiblings(paths, '/gym-membership-cost-per-visit/'),
  ['/guides/gym-membership-cost-per-visit/'],
);
// ...and symmetrically.
assert.deepEqual(
  findSlugSiblings(paths, '/guides/gym-membership-cost-per-visit/'),
  ['/gym-membership-cost-per-visit/'],
);

// A page is never its own sibling, with or without a trailing slash.
assert.deepEqual(findSlugSiblings(paths, '/guides/laundry-cost-per-load/'), []);
assert.deepEqual(findSlugSiblings(paths, '/guides/laundry-cost-per-load'), []);

// Different slugs are not siblings, however similar the intent.
assert.deepEqual(findSlugSiblings(paths, '/costco-math/'), []);

// The reviewed pair is allowed through to production UI.
assert.equal(
  isReviewedSiblingPair('/gym-membership-cost-per-visit/', '/guides/gym-membership-cost-per-visit/'),
  true,
);
assert.equal(
  isReviewedSiblingPair('/guides/gym-membership-cost-per-visit/', '/gym-membership-cost-per-visit/'),
  true,
);

// An unreviewed collision is detected but NOT allowed through. This is the
// rail: a future slug collision changes the audit, never the page.
const unreviewedPaths = ['/some-new-topic/', '/guides/some-new-topic/'];
assert.deepEqual(
  findSlugSiblings(unreviewedPaths, '/some-new-topic/'),
  ['/guides/some-new-topic/'],
  'generic detector must still see an unreviewed collision',
);
assert.equal(
  isReviewedSiblingPair('/some-new-topic/', '/guides/some-new-topic/'),
  false,
  'an unreviewed collision must not be treated as reviewed',
);

// A path is never a reviewed sibling of itself.
assert.equal(
  isReviewedSiblingPair('/gym-membership-cost-per-visit/', '/gym-membership-cost-per-visit/'),
  false,
);

// Every reviewed group is a real group of at least two distinct paths with the
// same slug, and carries a note. A typo here would silently disable the pair.
assert.ok(REVIEWED_SLUG_SIBLING_GROUPS.length > 0);
for (const group of REVIEWED_SLUG_SIBLING_GROUPS) {
  assert.ok(group.paths.length >= 2, 'a reviewed group needs at least two paths');
  assert.equal(new Set(group.paths).size, group.paths.length, 'duplicate path in a reviewed group');
  assert.ok(group.note && group.note.length > 0, 'a reviewed group needs a note');
  const slugs = new Set(group.paths.map((path) => path.split('/').filter(Boolean).at(-1)));
  assert.equal(slugs.size, 1, `reviewed group spans more than one slug: ${group.paths.join(', ')}`);
  for (const path of group.paths) {
    assert.ok(path.startsWith('/') && path.endsWith('/'), `reviewed path needs leading and trailing slash: ${path}`);
  }
}

console.log('Topic classification and slug-sibling tests passed.');
