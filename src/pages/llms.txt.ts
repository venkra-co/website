import type { APIRoute } from 'astro';
import { categories } from '../data/categories';
import { site } from '../data/site';
import { formatPrice } from '../lib/format';
import { productDescription, productPath, productTitle } from '../lib/seo';

// The catalogue as one Markdown file (llmstxt.org), so an AI assistant can
// answer "where can I buy an oversized tee in Colombia" without crawling every page.
export const GET: APIRoute = ({ site: origin }) => {
	const link = (path: string) => new URL(path, origin).href;
	const lines = categories.flatMap((category) => [
		`## ${category.name}`,
		'',
		`${category.description} Desde ${formatPrice(category.fromPrice)}. ${link(`/catalogo/${category.id}`)}`,
		'',
		...category.products.map((product) => `- [${productTitle(product)}](${link(productPath(product))}): ${productDescription(product)}`),
		'',
	]);
	const body = [
		'# Venkra',
		'',
		`> ${site.description} Marca colombiana de streetwear. Precios en pesos colombianos (COP); los pedidos se hacen por WhatsApp.`,
		'',
		`Para comprar, escribe por WhatsApp al ${site.phone} (${site.whatsapp}) con la prenda y la talla. Envíos dentro de Colombia, costo según la ciudad.`,
		'',
		...lines,
		'## Ayuda',
		'',
		...site.support.map((page) => `- [${page.label}](${link(page.href)})`),
		'',
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
