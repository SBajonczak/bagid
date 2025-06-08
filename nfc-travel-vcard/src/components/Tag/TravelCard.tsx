import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { TravelData } from '../../types';
import { logger } from '@/utils/logger';
import NotificationModal from './NotificationModal';

dayjs.extend(localizedFormat);

/**
 * Helper function to check if a field has a meaningful value
 */
const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
};

/**
 * TravelCard component displays travel information from an NFC tag
 */
const TravelCard: React.FC = () => {
    // Hooks for routing and localization
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;

    // Component state
    const [travelData, setTravelData] = useState<Partial<TravelData> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tagRegistered, setTagRegistered] = useState<boolean>(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    // Set language for dayjs
    dayjs.locale(lang);

    // Format date for display
    const formattedDate = travelData?.transportationDate == null
        ? t.na
        : dayjs(travelData.transportationDate).format('L');
    
    /**
     * Check if tag exists and if it's registered
     */
    useEffect(() => {
        const checkTagStatus = async () => {
            if (!tagId || tagId === 'demo') return;

            try {
                const registeredResponse = await fetch(`/api/tags/${tagId}/registered`);
                const { exists: registered } = await registeredResponse.json();
                logger.debug("Tag exists:", !!registered);
                setTagRegistered(!!registered);
                
                // If tag doesn't exist, redirect to registration
                if (!registered) {
                    navigate(`/register/${tagId}`);
                }
            } catch (err) {
                console.error('Error checking tag status:', err);
            }
        };

        logger.debug("Checking tag status for tagId:", tagId);
        checkTagStatus();
    }, [tagId, navigate]);

    /**
     * Fetch travel data from the API
     */
    useEffect(() => {
        const fetchTravelData = async () => {
            if (!tagId || tagRegistered === false) return;

            try {
                setLoading(true);
                const response = await fetch(`/api/travel/${tagId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTravelData(data);
            } catch (err) {
                console.error('Error fetching travel data:', err);
                setError('Error loading travel data');
            } finally {
                setLoading(false);
            }
        };

        logger.debug("Fetching travel data for tagId:", tagId, "Registered:", tagRegistered);
        fetchTravelData();
    }, [tagId, tagRegistered]);

    // Component rendering states
    if (loading) {
        return <div className="text-center p-8">{t.loading}</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }

    if (!travelData) {
        return <div className="text-center p-8">{t.noData}</div>;
    }

    // Render data sections
    const renderOwnerSection = () => {
        if (!travelData) return null;
        
        return (
            <section className="mb-8">
                <h3 className="px-3 py-2 m-0 font-semibold bg-blue-700 text-white">
                    {t.about}
                </h3>
                <table className="w-full border-collapse">
                    <tbody>
                        {(hasValue(travelData.ownerFirstName) || hasValue(travelData.ownerLastName)) && (
                            <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                                {hasValue(travelData.ownerFirstName) && (
                                    <>
                                        <td className="font-bold text-blue-800">{t.firstName}</td>
                                        <td className="text-gray-800">{travelData.ownerFirstName}</td>
                                    </>
                                )}
                                {hasValue(travelData.ownerLastName) && (
                                    <>
                                        <td className="font-bold text-blue-800">{t.lastName}</td>
                                        <td className="text-gray-800">{travelData.ownerLastName}</td>
                                    </>
                                )}
                            </tr>
                        )}
                        
                        {/* Additional owner info rows */}
                        {renderOwnerInfoRows()}
                    </tbody>
                </table>
            </section>
        );
    };
    
    const renderOwnerInfoRows = () => {
        if (!travelData) return null;
        
        return (
            <>
                {(hasValue(travelData.ownerAddress) || hasValue(travelData.ownerEmail)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.ownerAddress) && (
                            <>
                                <td className="font-bold text-blue-800">{t.address}</td>
                                <td className="text-gray-800">{travelData.ownerAddress}</td>
                            </>
                        )}
                        {hasValue(travelData.ownerEmail) && (
                            <>
                                <td className="font-bold text-blue-800">{t.email}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`mailto:${travelData.ownerEmail}`}>
                                        {travelData.ownerEmail}
                                    </a>
                                </td>
                            </>
                        )}
                    </tr>
                )}

                {(hasValue(travelData.ownerMobile) || hasValue(travelData.ownerLandline)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.ownerMobile) && (
                            <>
                                <td className="font-bold text-blue-800">{t.mobile}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.ownerMobile}`}>
                                        {travelData.ownerMobile}
                                    </a>
                                </td>
                            </>
                        )}
                        {hasValue(travelData.ownerLandline) && (
                            <>
                                <td className="font-bold text-blue-800">{t.landline}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.ownerLandline}`}>
                                        {travelData.ownerLandline}
                                    </a>
                                </td>
                            </>
                        )}
                    </tr>
                )}

                {(hasValue(travelData.ownerOther) || hasValue(travelData.destinationAccommodation)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.ownerOther) && (
                            <>
                                <td className="font-bold text-blue-800">{t.other}</td>
                                <td className="text-gray-800">{travelData.ownerOther}</td>
                            </>
                        )}
                        {hasValue(travelData.destinationAccommodation) && (
                            <>
                                <td className="font-bold text-blue-800">{t.destinationaddress_Accmodation}</td>
                                <td className="text-gray-800">{travelData.destinationAccommodation}</td>
                            </>
                        )}
                    </tr>
                )}
            </>
        );
    };

    const renderTravelDataSection = () => {
        if (!travelData) return null;
        
        const hasTravelData = hasValue(travelData.transportation) || 
            hasValue(travelData.transportationNumber) || 
            hasValue(travelData.transportationDate);
            
        if (!hasTravelData) return null;
        
        return (
            <section className="mb-8">
                <h3 className="bg-blue-700 text-white my-4 font-semibold px-3 py-2 m-0">{t.travelData}</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-700 text-white">
                            {hasValue(travelData.transportation) && <th className="p-2 font-bold">{t.provider}</th>}
                            {hasValue(travelData.transportationNumber) && <th className="p-2 font-bold">{t.details}</th>}
                            {hasValue(travelData.transportationDate) && <th className="p-2 font-bold">{t.date}</th>}
                            {hasValue(travelData.ownerOther) && <th className="p-2 font-bold">{t.other}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100 text-gray-800">
                            {hasValue(travelData.transportation) && <td className="p-2">{travelData.transportation}</td>}
                            {hasValue(travelData.transportationNumber) && <td className="p-2">{travelData.transportationNumber}</td>}
                            {hasValue(travelData.transportationDate) && <td className="p-2">{formattedDate}</td>}
                            {hasValue(travelData.ownerOther) && <td className="p-2">{travelData.ownerOther}</td>}
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    };

    const renderGuideSection = () => {
        if (!travelData) return null;
        
        const hasGuideData = hasValue(travelData.guideFirstName) || 
            hasValue(travelData.guideLastName) || 
            hasValue(travelData.guideEmail) ||
            hasValue(travelData.guideMobile) ||
            hasValue(travelData.guideLandline);
            
        if (!hasGuideData) return null;
        
        return (
            <section>
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.guide}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        {renderGuideInfoRows()}
                    </tbody>
                </table>
            </section>
        );
    };
    
    const renderGuideInfoRows = () => {
        if (!travelData) return null;
        
        return (
            <>
                {(hasValue(travelData.guideFirstName) || hasValue(travelData.guideLastName)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.guideFirstName) && (
                            <>
                                <td className="font-bold text-blue-800">{t.firstName}</td>
                                <td className="text-gray-800">{travelData.guideFirstName}</td>
                            </>
                        )}
                        {hasValue(travelData.guideLastName) && (
                            <>
                                <td className="font-bold text-blue-800">{t.lastName}</td>
                                <td className="text-gray-800">{travelData.guideLastName}</td>
                            </>
                        )}
                    </tr>
                )}

                {(hasValue(travelData.guideEmail) || hasValue(travelData.guideMobile)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.guideEmail) && (
                            <>
                                <td className="font-bold text-blue-800">{t.email}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`mailto:${travelData.guideEmail}`}>
                                        {travelData.guideEmail}
                                    </a>
                                </td>
                            </>
                        )}
                        {hasValue(travelData.guideMobile) && (
                            <>
                                <td className="font-bold text-blue-800">{t.mobile}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.guideMobile}`}>
                                        {travelData.guideMobile}
                                    </a>
                                </td>
                            </>
                        )}
                    </tr>
                )}

                {(hasValue(travelData.guideLandline) || hasValue(travelData.ownerOther)) && (
                    <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                        {hasValue(travelData.guideLandline) && (
                            <>
                                <td className="font-bold text-blue-800">{t.landline}</td>
                                <td>
                                    <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.guideLandline}`}>
                                        {travelData.guideLandline}
                                    </a>
                                </td>
                            </>
                        )}
                        {hasValue(travelData.ownerOther) && (
                            <>
                                <td className="font-bold text-blue-800">{t.other}</td>
                                <td className="text-gray-800">{travelData.ownerOther}</td>
                            </>
                        )}
                    </tr>
                )}
            </>
        );
    };
    
    const renderDestinationSection = () => {
        if (!travelData) return null;
        
        const hasDestinationData = hasValue(travelData.destinationAccommodation) || 
            hasValue(travelData.destinationAddress);
            
        if (!hasDestinationData) return null;
        
        return (
            <section>
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.destinationaddress}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        {hasValue(travelData.destinationAccommodation) && (
                            <tr>
                                <td className="w-36 font-bold">{t.destinationaddress_Accmodation}</td>
                                <td>{travelData.destinationAccommodation}</td>
                            </tr>
                        )}
                        {hasValue(travelData.destinationAddress) && (
                            <tr>
                                <td className="w-36 font-bold">{t.destinationaddress_Address}</td>
                                <td>{travelData.destinationAddress}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        );
    };

    return (
        <div className="travel-card text-black bg-white rounded-lg shadow-md p-6 w-full mx-auto my-6">
            {/* Header section with title and action buttons */}
            <div className="text-center mb-6">
                <h1 className="font-bold uppercase text-2xl my-2">
                    {travelData.tagName || t.suitcase}
                </h1>
                <div className="flex justify-between mt-4">
                    <Link to="/" className="bg-gray-600 text-white rounded px-8 py-3 text-lg cursor-pointer inline-block text-center flex-1 hover:bg-gray-700">
                        {t.back}
                    </Link>
                    <Link to={`/${tagId}/edit`} className="bg-blue-700 text-white rounded px-8 py-3 text-lg cursor-pointer inline-block text-center ml-4 flex-1">
                        {t.edit}
                    </Link>
                </div>
            </div>

            {/* Data sections */}
            {renderOwnerSection()}
            {renderTravelDataSection()}
            {renderGuideSection()}
            {renderDestinationSection()}

            {/* Notification Modal */}
            {travelData.ownerEmail && (
                <NotificationModal 
                    isOpen={isNotificationModalOpen}
                    onClose={() => setIsNotificationModalOpen(false)}
                    ownerEmail={travelData.ownerEmail}
                    tagId={tagId || ''}
                />
            )}
        </div>
    );
};

export default TravelCard;