import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { messages } from '@/lib/i18n';
import LanguageSelection from './LoginSection';
import { localizedPath } from '@/lib/seo/routes';

/**
 * Footer-Linkhub: crawlbare interne Links auf alle wichtigen Inhaltsseiten.
 * (Die Ratgeber-Links im Header-Dropdown werden erst nach Klick gerendert und
 * sind daher für Crawler kaum sichtbar.)
 */
const footerLinks = {
    de: [
        { key: 'product', label: 'NFC Gepäckanhänger' },
        { key: 'howItWorks', label: "So funktioniert's" },
        { key: 'finderFlow', label: 'Finder-Flow' },
        { key: 'guides', label: 'Ratgeber' },
        { key: 'guideLostLuggage', label: 'Koffer verloren – was tun?' },
        { key: 'preventLoss', label: 'Gepäckverlust vermeiden' },
        { key: 'nfcVsQr', label: 'NFC vs. QR-Code' },
        { key: 'useCases', label: 'Anwendungsfälle' },
        { key: 'securityPrivacy', label: 'Sicherheit & Datenschutz' },
        { key: 'help', label: 'Hilfe' },
    ],
    en: [
        { key: 'product', label: 'NFC luggage tag' },
        { key: 'howItWorks', label: 'How it works' },
        { key: 'finderFlow', label: 'Finder flow' },
        { key: 'guides', label: 'Guides' },
        { key: 'preventLoss', label: 'Prevent luggage loss' },
        { key: 'nfcVsQr', label: 'NFC vs. QR code' },
        { key: 'securityPrivacy', label: 'Security & privacy' },
        { key: 'help', label: 'Help' },
    ],
} as const;

const Footer: React.FC = () => {
    const { language: lang } = useLanguage();
    const t = messages[lang];
        
    return (
        <footer className="mt-10 py-4 text-center text-sm text-gray-600">
            <nav aria-label={lang === 'de' ? 'Weitere Seiten' : 'More pages'} className="mx-auto max-w-5xl px-4">
                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                    {footerLinks[lang === 'en' ? 'en' : 'de'].map(({ key, label }) => {
                        const href = localizedPath(key, lang === 'en' ? 'en' : 'de');
                        return href ? (
                            <li key={key}>
                                <Link href={href} className="hover:text-gray-800 hover:underline">{label}</Link>
                            </li>
                        ) : null;
                    })}
                </ul>
            </nav>
            <div className="mt-4">
                <LanguageSelection />
                <div className="flex flex-col items-center space-y-2">
                    <nav className="flex items-center space-x-4">
                        <Link href="/impressum" className="hover:text-gray-800 underline">
                            {t.impressum.title}
                        </Link>
                    </nav>
                    <p>© {new Date().getFullYear()} Bag-Tag.de - {lang === 'de' ? 'Alle Rechte vorbehalten' : 'All rights reserved'}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;