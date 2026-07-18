import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;'
  })[character] ?? character);

export const GET: APIRoute = async () => {
  const site = import.meta.env.PUBLIC_SITE_URL;

  if (!site) {
    throw new Error('PUBLIC_SITE_URL is required to generate the sitemap.');
  }

  const works = await getCollection('artwork');
  const paths = [
    '/',
    '/about/',
    '/archive/',
    '/contact/',
    '/cv/',
    '/exhibitions/',
    '/works/',
    ...works.map((work) => `/works/${work.id}/`)
  ];

  const entries = paths
    .map((path) => `  <url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
