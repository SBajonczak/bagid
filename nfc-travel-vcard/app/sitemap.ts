import { MetadataRoute } from 'next';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface PageConfig {
  en: string;
  priority?: number;
  changeFreq?: ChangeFrequency;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bag-tag.de';
  const now = new Date();
  const lastModified = now;
  const changeFrequency: ChangeFrequency = 'monthly';

  // Mapping der deutschen zu englischen URLs mit optionaler Priorität
  const marketingPages: { [key: string]: PageConfig } = {
    // Produktseiten (höchste Priorität)
    'nfc-gepaeckanhaenger': { en: 'nfc-luggage-tag', priority: 0.9, changeFreq: 'weekly' },

    // Hauptseiten
    'so-funktionierts': { en: 'how-it-works', priority: 0.8 },
    'nfc-vs-qr': { en: 'nfc-vs-qr', priority: 0.8 },
    'gepaeck-verlust-vermeiden': { en: 'prevent-luggage-loss', priority: 0.8 },
    'use-cases': { en: 'use-cases', priority: 0.7 },
    'sicherheit-datenschutz': { en: 'security-privacy', priority: 0.7 },
    'hilfe': { en: 'help', priority: 0.7 },
    'ratgeber': { en: 'guides', priority: 0.7 },
    'finder-flow': { en: 'finder-flow', priority: 0.6 },

    // Use Cases Unterseiten
    'use-cases/gepaeckanhaenger-fuer-familien': { en: 'use-cases/luggage-tags-families', priority: 0.7 },
    'use-cases/gepaeckanhaenger-fuer-vielflieger': { en: 'use-cases/luggage-tags-frequent-flyers', priority: 0.7 },
    'use-cases/kofferanhaenger-fuer-kinder': { en: 'use-cases/luggage-tags-children', priority: 0.7 },

    // Ratgeber-Unterseiten
    'ratgeber/gepaeck-verlust-vermeiden': { en: 'guides/prevent-luggage-loss', priority: 0.7 },
    'ratgeber/koffer-verloren-was-tun': { en: 'guides/luggage-lost-what-to-do', priority: 0.7 },
    'ratgeber/nfc-vs-qr': { en: 'guides/nfc-vs-qr', priority: 0.7 },

    // Hilfe-Unterseiten
    'hilfe/aktivieren': { en: 'help/activate', priority: 0.6 },
    'hilfe/android-nfc-aktivieren': { en: 'help/android-nfc-activate', priority: 0.6 },
    'hilfe/iphone-nfc-aktivieren': { en: 'help/iphone-nfc-activate', priority: 0.6 },
    'hilfe/daten-aendern': { en: 'help/change-data', priority: 0.6 },
    'hilfe/faq': { en: 'help/faq', priority: 0.7 },
    'hilfe/qr-code-als-fallback': { en: 'help/qr-code-fallback', priority: 0.6 },
    'hilfe/tag-uebertragen': { en: 'help/transfer-tag', priority: 0.6 },
  };

  const marketingUrls = Object.entries(marketingPages).map(([deSlug, config]) => ({
    url: `${baseUrl}/de/${deSlug}`,
    lastModified,
    changeFrequency: config.changeFreq ?? changeFrequency,
    priority: config.priority ?? 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/en/${config.en}`,
        'x-default': `${baseUrl}/de/${deSlug}`,
      },
    },
  }));

  const marketingUrlsEn = Object.entries(marketingPages).map(([deSlug, config]) => ({
    url: `${baseUrl}/en/${config.en}`,
    lastModified,
    changeFrequency: config.changeFreq ?? changeFrequency,
    priority: config.priority ?? 0.7,
    alternates: {
      languages: {
        de: `${baseUrl}/de/${deSlug}`,
        'x-default': `${baseUrl}/de/${deSlug}`,
      },
    },
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          de: `${baseUrl}/de`,
          en: `${baseUrl}/en`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          de: `${baseUrl}/de`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...marketingUrls,
    ...marketingUrlsEn,
  ];
}
