'use client';

import Image from 'next/image';
import Link from 'next/link';
import { messages } from '@/lib/i18n';
import { useLanguage } from './LanguageProvider';
import { BatteryCharging, Database, Infinity, RefreshCw, ShieldCheck } from 'lucide-react';

const heroCopy = {
    de: {
        badge: 'Einmal kaufen, dauerhaft geschützt',
        title: 'Der NFC Travel Tag für sorgenfreies Reisen',
        subtitle: 'Kein Abo, keine Batterien, keine verlorenen Daten – dein Gepäck bleibt jederzeit identifizierbar.',
        supporting: 'Bag-Tag kombiniert NFC und QR-Code, damit Finder dich sofort kontaktieren können. Änderungen an deinen Kontaktdaten nimmst du online in Sekunden vor.',
        primaryCta: 'Jetzt Bag-Tag sichern',
        secondaryCta: 'Demo ansehen',
        highlights: [
            { icon: Infinity, title: 'Lebenslange Nutzung', description: 'Einmal kaufen, beliebig oft verwenden – ohne laufende Gebühren.' },
            { icon: BatteryCharging, title: 'Ohne Batterie', description: 'Passives NFC & QR funktionieren ohne Pflegeaufwand und sind immer abrufbereit.' },
            { icon: RefreshCw, title: 'Daten immer online', description: 'Aktualisiere Reise- und Kontaktdaten in Echtzeit – weltweit verfügbar.' },
        ],
        imageAlt: 'Bag-Tag NFC Reiseanhänger am Koffer',
        statLabel: 'Garantiert zugreifbare Kontaktdaten',
        statList: [
            'Keine App nötig – jedes Smartphone kann scannen.',
            'Finder erhalten sofort sichere Kontaktmöglichkeiten.',
            'Unterwegs editierbar und DSGVO-konform gespeichert.',
        ],
        detailFallback: [
            'NFC und QR-Code arbeiten redundant, damit jede Airline und jeder Finder Zugang erhält.',
            'Finder können dich kontaktieren oder den Versand anstoßen, ohne sensible Daten preiszugeben.',
            'Änderungen deiner Kontaktdaten werden sofort live geschaltet – kein neuer Tag nötig.',
        ],
        price: '12,99 €',
    },
    en: {
        badge: 'Buy once, travel worry-free',
        title: 'The NFC travel tag built for lifetime use',
        subtitle: 'No subscription, no batteries, no missing data – your luggage stays identifiable anywhere.',
        supporting: 'Bag-Tag blends NFC and QR so honest finders can reach you instantly. Update your contact details online within seconds whenever plans change.',
        primaryCta: 'Get your Bag-Tag',
        secondaryCta: 'View demo',
        highlights: [
            { icon: Infinity, title: 'Lifetime usage', description: 'Pay once and keep using it on every trip – zero recurring fees.' },
            { icon: BatteryCharging, title: 'Battery-free tech', description: 'Passive NFC & QR require no charging and stay ready in any climate.' },
            { icon: RefreshCw, title: 'Always up to date', description: 'Edit your travel or contact info online and publish instantly.' },
        ],
        imageAlt: 'Bag-Tag NFC luggage tag on suitcase',
        statLabel: 'Secure contact data, always reachable',
        statList: [
            'Works with any modern smartphone without an app.',
            'Finders see the details you share and nothing else.',
            'Fully GDPR compliant and editable on the go.',
        ],
        detailFallback: [
            'NFC plus QR ensure redundancy across airports and devices.',
            'Finders can notify you or arrange shipping without exposing private data.',
            'Update your contact info remotely without replacing the tag.',
        ],
        price: '€10.99',
    },
} as const;

const Header: React.FC = () => {
    const { language } = useLanguage();
    const locale = language === 'de' ? 'de' : 'en';
    const copy = heroCopy[locale];
    const localeMessages = messages[language as keyof typeof messages];
    const t = localeMessages.noDataSection;
    
    const featureList = Array.isArray(t.features) ? t.features : [];
    const priceLabel = (locale === 'de' ? 'pro Stück' : 'per piece');
    const shippingLabel = (locale === 'de' ? 'Kostenloser Versand ab 2 Stück' : 'Free shipping from 2 pieces');
    const featuredFeatures = featureList.slice(0, 3);
    const detailIcons = [Database, ShieldCheck, RefreshCw];

    return (
        <header className="relative isolate overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0" aria-hidden="true">
                <video
                    className="hidden h-full w-full object-cover motion-safe:block"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/assets/productimage.webp"
                    controls={false}
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback"
                    aria-hidden="true"
                >
                    <source src="/assets/bagid-loop.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
                </video>
                <Image
                    src="/assets/productimage.webp"
                    alt=""
                    className="h-full w-full object-cover motion-safe:hidden"
                    aria-hidden="true"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-950/70 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-stretch lg:gap-16 lg:py-24">
                <div className="flex-1 space-y-6">
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">
                        {copy.badge}
                    </span>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                            {copy.title}
                        </h1>
                        <p className="max-w-2xl text-lg text-slate-100 sm:text-xl">
                            {copy.subtitle}
                        </p>
                        <p className="max-w-2xl text-base text-slate-200">
                            {copy.supporting}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <a
                            href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=bag-tag&utm_medium=hero&utm_campaign=landing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        >
                            {copy.primaryCta}
                        </a>
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            {copy.secondaryCta}
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {copy.highlights.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="rounded-2xl bg-white/90 p-4 text-slate-900 shadow-lg backdrop-blur">
                                <Icon className="mb-3 h-6 w-6 text-slate-700" aria-hidden="true" />
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</p>
                                <p className="text-sm text-slate-700">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 max-w-xl self-stretch rounded-3xl border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl backdrop-blur lg:max-w-md">
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200">
                        <Image
                            src="/assets/productimage.webp"
                            alt={copy.imageAlt}
                            className="object-cover"
                            layout="fill"
                        />
                    </div>
                    <div className="mt-6 space-y-4">
                        <p className="text-sm font-semibold text-slate-500">{copy.statLabel}</p>
                        <div className="rounded-2xl border border-lime-200 bg-lime-50 p-5 text-slate-900">
                            <p className="text-3xl font-bold">{copy.price}</p>
                            <p className="text-sm text-slate-600">{priceLabel}</p>
                            <p className="mt-2 text-sm text-slate-600">{shippingLabel}</p>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {copy.statList.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 text-green-500" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <dl className="mt-4 grid gap-3 text-sm">
                            {featuredFeatures.map((feature, idx) => {
                                const DetailIcon = detailIcons[idx] ?? Database;
                                return (
                                    <div key={feature} className="flex items-start gap-2">
                                        <DetailIcon className="mt-0.5 h-4 w-4 text-slate-500" aria-hidden="true" />
                                        <div>
                                            <dt className="font-semibold text-slate-700">{feature}</dt>
                                            <dd className="text-slate-600">{copy.detailFallback[idx] ?? copy.supporting}</dd>
                                        </div>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;