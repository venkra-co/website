import type { APIRoute } from 'astro';

// Everyone, AI assistants included, may read the whole site.
export const GET: APIRoute = ({ site }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`);
