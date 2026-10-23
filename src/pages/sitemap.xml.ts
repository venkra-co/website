import type { APIRoute } from 'astro';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { site } from '../data/site';
import { productPath } from '../lib/seo';

// Every indexable page: the home, the catalogue down to each product, and the site's own pages.
const paths = [
	'/',
	...categories.map((category) => `/catalogo/${category.id}`),
	...products.map(productPath),
	...[...site.links, ...site.support].map((link) => link.href),
];

export const GET: APIRoute = ({ site: origin }) => {
	const urls = paths.map((path) => `<url><loc>${new URL(path, origin)}</loc></url>`).join('');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
		headers: { 'Content-Type': 'application/xml' },
	});
};
