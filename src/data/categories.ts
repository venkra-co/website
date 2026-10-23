import { products, type Product } from './products';

// Hardcoded from the old site's spreadsheet ("categories" sheet) until the
// catalogue reads its data from a real source.
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

const base = [
	{
		id: 'over-smoke',
		garment: 'camiseta oversized',
		googleCategory: 212,
		name: 'Over Smoke',
		description: 'Camisetas de algodón pima. Con exclusivos diseños minimalistas y diseños estampados.',
		image: 'https://i.postimg.cc/26WxT5r2/ACID-NNaranja-(1).jpg',
	},
	{
		id: 'over-qtar',
		garment: 'camiseta oversized',
		googleCategory: 212,
		name: 'Over Qtar',
		description: 'Excelentes camisas oversized de algodón qtar.',
		image: 'https://i.postimg.cc/dVYHNp1F/OVERZ-Gris-(3).jpg',
	},
	{
		id: 'gorras',
		garment: 'gorra',
		googleCategory: 173,
		name: 'Gorras',
		description: 'Gorras con diseño exclusivo, con hebilla metálica.',
		image: 'https://i.postimg.cc/NMq8zwNN/Roja1.jpg',
	},
];

export const categories: readonly Category[] = base.map((category) => {
	const items = products.filter((product) => product.category === category.id);
	return { ...category, products: items, fromPrice: Math.min(...items.map((product) => product.price)) };
});
