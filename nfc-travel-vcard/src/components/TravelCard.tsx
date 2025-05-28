import React from 'react';
import { messages } from '../i18n';
import { useLanguage } from '../LanguageContext';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';

dayjs.extend(localizedFormat);

interface TravelCardProps {
    hidden: boolean;
    transportation:string;
    transportationNumber: string; 
    transportationDate: Date|null;

    // Kontakt/Owner
    ownerFirstName: string;
    ownerLastName: string;
    ownerAddress: string;
    ownerEmail: string;
    ownerMobile: string;
    ownerLandline: string;
    ownerOther?: string;

    // Guide
    guideFirstName: string;
    guideLastName: string;
    guideEmail: string;
    guideMobile: string;
    guideLandline: string;

    // Zieladresse/Unterkunft
    destinationAccommodation: string;
    destinationAddress: string;
}

const TravelCard: React.FC<TravelCardProps> = (data: TravelCardProps) => {
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;

    // Setze die Sprache für dayjs
    dayjs.locale(lang);

    // Lokalisierter "N/A"-Text
    const naText = lang === 'de' ? 'k.A.' : 'N/A';

    // Formatierte Datumsausgabe
    const formattedDate =
        data.transportationDate == null
            ? naText
            : dayjs(data.transportationDate).format('L');

    return (
        <div
            hidden={data.hidden}
            className="travel-card text-black bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-6"
        >
            <div className="text-center mb-6">
                <h1 className="font-bold uppercase text-2xl my-2">{t.suitcase}</h1>
                <div className="text-gray-600">{t.favorite}</div>
                <div className="bg-red-700 text-white rounded px-8 py-3 text-lg mt-4 cursor-pointer inline-block w-full text-center">
                    {t.notify}
                </div>
            </div>

            <section className="mb-8">
                <h3 className="px-3 py-2 m-0 font-semibold bg-blue-900 text-white">
                    {t.about}
                </h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="w-36 font-bold">{t.firstName}</td>
                            <td>{data.ownerFirstName}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.lastName}</td>
                            <td>{data.ownerLastName}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.address}</td>
                            <td>{data.ownerAddress}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.email}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`mailto:${data.ownerEmail}`}>
                                    {data.ownerEmail}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.mobile}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`tel:${data.ownerMobile}`}>
                                    {data.ownerMobile}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.landline}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`tel:${data.ownerLandline}`}>
                                    {data.ownerLandline}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.other}</td>
                            <td>{data.ownerOther}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="mb-8">
                <h3 className="bg-blue-900 text-white my-4 font-semibold  px-3 py-2 m-0 ">{t.travelData}</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-2 font-bold">{t.provider}</th>
                            <th className="p-2 font-bold">{t.details}</th>
                            <th className="p-2 font-bold">{t.date}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white text-gray-900">
                            <td className="p-2">{data.transportation}</td>
                            <td className="p-2">{data.transportationNumber}</td>
                            <td className="p-2">{formattedDate}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className="bg-blue-900 text-white px-3 py-2 m-0 font-semibold">{t.guide}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="w-36 font-bold">{t.firstName}</td>
                            <td>{data.guideFirstName}</td>
                        </tr>
                        <tr>
                            <td className="w-36 font-bold">{t.lastName}</td>
                            <td>{data.guideLastName}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.email}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`mailto:${data.guideEmail}`}>
                                    {data.guideEmail}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.mobile}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`tel:${data.guideMobile}`}>
                                    {data.guideMobile}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">{t.landline}</td>
                            <td>
                                <a className="text-blue-600 underline" href={`tel:${data.guideLandline}`}>
                                    {data.guideLandline}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h3 className="bg-blue-900 text-white px-3 py-2 m-0 font-semibold">{t.destinationaddress}</h3>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="w-36 font-bold">{t.destinationaddress_Accmodation}</td>
                            <td>{data.destinationAccommodation}</td>
                        </tr>
                        <tr>
                            <td className="w-36 font-bold">{t.destinationaddress_Address}</td>
                            <td>{data.destinationAddress}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default TravelCard;