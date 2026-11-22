/**
 * Storyline der Startseite: Problem → Moment → Wendepunkt → Happy End → CTA.
 *
 * Inhaltliche Leitplanken:
 * - Nur Funktionen beschreiben, die es im Produkt wirklich gibt
 *   (NFC + QR, keine App, freigegebene Kontaktdaten, Nachricht inkl. Standort
 *   an den Besitzer über das Benachrichtigungsformular).
 * - Zahlen nur mit Quelle.
 */

import type { SiteLocale } from '@/lib/seo/site';

export interface StoryChapter {
  id: string;
  /** Uhrzeit im Ablauf (echte Reihenfolge, daher als Zeitstempel statt Nummer) */
  time: string;
  label: string;
  title: string;
  text: string;
}

export interface StoryComparisonRow {
  aspect: string;
  paper: string;
  bagTag: string;
}

export interface StoryContent {
  eyebrow: string;
  title: string;
  intro: string;
  stat: { value: string; label: string; source: string; sourceUrl: string };
  chapters: StoryChapter[];
  comparisonTitle: string;
  comparisonHead: { aspect: string; paper: string; bagTag: string };
  comparison: StoryComparisonRow[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryRouteKey: string;
  readMoreTitle: string;
  readMore: { routeKey: string; label: string }[];
}

const SITA_SOURCE_URL = 'https://www.sita.aero/';

const notifyVariant: Record<SiteLocale, Pick<StoryChapter, 'title' | 'text'>> = {
  de: {
    title: 'Du bekommst eine Nachricht',
    text: 'Mit einem Tipp schickt sie dir eine Nachricht, auf Wunsch mit Standort. Ihr sprecht kurz ab, wohin der Koffer soll.',
  },
  en: {
    title: 'You get a message',
    text: 'With one tap she sends you a message, optionally with her location. You quickly agree where the bag should go.',
  },
};

/**
 * Story mit passendem Kontakt-Kapitel: Ist "Besitzer benachrichtigen" aktiv,
 * sind Telefon/E-Mail verborgen und der Finder schreibt eine Nachricht.
 */
export function getStoryContent(locale: SiteLocale, notifyEnabled: boolean): StoryContent {
  const base = storyContent[locale];
  if (!notifyEnabled) return base;
  return {
    ...base,
    chapters: base.chapters.map((c, i) => (i === 3 ? { ...c, ...notifyVariant[locale] } : c)),
  };
}

export const storyContent: Record<SiteLocale, StoryContent> = {
  de: {
    eyebrow: 'So kann es laufen',
    title: 'Was passiert, wenn dein Koffer nicht ankommt?',
    intro:
      'Ob ein verlorener Koffer nach Stunden oder nach Tagen zurückkommt, hängt oft an einer Frage: Kann der Finder dich erreichen?',
    stat: {
      value: '24 Mio.',
      label: 'Gepäckstücke wurden 2025 weltweit fehlgeleitet',
      source: 'SITA Baggage IT Insights 2026',
      sourceUrl: SITA_SOURCE_URL,
    },
    chapters: [
      {
        id: 'ankunft',
        time: '23:40',
        label: 'Ankunft',
        title: 'Das Band steht still',
        text: 'Der letzte Koffer dreht seine Runde, deiner ist nicht dabei. Am Schalter bekommst du eine Vorgangsnummer und die Auskunft, man melde sich.',
      },
      {
        id: 'papieranhaenger',
        time: '09:10',
        label: 'Am nächsten Morgen',
        title: 'Dein Koffer steht in Mailand',
        text: 'Am Papieranhänger ist die Handynummer verwischt, die Adresse veraltet. Niemand weiß, wem der Koffer gehört.',
      },
      {
        id: 'scan',
        time: '09:12',
        label: 'Der Scan',
        title: 'Eine Mitarbeiterin hält ihr Handy an den Bag-Tag',
        text: 'Ohne App sieht sie deinen Namen, deinen Flug und dein Hotel in Rom – und wie sie dich erreicht.',
      },
      {
        id: 'nachricht',
        time: '09:15',
        label: 'Kontakt',
        title: 'Dein Handy klingelt',
        text: 'Ihr sprecht kurz ab, wohin der Koffer soll. Du musst nichts ausfüllen und niemandem hinterhertelefonieren.',
      },
      {
        id: 'happy-end',
        time: '18:30',
        label: 'Am Abend',
        title: 'Der Koffer steht im Hotel',
        text: 'Statt Tage zu warten, hast du deine Sachen am selben Abend wieder.',
      },
    ],
    comparisonTitle: 'Papieranhänger oder Bag-Tag?',
    comparisonHead: { aspect: 'Im Ernstfall', paper: 'Papieranhänger', bagTag: 'Bag-Tag NFC' },
    comparison: [
      { aspect: 'Kontaktdaten aktuell', paper: 'Nur durch neues Ausfüllen', bagTag: 'Jederzeit online änderbar' },
      { aspect: 'Privatsphäre', paper: 'Adresse für alle lesbar', bagTag: 'Nur freigegebene Daten nach Scan' },
      { aspect: 'Finder meldet sich', paper: 'Nur, wenn die Nummer lesbar ist', bagTag: 'Ein Tipp nach dem Scan' },
      { aspect: 'Technik', paper: '–', bagTag: 'NFC + QR-Code, keine App, keine Batterie' },
    ],
    ctaTitle: 'Damit deine Geschichte so ausgeht',
    ctaText: '10,99 € pro Anhänger – einmal kaufen, ohne Abo, ohne Batterie.',
    ctaPrimary: 'Bag-Tag bestellen',
    ctaSecondary: 'So erlebt der Finder den Scan',
    ctaSecondaryRouteKey: 'finderFlow',
    readMoreTitle: 'Weiterlesen im Ratgeber',
    readMore: [
      { routeKey: 'guideLostLuggage', label: 'Koffer verloren – was tun?' },
      { routeKey: 'preventLoss', label: 'Gepäckverlust vermeiden: Tipps' },
      { routeKey: 'nfcVsQr', label: 'NFC vs. QR-Code erklärt' },
      { routeKey: 'useCases', label: 'Für Familien, Kinder & Vielflieger' },
      { routeKey: 'securityPrivacy', label: 'Sicherheit & Datenschutz' },
    ],
  },
  en: {
    eyebrow: 'How it can play out',
    title: 'What happens when your suitcase doesn’t arrive?',
    intro:
      'Whether a lost suitcase comes back in hours or in days often depends on one question: can the finder reach you?',
    stat: {
      value: '24 million',
      label: 'bags were mishandled worldwide in 2025',
      source: 'SITA Baggage IT Insights 2026',
      sourceUrl: SITA_SOURCE_URL,
    },
    chapters: [
      {
        id: 'arrival',
        time: '11:40 pm',
        label: 'Arrival',
        title: 'The belt stops',
        text: 'The last suitcase goes round, yours isn’t there. At the desk you get a reference number and a promise that someone will be in touch.',
      },
      {
        id: 'paper-tag',
        time: '9:10 am',
        label: 'Next morning',
        title: 'Your suitcase is in Milan',
        text: 'On the paper tag the phone number is smudged and the address outdated. Nobody knows whose bag it is.',
      },
      {
        id: 'scan',
        time: '9:12 am',
        label: 'The scan',
        title: 'A staff member taps the Bag-Tag with her phone',
        text: 'No app needed: she sees your name, your flight and your hotel in Rome – and how to reach you.',
      },
      {
        id: 'message',
        time: '9:15 am',
        label: 'Contact',
        title: 'Your phone rings',
        text: 'You quickly agree where the bag should go. No forms, no chasing anyone on the phone.',
      },
      {
        id: 'happy-end',
        time: '6:30 pm',
        label: 'Evening',
        title: 'Your suitcase is at the hotel',
        text: 'Instead of waiting for days, you have your things back the same evening.',
      },
    ],
    comparisonTitle: 'Paper tag or Bag-Tag?',
    comparisonHead: { aspect: 'When it matters', paper: 'Paper tag', bagTag: 'Bag-Tag NFC' },
    comparison: [
      { aspect: 'Up-to-date contact', paper: 'Only by rewriting it', bagTag: 'Edit online anytime' },
      { aspect: 'Privacy', paper: 'Address visible to all', bagTag: 'Only shared data, after a scan' },
      { aspect: 'Finder gets in touch', paper: 'Only if the number is readable', bagTag: 'One tap after the scan' },
      { aspect: 'Technology', paper: '–', bagTag: 'NFC + QR code, no app, no battery' },
    ],
    ctaTitle: 'So your story ends like this',
    ctaText: '€10.99 per tag – buy once, no subscription, no battery.',
    ctaPrimary: 'Order a Bag-Tag',
    ctaSecondary: 'See what the finder experiences',
    ctaSecondaryRouteKey: 'finderFlow',
    readMoreTitle: 'Keep reading',
    readMore: [
      { routeKey: 'preventLoss', label: 'How to prevent luggage loss' },
      { routeKey: 'nfcVsQr', label: 'NFC vs. QR code explained' },
      { routeKey: 'howItWorks', label: 'How Bag-Tag works' },
      { routeKey: 'securityPrivacy', label: 'Security & privacy' },
      { routeKey: 'guides', label: 'All guides' },
    ],
  },
};
