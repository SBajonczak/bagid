import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { TravelData } from '../../types';
import authService from '../../services/AuthService';
import { logger } from '@/utils/logger';

dayjs.extend(localizedFormat);

const TravelCard: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;
    const editText = lang === 'de' ? 'Bearbeiten' : 'Edit';
    const registerText = lang === 'de' ? 'Tag registrieren' : 'Register Tag';

    // State for travel data
    const [travelData, setTravelData] = useState<Partial<TravelData> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tagRegistered, setTagRegistered] = useState<boolean>(false);

    // Check if tag exists and if user is the owner
    useEffect(() => {
        logger.debug("Checking tag status for tagId:", tagId);
        const checkTagStatus = async () => {
            if (!tagId || tagId === 'demo') return;

            try {
                // First check if tag exists
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

        checkTagStatus();
    }, [tagId, navigate]);

    // Fetch data from the API
    useEffect(() => {
        logger.debug("Fetching travel data for tagId:", tagId, "Registered:", tagRegistered);
        const fetchTravelData = async () => {
            if (!tagId || tagRegistered === false) return;

            try {
                console.log(`Fetching data for tagId: ${tagId}`);
                const response = await fetch(`/api/travel/${tagId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTravelData(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching travel data:', err);
                setError('Error loading travel data');
                setLoading(false);
            }
        };

        fetchTravelData();
    }, [tagId, tagRegistered]);

    // Set language for dayjs
    dayjs.locale(lang);

    // Localized "N/A" text
    const naText = lang === 'de' ? 'k.A.' : 'N/A';

    // Format date
    const formattedDate =
        travelData?.transportationDate == null
            ? naText
            : dayjs(travelData.transportationDate).format('L');


    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }

    if (!travelData) {
        return <div className="text-center p-8">No data available</div>;
    }

    return (
        <div className="travel-card text-black bg-white rounded-lg shadow-md p-6 w-full mx-auto my-6">
            <div className="text-center mb-6">
                <h1 className="font-bold uppercase text-2xl my-2">{t.suitcase}</h1>
                <div className="text-gray-600">{t.favorite}</div>
                <div className="flex justify-between mt-4">
                    <div className="bg-red-700 text-white rounded px-8 py-3 text-lg cursor-pointer inline-block text-center flex-1">
                        {t.notify}
                    </div>

                    {/* Show edit button only if user is owner or demo */}
                   
                        <Link to={`/${tagId}/edit`} className="bg-blue-700 text-white rounded px-8 py-3 text-lg cursor-pointer inline-block text-center ml-4 flex-1">
                            {editText}
                        </Link>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="px-3 py-2 m-0 font-semibold bg-blue-700 text-white">
                    {t.about}
                </h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.firstName}</td>
                            <td className="text-gray-800">{travelData.ownerFirstName}</td>
                            <td className="font-bold text-blue-800">{t.lastName}</td>
                            <td className="text-gray-800">{travelData.ownerLastName}</td>
                        </tr>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.address}</td>
                            <td className="text-gray-800">{travelData.ownerAddress}</td>
                            <td className="font-bold text-blue-800">{t.email}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`mailto:${travelData.ownerEmail}`}>
                                    {travelData.ownerEmail}
                                </a>
                            </td>
                        </tr>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.mobile}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.ownerMobile}`}>
                                    {travelData.ownerMobile}
                                </a>
                            </td>
                            <td className="font-bold text-blue-800">{t.landline}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.ownerLandline}`}>
                                    {travelData.ownerLandline}
                                </a>
                            </td>
                        </tr>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.other}</td>
                            <td className="text-gray-800">{travelData.ownerOther}</td>
                            <td className="font-bold text-blue-800">{t.destinationaddress_Accmodation}</td>
                            <td className="text-gray-800">{travelData.destinationAccommodation}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="mb-8">
                <h3 className="bg-blue-700 text-white my-4 font-semibold px-3 py-2 m-0">{t.travelData}</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-700 text-white">
                            <th className="p-2 font-bold">{t.provider}</th>
                            <th className="p-2 font-bold">{t.details}</th>
                            <th className="p-2 font-bold">{t.date}</th>
                            <th className="p-2 font-bold">{t.other}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100 text-gray-800">
                            <td className="p-2">{travelData.transportation}</td>
                            <td className="p-2">{travelData.transportationNumber}</td>
                            <td className="p-2">{formattedDate}</td>
                            <td className="p-2">{travelData.ownerOther}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.guide}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.firstName}</td>
                            <td className="text-gray-800">{travelData.guideFirstName}</td>
                            <td className="font-bold text-blue-800">{t.lastName}</td>
                            <td className="text-gray-800">{travelData.guideLastName}</td>
                        </tr>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.email}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`mailto:${travelData.guideEmail}`}>
                                    {travelData.guideEmail}
                                </a>
                            </td>
                            <td className="font-bold text-blue-800">{t.mobile}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.guideMobile}`}>
                                    {travelData.guideMobile}
                                </a>
                            </td>
                        </tr>
                        <tr className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 md:bg-gray-100">
                            <td className="font-bold text-blue-800">{t.landline}</td>
                            <td>
                                <a className="text-blue-600 hover:text-blue-500 underline" href={`tel:${travelData.guideLandline}`}>
                                    {travelData.guideLandline}
                                </a>
                            </td>
                            <td className="font-bold text-blue-800">{t.other}</td>
                            <td className="text-gray-800">{travelData.ownerOther}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.destinationaddress}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="w-36 font-bold">{t.destinationaddress_Accmodation}</td>
                            <td>{travelData.destinationAccommodation}</td>
                        </tr>
                        <tr>
                            <td className="w-36 font-bold">{t.destinationaddress_Address}</td>
                            <td>{travelData.destinationAddress}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default TravelCard;