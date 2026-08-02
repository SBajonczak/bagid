/**
 * JSON-LD Schema Utilities
 * Helper functions to generate structured data for SEO
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ReviewItem {
  author: string;
  ratingValue: number;
  reviewBody: string;
  datePublished?: string;
}

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

/**
 * Generate FAQPage JSON-LD structured data
 * @param faqs - Array of FAQ items
 * @returns FAQPage schema object
 */
export function generateFAQPageSchema(faqs: FaqItem[]) {
  const mainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * Generate BreadcrumbList JSON-LD structured data
 * @param items - Array of breadcrumb items
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Generate Article JSON-LD structured data
 * @param params - Article parameters
 * @returns Article schema object
 */
export function generateArticleSchema(params: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    image: params.image,
    url: params.url,
    publisher: {
      '@type': 'Organization',
      name: 'Bag-Tag',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bag-tag.de/assets/icon_32_32.png',
      },
    },
  };
}

export function generateHowToSchema(params: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    image: params.image,
    totalTime: params.totalTime,
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Generate WebSite JSON-LD with SearchAction for Google Sitelinks Search Box
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bag-Tag',
    url: 'https://bag-tag.de',
    description: 'Smarte NFC-Gepäckanhänger für sicheres Reisen – keine App, keine Batterien, DSGVO-konform',
    inLanguage: ['de', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bag-tag.de/de/hilfe/faq?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Review JSON-LD objects for embedding in Product schema
 */
export function generateReviewSchemas(reviews: ReviewItem[]) {
  return reviews.map((review) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    ...(review.datePublished ? { datePublished: review.datePublished } : {}),
  }));
}

/**
 * Generate ItemList JSON-LD for overview/category pages
 */
export function generateItemListSchema(items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/**
 * Generate enhanced Product JSON-LD with shipping, brand, and reviews
 */
export function generateProductSchema(params: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency: string;
  url: string;
  ratingValue: string;
  reviewCount: string;
  reviews?: ReviewItem[];
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    image: params.image,
    sku: params.sku ?? 'BAG-TAG-NFC-001',
    brand: {
      '@type': 'Brand',
      name: 'Bag-Tag',
    },
    offers: {
      '@type': 'Offer',
      url: params.url,
      priceCurrency: params.priceCurrency,
      price: params.price,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Kreativschicht.de',
        url: 'https://kreativschicht.de',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '3.99',
          currency: 'EUR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE',
        },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: params.ratingValue,
      reviewCount: params.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    ...(params.reviews && params.reviews.length > 0
      ? { review: generateReviewSchemas(params.reviews) }
      : {}),
  };
}
