import { describe, it, expect } from 'vitest';
import { allRoutes, marketingRoutes, isPublishedPath, localizedPath, publishedPaths } from '@/lib/seo/routes';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/seo/site';
import { marketingPagePaths, pageFileFor } from './helpers/fs-routes';

describe('Routen-Registry', () => {
  it('jede registrierte Route existiert als page.tsx', () => {
    for (const route of allRoutes) {
      for (const p of [route.de, route.en].filter(Boolean) as string[]) {
        expect(pageFileFor(p), `fehlende Seite für ${p}`).toBeDefined();
      }
    }
  });

  it('jede Marketing-Seite im Dateisystem ist registriert (nichts fehlt in Sitemap)', () => {
    const registered = new Set(marketingRoutes.flatMap((r) => [r.de, r.en].filter(Boolean)));
    for (const p of marketingPagePaths()) {
      expect(registered.has(p), `${p} fehlt in lib/seo/routes.ts`).toBe(true);
    }
  });

  it('Keys und Pfade sind eindeutig', () => {
    const keys = allRoutes.map((r) => r.key);
    expect(new Set(keys).size).toBe(keys.length);
    const paths = allRoutes.flatMap((r) => [r.de, r.en].filter(Boolean));
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('Pfade haben die richtige Sprach-Präfix', () => {
    for (const r of marketingRoutes) {
      if (r.de) expect(r.de.startsWith('/de')).toBe(true);
      if (r.en) expect(r.en.startsWith('/en')).toBe(true);
    }
  });

  it('isPublishedPath ignoriert Anker und Query', () => {
    expect(isPublishedPath('/de#faq')).toBe(true);
    expect(isPublishedPath('/de/hilfe?x=1')).toBe(true);
    expect(isPublishedPath('/en/use-cases')).toBe(false);
  });

  it('localizedPath fällt auf DE zurück, wenn keine EN-Seite existiert', () => {
    expect(localizedPath('useCases', 'en')).toBe('/de/use-cases');
    expect(localizedPath('howItWorks', 'en')).toBe('/en/how-it-works');
  });
});

describe('Sitemap', () => {
  const entries = sitemap();

  it('enthält nur existierende Seiten (keine 404)', () => {
    for (const e of entries) {
      expect(e.url.startsWith(SITE_URL)).toBe(true);
      const p = e.url.slice(SITE_URL.length);
      expect(pageFileFor(p), `Sitemap-URL ohne Seite: ${e.url}`).toBeDefined();
    }
  });

  it('enthält keine Weiterleitungs-URL "/"', () => {
    expect(entries.find((e) => e.url === SITE_URL || e.url === `${SITE_URL}/`)).toBeUndefined();
  });

  it('enthält beide Startseiten und alle registrierten Pfade', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/de`);
    expect(urls).toContain(`${SITE_URL}/en`);
    expect(urls.length).toBe(publishedPaths.size);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('hreflang-Alternates sind gegenseitig und zeigen auf existierende Seiten', () => {
    for (const e of entries) {
      const langs = e.alternates?.languages as Record<string, string> | undefined;
      if (!langs) continue;
      expect(Object.values(langs)).toContain(e.url);
      for (const url of Object.values(langs)) {
        expect(pageFileFor(url.slice(SITE_URL.length))).toBeDefined();
        const partner = entries.find((x) => x.url === url);
        expect(partner, `Alternate ${url} fehlt in der Sitemap`).toBeDefined();
      }
    }
  });

  it('Prioritäten liegen zwischen 0 und 1', () => {
    for (const e of entries) {
      expect(e.priority).toBeGreaterThan(0);
      expect(e.priority).toBeLessThanOrEqual(1);
    }
  });
});
