/**
 * JSON-LD-Builder für die Startseiten (/de, /en).
 *
 * Grundsatz: Strukturierte Daten spiegeln exakt den SICHTBAREN Seiteninhalt.
 * FAQ und Bewertungen kommen deshalb aus denselben i18n-Texten, die auch
 * gerendert werden. (Google-Richtlinie: Markup muss zum sichtbaren Inhalt passen,
 * sonst droht eine manuelle Maßnahme.)
 */

import { messages } from '@/lib/i18n';
import { PRODUCT, SITE_NAME, SITE_URL, absoluteUrl, type SiteLocale } from './site';
import { homeRoute, localizedPath } from './routes';
import { storyContent } from '@/lib/content/story';
import { getLandingContent, photos } from '@/lib/content/landing';

type JsonLdObject = Record<string, unknown>;

const productCopy = {
  de: {
    name: 'Bag-Tag NFC Gepäckanhänger',
    description:
      'Smarter NFC Gepäckanhänger mit QR-Code für sicheres Reisen. Keine App erforderlich, DSGVO-konform, wasserfest und ohne Batterie dauerhaft nutzbar.',
    homeName: 'Startseite',
  },
  en: {
    name: 'Bag-Tag NFC Luggage Tag',
    description:
      'Smart NFC luggage tag with QR code for safe travel. No app required, GDPR compliant, waterproof and battery-free for life.',
    homeName: 'Home',
  },
} as const;

export function getVisibleTestimonials(locale: SiteLocale) {
  return messages[locale].noDataSection.testimonials;
}

export function getVisibleFaq(locale: SiteLocale) {
  return messages[locale].faq.questions;
}

export function buildProductSchema(locale: SiteLocale): JsonLdObject {
  const copy = productCopy[locale];
  const testimonials = getVisibleTestimonials(locale);
  const productPath = localizedPath('product', locale) ?? homeRoute[locale]!;

  const schema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(homeRoute[locale]!)}#product`,
    name: copy.name,
    description: copy.description,
    sku: PRODUCT.sku,
    brand: { '@type': 'Brand', name: SITE_NAME },
    // Echte Produktfotos (aus dem Produktvideo) + bisheriges Produktbild
    image: [
      absoluteUrl(photos.tagBackpack.src),
      absoluteUrl(photos.nfcScan.src),
      absoluteUrl(photos.finderReads.src),
      PRODUCT.image,
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(productPath),
      priceCurrency: PRODUCT.priceCurrency,
      price: PRODUCT.price,
      priceValidUntil: PRODUCT.priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: PRODUCT.sellerName, url: PRODUCT.sellerUrl },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: PRODUCT.shippingRate, currency: PRODUCT.priceCurrency },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
        },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'DE' },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };

  if (testimonials.length > 0) {
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: (Math.round((sum / testimonials.length) * 10) / 10).toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    };
    schema.review = testimonials.map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5, worstRating: 1 },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.text,
    }));
  }

  return schema;
}

export function buildFaqSchema(locale: SiteLocale): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(homeRoute[locale]!)}#faq`,
    mainEntity: getVisibleFaq(locale).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function buildBreadcrumbSchema(locale: SiteLocale): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: productCopy[locale].homeName, item: absoluteUrl(homeRoute[locale]!) },
    ],
  };
}

/**
 * WebPage-Markup für die Startseite inkl. Verweis auf die Storyline-Sektion
 * und das Produkt (verknüpft über @id).
 */
export function buildHomeWebPageSchema(locale: SiteLocale): JsonLdObject {
  const story = storyContent[locale];
  const url = absoluteUrl(homeRoute[locale]!);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: messages[locale].seo.title,
    description: messages[locale].seo.description,
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    about: { '@id': `${url}#product` },
    primaryImageOfPage: absoluteUrl(photos.tagBackpack.src),
    hasPart: {
      '@type': 'WebPageElement',
      '@id': `${url}#story`,
      name: story.title,
      description: story.intro,
    },
  };
}

/** Erstes Hochladen des Produktvideos ins Repo (Git-Historie). */
export const VIDEO_UPLOAD_DATE = '2025-06-01T14:52:33Z';

export function buildVideoSchema(locale: SiteLocale): JsonLdObject {
  const { video } = getLandingContent(locale);
  const url = absoluteUrl(homeRoute[locale]!);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    name: video.name,
    description: video.description,
    thumbnailUrl: [absoluteUrl(photos.videoPoster.src)],
    contentUrl: absoluteUrl(photos.video),
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: 'PT21S',
    inLanguage: locale,
  };
}

export function buildHomeJsonLd(locale: SiteLocale): JsonLdObject[] {
  return [
    buildHomeWebPageSchema(locale),
    buildProductSchema(locale),
    buildVideoSchema(locale),
    buildBreadcrumbSchema(locale),
    buildFaqSchema(locale),
  ];
}
