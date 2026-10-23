import { catalogue } from './cms';
import type { Product } from './products';

export interface Category {
	/** URL slug. */
	id: string;
	name: string;
	description: string;
	/** What one of its products is, for titles: "Black Smoke, camiseta oversized". */
	garment: string;
	/** Google product taxonomy id, for the Merchant Center feed. */
	googleCategory: number;
	image: string;
	/** Its products, in catalogue order. */
	products: readonly Product[];
	/** Lowest product price, in pesos. */
	fromPrice: number;
}

// A category with nothing published has no price to show, so it is left out.
// One with no image yet shows its first product's cover.
export const categories: readonly Category[] = catalogue
	.filter((category) => category.products.length > 0)
	.map((category) => ({
		...category,
		image: category.image || category.products[0].images[0],
		fromPrice: Math.min(...category.products.map((product) => product.price)),
	}));
