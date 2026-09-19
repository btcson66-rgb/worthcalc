/**
 * The release gate for scheduled content.
 *
 * Why a date and not a `draft` flag: a flag is flipped by a human, and a human
 * flipping eighty flags flips them in batches. That is exactly the shape that
 * took worthcalc.win from 41 to 341 sitemap URLs between 2026-07-19 and
 * 2026-07-23 and GSC impressions from 87/day to 3/day (config/url-budget.json
 * keeps the full record). A date cannot be flipped in a batch. Eighty briefs
 * can be written, reviewed and merged in one commit while the site's public
 * surface still grows by the two or three that are due that day.
 *
 * The consequence for every consumer: a brief that is not due does not exist.
 * `getStaticPaths` never emits it, so there is no HTML file, no sitemap entry,
 * no internal link and no hreflang alternate pointing at a URL that 404s. This
 * is deliberately stricter than rendering it with `noindex` — a noindex page is
 * still a crawled URL, and crawl budget is the thing being conserved.
 *
 * Determinism: the cutoff is read once per build. `PUBLISH_AS_OF` overrides it
 * so tests and the scheduled-release check can ask "what does the site look
 * like on 2026-11-01?" without waiting for 2026-11-01.
 */

/** UTC, so a build at 23:00 in one timezone agrees with one at 01:00 in another. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The date the build treats as "now".
 *
 * An invalid `PUBLISH_AS_OF` throws rather than falling back to today: a typo
 * in a scheduled workflow must stop the build, not silently publish the entire
 * backlog because `new Date('tomrrow')` is `Invalid Date`.
 */
export function publishCutoff(env: Record<string, string | undefined> = process.env): string {
  const override = env.PUBLISH_AS_OF?.trim();
  if (!override) return todayIso();
  if (!ISO_DATE.test(override)) {
    throw new Error(`PUBLISH_AS_OF must be YYYY-MM-DD, received: ${override}`);
  }
  if (Number.isNaN(Date.parse(`${override}T00:00:00Z`))) {
    throw new Error(`PUBLISH_AS_OF is not a real date: ${override}`);
  }
  return override;
}

/** Inclusive: a brief dated today is live today. ISO dates compare as strings. */
export function isPublished(publishAt: string, cutoff = publishCutoff()): boolean {
  return publishAt <= cutoff;
}
