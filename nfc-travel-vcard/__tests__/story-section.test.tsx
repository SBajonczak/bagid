import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import StorySection from '@/app/components/StorySection';
import { storyContent } from '@/lib/content/story';
import { SHOP_PRODUCT_URL } from '@/lib/seo/site';
import { getRouteByKey } from '@/lib/seo/routes';
import { pageFileFor } from './helpers/fs-routes';

const locales = ['de', 'en'] as const;

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

describe.each(locales)('StorySection (%s)', (locale) => {
  const html = decode(renderToStaticMarkup(<StorySection locale={locale} />));
  const c = storyContent[locale];

  it('rendert eine Section mit Anker #story und H2-Titel', () => {
    expect(html).toContain('id="story"');
    expect(html).toContain(`<h2 id="story-title" class="mt-3 text-3xl md:text-4xl font-bold">${c.title}</h2>`);
  });

  it('rendert alle Kapitel als geordnete Liste mit H3', () => {
    const ol = html.slice(html.indexOf('<ol'), html.indexOf('</ol>'));
    expect((ol.match(/<li /g) ?? []).length).toBe(c.chapters.length);
    for (const ch of c.chapters) {
      expect(ol).toContain(`<h3 class="mt-1 text-xl font-bold text-gray-900">${ch.title}</h3>`);
    }
  });

  it('Storyline hat einen roten Faden: mindestens 4 Kapitel, Statistik mit Quelle', () => {
    expect(c.chapters.length).toBeGreaterThanOrEqual(4);
    expect(html).toContain(c.stat.value);
    expect(html).toContain('<cite>');
    expect(html).toContain(c.stat.source);
  });

  it('rendert die Vergleichstabelle semantisch (caption, th scope)', () => {
    expect(html).toContain(`<caption`);
    expect(html).toContain(c.comparisonTitle);
    expect((html.match(/scope="row"/g) ?? []).length).toBe(c.comparison.length);
  });

  it('Shop-CTA zeigt auf die Shopify-Produktseite, öffnet sicher in neuem Tab', () => {
    const m = html.match(/<a href="([^"]+)" target="_blank" rel="noopener noreferrer" data-testid="story-shop-cta"/);
    expect(m).not.toBeNull();
    const url = new URL(m![1]);
    expect(`${url.origin}${url.pathname}`).toBe(SHOP_PRODUCT_URL);
    expect(url.searchParams.get('utm_medium')).toBe('storyline');
  });

  it('alle internen Links zeigen auf existierende Seiten', () => {
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThanOrEqual(c.readMore.length);
    for (const href of hrefs) expect(pageFileFor(href), href).toBeDefined();
  });

  it('alle referenzierten Routen-Keys existieren', () => {
    for (const key of [c.ctaSecondaryRouteKey, ...c.readMore.map((r) => r.routeKey)]) {
      expect(getRouteByKey(key), key).toBeDefined();
    }
  });

  it('EN-Version verlinkt bevorzugt englische Seiten', () => {
    if (locale !== 'en') return;
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.every((h) => h.startsWith('/en'))).toBe(true);
  });
});
