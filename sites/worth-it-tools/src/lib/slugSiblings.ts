/*
 * Same-slug collisions, and the difference between finding one and trusting it.
 *
 * The hand-written five-language editorial set and the programmatic guide
 * programme grew independently and collided: /en/gym-membership-cost-per-visit/
 * and /en/guides/gym-membership-cost-per-visit/ are the same slug, the same
 * intent, and both indexable.
 *
 * Detecting that collision is cheap and generic. Concluding that two pages
 * answer the same question is not — it is an editorial judgement about search
 * intent, and a slug match is only circumstantial evidence for it. The first
 * version of this shipped the detector straight into the page footer, so any
 * future slug collision would have started telling readers "also on this
 * question" with nobody having checked whether it was the same question.
 *
 * So the two are split here:
 *
 *   findSlugSiblings()      generic, for the audit and tests — finds everything
 *   isReviewedSiblingPair() allowlist, for production UI — shows only what a
 *                           person confirmed
 *
 * A new collision therefore appears in `npm run audit:topics` as unreviewed and
 * changes nothing a reader sees, until it is added below.
 *
 * This module deliberately imports nothing: the audit and the tests load it in
 * plain Node, outside Astro's module graph.
 */

export interface ReviewedSiblingGroup {
  /**
   * Locale-free paths, as they appear in `guideIndex` (leading and trailing
   * slash). Paths, not locales: a locale that does not publish both sides
   * simply produces no sibling, so nothing has to be repeated per language.
   */
  readonly paths: readonly string[];
  /** Who checked what, and when. */
  readonly note: string;
}

/**
 * Pairs a person has confirmed answer the same search question.
 *
 * To add a group: confirm both pages really serve one intent (not just one
 * slug), then add the paths and a dated note. To remove one, delete the entry —
 * the detector still reports it, as unreviewed, in the audit.
 */
export const REVIEWED_SLUG_SIBLING_GROUPS: readonly ReviewedSiblingGroup[] = [
  {
    paths: ['/gym-membership-cost-per-visit/', '/guides/gym-membership-cost-per-visit/'],
    note:
      'Reviewed 2026-09-06: same slug, same question ("what does a gym visit actually cost"), ' +
      'both indexable. Present in en, zh and es; fr/de publish only the editorial page and ' +
      'hi/ar only the guide, so those locales produce no sibling. Cross-linking is an interim ' +
      'measure — which URL should survive needs Search Console data.',
  },
];

/** Trailing-slash form, matching how `guideIndex` stores paths. */
export function normalizeSiblingPath(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/** Last non-empty path segment. */
export function slugOf(path: string): string {
  return path.split('/').filter(Boolean).at(-1) ?? '';
}

/**
 * Every other path in `paths` that ends in the same slug.
 *
 * Generic and unfiltered on purpose: this is what the audit reports and what
 * the tests exercise. Production UI must go through the allowlist instead.
 */
export function findSlugSiblings(paths: Iterable<string>, path: string): string[] {
  const slug = slugOf(path);
  if (!slug) return [];
  const self = normalizeSiblingPath(path);
  const seen = new Set<string>();
  const siblings: string[] = [];
  for (const candidate of paths) {
    const normalized = normalizeSiblingPath(candidate);
    if (normalized === self || seen.has(normalized)) continue;
    if (slugOf(normalized) !== slug) continue;
    seen.add(normalized);
    siblings.push(normalized);
  }
  return siblings;
}

/** True when a reviewed group contains both paths. */
export function isReviewedSiblingPair(a: string, b: string): boolean {
  const left = normalizeSiblingPath(a);
  const right = normalizeSiblingPath(b);
  if (left === right) return false;
  return REVIEWED_SLUG_SIBLING_GROUPS.some(
    (group) => group.paths.includes(left) && group.paths.includes(right),
  );
}
