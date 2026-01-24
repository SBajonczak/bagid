import { MetadataRoute } from 'next';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bag-tag.de';
  const lastModified = new Date('2026-01-24');
  const changeFrequency: ChangeFrequency = 'monthly';

  // Mapping der deutschen zu englischen URLs
  const marketingPages: { [key: string]: string } = {
    // Hauptseiten
    'so-funktionierts': 'how-it-works',
    'nfc-vs-qr': 'nfc-vs-qr',
    'use-cases': 'use-cases',
    'sicherheit-datenschutz': 'security-privacy',
    'hilfe': 'help',
    'ratgeber': 'guides',
    'gepaeck-verlust-vermeiden': 'prevent-luggage-loss',
    'nfc-gepaeckanhaenger': 'nfc-luggage-tag',
    'finder-flow': 'finder-flow',
    
    // Hilfe-Unterseiten
    'hilfe/aktivieren': 'help/activate',
    'hilfe/android-nfc-aktivieren': 'help/android-nfc-activate',
    'hilfe/iphone-nfc-aktivieren': 'help/iphone-nfc-activate',
    'hilfe/daten-aendern': 'help/change-data',
    'hilfe/faq': 'help/faq',
    'hilfe/qr-code-als-fallback': 'help/qr-code-fallback',
    'hilfe/tag-uebertragen': 'help/transfer-tag',
    
    // Ratgeber-Unterseiten
    'ratgeber/gepaeck-verlust-vermeiden': 'guides/prevent-luggage-loss',
    'ratgeber/koffer-verloren-was-tun': 'guides/luggage-lost-what-to-do',
    'ratgeber/nfc-vs-qr': 'guides/nfc-vs-qr',
    
    // Use Cases Unterseiten
    'use-cases/gepaeckanhaenger-fuer-familien': 'use-cases/luggage-tags-families',
    'use-cases/gepaeckanhaenger-fuer-vielflieger': 'use-cases/luggage-tags-frequent-flyers',
    'use-cases/kofferanhaenger-fuer-kinder': 'use-cases/luggage-tags-children',
  };

  const marketingUrls = Object.keys(marketingPages).map((deSlug) => {
    const enSlug = marketingPages[deSlug];
    return {
      url: `${baseUrl}/de/${deSlug}`,
      lastModified,
      changeFrequency,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/${enSlug}`,
        },
      },
    };
  });

  const marketingUrlsEn = Object.keys(marketingPages).map((deSlug) => {
    const enSlug = marketingPages[deSlug];
    return {
      url: `${baseUrl}/en/${enSlug}`,
      lastModified,
      changeFrequency,
      priority: 0.7,
      alternates: {
        languages: {
          de: `${baseUrl}/de/${deSlug}`,
        },
      },
    };
  });

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
        },
      },
    },
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...marketingUrls,
    ...marketingUrlsEn,
  ];
}
