import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import DeLayout, { generateMetadata as deMetadata } from '@/app/de/layout';
import EnLayout, { generateMetadata as enMetadata } from '@/app/en/layout';
import { ROOT } from './helpers/fs-routes';

vi.mock('@/lib/get-dictionary', async () => {
  const { messages } = await import('@/lib/i18n');
  return { getDictionary: async (l: 'de' | 'en') => messages[l] };
});

const cases = [
  { locale: 'de', Layout: DeLayout, meta: deMetadata },
  { locale: 'en', Layout: EnLayout, meta: enMetadata },
] as const;

function jsonLdBlocks(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
}

describe.each(cases)('Startseiten-Layout ($locale)', ({ locale, Layout, meta }) => {
  const html = renderToStaticMarkup(<Layout><main>inhalt</main></Layout>);

  it('gibt JSON-LD als echte <script>-Tags im Server-HTML aus', () => {
    const types = jsonLdBlocks(html).map((b) => b['@type']);
    expect(types).toEqual(['WebPage', 'Product', 'BreadcrumbList', 'FAQPage']);
  });

  it('rendert die Kinder weiterhin', () => {
    expect(html).toContain('<main>inhalt</main>');
  });

  it('Metadaten: Canonical, absolute hreflang, kein Verifizierungs-Platzhalter', async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
    const m = await meta();
    expect(m.alternates?.canonical).toBe(`https://bag-tag.de/${locale}`);
    expect(m.alternates?.languages).toEqual({
      de: 'https://bag-tag.de/de',
      en: 'https://bag-tag.de/en',
      'x-default': 'https://bag-tag.de/',
    });
    expect(m.verification).toBeUndefined();
    expect(JSON.stringify(m)).not.toContain('your-google-verification-code');
  });

  it('Verifizierungscode wird aus der Umgebung übernommen', async () => {
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = 'abc123';
    const m = await meta();
    expect(m.verification?.google).toBe('abc123');
    delete process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  });
});

describe('Kein clientseitig injiziertes JSON-LD mehr', () => {
  it('keine next/script-Tags vom Typ application/ld+json in Layouts und Startseiten-Komponenten', () => {
    for (const rel of ['app/layout.tsx', 'app/de/layout.tsx', 'app/en/layout.tsx', 'app/components/StartPageControl.tsx']) {
      const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      expect(src, rel).not.toMatch(/<Script[^>]*application\/ld\+json/);
    }
  });

  it('Root-Layout enthält keine doppelten hreflang-<link>-Tags mehr', () => {
    const src = fs.readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
    expect(src).not.toContain('rel="alternate"');
  });
});
