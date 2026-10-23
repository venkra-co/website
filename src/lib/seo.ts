import { categories, type Category } from '../data/categories';
import type { Product } from '../data/products';
import { site } from '../data/site';
import { formatPrice } from './format';

// Copy and structured data that search engines, Merchant Center and AI
// assistants read, built from the catalogue so it never drifts from the pages.

export const categoryOf = (product: Product) => categories.find((category) => category.id === product.category)!;

export const productPath = (product: Product) => `/catalogo/${product.category}/${product.id}`;

/** "Black Smoke, camiseta oversized" */
export const productTitle = (product: Product) => `${product.name}, ${categoryOf(product).garment}`;

/** One or two sentences: what it is, what it's made of, price and sizes. */
export const productDescription = (product: Product) => {
	// One-size products (caps) don't list their size.
	const sizes = product.sizes.length > 1 ? `Tallas ${product.sizes.join(', ')}.` : '';
	return `${productTitle(product)} de Venkra. ${product.details.join('. ')}. ${formatPrice(product.price)}. ${sizes}`.trim();
};

export const categoryDescription = (category: Category) =>
	`${category.description} Desde ${formatPrice(category.fromPrice)}, pedidos por WhatsApp.`;

const ld = (data: object) => ({ '@context': 'https://schema.org', ...data });

export const organizationSchema = (origin: URL) =>
	ld({
		'@type': 'Organization',
		'@id': new URL('/#organization', origin).href,
		name: 'Venkra',
		url: origin.href,
		logo: new URL('/icon-512.png', origin).href,
		slogan: site.tagline,
		sameAs: [site.instagram, site.facebook],
		contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: 'es' },
		// From /cambios-y-devoluciones: the legal 5 business days, buyer pays the return shipping.
		hasMerchantReturnPolicy: {
			'@type': 'MerchantReturnPolicy',
			applicableCountry: 'CO',
			returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
			merchantReturnDays: 5,
			returnMethod: 'https://schema.org/ReturnByMail',
			returnFees: 'https://schema.org/ReturnShippingFees',
			merchantReturnLink: new URL('/cambios-y-devoluciones', origin).href,
		},
	});

export const websiteSchema = (origin: URL) =>
	ld({
		'@type': 'WebSite',
		'@id': new URL('/#website', origin).href,
		name: 'Venkra',
		url: origin.href,
		inLanguage: 'es-CO',
		publisher: { '@id': new URL('/#organization', origin).href },
	});

export const productSchema = (product: Product, origin: URL) =>
	ld({
		'@type': 'Product',
		name: product.name,
		description: productDescription(product),
		image: product.images.map((image) => new URL(image, origin).href),
		sku: product.id,
		category: categoryOf(product).name,
		brand: { '@type': 'Brand', name: 'Venkra' },
		offers: {
			'@type': 'Offer',
			url: new URL(productPath(product), origin).href,
			price: product.price,
			priceCurrency: 'COP',
			availability: 'https://schema.org/InStock',
			itemCondition: 'https://schema.org/NewCondition',
			seller: { '@id': new URL('/#organization', origin).href },
		},
	});

/** Breadcrumb steps without a link are the current page. */
export const breadcrumbSchema = (items: { label: string; href?: string }[], current: URL) =>
	ld({
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.label,
			item: new URL(item.href ?? current.pathname, current).href,
		})),
	});
