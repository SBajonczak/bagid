import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { TagRepo } from '../../api';
import { TagData, TravelData } from '../../types';
dayjs.extend(localizedFormat);

const TravelCard: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;

    // State for travel data
    const [travelData, setTravelData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchTravelData = async () => {
            // Simulate API call with dummy data and loading delay
            if (isDemoRequest()) {
                injectDemoData();
            } else {
                if (tagId) {
                    // loadData(tagId);
                }
            }
        };

        fetchTravelData();
    });


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
        return <div className="text-center"></div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!travelData) {
        return <div className="text-center">No data available</div>;
    }

    function isDemoRequest(): Boolean {
        return tagId === "demo"
    }
    function loadData(tagid: string) {
        // let repo: TagRepo = new TagRepo();
        // repo.getTravelDataByTagId(tagid).then((data: TravelData | null) => {
        //     if (data) {
        //         setTravelData(data);
        //     }
        // });
    }

    function injectDemoData() {
        setTimeout(() => {
            const dummyData = {
                ownerFirstName: 'John',
                ownerLastName: 'Doe',
                ownerAddress: '123 Main St, Berlin',
                ownerEmail: 'john.doe@example.com',
                ownerMobile: '+49 123 456789',
                ownerLandline: '+49 30 123456',
                ownerOther: 'N/A',
                transportation: 'Lufthansa',
                transportationNumber: 'LH1234',
                transportationDate: '2024-06-01',
                guideFirstName: 'Anna',
                guideLastName: 'Schmidt',
                guideEmail: 'anna.schmidt@example.com',
                guideMobile: '+49 176 987654',
                guideLandline: '+49 30 654321',
                destinationAccommodation: 'Hotel Berlin',
                destinationAddress: 'Alexanderplatz 1, 10178 Berlin'
            };

            // @ts-ignore
            setTravelData(dummyData);
            // @ts-ignore
            setLoading(false);
        }, 1);
    }

    return (
        <div
            className="travel-card text-black bg-white rounded-lg shadow-md p-6  w-full mx-auto my-6"
        >
            <div className="text-center mb-6">
                <h1 className="font-bold uppercase text-2xl my-2">{t.suitcase}</h1>
                <div className="text-gray-600">{t.favorite}</div>
                <div className="bg-red-700 text-white rounded px-8 py-3 text-lg mt-4 cursor-pointer inline-block w-full text-center">
                    {t.notify}
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