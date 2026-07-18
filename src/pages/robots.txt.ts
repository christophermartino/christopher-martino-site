import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const site = import.meta.env.PUBLIC_SITE_URL;

  if (!site) {
    throw new Error('PUBLIC_SITE_URL is required to generate robots.txt.');
  }

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
