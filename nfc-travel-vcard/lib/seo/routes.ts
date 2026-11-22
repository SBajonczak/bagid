/**
 * Registry aller öffentlichen, indexierbaren Seiten.
 *
 * Single Source of Truth für Sitemap, hreflang-Paare, Footer-Linkhub und
 * Related-Links. Jede Route MUSS als page.tsx existieren – das prüft
 * __tests__/seo-routes.test.ts gegen das Dateisystem.
 */

import type { SiteLocale } from './site';

export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface LocalizedRoute {
  /** Stabiler Schlüssel (camelCase) */
  key: string;
  de?: string;
  en?: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

export const homeRoute: LocalizedRoute = {
  key: 'home',
  de: '/de',
  en: '/en',
  priority: 1.0,
  changeFrequency: 'weekly',
};

export const marketingRoutes: LocalizedRoute[] = [
  // Produkt
  { key: 'product', de: '/de/nfc-gepaeckanhaenger', en: '/en/nfc-luggage-tag', priority: 0.9, changeFrequency: 'weekly' },

  // Hauptseiten
  { key: 'howItWorks', de: '/de/so-funktionierts', en: '/en/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'nfcVsQr', de: '/de/nfc-vs-qr', en: '/en/nfc-vs-qr', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'preventLoss', de: '/de/gepaeck-verlust-vermeiden', en: '/en/prevent-luggage-loss', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'securityPrivacy', de: '/de/sicherheit-datenschutz', en: '/en/security-privacy', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'finderFlow', de: '/de/finder-flow', en: '/en/finder-flow', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'help', de: '/de/hilfe', en: '/en/help', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'guides', de: '/de/ratgeber', en: '/en/guides', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'useCases', de: '/de/use-cases', priority: 0.7, changeFrequency: 'monthly' },

  // Use Cases
  { key: 'useCaseFamilies', de: '/de/use-cases/gepaeckanhaenger-fuer-familien', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'useCaseFrequentFlyers', de: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'useCaseKids', de: '/de/use-cases/kofferanhaenger-fuer-kinder', priority: 0.7, changeFrequency: 'monthly' },

  // Ratgeber
  { key: 'guidePreventLoss', de: '/de/ratgeber/gepaeck-verlust-vermeiden', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'guideLostLuggage', de: '/de/ratgeber/koffer-verloren-was-tun', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'guideNfcVsQr', de: '/de/ratgeber/nfc-vs-qr', priority: 0.7, changeFrequency: 'monthly' },

  // Hilfe
  { key: 'helpActivate', de: '/de/hilfe/aktivieren', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'helpAndroidNfc', de: '/de/hilfe/android-nfc-aktivieren', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'helpIphoneNfc', de: '/de/hilfe/iphone-nfc-aktivieren', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'helpChangeData', de: '/de/hilfe/daten-aendern', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'helpFaq', de: '/de/hilfe/faq', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'helpQrFallback', de: '/de/hilfe/qr-code-als-fallback', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'helpTransferTag', de: '/de/hilfe/tag-uebertragen', priority: 0.6, changeFrequency: 'monthly' },
];

export const legalRoutes: LocalizedRoute[] = [
  { key: 'imprint', de: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
];

export const allRoutes: LocalizedRoute[] = [homeRoute, ...marketingRoutes, ...legalRoutes];

/** Alle öffentlich erreichbaren Pfade (beide Sprachen). */
export const publishedPaths: ReadonlySet<string> = new Set(
  allRoutes.flatMap((r) => [r.de, r.en].filter((p): p is string => Boolean(p))),
);

export function isPublishedPath(href: string): boolean {
  const path = href.split('#')[0].split('?')[0];
  return publishedPaths.has(path);
}

export function getRouteByKey(key: string): LocalizedRoute | undefined {
  return allRoutes.find((r) => r.key === key);
}

/** Pfad einer Route in der gewünschten Sprache, mit Fallback auf die jeweils andere Sprache. */
export function localizedPath(key: string, locale: SiteLocale): string | undefined {
  const route = getRouteByKey(key);
  if (!route) return undefined;
  return route[locale] ?? route.de ?? route.en;
}
