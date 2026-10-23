import type { Category } from './categories';

// The catalogue as the CMS serves it, fetched once per build. The CMS sits
// behind Cloudflare Access, so the build signs in with a service token.
const url = import.meta.env.CMS_URL ?? 'https://website-cms.venkra.workers.dev';
const id = import.meta.env.CMS_CLIENT_ID;
const secret = import.meta.env.CMS_CLIENT_SECRET;
if (!id || !secret) {
	throw new Error('Set CMS_CLIENT_ID and CMS_CLIENT_SECRET (in .env locally) to read the catalogue from the CMS.');
}

const response = await fetch(`${url}/api/catalog`, {
	headers: { 'CF-Access-Client-Id': id, 'CF-Access-Client-Secret': secret },
	redirect: 'manual',
});
if (!response.ok) {
	// Access answers a rejected token with a redirect to its login page.
	throw new Error(`The CMS answered ${response.status} for ${url}/api/catalog; check the service token.`);
}

/** Categories and their published products, without derived fields. */
export const catalogue: Omit<Category, 'fromPrice'>[] = await response.json();
