import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SHOP_CART_URL, SHOP_HERO_URL, SHOP_PRODUCT_URL, shopUrlFor } from '@/lib/seo/site';
import { ROOT, sourceFiles } from './helpers/fs-routes';

const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

describe('Shopify-Links (kreativschicht.de)', () => {
  it('Konstanten entsprechen den produktiven Shop-URLs', () => {
    expect(SHOP_PRODUCT_URL).toBe('https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc');
    expect(SHOP_CART_URL).toBe('https://kreativschicht.de/cart/50710421668182:1');
    expect(SHOP_HERO_URL).toBe(
      'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=bag-tag&utm_medium=hero&utm_campaign=landing',
    );
  });

  it('Hero-CTA verlinkt weiterhin auf den Shop', () => {
    expect(read('app/components/Header.tsx')).toContain(SHOP_HERO_URL);
  });

  it('Navigation behält Produkt-Link (Desktop) und Warenkorb-Link (Mobil)', () => {
    const nav = read('app/components/NavigationBar.tsx');
    expect(nav).toContain(SHOP_HERO_URL);
    expect(nav).toContain(SHOP_CART_URL);
  });

  it('CtaButton und Dashboard verlinken weiterhin auf die Produktseite', () => {
    expect(read('app/components/CtaButton.tsx')).toContain(SHOP_PRODUCT_URL);
    expect(read('app/components/Dashboard.tsx')).toContain(SHOP_PRODUCT_URL);
  });

  it('alle kreativschicht.de-Links im Code zeigen auf Produkt, Warenkorb oder Shop-Startseite', () => {
    const allowed = [
      /^https:\/\/kreativschicht\.de\/products\/bagid-koffer-tag-mit-nfc(\?[^"'`\s]*)?$/,
      /^https:\/\/kreativschicht\.de\/cart\/50710421668182:1$/,
      /^https:\/\/kreativschicht\.de\/?$/,
    ];
    const files = sourceFiles(['app', 'lib']);
    let found = 0;
    for (const f of files) {
      const src = fs.readFileSync(f, 'utf8');
      for (const m of src.matchAll(/https:\/\/kreativschicht\.de[^"'`\s)]*/g)) {
        found++;
        expect(allowed.some((re) => re.test(m[0])), `${path.relative(ROOT, f)}: ${m[0]}`).toBe(true);
      }
    }
    expect(found).toBeGreaterThan(10);
  });

  it('shopUrlFor erzeugt Produktlink mit UTM-Parametern', () => {
    const url = new URL(shopUrlFor('storyline'));
    expect(`${url.origin}${url.pathname}`).toBe(SHOP_PRODUCT_URL);
    expect(url.searchParams.get('utm_source')).toBe('bag-tag');
    expect(url.searchParams.get('utm_medium')).toBe('storyline');
    expect(url.searchParams.get('utm_campaign')).toBe('landing');
  });
});
