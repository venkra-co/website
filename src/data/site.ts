// Contact and social links, from the old site's socialLinks.js, and the site's
// own pages and copy, shared by the header and the footer.
const tagline = 'Faith is necessary for victory';

export const site = {
	whatsapp: 'https://wa.me/message/QOKZX3EJBF7UD1',
	instagram: 'https://www.instagram.com/venkra.co/',
	facebook: 'https://www.facebook.com/Venkra.co/',
	messenger: 'https://m.me/Venkra.co',
	phone: '+57 304 6050080',
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
