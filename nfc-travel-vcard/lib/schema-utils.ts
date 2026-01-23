/**
 * JSON-LD Schema Utilities
 * Helper functions to generate structured data for SEO
 */

/**
 * FAQ item interface
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
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

/**
 * Generate HowTo JSON-LD structured data
 * @param params - HowTo parameters
 * @returns HowTo schema object
 */
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
