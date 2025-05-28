import React from 'react';
import { Helmet } from 'react-helmet-async'; // Updated import
import { useLanguage } from '../LanguageContext';

interface IMetaData {
    title: string;
    description: string;
    keywords: string;
}

const SeoMeta: React.FC = () => {
    const { lang } = useLanguage();

    const meta: IMetaData = {
        de: {
            title: 'Bag Tag – Smarter Kofferanhänger mit NFC & QR-Code',
            description:
                'Bag Tag – der smarte Kofferanhänger mit NFC & QR-Code. Bearbeite Kontakt- und Reisedaten jederzeit online. Finde dein Gepäck schnell wieder – weltweit.',
            keywords:
                'bag tag, bagtag, bagid, nfc kofferanhänger, qr kofferanhänger, smart luggage tag, lost luggage tag, smart bag tag, nfc tag travel, qr code bag, lost and found tag, digital luggage label, reisetag, koffer label, gepäckanhänger mit nfc, gepäckanhänger mit qr, kontaktloser kofferanhänger, luggage recovery tag, baggage identifier, travel smart tag, suitcase tracker tag, koffer sicherheit tag, kofferanhänger kaufen, gepäckanhänger personalisiert, smart travel gadget, reise gadget, nfc reisepass tag, bag tag online edit, lost suitcase contact tag, qr nfc kombi tag',
        },
        en: {
            title: 'Bag Tag – Smart Luggage Tag with NFC & QR Code',
            description:
                'Bag Tag – the smart luggage tag with NFC & QR code. Update your contact and travel data online anytime. Recover your luggage faster – worldwide.',
            keywords:
                'bag tag, bagtag, bagid, smart luggage tag, nfc luggage tag, qr code bag tag, digital luggage label, lost and found tag, travel nfc tag, suitcase tracker, luggage smart tag, no app luggage tag, qr nfc combo tag, contactless luggage tag, update bag info online, recover lost suitcase, smart travel gear, travel gadget luggage tag, nfc tag for travel bag, bagtag buy online',
        },
    }[lang as 'de' | 'en'];

    return (
        <Helmet>
            <html lang={lang} />
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph for social sharing */}
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://vcard.bajonczak.com" />
            <meta property="og:image" content="https://vcard.bajonczak.com/og-image.jpg" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content="https://vcard.bajonczak.com/og-image.jpg" />
        </Helmet>
    );
};

export default SeoMeta;
