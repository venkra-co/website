import type { APIRoute } from 'astro';
import { products, type Product } from '../../data/products';
import { site } from '../../data/site';
import { categoryOf, productDescription, productPath, productTitle } from '../../lib/seo';

// Google Merchant Center product feed (RSS 2.0 with the g: namespace), for free
// listings in the Shopping tab. Each size is its own item, grouped by product.

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tag = (name: string, value: string | number) => `<g:${name}>${escape(String(value))}</g:${name}>`;

const items = (product: Product, origin: URL) => {
	const category = categoryOf(product);
	const sizes = Object.entries(product.stock);
	const shared = [
		tag('title', `${productTitle(product)} Venkra`),
		tag('description', productDescription(product)),
		tag('link', new URL(productPath(product), origin).href),
		tag('image_link', product.images[0]),
		...product.images.slice(1, 11).map((image) => tag('additional_image_link', image)),
		tag('price', `${product.price} COP`),
		tag('brand', 'Venkra'),
		tag('condition', 'new'),
		tag('identifier_exists', 'no'),
		tag('google_product_category', category.googleCategory),
		tag('product_type', category.name),
		tag('gender', 'unisex'),
		tag('age_group', 'adult'),
	];
	// One-size products (caps) are a single item with no size.
	if (sizes.length === 1) {
		return [[tag('id', product.id), tag('availability', sizes[0][1] > 0 ? 'in_stock' : 'out_of_stock'), ...shared]];
	}
	return sizes.map(([size, units]) => [
		tag('id', `${product.id}-${size.toLowerCase()}`),
		tag('item_group_id', product.id),
		tag('size', size),
		tag('availability', units > 0 ? 'in_stock' : 'out_of_stock'),
		...shared,
	]);
};

export const GET: APIRoute = ({ site: origin }) => {
	const entries = products
		.flatMap((product) => items(product, origin!))
		.map((fields) => `<item>${fields.join('')}</item>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Venkra</title>
<link>${origin}</link>
<description>${escape(site.description)}</description>
${entries}
</channel>
</rss>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
