import { site } from '../data/site';

// The small Markdown the CMS stores page texts in: blank-line paragraphs,
// "## " headings, **bold**, [links](/path), and {whatsapp} and {telefono} for
// the shop's contacts. Anything else is shown as typed, never as HTML.

const tokens: Record<string, string> = { whatsapp: site.whatsapp, telefono: site.phone };

const escape = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(text: string): string {
	return escape(text.replace(/\{(\w+)\}/g, (token, name: string) => tokens[name] ?? token))
		.replace(/\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)\s]*)\)/g, (_, label: string, href: string) =>
			href.startsWith('/')
				? `<a href="${href}">${label}</a>`
				: `<a href="${href}" target="_blank" rel="noopener">${label}</a>`,
		)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Renders a page body to HTML. */
export function markdown(text: string): string {
	return text
		.trim()
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.map((block) => (block.startsWith('## ') ? `<h2>${inline(block.slice(3))}</h2>` : `<p>${inline(block)}</p>`))
		.join('\n');
}
