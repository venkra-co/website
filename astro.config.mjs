// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Match the Worker's drop-trailing-slash asset handling.
	trailingSlash: 'never',
});
