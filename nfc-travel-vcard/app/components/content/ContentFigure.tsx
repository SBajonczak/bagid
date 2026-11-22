import Image from 'next/image';
import PhoneFrame from '../home/PhoneFrame';
import { getLandingContent, photos, type Media } from '@/lib/content/landing';
import { pageStoryLinks, type FigureKey } from '@/lib/content/story-links';
import type { SiteLocale } from '@/lib/seo/site';

const captions: Record<FigureKey, Record<SiteLocale, string>> = {
  finderContact: { de: 'So sieht der Finder deine Angaben – echter Screenshot.', en: 'What the finder sees – a real screenshot.' },
  finderTrip: { de: 'Flug und Hotel helfen beim Weiterschicken – echter Screenshot.', en: 'Flight and hotel help with forwarding – a real screenshot.' },
  editDestination: { de: 'Hotel und Adresse änderst du im Browser – echter Screenshot.', en: 'Change hotel and address in your browser – a real screenshot.' },
  tagBackpack: { de: 'Der Bag-Tag am Rucksack: NFC-Symbol und QR-Code, keine Adresse.', en: 'The Bag-Tag on a backpack: NFC symbol and QR code, no address.' },
  nfcScan: { de: 'Handy an den Anhänger halten – mehr braucht der Finder nicht.', en: 'Hold a phone to the tag – that’s all the finder needs.' },
  finderReads: { de: 'Nach dem Scan stehen die Angaben direkt auf dem Handy.', en: 'After the scan, the details are right on the phone.' },
};

const SCREEN_KEYS: Partial<Record<FigureKey, string>> = {
  finderContact: 'contact',
  finderTrip: 'trip',
  editDestination: 'edit',
};

export function figureMedia(key: FigureKey, locale: SiteLocale): { media: Media; screen: boolean } {
  const { benefits } = getLandingContent(locale);
  const screenId = SCREEN_KEYS[key];
  if (screenId) {
    const s = benefits.screens.find((b) => b.id === screenId)!;
    return { media: s.media, screen: true };
  }
  if (key === 'tagBackpack') return { media: benefits.photos.find((b) => b.id === 'privacy')!.media, screen: false };
  if (key === 'nfcScan') return { media: benefits.photos.find((b) => b.id === 'any-phone')!.media, screen: false };
  return {
    media: {
      ...photos.finderReads,
      alt: locale === 'de' ? 'Finder liest die Daten eines Bag-Tags auf dem Smartphone' : 'Finder reading a Bag-Tag’s details on a smartphone',
    },
    screen: false,
  };
}

/** Echtes Foto oder echter App-Screenshot passend zur Unterseite. */
export default function ContentFigure({ path }: { path: string }) {
  const key = pageStoryLinks[path]?.figure;
  if (!key) return null;
  const locale: SiteLocale = path.startsWith('/en') ? 'en' : 'de';
  const { media, screen } = figureMedia(key, locale);

  return (
    <figure className={screen ? 'bt-figure bt-figure--screen' : 'bt-figure'} data-testid="content-figure">
      {screen ? (
        <PhoneFrame media={media} sizes="16rem" />
      ) : (
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(min-width: 860px) 48rem, 92vw" />
      )}
      <figcaption>{captions[key][locale]}</figcaption>
    </figure>
  );
}
