import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { get, photos } from '../../data/cms';

// The WebP copy of each photo uploaded to the CMS, made at build time.
export const getStaticPaths = (() =>
	[...photos].map(([copy, original]) => ({
		params: { uuid: copy.slice(copy.lastIndexOf('/') + 1, -'.webp'.length) },
		props: { original },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const image = await (await get(props.original)).arrayBuffer();
	const webp = await sharp(image).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
	return new Response(new Uint8Array(webp), { headers: { 'Content-Type': 'image/webp' } });
};
