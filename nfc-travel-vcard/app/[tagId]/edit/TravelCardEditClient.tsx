'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { useLanguage } from '../../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';


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
    const [formData, setFormData] = useState({
        tagName: '',
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
        guidePhone: '',
        destinationName: '',
        destinationAddress: ''
    });

    const tagTitle = formData.tagName?.trim() || t.productname;
    const ownerFullName = [formData.ownerFirstName, formData.ownerLastName].filter(Boolean).join(' ');

    const loadTagData = async (tagid: string, token: string) => {
        // Fetch tag data
        const headers: RequestInit | undefined = token != null ? { headers: { 'Authorization': `Bearer ${token}` } } : undefined;
        const dataResponse = await fetch(`/api/tags/${tagid}`, headers);

        if (dataResponse.ok) {
            const data = await dataResponse.json();
            setFormData(prev => ({ ...prev, ...data }));
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = await getToken();
            const response = await fetch(`/api/tags/${tagId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
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
                                            name="transportationProvider"
                                            value={formData.transportationProvider}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">{t.details}</label>
                                        <input
                                            type="text"
                                            name="transportationDetails"
                                            value={formData.transportationDetails}
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
                                            name="destinationName"
                                            value={formData.destinationName}
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
                                            name="guidePhone"
                                            value={formData.guidePhone}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={saving}
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
