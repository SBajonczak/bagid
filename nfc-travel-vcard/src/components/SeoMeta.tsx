import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
import { siteConfig } from '../config/site';

const SeoMeta: React.FC = () => {
    const { lang } = useLanguage();

    // Get SEO content from i18n
    const {
        title,
        description,
        keywords,
        productName,
        shippingDetails,
        returnPolicy
    } = messages[lang].seo;

    // Get testimonials from i18n
    const { testimonials } = messages[lang].noDataSection;

    // Calculate average rating from testimonials
    const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    const averageRating = totalRating / testimonials.length;
    const ratingValue = parseFloat(averageRating.toFixed(1)); // Round to 1 decimal place

    // Map testimonials to review format for JSON-LD
    const reviews = testimonials.map(testimonial => ({
        "@type": "Review",
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": testimonial.rating,
            "bestRating": 5
        },
        "author": {
            "@type": "Person",
            "name": testimonial.name
        },
        "reviewBody": testimonial.text
    }));

    // Create the JSON-LD as a formatted object first
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "image": `${siteConfig.siteUrl}/assets/productimage.webp`,
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": "Bag-Tag"
        },
        "review": reviews,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": testimonials.length
        },
        "offers": {
            "@type": "Offer",
            "url": siteConfig.siteUrl,
            "priceCurrency": siteConfig.product.currency,
            "price": siteConfig.product.price,
            "availability": siteConfig.product.availability,
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": shippingDetails.shippingRate,
                    "currency": "EUR"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": shippingDetails.shippingDestination
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "DAY"
                    }
                },
                "sameDay": shippingDetails.sameDay,
                "overnight": shippingDetails.overnight,
                "twoDay": shippingDetails.twoDay
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "returnPolicyCategory": returnPolicy.returnPolicyCategory,
                "merchantReturnDays": returnPolicy.merchantReturnDays,
                "returnMethod": "ReturnByMail"
            }
        }
    };

    // Get FAQ data from i18n
    const { faq } = messages[lang];

    // Create FAQPage JSON-LD schema
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.questions.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    // Create Organization JSON-LD schema
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.organization.name,
        "legalName": siteConfig.organization.legalName,
        "url": siteConfig.organization.url,
        "logo": siteConfig.organization.logo,
        "description": siteConfig.organization.description,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": siteConfig.organization.address.addressCountry
        },
        "sameAs": siteConfig.organization.sameAs
    };

    // Create WebSite JSON-LD schema with SearchAction
    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.siteName,
        "url": siteConfig.siteUrl,
        "description": description,
        "inLanguage": [lang],
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.organization.name,
            "logo": {
                "@type": "ImageObject",
                "url": siteConfig.organization.logo
            }
        }
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Bag-Tag.de" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={`${siteConfig.siteUrl}/`} />
            
            {/* Favicon and Manifest */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />

            {/* Language Setting */}
            <html lang={lang} />

            {/* Hreflang Tags for Multi-language Support */}
            <link rel="alternate" hrefLang="de" href={`${siteConfig.siteUrl}/?lang=de`} />
            <link rel="alternate" hrefLang="en" href={`${siteConfig.siteUrl}/?lang=en`} />
            <link rel="alternate" hrefLang="nl" href={`${siteConfig.siteUrl}/?lang=nl`} />
            <link rel="alternate" hrefLang="x-default" href={`${siteConfig.siteUrl}/`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${siteConfig.siteUrl}/`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="600" />
            <meta property="og:image:alt" content="Bag-Tag NFC Gepäckanhänger" />
            <meta property="og:site_name" content={siteConfig.siteName} />
            <meta property="og:locale" content={lang === 'de' ? 'de_DE' : lang === 'en' ? 'en_US' : 'nl_NL'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={`${siteConfig.siteUrl}/`} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteConfig.siteUrl}${siteConfig.ogImage}`} />
            <meta name="twitter:image:alt" content="Bag-Tag NFC Gepäckanhänger" />

            {/* Structured Data / JSON-LD - Product Schema */}
            <script type="application/ld+json">
                {JSON.stringify(productJsonLd, null, 2)}
            </script>

            {/* Structured Data / JSON-LD - FAQ Schema */}
            <script type="application/ld+json">
                {JSON.stringify(faqJsonLd, null, 2)}
            </script>

            {/* Structured Data / JSON-LD - Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify(organizationJsonLd, null, 2)}
            </script>

            {/* Structured Data / JSON-LD - WebSite Schema */}
            <script type="application/ld+json">
                {JSON.stringify(websiteJsonLd, null, 2)}
            </script>
        </Helmet>
    );
};

export default SeoMeta;
