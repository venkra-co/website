import type { Category } from './categories';

// The catalogue and page texts as the CMS serves them, fetched once per
// build. The CMS sits behind Cloudflare Access, so the build signs in with a
// service token.
const url = import.meta.env.CMS_URL ?? 'https://website-cms.venkra.workers.dev';
const id = import.meta.env.CMS_CLIENT_ID;
const secret = import.meta.env.CMS_CLIENT_SECRET;
if (!id || !secret) {
	throw new Error('Set CMS_CLIENT_ID and CMS_CLIENT_SECRET (in .env locally) to read the catalogue from the CMS.');
}

/** Fetches a CMS URL, signed in. */
export async function get(target: string): Promise<Response> {
	const response = await fetch(target, {
		headers: { 'CF-Access-Client-Id': id, 'CF-Access-Client-Secret': secret },
		redirect: 'manual',
	});
	if (!response.ok) {
		// Access answers a rejected token with a redirect to its login page.
		throw new Error(`The CMS answered ${response.status} for ${target}; check the service token.`);
	}
	return response;
}
const read = async <T>(path: string): Promise<T> => (await get(`${url}${path}`)).json();

/** A page's texts. A field the page does not use is null. */
export interface Page {
	id: string;
	title: string;
	description: string;
	eyebrow: string | null;
	body: string | null;
}

/** Categories and their published products, without derived fields; and the pages. */
export const [catalogue, pages] = await Promise.all([
	read<Omit<Category, 'fromPrice'>[]>('/api/catalog'),
	read<Page[]>('/api/pages'),
]);

/**
 * Photos uploaded to the CMS are behind Access, so the build saves a WebP
 * copy of each under /photos/ (src/pages/photos) and the site links to that.
 * Maps each copy's path to its CMS original.
 */
export const photos = new Map<string, string>();
for (const product of catalogue.flatMap((category) => category.products)) {
	product.images = product.images.map((image) => {
		const uuid = image.startsWith(`${url}/api/photos/`) && image.slice(`${url}/api/photos/`.length);
		if (!uuid) return image;
		const copy = `/photos/${uuid}.webp`;
		photos.set(copy, image);
		return copy;
	});
}

/** The texts of the page at /<id> ("inicio" for the home page). */
export function page(id: string): Page {
	const found = pages.find((page) => page.id === id);
	if (!found) throw new Error(`The CMS has no page "${id}".`);
	return found;
}
