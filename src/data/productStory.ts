import type { Product } from './products';

// Sample texts to show the client a fuller product page. The CMS has no
// fields for them yet, so every product shows these; once it does, they come
// from there and this file goes.

export interface ProductStory {
	care: string[];
	materials: { label: string; value: string }[];
	history: string;
	/** Chest width and length, in cm, by size. */
	sizes: { size: string; chest: number; length: number }[];
}

const story: ProductStory = {
	care: [
		'Lava a máquina en agua fría, máximo 30 °C, y del revés.',
		'No uses blanqueador ni suavizante.',
		'Seca a la sombra; evita la secadora.',
		'Plancha a temperatura media, sin pasar sobre el estampado.',
		'No lavar en seco.',
	],
	materials: [
		{ label: 'Tela', value: 'Algodón Qtar 100 %, 250 g/m²' },
		{ label: 'Hilado y tejido', value: 'Medellín, Colombia' },
		{ label: 'Confección', value: 'Taller aliado en Bogotá' },
		{ label: 'Estampado', value: 'Vinilo 3D de alta densidad, aplicado a mano' },
	],
	history:
		'Venkra nació en Bogotá con una idea: la fe es necesaria para la victoria. Cada línea empieza con un dibujo en papel, pasa por pruebas de tela y horma con nuestro taller aliado y sale en tandas cortas, para que cada prenda se cuide como la primera.',
	sizes: [
		{ size: 'S', chest: 50, length: 70 },
		{ size: 'M', chest: 53, length: 72 },
		{ size: 'L', chest: 56, length: 74 },
		{ size: 'XL', chest: 59, length: 76 },
		{ size: 'XXL', chest: 62, length: 78 },
	],
};

/** The product's story; for now the same sample for every product. */
export const storyOf = (product: Product): ProductStory => ({
	...story,
	sizes: story.sizes.filter(({ size }) => product.sizes.includes(size)),
});
