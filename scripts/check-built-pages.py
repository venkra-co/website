"""Check the built site: SEO tags, link preview cards, structured data, local
links and fragments, and that the sitemap and Merchant Center feed match the pages.
Run after bun run build: bun run check:pages
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'dist'
ORIGIN = 'venkra.com'


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.links = path, set(), []
        self.meta, self.jsonld, self.script = {}, [], None
        self.h1, self.canonical = 0, None
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'{self.path}: duplicate ID {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'meta':
            self.meta[attrs.get('property', attrs.get('name'))] = attrs.get('content')
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.script = ''
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')

    def handle_data(self, data):
        if self.script is not None:
            self.script += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.jsonld.append(json.loads(self.script))
            self.script = None


# Routes have no trailing slash (trailingSlash: 'never'); the 404 page is not a route.
route_of = lambda file: '/' + file.parent.relative_to(ROOT).as_posix().removeprefix('.')
pages = {route_of(file): Page(file) for file in ROOT.rglob('index.html')}
short_links = {line.split()[0] for line in (ROOT / '_redirects').read_text().splitlines() if line.startswith('/')}

for route, page in pages.items():
    assert page.h1 == 1, f'{route}: expected one h1, got {page.h1}'
    assert page.meta.get('description'), f'{route}: missing description'
    assert page.canonical and urlsplit(page.canonical).path == route, f'{route}: wrong canonical {page.canonical}'
    assert page.meta.get('og:url') == page.canonical, f'{route}: og:url differs from canonical'
    image = urlsplit(page.meta.get('og:image', ''))
    assert image.scheme == 'https', f'{route}: link preview card must be absolute HTTPS'
    assert (ROOT / image.path.lstrip('/')).is_file(), f'{route}: missing link preview card {image.path}'
    for href in page.links:
        assert href and href != '#', f'{route}: empty or placeholder link'
        url = urlsplit(urljoin(f'https://{ORIGIN}{route}', href))
        if url.netloc != ORIGIN:
            continue
        path = unquote(url.path)
        target = pages.get(path)
        if target is None:
            assert path in short_links or (ROOT / path.lstrip('/')).is_file(), f'{route}: broken link {href}'
        elif url.fragment:
            assert unquote(url.fragment) in target.ids, f'{route}: missing fragment {href}'
    for block in page.jsonld:
        for node in block.get('@graph', [block]):
            if node.get('@type') == 'Product':
                assert node['offers']['url'] == page.canonical, f'{route}: Product offer URL differs from canonical'
            if node.get('@type') == 'BreadcrumbList':
                assert node['itemListElement'][-1]['item'] == page.canonical, f'{route}: last breadcrumb is not the page'

sitemap = {urlsplit(node.text).path for node in ET.parse(ROOT / 'sitemap.xml').findall('{*}url/{*}loc')}
assert sitemap == set(pages), f'Sitemap mismatch: {sitemap ^ set(pages)}'
feed = {urlsplit(node.text).path for node in ET.parse(ROOT / 'feeds/google.xml').iter('{http://base.google.com/ns/1.0}link')}
assert feed and feed <= set(pages), f'Feed links to missing pages: {feed - set(pages)}'
print(f'PASS: {len(pages)} pages; SEO tags, cards, structured data, links, fragments, sitemap and feed')
