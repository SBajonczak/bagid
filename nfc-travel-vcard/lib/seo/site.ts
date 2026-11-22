/**
 * Zentrale SEO-/Shop-Konstanten.
 *
 * WICHTIG: Die Shopify-URLs sind die produktiven Kauf-Links (kreativschicht.de).
 * Sie werden durch Tests abgesichert (__tests__/shop-links.test.ts) – bitte nur
 * bewusst ändern.
 */

export type SiteLocale = 'de' | 'en';

export const SITE_URL = 'https://bag-tag.de';
export const SITE_NAME = 'Bag-Tag';

/** Produktseite im Shopify-Shop (ohne Tracking-Parameter). */
export const SHOP_PRODUCT_URL = 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc';

/** Direkt-in-den-Warenkorb-Link (Variante 50710421668182, Menge 1). */
export const SHOP_CART_URL = 'https://kreativschicht.de/cart/50710421668182:1';

/** Bestehender Hero-/Navigations-Link inkl. UTM (unverändert übernommen). */
export const SHOP_HERO_URL = `${SHOP_PRODUCT_URL}?utm_source=bag-tag&utm_medium=hero&utm_campaign=landing`;

/** Shop-Link mit UTM-Kennung, damit Klicks aus einzelnen Sektionen messbar sind. */
export function shopUrlFor(medium: string, campaign = 'landing'): string {
  const params = new URLSearchParams({ utm_source: 'bag-tag', utm_medium: medium, utm_campaign: campaign });
  return `${SHOP_PRODUCT_URL}?${params.toString()}`;
}

export const PRODUCT = {
  sku: 'BAG-TAG-NFC-001',
  price: '10.99',
  priceCurrency: 'EUR',
  priceValidUntil: '2027-12-31',
  shippingRate: '3.99',
  image: `${SITE_URL}/assets/productimage.webp`,
  sellerName: 'Kreativschicht.de',
  sellerUrl: 'https://kreativschicht.de',
} as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
