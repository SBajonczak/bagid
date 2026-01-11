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

    useEffect(() => {
        const verifyOwnership = async () => {
            if (isInitializing) return;
            
            if (!isAuthenticated) {
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

                if (!response.ok) {
                    router.push(`/${tagId}`);
                    return;
                }

                setIsOwner(true);
                // Fetch tag data
                const dataResponse = await fetch(`/api/tags/${tagId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (dataResponse.ok) {
                    const data = await dataResponse.json();
                    setFormData(prev => ({ ...prev, ...data }));
                }
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
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6">{t.edit} - {t.productname}</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tag Details */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">{t.tagDetails}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-1">{t.tagName}</label>
                                    <input
                                        type="text"
                                        name="tagName"
                                        value={formData.tagName}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder={t.tagNameHelp}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Owner Information */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">{t.about}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">{t.firstName}</label>
                                    <input
                                        type="text"
                                        name="ownerFirstName"
                                        value={formData.ownerFirstName}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">{t.lastName}</label>
                                    <input
                                        type="text"
                                        name="ownerLastName"
                                        value={formData.ownerLastName}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">{t.email}</label>
                                    <input
                                        type="email"
                                        name="ownerEmail"
                                        value={formData.ownerEmail}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">{t.mobile}</label>
                                    <input
                                        type="tel"
                                        name="ownerMobile"
                                        value={formData.ownerMobile}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block font-medium mb-1">{t.address}</label>
                                    <textarea
                                        name="ownerAddress"
                                        value={formData.ownerAddress}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Travel Data */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">{t.travelData}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">{t.provider}</label>
                                    <input
                                        type="text"
                                        name="transportationProvider"
                                        value={formData.transportationProvider}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">{t.details}</label>
                                    <input
                                        type="text"
                                        name="transportationDetails"
                                        value={formData.transportationDetails}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">{t.date}</label>
                                    <input
                                        type="date"
                                        name="transportationDate"
                                        value={formData.transportationDate}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {saving ? t.saving : t.save}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push(`/${tagId}`)}
                                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TravelCardEditClient;
