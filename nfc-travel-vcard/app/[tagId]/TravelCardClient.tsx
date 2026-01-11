'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import { TravelData } from '@/lib/types';
import NotificationModal from '../components/Tag/NotificationModal';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Link from 'next/link';

dayjs.extend(localizedFormat);

const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
};

interface TravelCardClientProps {
  tagId: string;
}

const TravelCardClient: React.FC<TravelCardClientProps> = ({ tagId }) => {
    const router = useRouter();
    const { language: lang } = useLanguage();
    const t = messages[lang].travelCard;

    const [travelData, setTravelData] = useState<Partial<TravelData> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tagRegistered, setTagRegistered] = useState<boolean>(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    dayjs.locale(lang);

    const formattedDate = travelData?.transportationDate == null
        ? t.na
        : dayjs(travelData.transportationDate).format('L');
    
    useEffect(() => {
        const checkIfTagExistsAndRegistered = async () => {
            try {
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
                const response = await fetch(`/api/tags/${tagId}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setTravelData(data);
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

    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">{t.productname}</h1>
                        <Link 
                            href={`/${tagId}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {t.edit}
                        </Link>
                    </div>

                    {/* Owner Information */}
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">{t.about}</h2>
                        {hasValue(travelData?.ownerFirstName) && (
                            <p><strong>{t.firstName}</strong> {travelData?.ownerFirstName}</p>
                        )}
                        {hasValue(travelData?.ownerLastName) && (
                            <p><strong>{t.lastName}</strong> {travelData?.ownerLastName}</p>
                        )}
                        {hasValue(travelData?.ownerAddress) && (
                            <p><strong>{t.address}</strong> {travelData?.ownerAddress}</p>
                        )}
                        {hasValue(travelData?.ownerEmail) && (
                            <p><strong>{t.email}</strong> {travelData?.ownerEmail}</p>
                        )}
                        {hasValue(travelData?.ownerMobile) && (
                            <p><strong>{t.mobile}</strong> {travelData?.ownerMobile}</p>
                        )}
                    </section>

                    {/* Travel Data */}
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">{t.travelData}</h2>
                        {hasValue(travelData?.transportationProvider) && (
                            <p><strong>{t.provider}</strong> {travelData?.transportationProvider}</p>
                        )}
                        {hasValue(travelData?.transportationDetails) && (
                            <p><strong>{t.details}</strong> {travelData?.transportationDetails}</p>
                        )}
                        {hasValue(travelData?.transportationDate) && (
                            <p><strong>{t.date}</strong> {formattedDate}</p>
                        )}
                    </section>

                    {/* Notify Owner Button */}
                    <button
                        onClick={() => setIsNotificationModalOpen(true)}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
                    >
                        {t.notify}
                    </button>
                </div>
            </main>

            <Footer />

            {/* Notification Modal */}
            {isNotificationModalOpen && (
                <NotificationModal
                    tagId={tagId}
                    recipientEmail={travelData?.ownerEmail || ''}
                    onClose={() => setIsNotificationModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TravelCardClient;
