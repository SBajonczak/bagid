import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';

const SeoMeta: React.FC = () => {
    const { lang } = useLanguage();

    // Get SEO content from i18n
    const {
        title,
        description,
        keywords,
        productName,
        brandName,
        productPrice,
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
        "image": "https://www.bag-tag.de/assets/product-image.jpg",
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": brandName
        },
        "review": reviews,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": testimonials.length
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.bag-tag.de",
            "priceCurrency": "EUR",
            "price": productPrice,
            "availability": "https://schema.org/InStock",
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

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Bag-Tag.de" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://www.bag-tag.de" />

            {/* Language Setting */}
            <html lang={lang} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.bag-tag.de/" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://www.bag-tag.de/assets/og-image.jpg" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.bag-tag.de/" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content="https://www.bag-tag.de/assets/og-image.jpg" />

            {/* Structured Data / JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(productJsonLd, null, 2)}
            </script>
        </Helmet>
    );
};

export default SeoMeta;
