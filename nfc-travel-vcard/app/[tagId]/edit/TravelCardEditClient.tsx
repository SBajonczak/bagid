'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { useLanguage } from '../../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import { FlightLeg } from '@/lib/types';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import AirportAutocomplete, { AirportOption } from '../../components/AirportAutocomplete';

interface LegError {
    arrivalBeforeDeparture?: boolean;
    departureBeforePrevArrival?: boolean;
}

function getLegErrors(legs: FlightLeg[]): LegError[] {
    const errors: LegError[] = legs.map(() => ({}));
    for (const type of ['outbound', 'return'] as const) {
        const typeLegs = legs.map((l, i) => ({ l, i })).filter(({ l }) => l.journeyType === type);
        for (let pos = 0; pos < typeLegs.length; pos++) {
            const { l, i } = typeLegs[pos];
            if (l.departureDatetime && l.arrivalDatetime) {
                if (new Date(l.arrivalDatetime) <= new Date(l.departureDatetime)) {
                    errors[i].arrivalBeforeDeparture = true;
                }
            }
            if (pos > 0) {
                const prev = typeLegs[pos - 1].l;
                if (prev.arrivalDatetime && l.departureDatetime) {
                    if (new Date(l.departureDatetime) < new Date(prev.arrivalDatetime)) {
                        errors[i].departureBeforePrevArrival = true;
                    }
                }
            }
        }
    }
    return errors;
}

const emptyLeg = (type: 'outbound' | 'return'): FlightLeg => ({
    journeyType: type,
    sequence: 1,
    carrier: '',
    flightNumber: '',
    departureAirport: '',
    departureDatetime: '',
    arrivalAirport: '',
    arrivalDatetime: '',
});

interface FlightLegsSectionProps {
    legs: FlightLeg[];
    legErrors: LegError[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tfl: Record<string, any>;
    onAddLeg: (type: 'outbound' | 'return') => void;
    onRemoveLeg: (idx: number) => void;
    onChangeLeg: (idx: number, field: keyof FlightLeg, value: string) => void;
    onSelectAirport: (idx: number, direction: 'departure' | 'arrival', airport: AirportOption) => void;
    showFlightMap: boolean;
    onToggleFlightMap: (val: boolean) => void;
}

const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none';

const FlightLegsSection: React.FC<FlightLegsSectionProps> = ({ legs, legErrors, tfl, onAddLeg, onRemoveLeg, onChangeLeg, onSelectAirport, showFlightMap, onToggleFlightMap }) => {
    const renderLegs = (type: 'outbound' | 'return', typeLabel: string, addLabel: string) => {
        const typed = legs.map((l, i) => ({ l, i })).filter(({ l }) => l.journeyType === type);
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-800">{typeLabel}</h3>
                    <button
                        type="button"
                        onClick={() => onAddLeg(type)}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                        + {addLabel}
                    </button>
                </div>
                {typed.map(({ l, i }, segIdx) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                {tfl.segment} {segIdx + 1}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveLeg(i)}
                                className="text-xs text-red-500 hover:text-red-700"
                            >
                                {tfl.remove}
                            </button>
                        </div>
                        {legErrors[i]?.departureBeforePrevArrival && (
                            <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                                {tfl.errorDepartureBeforePrevArrival}
                            </p>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.carrier}</label>
                                <input type="text" value={l.carrier} onChange={e => onChangeLeg(i, 'carrier', e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.flightNumber}</label>
                                <input type="text" value={l.flightNumber} onChange={e => onChangeLeg(i, 'flightNumber', e.target.value)} className={inputCls} placeholder="LH 400" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.depAirport}</label>
                                <AirportAutocomplete
                                    value={l.departureAirport}
                                    onChange={val => onChangeLeg(i, 'departureAirport', val)}
                                    onSelect={airport => onSelectAirport(i, 'departure', airport)}
                                    placeholder="FRA"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.depTime}</label>
                                <input
                                    type="datetime-local"
                                    value={l.departureDatetime ? l.departureDatetime.slice(0, 16) : ''}
                                    onChange={e => onChangeLeg(i, 'departureDatetime', e.target.value)}
                                    className={`${inputCls} ${legErrors[i]?.departureBeforePrevArrival ? 'border-red-400 focus:border-red-500' : ''}`}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.arrAirport}</label>
                                <AirportAutocomplete
                                    value={l.arrivalAirport}
                                    onChange={val => onChangeLeg(i, 'arrivalAirport', val)}
                                    onSelect={airport => onSelectAirport(i, 'arrival', airport)}
                                    placeholder="JFK"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">{tfl.arrTime}</label>
                                <input
                                    type="datetime-local"
                                    value={l.arrivalDatetime ? l.arrivalDatetime.slice(0, 16) : ''}
                                    onChange={e => onChangeLeg(i, 'arrivalDatetime', e.target.value)}
                                    className={`${inputCls} ${legErrors[i]?.arrivalBeforeDeparture ? 'border-red-400 focus:border-red-500' : ''}`}
                                />
                                {legErrors[i]?.arrivalBeforeDeparture && (
                                    <p className="text-xs text-red-600 mt-1">{tfl.errorArrivalBeforeDeparture}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {typed.length === 0 && (
                    <p className="text-sm text-slate-400 italic">{tfl.noLegs}</p>
                )}
            </div>
        );
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">{tfl.title}</h2>
            <div className="space-y-8">
                {renderLegs('outbound', tfl.outbound, tfl.addOutbound)}
                <hr className="border-slate-200" />
                {renderLegs('return', tfl.return, tfl.addReturn)}
                <hr className="border-slate-200" />
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-700">{tfl.showFlightMap}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{tfl.showFlightMapHint}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showFlightMap}
                            onChange={e => onToggleFlightMap(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                </div>
            </div>
        </section>
    );
};


interface TravelCardEditClientProps {
    tagId: string;
}

const TravelCardEditClient: React.FC<TravelCardEditClientProps> = ({ tagId }) => {
    const router = useRouter();
    const { isAuthenticated, getToken, isInitializing } = useAuth();
    const { language: lang } = useLanguage();
    const t = messages[lang].travelCard;

    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [flightLegs, setFlightLegs] = useState<FlightLeg[]>([]);
    const [formData, setFormData] = useState({
        tagName: '',
        transportation:'',
        ownerFirstName: '',
        ownerLastName: '',
        ownerEmail: '',
        ownerMobile: '',
        ownerAddress: '',
        transportationProvider: '',
        transportationDetails: '',
        transportationDate: '',
        guideFirstName: '',
        guideLastName: '',
        guideMobile: '',
        destinationAccommodation: '',
        destinationAddress: '',
        transportationNumber:'',
        showFlightMap: false,
    });

    const tagTitle = formData.tagName?.trim() || t.productname;
    const ownerFullName = [formData.ownerFirstName, formData.ownerLastName].filter(Boolean).join(' ');

    const loadTagData = async (tagid: string, token: string) => {
        const authHeaders = { headers: { 'Authorization': `Bearer ${token}` } };
        const [dataResponse, legsResponse] = await Promise.all([
            fetch(`/api/tags/${tagid}`, authHeaders),
            fetch(`/api/tags/${tagid}/flights`),
        ]);

        if (dataResponse.ok) {
            const data = await dataResponse.json();
            if (data.transportation==null)
                data.transportation= data.transportationProvider;
            if (data.transportationNumber==null)
                data.transportationNumber=data.transportationDetails;
            if (data.transportationDate)
                data.transportationDate = data.transportationDate.toString().slice(0, 10);
            setFormData(prev => ({ ...prev, ...data }));
        }

        if (legsResponse.ok) {
            const legs: FlightLeg[] = await legsResponse.json();
            setFlightLegs(legs);
        }
    };

    useEffect(() => {
        const verifyOwnership = async () => {
            if (isInitializing) return;


            if (!isAuthenticated && tagId !== "demo") {
                router.push(`/${tagId}`);
                return;
            }

            try {
                const token = await getToken();
                const response = await fetch(`/api/tag-owners/${tagId}/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok && tagId !== "demo") {
                    router.push(`/${tagId}`);
                    return;
                }

                setIsOwner(true);
                
                loadTagData(tagId, token);

            } catch (err) {
                console.error('Error verifying ownership:', err);
                router.push(`/${tagId}`);
            } finally {
                setLoading(false);
            }
        };

        verifyOwnership();
    }, [tagId, isAuthenticated, isInitializing, getToken, router]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddLeg = (type: 'outbound' | 'return') => {
        setFlightLegs(prev => [...prev, emptyLeg(type)]);
    };

    const handleRemoveLeg = (idx: number) => {
        setFlightLegs(prev => prev.filter((_, i) => i !== idx));
    };

    const handleLegChange = (idx: number, field: keyof FlightLeg, value: string) => {
        setFlightLegs(prev => {
            const updated = prev.map((leg, i) => i === idx ? { ...leg, [field]: value } : leg);

            if (field === 'arrivalDatetime' && value && prev[idx]?.arrivalDatetime) {
                const oldMs = new Date(prev[idx].arrivalDatetime).getTime();
                const newMs = new Date(value).getTime();
                const deltaMs = newMs - oldMs;
                if (!isNaN(deltaMs) && deltaMs !== 0) {
                    const journeyType = prev[idx].journeyType;
                    const typeIndices = prev
                        .map((l, i) => ({ l, i }))
                        .filter(({ l }) => l.journeyType === journeyType)
                        .map(({ i }) => i);
                    const pos = typeIndices.indexOf(idx);
                    const toShift = new Set(typeIndices.slice(pos + 1));

                    const shiftTime = (dt: string): string => {
                        if (!dt) return dt;
                        const shifted = new Date(new Date(dt).getTime() + deltaMs);
                        const pad = (n: number) => String(n).padStart(2, '0');
                        return `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}-${pad(shifted.getDate())}T${pad(shifted.getHours())}:${pad(shifted.getMinutes())}`;
                    };

                    return updated.map((leg, i) => {
                        if (!toShift.has(i)) return leg;
                        return {
                            ...leg,
                            departureDatetime: shiftTime(leg.departureDatetime),
                            arrivalDatetime: shiftTime(leg.arrivalDatetime),
                        };
                    });
                }
            }

            return updated;
        });
    };

    const handleLegAirportSelect = (idx: number, direction: 'departure' | 'arrival', airport: AirportOption) => {
        setFlightLegs(prev => prev.map((leg, i) => {
            if (i !== idx) return leg;
            return direction === 'departure'
                ? { ...leg, departureAirport: airport.iata, departureLat: airport.lat, departureLon: airport.lon, departureAirportName: airport.name }
                : { ...leg, arrivalAirport: airport.iata, arrivalLat: airport.lat, arrivalLon: airport.lon, arrivalAirportName: airport.name };
        }));
    };

    const legErrors = getLegErrors(flightLegs);
    const hasLegErrors = legErrors.some(e => e.arrivalBeforeDeparture || e.departureBeforePrevArrival);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (hasLegErrors) return;
        setSaving(true);

        try {
            const token = await getToken();
            const [fieldsRes, flightsRes] = await Promise.all([
                fetch(`/api/tags/${tagId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(formData),
                }),
                fetch(`/api/tags/${tagId}/flights`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ legs: flightLegs }),
                }),
            ]);

            if (fieldsRes.ok && flightsRes.ok) {
                alert(t.saveSuccess);
                router.push(`/${tagId}`);
            } else {
                alert(t.saveError);
            }
        } catch (err) {
            console.error('Error saving:', err);
            alert(t.saveError);
        } finally {
            setSaving(false);
        }
    };

    if (loading || isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isOwner) {
        return null;
    }

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
                                {t.edit} · {tagTitle}
                            </h1>
                            {ownerFullName && (
                                <p className="text-base text-slate-200">{ownerFullName}</p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                {t.productname} · {tagId}
                            </span>
                            {formData.transportationProvider && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {formData.transportationProvider}
                                </span>
                            )}
                            {formData.transportationDetails && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {formData.transportationDetails}
                                </span>
                            )}
                            {formData.transportationDate && (
                                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                                    {new Date(formData.transportationDate).toLocaleDateString(lang)}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                        
                            <button
                                type="button"
                                onClick={() => router.push(`/${tagId}`)}
                                className="inline-flex items-center justify-center rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-10 sm:py-12">
                    <div className="mx-auto max-w-4xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.tagDetails}</h2>
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-slate-700">{t.tagName}</label>
                                    <input
                                        type="text"
                                        name="tagName"
                                        value={formData.tagName}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        placeholder={t.tagNameHelp}
                                    />
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.about}</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.firstName}</label>
                                        <input
                                            type="text"
                                            name="ownerFirstName"
                                            value={formData.ownerFirstName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.lastName}</label>
                                        <input
                                            type="text"
                                            name="ownerLastName"
                                            value={formData.ownerLastName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.email}</label>
                                        <input
                                            type="email"
                                            name="ownerEmail"
                                            value={formData.ownerEmail}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.mobile}</label>
                                        <input
                                            type="tel"
                                            name="ownerMobile"
                                            value={formData.ownerMobile}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700">{t.address}</label>
                                        <textarea
                                            name="ownerAddress"
                                            value={formData.ownerAddress}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.travelData}</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.provider}</label>
                                        <input
                                            type="text"
                                            name="transportation"
                                            value={formData.transportation}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.details}</label>
                                        <input
                                            type="text"
                                            name="transportationNumber"
                                            value={formData.transportationNumber}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.date}</label>
                                        <input
                                            type="date"
                                            name="transportationDate"
                                            value={formData.transportationDate}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                    {t.destinationaddress || 'Destination'}
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">
                                            { t.destinationaddress || 'Name'}
                                        </label>
                                        <input
                                            type="text"
                                            name="destinationAccommodation"
                                            value={formData.destinationAccommodation}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.address}</label>
                                        <textarea
                                            name="destinationAddress"
                                            value={formData.destinationAddress}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.guide}</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.firstName}</label>
                                        <input
                                            type="text"
                                            name="guideFirstName"
                                            value={formData.guideFirstName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.lastName}</label>
                                        <input
                                            type="text"
                                            name="guideLastName"
                                            value={formData.guideLastName}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700">{t.mobile}</label>
                                        <input
                                            type="tel"
                                            name="guideMobile"
                                            value={formData.guideMobile}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <FlightLegsSection
                                legs={flightLegs}
                                legErrors={legErrors}
                                tfl={messages[lang].flightLegs}
                                onAddLeg={handleAddLeg}
                                onRemoveLeg={handleRemoveLeg}
                                onChangeLeg={handleLegChange}
                                onSelectAirport={handleLegAirportSelect}
                                showFlightMap={formData.showFlightMap}
                                onToggleFlightMap={val => setFormData(prev => ({ ...prev, showFlightMap: val }))}
                            />

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={saving || hasLegErrors}
                                    className="flex-1 rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
                                >
                                    {saving ? t.saving : t.save}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push(`/${tagId}`)}
                                    className="flex-1 rounded-xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                                >
                                    {t.cancel}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default TravelCardEditClient;
