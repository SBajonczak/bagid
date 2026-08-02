'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import { TravelData, FlightLeg } from '@/lib/types';
import NotificationModal from '../components/Tag/NotificationModal';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Building2, Lock, MapPin, Plane, ShieldCheck, User } from 'lucide-react';
import { getPublicConfig } from '@/lib/config';

dayjs.extend(localizedFormat);

const hasValue = (value: string | null | undefined): boolean => {
    return value !== null && value !== undefined && value !== '';
};

type InfoRow = {
    label: string;
    value?: string | null;
};

interface InfoPanelProps {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    rows: InfoRow[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title, icon: Icon, rows }) => {
    const visibleRows = rows.filter((row) => hasValue(row.value));
    if (visibleRows.length === 0) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-slate-900/90 p-2 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>
            <dl className="space-y-3">
                {visibleRows.map((row) => (
                    <div key={`${title}-${row.label}`} className="flex flex-col">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {row.label}
                        </dt>
                        <dd className="text-sm text-slate-900 break-words">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
};

interface TravelCardClientProps {
  tagId: string;
}

const TravelCardClient: React.FC<TravelCardClientProps> = ({ tagId }) => {
    const router = useRouter();
    const { language: lang } = useLanguage();
    const t = messages[lang].travelCard;

    const [travelData, setTravelData] = useState<Partial<TravelData> | null>(null);
    const [flightLegs, setFlightLegs] = useState<FlightLeg[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tagRegistered, setTagRegistered] = useState<boolean>(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [showNotifyButton, setShowNotifyButton] = useState(false);

    dayjs.locale(lang);

    const formattedDate = travelData?.transportationDate == null
        ? t.na
        : dayjs(travelData.transportationDate).format('L');
    
    useEffect(() => {
        const config = getPublicConfig();
        setShowNotifyButton(config.features.notifyButton);


        const checkIfTagExistsAndRegistered = async () => {
            try {
                if (tagId=="demo")
                {
                    setTagRegistered(true);
                    setLoading(false);
                    return;
                }
                const response = await fetch(`/api/tags/${tagId}/exists`);
                if (!response.ok) {
                    throw new Error('Tag does not exist');
                }
                const data = await response.json();
                setTagRegistered(data.registered);
                
                if (!data.registered) {
                    router.push(`/register/${tagId}`);
                }
            } catch (err) {
                console.error('Error checking tag:', err);
                setError('Tag not found');
                setLoading(false);
            }
        };

        if (tagId) {
            checkIfTagExistsAndRegistered();
        }

    }, [tagId, router]);

    useEffect(() => {        
        const fetchTravelData = async () => {
            if (!tagRegistered) return;

            try {
                setLoading(true);
                const [dataRes, legsRes] = await Promise.all([
                    fetch(`/api/tags/${tagId}`),
                    fetch(`/api/tags/${tagId}/flights`),
                ]);

                if (!dataRes.ok) {
                    throw new Error(`HTTP error! status: ${dataRes.status}`);
                }

                const data = await dataRes.json();
                setTravelData(data);

                if (legsRes.ok) {
                    const legs: FlightLeg[] = await legsRes.json();
                    setFlightLegs(legs);
                }
            } catch (err) {
                console.error('Error fetching travel data:', err);
                setError(t.noData || 'Could not load travel data');
            } finally {
                setLoading(false);
            }
        };

        if (tagRegistered) {
            fetchTravelData();
        }
    }, [tagId, tagRegistered, t]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <NavigationBar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                        <p>{error}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!travelData) {
        return (
            <div className="min-h-screen flex flex-col">
                <NavigationBar />
                <div className="flex flex-grow items-center justify-center px-4 text-center">
                    <p className="text-lg text-slate-600">{t.noData}</p>
                </div>
                <Footer />
            </div>
        );
    }

    const getRelevantJourney = (legs: FlightLeg[]): { type: 'outbound' | 'return'; legs: FlightLeg[] } | null => {
        if (legs.length === 0) return null;
        const now = new Date();
        const outbound = legs.filter(l => l.journeyType === 'outbound').sort((a, b) => a.sequence - b.sequence);
        const returnLegs = legs.filter(l => l.journeyType === 'return').sort((a, b) => a.sequence - b.sequence);

        const getWindow = (journeyLegs: FlightLeg[]) => {
            if (!journeyLegs.length) return null;
            const from = new Date(new Date(journeyLegs[0].departureDatetime).getTime() - 24 * 3600 * 1000);
            const until = new Date(new Date(journeyLegs[journeyLegs.length - 1].arrivalDatetime).getTime() + 24 * 3600 * 1000);
            return { from, until };
        };

        const outWin = getWindow(outbound);
        const retWin = getWindow(returnLegs);

        if (retWin && now >= retWin.from && now <= retWin.until) return { type: 'return', legs: returnLegs };
        if (outWin && now >= outWin.from && now <= outWin.until) return { type: 'outbound', legs: outbound };

        // No active journey: pick the most recently started one
        type Candidate = { from: Date; type: 'outbound' | 'return'; legs: FlightLeg[] };
        const candidates: Candidate[] = [];
        if (outWin && outWin.from <= now) candidates.push({ from: outWin.from, type: 'outbound', legs: outbound });
        if (retWin && retWin.from <= now) candidates.push({ from: retWin.from, type: 'return', legs: returnLegs });

        if (candidates.length === 0) {
            return outbound.length ? { type: 'outbound', legs: outbound } : (returnLegs.length ? { type: 'return', legs: returnLegs } : null);
        }
        candidates.sort((a, b) => b.from.getTime() - a.from.getTime());
        return { type: candidates[0].type, legs: candidates[0].legs };
    };

    const relevantJourney = getRelevantJourney(flightLegs);
    const tfl = messages[lang].flightLegs;

    const localeMessages = messages[lang];
    const marketingCopy = localeMessages.noDataSection;
    const dashboardCopy = localeMessages.dashboard;
    const privacyCopy = lang === 'de'
        ? {
            highlight: 'Kontaktdaten bleiben geschützt. Nutze den Button "Besitzer benachrichtigen", um eine sichere Nachricht zu senden.',
            placeholder: 'Geschützt – bitte "Besitzer benachrichtigen" nutzen.'
        }
        : {
            highlight: 'Contact details stay private. Use the "Notify owner" button to send a secure message.',
            placeholder: 'Protected – please use "Notify owner".'
        };

    const ownerFullName = [travelData.ownerFirstName, travelData.ownerLastName].filter(Boolean).join(' ');
    const guideFullName = [travelData.guideFirstName, travelData.guideLastName].filter(Boolean).join(' ');
    const transportMode = travelData.transportation || travelData.transportationProvider;
    const transportNumber = travelData.transportationNumber || travelData.transportationDetails;

    const ownerRows: InfoRow[] = [
        { label: t.firstName, value: travelData.ownerFirstName },
        { label: t.lastName, value: travelData.ownerLastName },
        { label: t.address, value: travelData.ownerAddress },
        { label: t.email, value: showNotifyButton && hasValue(travelData.ownerEmail) ? privacyCopy.placeholder : travelData.ownerEmail },
        { label: t.mobile, value: showNotifyButton && hasValue(travelData.ownerMobile) ? privacyCopy.placeholder : travelData.ownerMobile },
        { label: t.landline, value: showNotifyButton && hasValue(travelData.ownerLandline) ? privacyCopy.placeholder : travelData.ownerLandline },
        { label: t.other, value: travelData.ownerOther },
    ];

    const guideRows: InfoRow[] = [
        { label: t.guide, value: guideFullName },
        { label: t.email, value: travelData.guideEmail },
        { label: t.mobile, value: travelData.guideMobile },
        { label: t.landline, value: travelData.guideLandline },
    ];

    const destinationRows: InfoRow[] = [
        { label: t.destinationaddress_Accmodation || t.destinationaddress, value: travelData.destinationAccommodation },
        { label: t.destinationaddress_Address || t.destinationaddress, value: travelData.destinationAddress },
    ];

    const transportRows: InfoRow[] = [
        { label: t.provider, value: transportMode },
        { label: t.details, value: transportNumber },
        { label: t.date, value: travelData.transportationDate!= null ? formattedDate : null },
    ];

    const tagTitle = travelData.tagName || t.productname;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <NavigationBar />
            <main className="flex-grow">
                <section className="bg-slate-950 px-4 py-12 text-white sm:py-16">
                    <div className="mx-auto flex max-w-5xl flex-col gap-6">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-lime-300">
                                {t.secureAccessMessage}
                            </p>
                            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                                {tagTitle}
                            </h1>
                            {hasValue(ownerFullName) && (
                                <p className="text-base text-slate-200">
                                    {ownerFullName}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                {(dashboardCopy?.tagId || 'Tag-ID')}: {tagId}
                            </span>
                            {hasValue(transportMode) && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {transportMode}
                                </span>
                            )}
                            {hasValue(transportNumber) && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {transportNumber}
                                </span>
                            )}
                            {travelData.transportationDate != null && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {formattedDate}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {showNotifyButton && (
                                <button
                                    onClick={() => setIsNotificationModalOpen(true)}
                                    className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                                >
                                    {t.notify}
                                </button>
                            )}
                            <Link
                                href={`/${tagId}/edit`}
                                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {t.edit}
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-10 sm:py-12">
                    <div className="mx-auto max-w-5xl space-y-8">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">{marketingCopy.headline}</h2>
                            <p className="text-sm text-slate-600">
                                {marketingCopy.subline}
                            </p>
                            {showNotifyButton && (
                            <div className="mt-4 flex items-start gap-3 rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-slate-800">
                                <Lock className="mt-0.5 h-5 w-5 text-lime-700" aria-hidden="true" />
                                <p className="text-sm leading-relaxed">
                                    {privacyCopy.highlight} 
                                </p>
                            </div>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <InfoPanel title={t.about} icon={User} rows={ownerRows} />
                            <InfoPanel title={t.travelData} icon={Plane} rows={transportRows} />
                            <InfoPanel title={t.destinationaddress} icon={MapPin} rows={destinationRows} />
                            <InfoPanel title={t.guide} icon={ShieldCheck} rows={guideRows} />
                        </div>

                        {relevantJourney && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="rounded-full bg-slate-900/90 p-2 text-white">
                                        <Plane className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {tfl.title} – {relevantJourney.type === 'outbound' ? tfl.outbound : tfl.return}
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {relevantJourney.legs.map((leg, idx) => (
                                        <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                                                {tfl.segment} {idx + 1}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                {leg.carrier && <span>{leg.carrier}</span>}
                                                {leg.flightNumber && <span className="text-slate-500">· {leg.flightNumber}</span>}
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                                <span className="font-medium">{leg.departureAirport}</span>
                                                <span>{leg.departureDatetime ? dayjs(leg.departureDatetime).format('L LT') : ''}</span>
                                                <span className="text-slate-400">→</span>
                                                <span className="font-medium">{leg.arrivalAirport}</span>
                                                <span>{leg.arrivalDatetime ? dayjs(leg.arrivalDatetime).format('L LT') : ''}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {hasValue(travelData.destinationAccommodation) && (
                            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="rounded-full bg-slate-900/90 p-2 text-white">
                                        <Building2 className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {travelData.destinationAccommodation}
                                        </h3>
                                        <p className="text-sm text-slate-600">{t.destinationaddress}</p>
                                    </div>
                                </div>
                                {hasValue(travelData.destinationAddress) && (
                                    <p className="text-sm text-slate-700">
                                        {travelData.destinationAddress}
                                    </p>
                                )}
                            </section>
                        )}
                    </div>
                </section>
            </main>

            <Footer />

            {isNotificationModalOpen && (
                <NotificationModal
                    tagId={tagId}
                    isOpen={isNotificationModalOpen}
                    supportsEmail={hasValue(travelData.ownerEmail)}
                    supportsSms={hasValue(travelData.ownerMobile)}
                    onClose={() => setIsNotificationModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TravelCardClient;
