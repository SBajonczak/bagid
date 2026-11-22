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

export const storyContent: Record<SiteLocale, StoryContent> = {
  de: {
    eyebrow: 'Eine Reise, zwei mögliche Enden',
    title: 'Was passiert, wenn dein Koffer nicht ankommt?',
    intro:
      'Jedes Jahr landen Millionen Gepäckstücke am falschen Ort. Ob deine Geschichte gut ausgeht, entscheidet oft ein kleines Detail: Kann der Finder dich erreichen – schnell und ohne dass deine Privatadresse für alle sichtbar am Koffer hängt?',
    stat: {
      value: '24 Mio.',
      label: 'Gepäckstücke wurden 2025 weltweit fehlgeleitet',
      source: 'SITA Baggage IT Insights 2026',
      sourceUrl: SITA_SOURCE_URL,
    },
    chapters: [
      {
        id: 'ankunft',
        label: 'Kapitel 1',
        title: 'Ankunft, 23:40 Uhr – das Band steht still',
        text: 'Der letzte Koffer dreht seine Runde, deiner ist nicht dabei. Am Schalter bekommst du eine Vorgangsnummer – und jede Menge Ungewissheit.',
      },
      {
        id: 'papieranhaenger',
        label: 'Kapitel 2',
        title: 'Der Papieranhänger hilft nicht weiter',
        text: 'Die Handynummer ist verwischt, die Adresse veraltet. Und deine Wohnanschrift hing die ganze Reise für jeden lesbar am Gepäck.',
      },
      {
        id: 'scan',
        label: 'Kapitel 3',
        title: 'Der Wendepunkt: ein Scan',
        text: 'Mit Bag-Tag hält der Finder – Flughafenpersonal, Hotel oder ein ehrlicher Mitreisender – sein Smartphone an den NFC-Anhänger oder scannt den QR-Code. Ohne App sieht er genau die Kontaktdaten, die du freigegeben hast.',
      },
      {
        id: 'nachricht',
        label: 'Kapitel 4',
        title: 'Du bekommst eine Nachricht',
        text: 'Mit wenigen Klicks schickt dir der Finder eine Nachricht – auf Wunsch mit seinem aktuellen Standort. Du weißt, wo dein Koffer ist, und kannst die Rückgabe direkt absprechen.',
      },
      {
        id: 'happy-end',
        label: 'Kapitel 5',
        title: 'Wieder vereint',
        text: 'Statt tagelangem Warten: ein kurzer Kontakt, eine Absprache – und dein Gepäck ist auf dem Weg zurück zu dir.',
      },
    ],
    comparisonTitle: 'Papieranhänger oder Bag-Tag?',
    comparisonHead: { aspect: 'Im Ernstfall', paper: 'Papieranhänger', bagTag: 'Bag-Tag NFC' },
    comparison: [
      { aspect: 'Kontaktdaten aktuell', paper: 'Nur durch neues Ausfüllen', bagTag: 'Jederzeit online änderbar' },
      { aspect: 'Privatsphäre', paper: 'Adresse für alle lesbar', bagTag: 'Nur freigegebene Daten nach Scan' },
      { aspect: 'Finder meldet sich', paper: 'Anrufen, falls Nummer lesbar', bagTag: 'Nachricht inkl. Standort per Klick' },
      { aspect: 'Technik', paper: '–', bagTag: 'NFC + QR-Code, keine App, keine Batterie' },
    ],
    ctaTitle: 'Schreib deine Reisegeschichte mit Happy End',
    ctaText: '10,99 € pro Anhänger – einmal kaufen, ohne Abo, ohne Batterie.',
    ctaPrimary: 'Jetzt Bag-Tag sichern',
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
    eyebrow: 'One trip, two possible endings',
    title: 'What happens when your suitcase doesn’t arrive?',
    intro:
      'Millions of bags end up in the wrong place every year. Whether your story ends well often comes down to one small detail: can the finder reach you – quickly, and without your home address dangling from your luggage for everyone to read?',
    stat: {
      value: '24 million',
      label: 'bags were mishandled worldwide in 2025',
      source: 'SITA Baggage IT Insights 2026',
      sourceUrl: SITA_SOURCE_URL,
    },
    chapters: [
      {
        id: 'arrival',
        label: 'Chapter 1',
        title: 'Arrival, 11:40 pm – the belt stops',
        text: 'The last suitcase goes round, yours isn’t there. At the desk you get a reference number – and plenty of uncertainty.',
      },
      {
        id: 'paper-tag',
        label: 'Chapter 2',
        title: 'The paper tag doesn’t help',
        text: 'The phone number is smudged, the address outdated. And your home address was readable by anyone for the entire trip.',
      },
      {
        id: 'scan',
        label: 'Chapter 3',
        title: 'The turning point: one scan',
        text: 'With Bag-Tag, the finder – airport staff, a hotel or an honest fellow traveller – taps the NFC tag with their phone or scans the QR code. No app needed, and they only see the contact details you chose to share.',
      },
      {
        id: 'message',
        label: 'Chapter 4',
        title: 'You get a message',
        text: 'In a few clicks the finder sends you a message – optionally with their current location. You know where your bag is and can arrange the return directly.',
      },
      {
        id: 'happy-end',
        label: 'Chapter 5',
        title: 'Reunited',
        text: 'Instead of days of waiting: a quick contact, a short arrangement – and your luggage is on its way back to you.',
      },
    ],
    comparisonTitle: 'Paper tag or Bag-Tag?',
    comparisonHead: { aspect: 'When it matters', paper: 'Paper tag', bagTag: 'Bag-Tag NFC' },
    comparison: [
      { aspect: 'Up-to-date contact', paper: 'Only by rewriting it', bagTag: 'Edit online anytime' },
      { aspect: 'Privacy', paper: 'Address visible to all', bagTag: 'Only shared data, after a scan' },
      { aspect: 'Finder gets in touch', paper: 'Calls – if the number is readable', bagTag: 'Message incl. location in one click' },
      { aspect: 'Technology', paper: '–', bagTag: 'NFC + QR code, no app, no battery' },
    ],
    ctaTitle: 'Give your travel story a happy ending',
    ctaText: '€10.99 per tag – buy once, no subscription, no battery.',
    ctaPrimary: 'Get your Bag-Tag',
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
