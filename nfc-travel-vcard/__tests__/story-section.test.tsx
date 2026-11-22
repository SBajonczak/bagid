import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import StorySection from '@/app/components/StorySection';
import { getStoryContent, storyContent } from '@/lib/content/story';
import { SHOP_PRODUCT_URL } from '@/lib/seo/site';
import { getRouteByKey } from '@/lib/seo/routes';
import { pageFileFor } from './helpers/fs-routes';

const locales = ['de', 'en'] as const;

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

describe.each(locales)('StorySection (%s)', (locale) => {
  const html = decode(renderToStaticMarkup(<StorySection locale={locale} notifyEnabled={false} />));
  const c = storyContent[locale];

  it('rendert eine Section mit Anker #story und H2-Titel', () => {
    expect(html).toContain('id="story"');
    expect(html).toMatch(/<h2 id="story-title"[^>]*>/);
    expect(html).toContain(`>${c.title}</h2>`);
  });

  it('rendert alle Kapitel als geordnete Liste mit Uhrzeit und H3', () => {
    const ol = html.slice(html.indexOf('<ol'), html.indexOf('</ol>'));
    expect((ol.match(/<li /g) ?? []).length).toBe(c.chapters.length);
    for (const ch of c.chapters) {
      expect(ol).toContain(`<time class="bt-time__clock">${ch.time}</time>`);
      expect(ol).toContain(`>${ch.title}</h3>`);
    }
  });

  it('Kapitel haben eindeutige Uhrzeiten (echte Abfolge)', () => {
    expect(c.chapters.length).toBeGreaterThanOrEqual(4);
    expect(new Set(c.chapters.map((ch) => ch.time)).size).toBe(c.chapters.length);
  });

  it('nennt die Statistik mit Quelle', () => {
    expect(html).toContain('<cite>');
    expect(html).toContain(c.stat.source);
    expect(html).toContain(c.stat.value);
  });

  it('Vergleichstabelle: caption, Zeilenköpfe, mobile Labels', () => {
    expect(html).toContain(`<caption>${c.comparisonTitle}</caption>`);
    expect((html.match(/scope="row"/g) ?? []).length).toBe(c.comparison.length);
    expect((html.match(/data-label="/g) ?? []).length).toBe(c.comparison.length * 2);
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

  it('EN-Version verlinkt nur englische Seiten', () => {
    if (locale !== 'en') return;
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.every((h) => h.startsWith('/en'))).toBe(true);
  });
});

describe('Story passt sich der Benachrichtigungs-Funktion an', () => {
  it.each(locales)('%s: ohne Flag klingelt das Handy, mit Flag kommt eine Nachricht', (locale) => {
    const off = getStoryContent(locale, false).chapters[3];
    const on = getStoryContent(locale, true).chapters[3];
    expect(off.title).toBe(storyContent[locale].chapters[3].title);
    expect(on.title).not.toBe(off.title);
    expect(on.time).toBe(off.time);
  });
});
