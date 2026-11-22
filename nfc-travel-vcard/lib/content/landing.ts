/**
 * Texte der Startseite (/de, /en) – nutzenorientiert.
 *
 * Leitplanken:
 * - Jeder Nutzen steht neben einem echten Foto oder einem echten App-Screenshot.
 * - Nur Funktionen versprechen, die live sind. Die "Besitzer benachrichtigen"-
 *   Funktion hängt am Feature-Flag NEXT_PUBLIC_FEATURE_NOTIFY_BUTTON_ENABLED;
 *   ist es aus, sieht der Finder Telefonnummer/E-Mail direkt.
 */

import type { SiteLocale } from '@/lib/seo/site';

export function isNotifyEnabled(): boolean {
  return process.env.NEXT_PUBLIC_FEATURE_NOTIFY_BUTTON_ENABLED === 'true';
}

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Benefit {
  id: string;
  title: string;
  text: string;
  media: Media;
  kind: 'screen' | 'photo';
}

const L = '/assets/landing';

const screen = (name: string, alt: string): Media => ({ src: `${L}/${name}`, alt, width: 600, height: 1200 });

export const photos = {
  tagBackpack: { src: `${L}/photo-tag-backpack.webp`, width: 900, height: 1080 },
  nfcScan: { src: `${L}/photo-nfc-scan.webp`, width: 1000, height: 900 },
  finderReads: { src: `${L}/photo-finder-reads.webp`, width: 1000, height: 900 },
  videoPoster: { src: `${L}/bag-tag-demo-poster.webp`, width: 1280, height: 720 },
  video: `${L}/bag-tag-demo-720p.mp4`,
  og: `${L}/og-bag-tag.jpg`,
} as const;

export function getLandingContent(locale: SiteLocale, notifyEnabled = isNotifyEnabled()) {
  const de = locale === 'de';
  const lang = locale;

  const contactBenefit: Pick<Benefit, 'title' | 'text'> = de
    ? notifyEnabled
      ? {
          title: 'Wer deinen Koffer findet, meldet sich sofort bei dir',
          text: 'Handy an den Anhänger halten oder QR-Code scannen – mit einem Tipp schickt der Finder dir eine Nachricht. Deine Nummer bleibt dabei verborgen.',
        }
      : {
          title: 'Wer deinen Koffer findet, erreicht dich sofort',
          text: 'Handy an den Anhänger halten oder QR-Code scannen: Der Finder sieht deinen Namen, deine Handynummer und deine E-Mail. Ein Tipp auf die Nummer, und er ruft dich an.',
        }
    : notifyEnabled
      ? {
          title: 'Whoever finds your bag can contact you right away',
          text: 'Tap the tag with a phone or scan the QR code – one tap sends you a message. Your number stays hidden.',
        }
      : {
          title: 'Whoever finds your bag can reach you right away',
          text: 'Tap the tag with a phone or scan the QR code: the finder sees your name, mobile number and email. One tap on the number and they’re calling you.',
        };

  return {
    hero: de
      ? {
          title: 'NFC-Gepäckanhänger, über den dich jeder Finder erreicht',
          lead: 'Handy dranhalten oder QR-Code scannen – der Finder sieht sofort, wie er dich erreicht. Ohne App. Deine Angaben änderst du jederzeit online.',
          price: '10,99 €',
          priceNote: 'einmalig, kein Abo, keine Batterie',
          cta: 'Im Shop bestellen',
          demo: 'Ansehen, was der Finder sieht',
          facts: ['Lieferung in 3–5 Werktagen', '14 Tage Rückgabe', 'Bestellung über kreativschicht.de'],
          photoAlt: 'Mintgrüner Bag-Tag mit NFC-Symbol und QR-Code an einem Rucksack',
          screenAlt: 'Handy-Ansicht nach dem Scan: Name, E-Mail und Handynummer des Besitzers',
        }
      : {
          title: 'The NFC luggage tag that lets any finder reach you',
          lead: 'Tap it with a phone or scan the QR code – the finder instantly sees how to reach you. No app. Update your details online anytime.',
          price: '€10.99',
          priceNote: 'one-off, no subscription, no battery',
          cta: 'Order in the shop',
          demo: 'See what the finder sees',
          facts: ['Delivered in 3–5 working days', '14-day returns', 'Ordered via kreativschicht.de'],
          photoAlt: 'Mint Bag-Tag with NFC symbol and QR code attached to a backpack',
          screenAlt: 'Phone view after scanning: owner’s name, email and mobile number',
        },

    benefits: {
      title: de ? 'Was du davon hast' : 'What you get',
      lead: de
        ? 'So sieht ein Bag-Tag auf dem Handy aus – echte Screenshots, keine Grafiken.'
        : 'This is what a Bag-Tag looks like on a phone – real screenshots, not mock-ups.',
      screens: [
        {
          id: 'contact',
          kind: 'screen',
          ...contactBenefit,
          media: screen(
            `screen-finder-contact-${lang}.webp`,
            de ? 'Screenshot: Kontaktdaten mit antippbarer Telefonnummer und E-Mail' : 'Screenshot: contact details with tappable phone number and email',
          ),
        },
        {
          id: 'trip',
          kind: 'screen',
          title: de ? 'Der Finder weiß, wohin dein Koffer muss' : 'The finder knows where your bag needs to go',
          text: de
            ? 'Flugnummer, Ankunftstag und Hotel stehen mit drauf. So können Airline oder Hotel dein Gepäck direkt weiterschicken – auch wenn du gerade nicht ans Handy gehst.'
            : 'Flight number, arrival date and hotel are right there. The airline or hotel can forward your bag directly – even if you can’t pick up the phone.',
          media: screen(
            `screen-finder-trip-${lang}.webp`,
            de ? 'Screenshot: Reisedaten mit Flug LH232 und Hotel am Zielort' : 'Screenshot: travel details with flight LH232 and destination hotel',
          ),
        },
        {
          id: 'edit',
          kind: 'screen',
          title: de ? 'Neues Hotel? In einer Minute geändert' : 'New hotel? Changed in a minute',
          text: de
            ? 'Deine Angaben pflegst du im Browser. Der Anhänger am Koffer bleibt derselbe – nichts neu ausfüllen, nichts neu ausdrucken.'
            : 'You manage your details in the browser. The tag on your bag stays the same – nothing to rewrite or reprint.',
          media: screen(
            `screen-edit-destination-${lang}.webp`,
            de ? 'Screenshot: Formular zum Ändern von Hotel und Adresse am Zielort' : 'Screenshot: form for changing the destination hotel and address',
          ),
        },
      ] satisfies Benefit[],
      photos: [
        {
          id: 'privacy',
          kind: 'photo',
          title: de ? 'Deine Adresse hängt nicht mehr offen am Koffer' : 'Your home address is no longer on display',
          text: de
            ? 'Auf dem Anhänger steht nichts Persönliches. Erst nach dem Scan erscheinen die Angaben, die du eingetragen hast – leere Felder werden gar nicht angezeigt.'
            : 'There’s nothing personal printed on the tag. Only after a scan do the details you entered appear – empty fields aren’t shown at all.',
          media: { ...photos.tagBackpack, alt: de ? 'Bag-Tag am Rucksack: nur NFC-Symbol und QR-Code, keine Adresse' : 'Bag-Tag on a backpack: just the NFC symbol and QR code, no address' },
        },
        {
          id: 'any-phone',
          kind: 'photo',
          title: de ? 'Funktioniert mit jedem Smartphone' : 'Works with any smartphone',
          text: de
            ? 'iPhone und Android lesen NFC direkt. Hat ein Handy kein NFC, reicht die Kamera für den QR-Code. Der Finder braucht keine App.'
            : 'iPhone and Android read NFC directly. No NFC? The camera reads the QR code. The finder doesn’t need an app.',
          media: { ...photos.nfcScan, alt: de ? 'Ein Smartphone wird an den Bag-Tag am Rucksack gehalten' : 'A smartphone being held against the Bag-Tag on a backpack' },
        },
      ] satisfies Benefit[],
    },

    price: de
      ? {
          title: 'Einmal zahlen, fertig',
          text: 'Kein Abo und keine Batterie: Der NFC-Chip bekommt seine Energie vom Handy, das ihn liest. Im Paket sind der Anhänger und ein Metallring zum Befestigen.',
          cta: 'Für 10,99 € bestellen',
        }
      : {
          title: 'Pay once, done',
          text: 'No subscription and no battery: the NFC chip is powered by the phone that reads it. The package contains the tag and a metal ring to attach it.',
          cta: 'Order for €10.99',
        },

    video: de
      ? {
          title: 'In 20 Sekunden: so läuft ein Scan',
          text: 'Ungeschnitten aus dem Alltag – Anhänger am Rucksack, Handy dran, Daten da.',
          name: 'Bag-Tag NFC-Gepäckanhänger scannen – Demo',
          description: 'Ein Smartphone liest den Bag-Tag per NFC und zeigt die Kontaktdaten des Besitzers an.',
        }
      : {
          title: 'In 20 seconds: how a scan works',
          text: 'Unedited – tag on a backpack, phone against it, details on screen.',
          name: 'Scanning the Bag-Tag NFC luggage tag – demo',
          description: 'A smartphone reads the Bag-Tag via NFC and shows the owner’s contact details.',
        },

    reviewsTitle: de ? 'Was Kundinnen und Kunden sagen' : 'What customers say',

    final: de
      ? {
          title: 'Ein Anhänger pro Koffer reicht',
          text: 'Anbringen, einmal scannen, Daten eintragen. Ab dann ist dein Gepäck auf jeder Reise erreichbar.',
          cta: 'Im Shop bestellen',
          photoAlt: 'Finder liest die Daten eines Bag-Tags auf dem Smartphone',
        }
      : {
          title: 'One tag per bag is all it takes',
          text: 'Attach it, scan once, enter your details. From then on your luggage is reachable on every trip.',
          cta: 'Order in the shop',
          photoAlt: 'Finder reading a Bag-Tag’s details on a smartphone',
        },
  };
}

export type LandingContent = ReturnType<typeof getLandingContent>;
