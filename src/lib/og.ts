// Link preview cards (Open Graph images), drawn at build time with satori and
// saved as JPEG by sharp, in the hero's look from brand-personality.md.
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import eagleSvg from '../assets/eagle.svg?raw';
import logoSvg from '../assets/logo-full.svg?raw';
import { site } from '../data/site';

export const CARD = { width: 1200, height: 630 } as const;

const CREAM = '#efe3c8';
const POSTER = 'public/hero/poster.webp';

/** URL of the card for a page, by its slug under /og. */
export const cardUrl = (slug: string) => `/og/${slug}.jpg`;

export interface CardText {
	eyebrow: string;
	name: string;
	/** Price line, like "$75.000" or "Desde $35.000". */
	price: string;
	/** Photo URL; the hero poster stands in if it can't be fetched. */
	photo: string;
}

type Node = Parameters<typeof satori>[0];

const fonts = Promise.all(
	([700, 900] as const).map(async (weight) => ({
		name: 'Roboto Condensed',
		weight,
		data: await readFile(`src/assets/fonts/roboto-condensed-latin-${weight}-normal.woff`),
	})),
);

const svgUri = (svg: string, color: string) =>
	`data:image/svg+xml;base64,${Buffer.from(svg.replace('currentColor', color)).toString('base64')}`;

const photoUri = async (input: Buffer | string, width: number, height: number) => {
	const jpeg = await sharp(input).resize(width, height, { fit: 'cover' }).jpeg({ quality: 90 }).toBuffer();
	return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
};

const fetchPhoto = async (url: string) => {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return Buffer.from(await response.arrayBuffer());
	} catch (error) {
		console.warn(`[og] ${url} could not be fetched (${error}); using the hero poster.`);
		return POSTER;
	}
};

const box = (style: Record<string, unknown>, ...children: unknown[]): Node => ({
	type: 'div',
	props: { style: { display: 'flex', ...style }, children },
});
const img = (src: string, style: Record<string, unknown>): Node => ({ type: 'img', props: { src, style } });
const caps = (fontSize: number, letterSpacing: number, color: string) => ({
	fontSize,
	fontWeight: 700,
	letterSpacing,
	color,
	textTransform: 'uppercase',
});

const render = async (node: Node) => {
	const svg = await satori(node, { ...CARD, fonts: await fonts });
	return sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toBuffer();
};

/** The site's card: the hero poster, darkened, under the full logo. */
export const homeCard = async () =>
	render(
		box(
			{ ...CARD, position: 'relative', background: '#000', fontFamily: 'Roboto Condensed' },
			img(await photoUri(POSTER, CARD.width, CARD.height), { position: 'absolute', ...CARD }),
			box({ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }),
			box(
				{ position: 'absolute', inset: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
				img(svgUri(logoSvg, '#fff'), { width: 640, height: 250 }),
				box({ ...caps(24, 10, CREAM), marginTop: 40 }, site.stamp),
			),
		),
	);

/** A photo beside a panel, both the card's height. */
const split = async (photo: string, background: string, ...panel: Node[]) =>
	render(
		box(
			{ ...CARD, background, fontFamily: 'Roboto Condensed' },
			img(await photoUri(await fetchPhoto(photo), CARD.height, CARD.height), { width: CARD.height, height: CARD.height }),
			box({ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: '60px 56px' }, ...panel),
		),
	);

const bigName = (name: string, color: string) =>
	box({ marginTop: 20, fontSize: name.length > 12 ? 84 : 120, fontWeight: 900, lineHeight: 0.86, color, textTransform: 'uppercase' }, name);

/** A product's card: its photo beside a cream panel, like the product page. */
export const productCard = ({ eyebrow, name, price, photo }: CardText) =>
	split(
		photo,
		CREAM,
		box(
			{ flexDirection: 'column' },
			box(caps(24, 8, '#000'), eyebrow),
			bigName(name, '#000'),
			box({ marginTop: 28, fontSize: 44, fontWeight: 700 }, price),
		),
		box(
			{ alignItems: 'center', justifyContent: 'space-between' },
			img(svgUri(eagleSvg, '#000'), { width: 110, height: 58 }),
			box(caps(22, 6, '#000'), 'Pide por WhatsApp'),
		),
	);

/** A line's card: its photo beside a black panel with the eagle. */
export const categoryCard = ({ eyebrow, name, price, photo }: CardText) =>
	split(
		photo,
		'#000',
		img(svgUri(eagleSvg, '#fff'), { width: 150, height: 79 }),
		box(
			{ flexDirection: 'column' },
			bigName(name, '#fff'),
			box({ ...caps(26, 6, CREAM), marginTop: 24 }, `${eyebrow} · ${price}`),
		),
		box(caps(20, 5, '#9a9a9a'), site.tagline),
	);
