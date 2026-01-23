/**
 * Internal Link Map
 * Central mapping of all internal routes and related links for SEO
 */

export type Locale = 'de' | 'en';

/**
 * Route definition interface
 */
export interface Route {
  de: string;
  en: string;
}

/**
 * Link with title interface
 */
export interface Link {
  href: string;
  title: string;
}

/**
 * All internal routes mapped by key
 */
export const routes: Record<string, Route> = {
  // Main pages
  home: { de: '/de', en: '/en' },
  
  // Help section
  help: { de: '/de/hilfe', en: '/en/help' },
  helpActivate: { de: '/de/hilfe/aktivieren', en: '/en/help/activate' },
  helpIphoneNfc: { de: '/de/hilfe/iphone-nfc-aktivieren', en: '/en/help/iphone-nfc-activate' },
  helpAndroidNfc: { de: '/de/hilfe/android-nfc-aktivieren', en: '/en/help/android-nfc-activate' },
  helpQrFallback: { de: '/de/hilfe/qr-code-als-fallback', en: '/en/help/qr-code-fallback' },
  helpChangeData: { de: '/de/hilfe/daten-aendern', en: '/en/help/change-data' },
  helpTransferTag: { de: '/de/hilfe/tag-uebertragen', en: '/en/help/transfer-tag' },
  helpFaq: { de: '/de/hilfe/faq', en: '/en/help/faq' },
  
  // How it works
  howItWorks: { de: '/de/so-funktionierts', en: '/en/how-it-works' },
  finderFlow: { de: '/de/finder-flow', en: '/en/finder-flow' },
  securityPrivacy: { de: '/de/sicherheit-datenschutz', en: '/en/security-privacy' },
  
  // Guides section
  guides: { de: '/de/ratgeber', en: '/en/guides' },
  guideLostLuggage: { de: '/de/ratgeber/koffer-verloren-was-tun', en: '/en/guides/lost-luggage-what-to-do' },
  guidePreventLoss: { de: '/de/ratgeber/gepaeck-verlust-vermeiden', en: '/en/guides/prevent-luggage-loss' },
  guideNfcVsQr: { de: '/de/ratgeber/nfc-vs-qr', en: '/en/guides/nfc-vs-qr' },
  
  // Use cases
  useCases: { de: '/de/use-cases', en: '/en/use-cases' },
  useCaseKids: { de: '/de/use-cases/kofferanhaenger-fuer-kinder', en: '/en/use-cases/luggage-tags-for-kids' },
  useCaseFamilies: { de: '/de/use-cases/gepaeckanhaenger-fuer-familien', en: '/en/use-cases/luggage-tags-for-families' },
  useCaseFrequentFlyers: { de: '/de/use-cases/gepaeckanhaenger-fuer-vielflieger', en: '/en/use-cases/luggage-tags-for-frequent-flyers' },
  
  // Legal
  imprint: { de: '/impressum', en: '/impressum' },
};

/**
 * Get route for a specific locale
 * @param routeKey - Key from routes object
 * @param locale - Target locale
 * @returns Route path
 */
export function getRoute(routeKey: keyof typeof routes, locale: Locale): string {
  return routes[routeKey][locale];
}

/**
 * Related links per page (German)
 */
export const relatedLinksDe: Record<string, Link[]> = {
  // Help pages
  help: [
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.helpFaq.de, title: 'Häufige Fragen' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
    { href: routes.securityPrivacy.de, title: 'Sicherheit & Datenschutz' },
  ],
  helpActivate: [
    { href: routes.helpIphoneNfc.de, title: 'NFC auf iPhone aktivieren' },
    { href: routes.helpAndroidNfc.de, title: 'NFC auf Android aktivieren' },
    { href: routes.helpQrFallback.de, title: 'QR-Code als Fallback' },
    { href: routes.helpChangeData.de, title: 'Daten ändern' },
  ],
  helpIphoneNfc: [
    { href: routes.helpAndroidNfc.de, title: 'NFC auf Android aktivieren' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.helpQrFallback.de, title: 'QR-Code nutzen' },
  ],
  helpAndroidNfc: [
    { href: routes.helpIphoneNfc.de, title: 'NFC auf iPhone aktivieren' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.helpQrFallback.de, title: 'QR-Code nutzen' },
  ],
  helpQrFallback: [
    { href: routes.helpIphoneNfc.de, title: 'NFC auf iPhone aktivieren' },
    { href: routes.helpAndroidNfc.de, title: 'NFC auf Android aktivieren' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
  ],
  helpChangeData: [
    { href: routes.helpTransferTag.de, title: 'Tag übertragen' },
    { href: routes.helpFaq.de, title: 'Häufige Fragen' },
    { href: routes.securityPrivacy.de, title: 'Sicherheit & Datenschutz' },
  ],
  helpTransferTag: [
    { href: routes.helpChangeData.de, title: 'Daten ändern' },
    { href: routes.helpFaq.de, title: 'Häufige Fragen' },
    { href: routes.help.de, title: 'Hilfe-Übersicht' },
  ],
  helpFaq: [
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
    { href: routes.help.de, title: 'Hilfe-Übersicht' },
  ],
  
  // How it works pages
  howItWorks: [
    { href: routes.finderFlow.de, title: 'Finder-Flow' },
    { href: routes.securityPrivacy.de, title: 'Sicherheit & Datenschutz' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.guideLostLuggage.de, title: 'Koffer verloren - was tun?' },
  ],
  finderFlow: [
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
    { href: routes.securityPrivacy.de, title: 'Sicherheit & Datenschutz' },
    { href: routes.helpFaq.de, title: 'Häufige Fragen' },
  ],
  securityPrivacy: [
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
    { href: routes.finderFlow.de, title: 'Finder-Flow' },
    { href: routes.helpFaq.de, title: 'Häufige Fragen' },
  ],
  
  // Guide pages
  guides: [
    { href: routes.guideLostLuggage.de, title: 'Koffer verloren - was tun?' },
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
    { href: routes.guideNfcVsQr.de, title: 'NFC vs. QR-Code' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
  ],
  guideLostLuggage: [
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
    { href: routes.howItWorks.de, title: 'So funktioniert Bag-Tag' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
    { href: routes.useCaseFrequentFlyers.de, title: 'Für Vielflieger' },
  ],
  guidePreventLoss: [
    { href: routes.guideLostLuggage.de, title: 'Koffer verloren - was tun?' },
    { href: routes.howItWorks.de, title: 'So funktioniert Bag-Tag' },
    { href: routes.guideNfcVsQr.de, title: 'NFC vs. QR-Code' },
    { href: routes.useCaseFamilies.de, title: 'Für Familien' },
  ],
  guideNfcVsQr: [
    { href: routes.helpIphoneNfc.de, title: 'NFC auf iPhone aktivieren' },
    { href: routes.helpAndroidNfc.de, title: 'NFC auf Android aktivieren' },
    { href: routes.helpQrFallback.de, title: 'QR-Code als Fallback' },
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
  ],
  
  // Use case pages
  useCases: [
    { href: routes.useCaseKids.de, title: 'Kofferanhänger für Kinder' },
    { href: routes.useCaseFamilies.de, title: 'Gepäckanhänger für Familien' },
    { href: routes.useCaseFrequentFlyers.de, title: 'Gepäckanhänger für Vielflieger' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
  ],
  useCaseKids: [
    { href: routes.useCaseFamilies.de, title: 'Für Familien' },
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
    { href: routes.helpActivate.de, title: 'Tag aktivieren' },
  ],
  useCaseFamilies: [
    { href: routes.useCaseKids.de, title: 'Für Kinder' },
    { href: routes.useCaseFrequentFlyers.de, title: 'Für Vielflieger' },
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
    { href: routes.howItWorks.de, title: 'So funktioniert\'s' },
  ],
  useCaseFrequentFlyers: [
    { href: routes.useCaseFamilies.de, title: 'Für Familien' },
    { href: routes.guideLostLuggage.de, title: 'Koffer verloren - was tun?' },
    { href: routes.guidePreventLoss.de, title: 'Gepäckverlust vermeiden' },
    { href: routes.securityPrivacy.de, title: 'Sicherheit & Datenschutz' },
  ],
};

/**
 * Related links per page (English)
 */
export const relatedLinksEn: Record<string, Link[]> = {
  // Help pages
  help: [
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.helpFaq.en, title: 'Frequently Asked Questions' },
    { href: routes.howItWorks.en, title: 'How It Works' },
    { href: routes.securityPrivacy.en, title: 'Security & Privacy' },
  ],
  helpActivate: [
    { href: routes.helpIphoneNfc.en, title: 'Activate NFC on iPhone' },
    { href: routes.helpAndroidNfc.en, title: 'Activate NFC on Android' },
    { href: routes.helpQrFallback.en, title: 'QR Code Fallback' },
    { href: routes.helpChangeData.en, title: 'Change Data' },
  ],
  helpIphoneNfc: [
    { href: routes.helpAndroidNfc.en, title: 'Activate NFC on Android' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.helpQrFallback.en, title: 'Use QR Code' },
  ],
  helpAndroidNfc: [
    { href: routes.helpIphoneNfc.en, title: 'Activate NFC on iPhone' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.helpQrFallback.en, title: 'Use QR Code' },
  ],
  helpQrFallback: [
    { href: routes.helpIphoneNfc.en, title: 'Activate NFC on iPhone' },
    { href: routes.helpAndroidNfc.en, title: 'Activate NFC on Android' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
  ],
  helpChangeData: [
    { href: routes.helpTransferTag.en, title: 'Transfer Tag' },
    { href: routes.helpFaq.en, title: 'FAQ' },
    { href: routes.securityPrivacy.en, title: 'Security & Privacy' },
  ],
  helpTransferTag: [
    { href: routes.helpChangeData.en, title: 'Change Data' },
    { href: routes.helpFaq.en, title: 'FAQ' },
    { href: routes.help.en, title: 'Help Overview' },
  ],
  helpFaq: [
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.howItWorks.en, title: 'How It Works' },
    { href: routes.help.en, title: 'Help Overview' },
  ],
  
  // How it works pages
  howItWorks: [
    { href: routes.finderFlow.en, title: 'Finder Flow' },
    { href: routes.securityPrivacy.en, title: 'Security & Privacy' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.guideLostLuggage.en, title: 'Lost Luggage - What to Do?' },
  ],
  finderFlow: [
    { href: routes.howItWorks.en, title: 'How It Works' },
    { href: routes.securityPrivacy.en, title: 'Security & Privacy' },
    { href: routes.helpFaq.en, title: 'FAQ' },
  ],
  securityPrivacy: [
    { href: routes.howItWorks.en, title: 'How It Works' },
    { href: routes.finderFlow.en, title: 'Finder Flow' },
    { href: routes.helpFaq.en, title: 'FAQ' },
  ],
  
  // Guide pages
  guides: [
    { href: routes.guideLostLuggage.en, title: 'Lost Luggage - What to Do?' },
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
    { href: routes.guideNfcVsQr.en, title: 'NFC vs. QR Code' },
    { href: routes.howItWorks.en, title: 'How It Works' },
  ],
  guideLostLuggage: [
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
    { href: routes.howItWorks.en, title: 'How Bag-Tag Works' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
    { href: routes.useCaseFrequentFlyers.en, title: 'For Frequent Flyers' },
  ],
  guidePreventLoss: [
    { href: routes.guideLostLuggage.en, title: 'Lost Luggage - What to Do?' },
    { href: routes.howItWorks.en, title: 'How Bag-Tag Works' },
    { href: routes.guideNfcVsQr.en, title: 'NFC vs. QR Code' },
    { href: routes.useCaseFamilies.en, title: 'For Families' },
  ],
  guideNfcVsQr: [
    { href: routes.helpIphoneNfc.en, title: 'Activate NFC on iPhone' },
    { href: routes.helpAndroidNfc.en, title: 'Activate NFC on Android' },
    { href: routes.helpQrFallback.en, title: 'QR Code Fallback' },
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
  ],
  
  // Use case pages
  useCases: [
    { href: routes.useCaseKids.en, title: 'Luggage Tags for Kids' },
    { href: routes.useCaseFamilies.en, title: 'Luggage Tags for Families' },
    { href: routes.useCaseFrequentFlyers.en, title: 'Luggage Tags for Frequent Flyers' },
    { href: routes.howItWorks.en, title: 'How It Works' },
  ],
  useCaseKids: [
    { href: routes.useCaseFamilies.en, title: 'For Families' },
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
    { href: routes.howItWorks.en, title: 'How It Works' },
    { href: routes.helpActivate.en, title: 'Activate Tag' },
  ],
  useCaseFamilies: [
    { href: routes.useCaseKids.en, title: 'For Kids' },
    { href: routes.useCaseFrequentFlyers.en, title: 'For Frequent Flyers' },
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
    { href: routes.howItWorks.en, title: 'How It Works' },
  ],
  useCaseFrequentFlyers: [
    { href: routes.useCaseFamilies.en, title: 'For Families' },
    { href: routes.guideLostLuggage.en, title: 'Lost Luggage - What to Do?' },
    { href: routes.guidePreventLoss.en, title: 'Prevent Luggage Loss' },
    { href: routes.securityPrivacy.en, title: 'Security & Privacy' },
  ],
};

/**
 * Get related links for a specific page and locale
 * @param pageKey - Key identifying the page
 * @param locale - Target locale
 * @returns Array of related links
 */
export function getRelatedLinks(pageKey: string, locale: Locale): Link[] {
  const links = locale === 'de' ? relatedLinksDe[pageKey] : relatedLinksEn[pageKey];
  return links || [];
}
