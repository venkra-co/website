import { catalogue } from './cms';

export interface Product {
	/** URL slug, unique across the catalogue. */
	id: string;
	name: string;
	/** Id of its category. */
	category: string;
	/** Price in pesos. */
	price: number;
	details: string[];
	/** Photos, cover first: full URLs, or /photos/ paths for those from the CMS. */
	images: string[];
	/** Sizes it can be ordered in, in the order they're shown. */
	sizes: string[];
	/** Its colours, as named swatches. */
	colors: { name: string; hex: string }[];
}

/** Every published product, in catalogue order. */
export const products: readonly Product[] = catalogue.flatMap((category) => category.products);

/** Four standout pieces for the landing row, minus any no longer published. */
export const featured = ['black-smoke', 'yellow-shadow', 'trucker-snake', 'white-smoke'].flatMap((id) =>
	products.filter((product) => product.id === id),
);
