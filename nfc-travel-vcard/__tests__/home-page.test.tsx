import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import HomeHero from '@/app/components/home/HomeHero';
import HomeBenefits from '@/app/components/home/HomeBenefits';
import HomeVideo from '@/app/components/home/HomeVideo';
import HomeFinalCta from '@/app/components/home/HomeFinalCta';
import { HomeFaq, HomeReviews, HomeSteps } from '@/app/components/home/HomeDetails';
import { getLandingContent, photos } from '@/lib/content/landing';
import { messages } from '@/lib/i18n';
import { SHOP_HERO_URL, SHOP_PRODUCT_URL } from '@/lib/seo/site';
import { ROOT, pageFileFor } from './helpers/fs-routes';

const locales = ['de', 'en'] as const;
const PUBLIC = path.join(ROOT, 'public');
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

function renderAll(locale: 'de' | 'en') {
  return decode(
    renderToStaticMarkup(
      <>
        <HomeHero locale={locale} />
        <HomeBenefits locale={locale} />
        <HomeVideo locale={locale} />
        <HomeSteps locale={locale} />
        <HomeReviews locale={locale} />
        <HomeFaq locale={locale} />
        <HomeFinalCta locale={locale} />
      </>,
    ),
  );
}

describe.each(locales)('Startseite (%s)', (locale) => {
  const html = renderAll(locale);
  const content = getLandingContent(locale, false);

  it('genau eine H1 mit dem Haupt-Keyword', () => {
    const h1 = html.match(/<h1[^>]*>([^<]*)<\/h1>/g) ?? [];
    expect(h1).toHaveLength(1);
    expect(h1[0]).toMatch(locale === 'de' ? /NFC-Gepäckanhänger/ : /NFC luggage tag/);
  });

  it('Hero-CTA nutzt den bisherigen Shopify-Link inkl. UTM', () => {
    expect(html).toContain(`href="${SHOP_HERO_URL}" target="_blank" rel="noopener noreferrer" class="bt-btn bt-btn--primary" data-testid="hero-shop-cta"`);
  });

  it('Demo-Link bleibt erhalten', () => {
    expect(html).toContain('href="/demo"');
  });

  it('alle Shop-Links zeigen auf die Produktseite und öffnen sicher', () => {
    const links = [...html.matchAll(/<a href="(https:\/\/kreativschicht\.de[^"]*)"([^>]*)>/g)];
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const [, href, attrs] of links) {
      const u = new URL(href);
      expect(`${u.origin}${u.pathname}`).toBe(SHOP_PRODUCT_URL);
      expect(attrs).toContain('rel="noopener noreferrer"');
    }
  });

  it('Nutzen-Sektion zeigt alle Vorteile als H3', () => {
    for (const b of [...content.benefits.screens, ...content.benefits.photos]) {
      expect(html).toContain(`>${b.title}</h3>`);
    }
  });

  it('jedes Bild hat einen Alt-Text und existiert in /public', () => {
    const imgs = [...html.matchAll(/<img ([^>]*)>/g)].map((m) => m[1]);
    expect(imgs.length).toBeGreaterThanOrEqual(7);
    for (const attrs of imgs) {
      const alt = attrs.match(/alt="([^"]*)"/)?.[1];
      expect(alt && alt.length > 10, attrs).toBe(true);
      expect(attrs).toMatch(/width="\d+"/);
      expect(attrs).toMatch(/height="\d+"/);
    }
    const srcs = new Set([...html.matchAll(/url=(%2Fassets[^&"]+)/g)].map((m) => decodeURIComponent(m[1])));
    expect(srcs.size).toBeGreaterThanOrEqual(5);
    for (const src of srcs) expect(fs.existsSync(path.join(PUBLIC, src)), src).toBe(true);
  });

  it('Screenshots sind sprachspezifisch', () => {
    const shots = [...html.matchAll(/screen-[a-z-]+-(de|en)\.webp/g)].map((m) => m[1]);
    expect(shots.length).toBeGreaterThan(0);
    expect(shots.every((l) => l === locale)).toBe(true);
  });

  it('Video lädt erst bei Bedarf und existiert', () => {
    expect(html).toMatch(/<video[^>]*preload="none"/);
    expect(html).not.toMatch(/<video[^>]*autoplay/i);
    expect(fs.existsSync(path.join(PUBLIC, photos.video))).toBe(true);
    expect(fs.statSync(path.join(PUBLIC, photos.video)).size).toBeLessThan(4 * 1024 * 1024);
  });

  it('FAQ als aufklappbare <details> mit allen Fragen im HTML', () => {
    const faq = messages[locale].faq.questions;
    expect((html.match(/<details/g) ?? []).length).toBe(faq.length);
    for (const q of faq) expect(html).toContain(q.answer);
  });

  it('Bewertungen zeigen Name, Quelle und zugängliche Sternebewertung', () => {
    for (const r of messages[locale].noDataSection.testimonials) {
      expect(html).toContain(r.text);
      expect(html).toContain(`${r.name}, via ${r.source}`);
    }
    expect(html).toMatch(/role="img" aria-label="\d (von 5 Sternen|out of 5 stars)"/);
  });

  it('keine Sie-Form im deutschen Ablauf', () => {
    if (locale !== 'de') return;
    const steps = messages.de.noDataSection.howItWorksSteps.map((s) => s.description).join(' ');
    expect(steps).not.toMatch(/\b(Sie|Ihre|Ihren)\b/);
  });

  it('interne Links existieren', () => {
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]).filter((h) => h !== '/demo');
    for (const h of hrefs) expect(pageFileFor(h), h).toBeDefined();
  });
});

describe('Nutzen-Texte passen zur Benachrichtigungs-Funktion', () => {
  it.each(locales)('%s: ohne Flag wird Anrufen versprochen, mit Flag eine Nachricht', (locale) => {
    const off = getLandingContent(locale, false).benefits.screens[0];
    const on = getLandingContent(locale, true).benefits.screens[0];
    expect(off.text).toMatch(locale === 'de' ? /ruft dich an/ : /calling you/);
    expect(on.text).toMatch(locale === 'de' ? /Nachricht/ : /message/);
  });
});

describe('Startseiten-Seiten', () => {
  it('/de und /en sind Server-Komponenten (kein "use client")', () => {
    for (const rel of ['app/de/page.tsx', 'app/en/page.tsx', 'app/components/home/HomePage.tsx']) {
      expect(fs.readFileSync(path.join(ROOT, rel), 'utf8')).not.toContain("'use client'");
    }
  });

  it('Open-Graph-Bild existiert im richtigen Format (1200x630 JPEG)', () => {
    const file = path.join(PUBLIC, photos.og);
    const buf = fs.readFileSync(file);
    expect(buf[0]).toBe(0xff);
    expect(buf[1]).toBe(0xd8);
    // SOF0/SOF2-Marker suchen und Maße lesen
    for (let i = 2; i < buf.length - 9; i++) {
      if (buf[i] === 0xff && (buf[i + 1] === 0xc0 || buf[i + 1] === 0xc2)) {
        expect(buf.readUInt16BE(i + 5)).toBe(630);
        expect(buf.readUInt16BE(i + 7)).toBe(1200);
        return;
      }
    }
    throw new Error('kein SOF-Marker gefunden');
  });
});
