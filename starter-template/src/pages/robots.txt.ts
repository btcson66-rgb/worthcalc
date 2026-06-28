import type { APIContext } from 'astro';
import { SITE } from '../consts';

export const prerender = true;

export const GET = ({ site }: APIContext): Response => {
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
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
