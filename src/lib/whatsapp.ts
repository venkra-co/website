import type { Product } from '../data/products';
import { site } from '../data/site';
import { formatPrice } from './format';

const number = site.phone.replace(/\D/g, '');

/** WhatsApp chat with an order for the product already typed in; no size for one-size products. */
export const orderLink = (product: Product, size?: string) => {
	const text = `Hola, quiero pedir ${product.name}${size ? ` en talla ${size}` : ''} (${formatPrice(product.price)}).`;
	return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
