import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import StoryBridge from '@/app/components/content/StoryBridge';
import ContentFigure, { figureMedia } from '@/app/components/content/ContentFigure';
import { CtaSection, Breadcrumb, StepSection, resolveCtaHref } from '@/app/components/ContentComponents';
import { chapterAnchors, chapterMore, pageStoryLinks, type FigureKey } from '@/lib/content/story-links';
import { storyContent } from '@/lib/content/story';
import { localizedPath, marketingRoutes } from '@/lib/seo/routes';
import { SHOP_PRODUCT_URL } from '@/lib/seo/site';
import { languageFromPath } from '@/app/components/LanguageProvider';
import { ROOT, marketingPagePaths, pageFileFor } from './helpers/fs-routes';

const pages = marketingPagePaths();
const read = (p: string) => fs.readFileSync(pageFileFor(p)!, 'utf8');
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

describe('Story-Verknüpfung Unterseiten ↔ Startseite', () => {
  it('jede Marketing-Seite hat einen Story-Moment', () => {
    for (const p of pages) expect(pageStoryLinks[p], `${p} fehlt in lib/content/story-links.ts`).toBeDefined();
  });

  it('keine verwaisten Einträge (nur existierende Seiten)', () => {
    for (const p of Object.keys(pageStoryLinks)) expect(pageFileFor(p), p).toBeDefined();
  });

  it('jede Seite bindet StoryBridge mit ihrem eigenen Pfad ein', () => {
    for (const p of pages) {
      const src = read(p);
      expect(src, p).toContain(`<StoryBridge path="${p}" />`);
      expect(src, p).toContain(`<ContentFigure path="${p}" />`);
    }
  });

  it('Kapitel-Anker existieren auf der Startseite (DE/EN)', () => {
    for (const locale of ['de', 'en'] as const) {
      const ids = storyContent[locale].chapters.map((c) => c.id);
      for (const anchor of Object.values(chapterAnchors[locale])) expect(ids, anchor).toContain(anchor);
    }
  });

  it('"Mehr dazu"-Links der Startseite zeigen auf existierende Seiten derselben Sprache', () => {
    for (const locale of ['de', 'en'] as const) {
      for (const { routeKey } of Object.values(chapterMore[locale])) {
        const href = localizedPath(routeKey, locale)!;
        expect(pageFileFor(href), href).toBeDefined();
        expect(href.startsWith(`/${locale}`), href).toBe(true);
      }
    }
  });

  it.each(['/de/finder-flow', '/en/how-it-works'])('StoryBridge %s: 5 Zeitpunkte, aktiver Moment, Links zur Startseite', (p) => {
    const html = decode(renderToStaticMarkup(<StoryBridge path={p} notifyEnabled={false} />));
    const locale = p.slice(1, 3);
    expect((html.match(/<li/g) ?? []).length).toBe(5);
    expect((html.match(/class="is-active"/g) ?? []).length).toBe(1);
    expect(html).toContain('aria-current="step"');
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs.every((h) => h.startsWith(`/${locale}#story-`))).toBe(true);
    expect(html).toContain(pageStoryLinks[p].note);
  });

  it('Bilder der Unterseiten existieren und haben Alt-Texte', () => {
    for (const [p, link] of Object.entries(pageStoryLinks)) {
      if (!link.figure) continue;
      const { media } = figureMedia(link.figure as FigureKey, p.startsWith('/en') ? 'en' : 'de');
      expect(fs.existsSync(path.join(ROOT, 'public', media.src)), media.src).toBe(true);
      expect(media.alt.length).toBeGreaterThan(10);
      const html = renderToStaticMarkup(<ContentFigure path={p} />);
      expect(html).toContain('<figcaption>');
    }
  });
});

describe('Aufgeräumtes Markup der Unterseiten', () => {
  const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{2604}\u{2607}-\u{26FF}\u{2B50}\u{2B55}\u{231A}\u{231B}]/u;

  // ★/☆ bleiben erlaubt: sie stehen für Bewertungen in Vergleichstabellen
  it('keine Emojis mehr in Texten', () => {
    for (const p of pages) expect(read(p).match(emoji)?.[0], p).toBeUndefined();
  });

  it('kein eigenes <main> (kommt aus dem Layout, sonst verschachtelt)', () => {
    for (const p of pages) expect(read(p), p).not.toMatch(/<main[\s>]/);
  });

  it('keine toten Links auf bag-tag.de/de#shop oder /en/contact', () => {
    for (const p of pages) {
      expect(read(p), p).not.toContain('bag-tag.de/de#shop');
      expect(read(p), p).not.toContain('"/en/contact"');
    }
  });

  it('Layout nutzt das Design-System der Startseite', () => {
    const layout = fs.readFileSync(path.join(ROOT, 'app/(marketing)/layout.tsx'), 'utf8');
    expect(layout).not.toContain("'use client'");
    expect(layout).toContain('bt-content');
    expect(layout).toContain('content.css');
    expect(layout).toContain('home.css');
  });

  it('alle Marketing-Routen der Registry sind abgedeckt', () => {
    for (const r of marketingRoutes) {
      for (const p of [r.de, r.en].filter(Boolean) as string[]) expect(pageStoryLinks[p], p).toBeDefined();
    }
  });
});

describe('ContentComponents', () => {
  it('CTA: alte Platzhalter führen in den Shop bzw. zur Hilfe', () => {
    expect(resolveCtaHref('https://bag-tag.de/de#shop')).toBe(SHOP_PRODUCT_URL);
    expect(resolveCtaHref(undefined)).toBe(SHOP_PRODUCT_URL);
    expect(resolveCtaHref('/en/contact')).toBe('/en/help');
    expect(resolveCtaHref('/en/nfc-luggage-tag')).toBe('/en/nfc-luggage-tag');
  });

  it('CTA: externe Links öffnen sicher in neuem Tab, interne nicht', () => {
    const ext = renderToStaticMarkup(<CtaSection title="T" primaryText="Kaufen" primaryHref={SHOP_PRODUCT_URL} />);
    expect(ext).toContain(`href="${SHOP_PRODUCT_URL}" target="_blank" rel="noopener noreferrer"`);
    const int = renderToStaticMarkup(<CtaSection title="T" buttonText="Shop" buttonLink="/en/nfc-luggage-tag" />);
    expect(int).toContain('href="/en/nfc-luggage-tag"');
    expect(int).not.toContain('target="_blank"');
  });

  it('Breadcrumb: letzter Eintrag ist aktuelle Seite, ohne Link', () => {
    const html = renderToStaticMarkup(<Breadcrumb items={[{ name: 'Home', href: '/de' }, { name: 'Hilfe', href: '/de/hilfe' }]} />);
    expect(html).toContain('<a href="/de">Home</a>');
    expect(html).toContain('<span aria-current="page">Hilfe</span>');
  });

  it('StepSection: geordnete Liste mit H3', () => {
    const html = renderToStaticMarkup(<StepSection steps={[{ title: 'A', description: 'a' }, { title: 'B', description: 'b' }]} />);
    expect(html).toMatch(/^<ol class="bt-stepsx">/);
    expect((html.match(/<h3>/g) ?? []).length).toBe(2);
  });
});

describe('Sprache aus der URL', () => {
  it('erkennt /de und /en, sonst undefined', () => {
    expect(languageFromPath('/de')).toBe('de');
    expect(languageFromPath('/en/how-it-works')).toBe('en');
    expect(languageFromPath('/demo')).toBeUndefined();
    expect(languageFromPath('/dexyz')).toBeUndefined();
    expect(languageFromPath(null)).toBeUndefined();
  });
});
