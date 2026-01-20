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
  const lastModified = new Date('2026-01-20');
  const changeFrequency: ChangeFrequency = 'monthly';

  const marketingPages: { [key: string]: string } = {
    'gepaeck-verlust-vermeiden': 'prevent-luggage-loss',
    'nfc-gepaeckanhaenger': 'nfc-luggage-tag',
    'nfc-vs-qr': 'nfc-vs-qr',
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
