// Hardcoded from the old site's spreadsheet ("products" and "images" sheets)
// until the catalogue reads its data from a real source.
export interface Product {
	/** URL slug, unique across the catalogue. */
	id: string;
	name: string;
	/** Id of its category in categories.ts. */
	category: string;
	/** Price in pesos. */
	price: number;
	details: string[];
	/** Photos, cover first. */
	images: string[];
	/** Units in stock per size, in the order sizes are shown. */
	stock: Record<string, number>;
}

const img = (path: string) => `https://i.postimg.cc/${path}`;
const shirt = (s: number, m: number, l: number, xl: number) => ({ S: s, M: m, L: l, XL: xl });
const smoke = ['Algodón premium de 200 g con lavado vintage', 'Corte amplio y ultra cómodo'];
const qtar = ['Algodón peinado heavyweight de 220 a 260 g', 'Oversized fit con hombros caídos'];

export const products: readonly Product[] = [
	{
		id: 'black-smoke',
		name: 'Black Smoke',
		category: 'over-smoke',
		price: 75000,
		details: [smoke[0], 'Logo 3D en rojo y negro', smoke[1]],
		images: [img('rpB1dLx4/ACID-NNegro-(8).jpg')],
		stock: shirt(1, 1, 2, 2),
	},
	{
		id: 'brown-smoke',
		name: 'Brown Smoke',
		category: 'over-smoke',
		price: 75000,
		details: [smoke[0], 'Logo 3D beige que contrasta con la tela', smoke[1]],
		images: [
			img('4N6SsWC1/ACID-Cafe-(7).jpg'),
			img('L6tb2xdj/ACID-Cafe-(2).jpg'),
			img('xTv4n6rm/ACID-Cafe-(5).jpg'),
			img('ZK8M4wkW/ACID-Cafe-(1).jpg'),
			img('vHrNb0Rg/ACID-Cafe-(6).jpg'),
			img('8PR0NZ8Z/ACID-Cafe-(9).jpg'),
		],
		stock: shirt(2, 2, 1, 1),
	},
	{
		id: 'white-smoke',
		name: 'White Smoke',
		category: 'over-smoke',
		price: 75000,
		details: [smoke[0], 'Logo 3D en rojo y negro que contrasta con la tela', smoke[1]],
		images: [
			img('vHt3pD9K/ACID-Gris-Negro-(5).jpg'),
			img('qMxj9gnS/ACID-Gris-Negro-(2).jpg'),
			img('YqzbJjgs/ACID-Gris-Negro-(3).jpg'),
			img('vHt3pD9S/ACID-Gris-Negro-(4).jpg'),
			img('xT3tWqMS/ACID-Gris-Negro-(6).jpg'),
			img('KvDJd4BF/ACID-Gris-Negro-(7).jpg'),
			img('g2cNddqQ/ACID-Gris-Negro-(8).jpg'),
		],
		stock: shirt(1, 1, 3, 1),
	},
	{
		id: 'yellow-smoke',
		name: 'Yellow Smoke',
		category: 'over-smoke',
		price: 75000,
		details: [smoke[0], 'Logo 3D amarillo de alto contraste', smoke[1]],
		images: [
			img('vmchgzjy/ACID-NAmarillo-(4).jpg'),
			img('ZqCHBcgb/ACID-NAmarillo-(2).jpg'),
			img('fbJCtKFM/ACID-NAmarillo-(3).jpg'),
			img('tgYkZ5fp/ACID-NAmarillo-(1).jpg'),
		],
		stock: shirt(1, 1, 2, 2),
	},
	{
		id: 'orange-smoke',
		name: 'Orange Smoke',
		category: 'over-smoke',
		price: 75000,
		details: [smoke[0], 'Logo 3D naranja de alto contraste', smoke[1]],
		images: [img('1tFKMzsH/ACID-NNaranja-(5).jpg'), img('26WxT5r2/ACID-NNaranja-(1).jpg')],
		stock: shirt(1, 1, 3, 1),
	},
	{
		id: 'grey-qtar',
		name: 'Grey Qtar',
		category: 'over-qtar',
		price: 70000,
		details: [qtar[0], 'Estampado VENKRA en vinilo 3D de alta densidad', qtar[1]],
		images: [img('dVYHNp1F/OVERZ-Gris-(3).jpg')],
		stock: shirt(2, 2, 1, 2),
	},
	{
		id: 'brown-qtar',
		name: 'Brown Qtar',
		category: 'over-qtar',
		price: 70000,
		details: [qtar[0], 'Color beige arena con estampado VENKRA en vinilo 3D', qtar[1]],
		images: [img('dQhxhGXf/OVERZ%20Caf%C3%A9%20(2).jpg')],
		stock: shirt(1, 1, 3, 1),
	},
	{
		id: 'black-yellow-qtar',
		name: 'Black & Yellow Qtar',
		category: 'over-qtar',
		price: 70000,
		details: [qtar[0], 'Estampado VENKRA amarillo en vinilo 3D sobre negro profundo', qtar[1]],
		images: [img('hvpMQ5SF/OVER-NAmarillo-(2).jpg')],
		stock: shirt(1, 2, 1, 1),
	},
	{
		id: 'black-orange-qtar',
		name: 'Black & Orange Qtar',
		category: 'over-qtar',
		price: 70000,
		details: [qtar[0], 'Estampado VENKRA naranja en vinilo 3D sobre negro profundo', qtar[1]],
		images: [img('4NtVM37J/OVER-NNaranja-(8).jpg')],
		stock: shirt(1, 1, 2, 2),
	},
	{
		id: 'yellow-shadow',
		name: 'Yellow Shadow',
		category: 'over-qtar',
		price: 70000,
		details: [qtar[0], 'Estampado VENKRA negro con sombra amarilla sobre negro profundo', qtar[1]],
		images: [img('vBH4ZYZp/OVER-Negra-Amarillo-(11).jpg')],
		stock: shirt(1, 1, 2, 2),
	},
	{
		id: 'trucker-carbon',
		name: 'Trucker Carbon',
		category: 'gorras',
		price: 35000,
		details: ['Logo en vinilo 3D con efecto fibra de carbono', 'Oscura, agresiva y con textura premium'],
		images: [img('d1PRxKWx/Negra1.jpg')],
		stock: { Única: 1 },
	},
	{
		id: 'trucker-black-silver',
		name: 'Trucker Black and Silver',
		category: 'gorras',
		price: 35000,
		details: ['Frente en foam y malla transpirable', 'Logo VENKRA en vinilo 3D de alta densidad'],
		images: [img('tTQdMHrS/Plata1.jpg')],
		stock: { Única: 1 },
	},
	{
		id: 'trucker-red-fire',
		name: 'Trucker Red Fire',
		category: 'gorras',
		price: 35000,
		details: ['Vinilo en alto relieve rojo sangre', 'Para quienes no tienen miedo de destacar'],
		images: [img('NMq8zwNN/Roja1.jpg')],
		stock: { Única: 1 },
	},
	{
		id: 'trucker-snake',
		name: 'Trucker Snake',
		category: 'gorras',
		price: 35000,
		details: ['Frente en foam y malla transpirable', 'Logo VENKRA en vinilo 3D con apariencia de piel de serpiente'],
		images: [img('rmXGPLhY/Snake1.jpg')],
		stock: { Única: 1 },
	},
];

/** Four standout pieces for the landing row. */
export const featured = ['black-smoke', 'yellow-shadow', 'trucker-snake', 'white-smoke'].map(
	(id) => products.find((product) => product.id === id)!,
);
