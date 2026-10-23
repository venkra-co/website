// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Absolute URLs for the link preview tags, without the trailing slash the host drops.
	site: 'https://venkra.com',
	// Match the Worker's drop-trailing-slash asset handling.
	trailingSlash: 'never',
	// Inline all CSS so the first paint never waits on a stylesheet request.
	build: { inlineStylesheets: 'always' },
});
