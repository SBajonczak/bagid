/**
 * Verknüpft jede Unterseite mit einem Moment der Startseiten-Geschichte
 * (und umgekehrt). Daraus entstehen:
 *  - die Zeitleiste "StoryBridge" auf jeder Unterseite (Link zurück zum Kapitel),
 *  - die "Mehr dazu"-Links an den Kapiteln der Startseite,
 *  - echte Bilder/Screenshots auf passenden Unterseiten.
 *
 * Abgesichert durch __tests__/story-links.test.ts.
 */

import type { SiteLocale } from '@/lib/seo/site';

export type ChapterId = 'ankunft' | 'papieranhaenger' | 'scan' | 'nachricht' | 'happy-end';

/** Kapitel-IDs der Startseite je Sprache (siehe lib/content/story.ts) */
export const chapterAnchors: Record<SiteLocale, Record<ChapterId, string>> = {
  de: { ankunft: 'ankunft', papieranhaenger: 'papieranhaenger', scan: 'scan', nachricht: 'nachricht', 'happy-end': 'happy-end' },
  en: { ankunft: 'arrival', papieranhaenger: 'paper-tag', scan: 'scan', nachricht: 'message', 'happy-end': 'happy-end' },
};

export type FigureKey = 'finderContact' | 'finderTrip' | 'editDestination' | 'tagBackpack' | 'nfcScan' | 'finderReads';

export interface PageStoryLink {
  chapter: ChapterId;
  /** Ein Satz: wie diese Seite zum Moment in der Geschichte beiträgt */
  note: string;
  figure?: FigureKey;
}

/** Schlüssel = Pfad der Unterseite */
export const pageStoryLinks: Record<string, PageStoryLink> = {
  // Produkt & Funktion
  '/de/nfc-gepaeckanhaenger': { chapter: 'scan', note: 'Der Anhänger, um den sich alles dreht: Ein Scan genügt, damit der Finder dich erreicht.', figure: 'tagBackpack' },
  '/de/so-funktionierts': { chapter: 'scan', note: 'Hier steht im Detail, was zwischen Scan und Anruf passiert.', figure: 'finderTrip' },
  '/de/finder-flow': { chapter: 'scan', note: 'So erlebt die Person den Moment, die deinen Koffer in der Hand hält.', figure: 'finderContact' },
  '/de/nfc-vs-qr': { chapter: 'scan', note: 'Warum der Scan mit jedem Handy klappt – per NFC oder per Kamera.', figure: 'nfcScan' },
  '/de/sicherheit-datenschutz': { chapter: 'papieranhaenger', note: 'Anders als beim Papieranhänger hängt deine Adresse nicht offen am Koffer.', figure: 'tagBackpack' },
  '/de/gepaeck-verlust-vermeiden': { chapter: 'papieranhaenger', note: 'Damit dein Koffer gar nicht erst ohne lesbare Angaben in Mailand steht.' },
  '/de/use-cases': { chapter: 'happy-end', note: 'Für wen sich das Happy End besonders lohnt.', figure: 'finderReads' },
  '/de/use-cases/gepaeckanhaenger-fuer-familien': { chapter: 'happy-end', note: 'Mit Kindern zählt jeder Koffer, der am selben Abend wieder da ist.' },
  '/de/use-cases/gepaeckanhaenger-fuer-vielflieger': { chapter: 'ankunft', note: 'Wer oft umsteigt, steht öfter am stillen Gepäckband.' },
  '/de/use-cases/kofferanhaenger-fuer-kinder': { chapter: 'nachricht', note: 'Findet jemand den Rucksack deines Kindes, klingelt dein Handy – nicht das des Kindes.' },

  // Ratgeber
  '/de/ratgeber': { chapter: 'ankunft', note: 'Alles, was dir vor und nach dem Moment am Gepäckband hilft.' },
  '/de/ratgeber/koffer-verloren-was-tun': { chapter: 'ankunft', note: 'Der Moment am stillen Gepäckband – und was du jetzt tun solltest.', figure: 'finderReads' },
  '/de/ratgeber/gepaeck-verlust-vermeiden': { chapter: 'papieranhaenger', note: 'So vermeidest du, dass dein Koffer ohne lesbare Angaben unterwegs ist.' },
  '/de/ratgeber/nfc-vs-qr': { chapter: 'scan', note: 'Die Technik hinter dem Scan, ausführlich erklärt.', figure: 'nfcScan' },

  // Hilfe
  '/de/hilfe': { chapter: 'nachricht', note: 'Damit dein Handy im Ernstfall wirklich klingelt, muss dein Tag eingerichtet sein.' },
  '/de/hilfe/aktivieren': { chapter: 'nachricht', note: 'Ohne Aktivierung kein Anruf: Hier richtest du deinen Tag ein.', figure: 'nfcScan' },
  '/de/hilfe/android-nfc-aktivieren': { chapter: 'scan', note: 'Damit der Scan auch mit deinem Android-Handy klappt.', figure: 'nfcScan' },
  '/de/hilfe/iphone-nfc-aktivieren': { chapter: 'scan', note: 'Damit der Scan auch mit deinem iPhone klappt.', figure: 'nfcScan' },
  '/de/hilfe/daten-aendern': { chapter: 'nachricht', note: 'Nur mit aktuellen Angaben erreicht dich der Finder – so änderst du sie.', figure: 'editDestination' },
  '/de/hilfe/faq': { chapter: 'scan', note: 'Antworten rund um Scan, Daten und Datenschutz.' },
  '/de/hilfe/qr-code-als-fallback': { chapter: 'scan', note: 'Kein NFC im Handy? Dann klappt der Scan über die Kamera.', figure: 'nfcScan' },
  '/de/hilfe/tag-uebertragen': { chapter: 'nachricht', note: 'Neuer Besitzer, neue Nummer: So landet der Anruf beim Richtigen.' },

  // Englisch
  '/en/nfc-luggage-tag': { chapter: 'scan', note: 'The tag at the heart of it all: one scan and the finder can reach you.', figure: 'tagBackpack' },
  '/en/how-it-works': { chapter: 'scan', note: 'What happens between the scan and the call, step by step.', figure: 'finderTrip' },
  '/en/finder-flow': { chapter: 'scan', note: 'What it looks like for the person holding your suitcase.', figure: 'finderContact' },
  '/en/nfc-vs-qr': { chapter: 'scan', note: 'Why the scan works with any phone – via NFC or the camera.', figure: 'nfcScan' },
  '/en/security-privacy': { chapter: 'papieranhaenger', note: 'Unlike a paper tag, your address isn’t on display.', figure: 'tagBackpack' },
  '/en/prevent-luggage-loss': { chapter: 'papieranhaenger', note: 'So your bag never ends up somewhere without readable details.' },
  '/en/guides': { chapter: 'ankunft', note: 'Everything that helps before and after the moment at the baggage belt.' },
  '/en/help': { chapter: 'nachricht', note: 'For your phone to ring when it matters, your tag needs to be set up.' },
};

/** Startseite → Unterseite: "Mehr dazu" je Kapitel */
export const chapterMore: Record<SiteLocale, Record<ChapterId, { routeKey: string; label: string }>> = {
  de: {
    ankunft: { routeKey: 'guideLostLuggage', label: 'Koffer verloren – was jetzt zu tun ist' },
    papieranhaenger: { routeKey: 'securityPrivacy', label: 'Warum deine Adresse nicht an den Koffer gehört' },
    scan: { routeKey: 'finderFlow', label: 'So erlebt der Finder den Scan' },
    nachricht: { routeKey: 'helpChangeData', label: 'Kontaktdaten aktuell halten' },
    'happy-end': { routeKey: 'useCases', label: 'Für Familien, Kinder und Vielflieger' },
  },
  en: {
    ankunft: { routeKey: 'preventLoss', label: 'How to prevent luggage loss' },
    papieranhaenger: { routeKey: 'securityPrivacy', label: 'Why your address doesn’t belong on your bag' },
    scan: { routeKey: 'finderFlow', label: 'What the finder experiences' },
    nachricht: { routeKey: 'howItWorks', label: 'How Bag-Tag works' },
    'happy-end': { routeKey: 'product', label: 'The NFC luggage tag in detail' },
  },
};
