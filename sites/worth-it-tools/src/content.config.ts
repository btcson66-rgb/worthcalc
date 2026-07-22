import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedSchema = z.object({
  locale: z.enum(['en', 'zh', 'es', 'fr', 'de']),
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

export const collections = { growthTools, growthArticles };
