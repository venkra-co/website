import { settings } from './cms';

// The shop's contacts, set in the CMS's Configuración (an empty one is not
// shown), and the site's own pages and copy, shared by the header and the footer.
const tagline = 'Faith is necessary for victory';

export const site = {
	whatsapp: settings.whatsapp,
	phone: settings.phone,
	email: settings.email,
	instagram: settings.instagram,
	facebook: settings.facebook,
	messenger: settings.messenger,
	tagline,
	description: `Camisetas oversized y gorras hechas a mano. ${tagline}.`,
	/** The stamp printed on the shirts. */
	stamp: 'Urban denim · Handcrafted · Original',
	credit: { label: 'Sitio por @juanrcifuentes', href: 'https://profile.juanrcifuentes.com' },
	links: [
		{ label: 'Catálogo', href: '/catalogo' },
		{ label: 'Nosotros', href: '/nosotros' },
	],
	support: [
		{ label: 'Contacto', href: '/contacto' },
		{ label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
		{ label: 'Cambios y devoluciones', href: '/cambios-y-devoluciones' },
		{ label: 'Privacidad', href: '/privacidad' },
		{ label: 'Términos', href: '/terminos' },
	],
} as const;
