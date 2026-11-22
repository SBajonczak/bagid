import { describe, it, expect } from 'vitest';
import {
  buildFaqSchema,
  buildHomeJsonLd,
  buildProductSchema,
  buildVideoSchema,
  getVisibleFaq,
  getVisibleTestimonials,
} from '@/lib/seo/structured-data';
import { serializeJsonLd } from '@/app/components/JsonLd';
import { PRODUCT } from '@/lib/seo/site';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, pageFileFor } from './helpers/fs-routes';

const locales = ['de', 'en'] as const;

describe.each(locales)('Structured Data (%s)', (locale) => {
  const product = buildProductSchema(locale) as any;

  it('Product hat Pflichtfelder für Rich Results', () => {
    expect(product['@type']).toBe('Product');
    expect(product.name).toBeTruthy();
    expect(product.image.length).toBeGreaterThan(0);
    expect(product.offers.price).toBe(PRODUCT.price);
    expect(product.offers.priceCurrency).toBe('EUR');
    expect(product.offers.availability).toBe('https://schema.org/InStock');
  });

  it('Angebots-URL zeigt auf eine existierende Seite', () => {
    const path = new URL(product.offers.url).pathname;
    expect(pageFileFor(path)).toBeDefined();
  });

  it('Bewertungen entsprechen exakt den sichtbaren Testimonials', () => {
    const visible = getVisibleTestimonials(locale);
    expect(product.review).toHaveLength(visible.length);
    product.review.forEach((r: any, i: number) => {
      expect(r.author.name).toBe(visible[i].name);
      expect(r.reviewBody).toBe(visible[i].text);
      expect(r.reviewRating.ratingValue).toBe(visible[i].rating);
    });
  });

  it('aggregateRating wird aus den sichtbaren Bewertungen berechnet', () => {
    const visible = getVisibleTestimonials(locale);
    const avg = visible.reduce((a, t) => a + t.rating, 0) / visible.length;
    expect(product.aggregateRating.reviewCount).toBe(visible.length);
    expect(Number(product.aggregateRating.ratingValue)).toBeCloseTo(avg, 1);
  });

  it('FAQ-Schema entspricht exakt den sichtbaren FAQ-Einträgen', () => {
    const faq = buildFaqSchema(locale) as any;
    const visible = getVisibleFaq(locale);
    expect(faq.mainEntity).toHaveLength(visible.length);
    expect(faq.mainEntity.map((q: any) => q.name)).toEqual(visible.map((v) => v.question));
    expect(faq.mainEntity.map((q: any) => q.acceptedAnswer.text)).toEqual(visible.map((v) => v.answer));
  });

  it('FAQ ist auf 10 Fragen erweitert', () => {
    expect(getVisibleFaq(locale).length).toBe(10);
  });

  it('Startseite liefert WebPage, Product, Video, Breadcrumb, FAQ – ohne Duplikate', () => {
    const types = buildHomeJsonLd(locale).map((s) => s['@type']);
    expect(types).toEqual(['WebPage', 'Product', 'VideoObject', 'BreadcrumbList', 'FAQPage']);
  });

  it('Produktbilder sind echte Fotos und existieren', () => {
    expect(Array.isArray(product.image)).toBe(true);
    for (const url of product.image as string[]) {
      const p = new URL(url).pathname;
      expect(fs.existsSync(path.join(ROOT, 'public', p)), p).toBe(true);
    }
  });

  it('VideoObject hat Pflichtfelder und zeigt auf existierende Dateien', () => {
    const video = buildVideoSchema(locale) as any;
    for (const key of ['name', 'description', 'thumbnailUrl', 'uploadDate', 'contentUrl']) {
      expect(video[key], key).toBeTruthy();
    }
    expect(new Date(video.uploadDate).toString()).not.toBe('Invalid Date');
    for (const url of [video.contentUrl, ...video.thumbnailUrl]) {
      expect(fs.existsSync(path.join(ROOT, 'public', new URL(url).pathname)), url).toBe(true);
    }
  });

  it('WebPage verweist per @id auf das Produkt', () => {
    const [webPage] = buildHomeJsonLd(locale) as any[];
    expect(webPage.about['@id']).toBe(product['@id']);
    expect(webPage.inLanguage).toBe(locale);
  });
});

describe('serializeJsonLd', () => {
  it('escaped "<", damit </script> das Tag nicht schließen kann', () => {
    const out = serializeJsonLd({ text: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('</script>');
    expect(JSON.parse(out).text).toBe('</script><script>alert(1)</script>');
  });
});
