import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedSchema = z.object({
    locale: z.enum(['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar']),
  title: z.string(),
  description: z.string(),
  lastReviewed: z.coerce.date(),
  draft: z.boolean().default(false),
  noindex: z.boolean().optional(),
  publicationGate: z.string().optional(),
});

const growthTools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/growth-tools' }),
  schema: sharedSchema.extend({
    contentType: z.literal('tool'),
    toolSlug: z.string(),
    relatedArticle: z.string(),
  }),
});

const growthArticles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/growth-articles' }),
  schema: sharedSchema.extend({
    contentType: z.literal('article'),
    articleSlug: z.string(),
    relatedTool: z.string(),
  }),
});

/**
 * Money briefs: the dated-reference and decision cluster under /<locale>/money/.
 *
 * Two fields make this collection different from growthArticles, and both exist
 * because of the 2026-07-25 incident recorded in config/url-budget.json.
 *
 * `publishAt` is a hard release date. A brief whose date has not arrived is not
 * built at all -- no HTML, no sitemap entry, no internal link -- so the site's
 * submitted URL surface grows by the two or three pages that are actually due
 * that day instead of by a whole batch the moment it is merged. The July
 * collapse came from 41 -> 341 URLs in five days; this collection cannot
 * reproduce that shape even if a hundred briefs land in one commit.
 *
 * `sources` is required and must be non-empty. These are YMYL money pages that
 * quote real 2026 figures (IRS mileage rates, EIA electricity prices, Freddie
 * Mac mortgage averages), and scripts/check-trust-block.mjs already fails the
 * build when an indexable article renders a source without a URL or a
 * verification date. Requiring it in the schema moves that failure from build
 * time to authoring time.
 */
const moneyBriefs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/money-briefs' }),
  schema: sharedSchema.extend({
    contentType: z.literal('brief'),
    briefSlug: z.string(),
    /** Release date, inclusive. See PUBLISH_AS_OF in src/lib/publication.ts. */
    publishAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Which cluster the brief belongs to, for the hub's grouping. */
    cluster: z.enum(['rates', 'protection', 'ownership', 'earning']),
    /** The calculator this brief hands the reader off to. */
    relatedTool: z.string(),
    relatedToolLabel: z.string(),
    /** One-sentence extractable answer, rendered above the fold. */
    answer: z.string(),
    formula: z.string(),
    limits: z.array(z.string()).min(1),
    sources: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
      verifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    })).min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(2),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { growthTools, growthArticles, moneyBriefs };
