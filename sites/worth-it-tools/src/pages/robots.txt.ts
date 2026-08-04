import type { APIContext } from 'astro';
import { SITE } from '../consts';

export const prerender = true;

export const GET = ({ site }: APIContext): Response => {
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  // The post-build sitemap hardening step reads the generated sitemap index
  // and appends one Sitemap line per actual child file. That keeps this list
  // correct automatically when the integration eventually emits sitemap-1.xml.
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${origin}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
