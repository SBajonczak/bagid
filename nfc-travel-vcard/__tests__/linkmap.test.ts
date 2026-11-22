import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { routes, relatedLinksDe, relatedLinksEn, getRelatedLinks } from '@/lib/linkMap';
import { pageFileFor, sourceFiles } from './helpers/fs-routes';

describe('linkMap', () => {
  it('alle Routen zeigen auf existierende Seiten (DE und EN)', () => {
    for (const [key, r] of Object.entries(routes)) {
      expect(pageFileFor(r.de), `${key}.de → ${r.de}`).toBeDefined();
      expect(pageFileFor(r.en), `${key}.en → ${r.en}`).toBeDefined();
    }
  });

  it('alle Related Links zeigen auf existierende Seiten', () => {
    for (const map of [relatedLinksDe, relatedLinksEn]) {
      for (const [key, links] of Object.entries(map)) {
        for (const l of links) expect(pageFileFor(l.href), `${key}: ${l.href}`).toBeDefined();
      }
    }
  });

  it('jeder getRelatedLinks()-Aufruf in den Seiten liefert Links (keine leeren Boxen)', () => {
    const calls: { file: string; key: string; locale: 'de' | 'en' }[] = [];
    for (const file of sourceFiles(['app'])) {
      const src = fs.readFileSync(file, 'utf8');
      for (const m of src.matchAll(/getRelatedLinks\(\s*'([^']+)'\s*,\s*'(de|en)'\s*\)/g)) {
        calls.push({ file, key: m[1], locale: m[2] as 'de' | 'en' });
      }
    }
    expect(calls.length).toBeGreaterThan(0);
    for (const c of calls) {
      expect(getRelatedLinks(c.key, c.locale).length, `${c.file}: '${c.key}'`).toBeGreaterThan(0);
    }
  });

  it('liefert keine doppelten hrefs', () => {
    const links = getRelatedLinks('helpActivate', 'en');
    expect(new Set(links.map((l) => l.href)).size).toBe(links.length);
  });
});
