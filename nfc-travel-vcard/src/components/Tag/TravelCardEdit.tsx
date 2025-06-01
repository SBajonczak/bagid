import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { TravelData } from '../../types';

dayjs.extend(localizedFormat);

const TravelCardEdit: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;
    const editMessages = {
        de: {
            save: 'Speichern',
            cancel: 'Abbrechen',
            saving: 'Speichern...',
            saveSuccess: 'Änderungen gespeichert',
            saveError: 'Fehler beim Speichern',
            loading: 'Lade Daten...',
            required: 'Pflichtfeld'
        },
        en: {
            save: 'Save',
            cancel: 'Cancel',
            saving: 'Saving...',
            saveSuccess: 'Changes saved',
            saveError: 'Error saving',
            loading: 'Loading data...',
            required: 'Required'
        }
    };
    const et = editMessages[lang];

    // Form state
    const [formData, setFormData] = useState<Partial<TravelData>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchTravelData = async () => {
            if (isDemoRequest()) {
                // Use demo data for preview
                injectDemoData();
            } else if (tagId) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/travel/${tagId}`);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setFormData(data);
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching travel data:', err);
                    setError('Error loading travel data. Please try again.');
                    setLoading(false);
                }
            }
        };

        fetchTravelData();
    }, [tagId]);

    // Set language for dayjs
    dayjs.locale(lang);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle date change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value ? new Date(value) : null
        }));
    };

    // Save changes
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tagId) return;

        try {
            setSaving(true);
            setSaveMessage(null);
            setError(null);

            const response = await fetch(`/api/travel/${tagId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSaveMessage(et.saveSuccess);
            setSaving(false);

            // Redirect to view mode after successful save
            navigate(`/${tagId}`);
        } catch (err) {
            console.error('Error saving travel data:', err);
            setError(et.saveError);
            setSaving(false);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        if (tagId) {
            navigate(`/travel/${tagId}`);
        } else {
            navigate('/');
        }
    };

    function isDemoRequest(): boolean {
        return tagId === "demo";
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

            setFormData(dummyData);
            setLoading(false);
        }, 1);
    }

    if (loading) {
        return <div className="text-center p-8">{et.loading}</div>;
    }

    // Format date for the date input
    const formattedDate = formData.transportationDate
        ? dayjs(formData.transportationDate).format('YYYY-MM-DD')
        : '';

    return (
        <form onSubmit={handleSubmit} className="travel-card-edit text-black bg-white rounded-lg shadow-md p-6 w-full mx-auto my-6">
            <div className="text-center mb-6">
                <h1 className="font-bold uppercase text-2xl my-2">{t.suitcase}</h1>
                <div className="text-gray-600">{t.favorite}</div>

                {saveMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                        {saveMessage}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-between mt-4 gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                        disabled={saving}
                    >
                        {et.cancel}
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                        disabled={saving}
                    >
                        {saving ? et.saving : et.save}
                    </button>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="px-3 py-2 m-0 font-semibold bg-blue-700 text-white">
                    {t.about}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50">
                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.firstName}</label>
                        <input
                            type="text"
                            name="ownerFirstName"
                            value={formData.ownerFirstName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.lastName}</label>
                        <input
                            type="text"
                            name="ownerLastName"
                            value={formData.ownerLastName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.address}</label>
                        <input
                            type="text"
                            name="ownerAddress"
                            value={formData.ownerAddress || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.email}</label>
                        <input
                            type="email"
                            name="ownerEmail"
                            value={formData.ownerEmail || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.mobile}</label>
                        <input
                            type="tel"
                            name="ownerMobile"
                            value={formData.ownerMobile || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.landline}</label>
                        <input
                            type="tel"
                            name="ownerLandline"
                            value={formData.ownerLandline || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.other}</label>
                        <input
                            type="text"
                            name="ownerOther"
                            value={formData.ownerOther || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h3 className="bg-blue-700 text-white my-4 font-semibold px-3 py-2 m-0">{t.travelData}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50">
                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.provider}</label>
                        <input
                            type="text"
                            name="transportation"
                            value={formData.transportation || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.details}</label>
                        <input
                            type="text"
                            name="transportationNumber"
                            value={formData.transportationNumber || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.date}</label>
                        <input
                            type="date"
                            name="transportationDate"
                            value={formattedDate}
                            onChange={handleDateChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.guide}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50">
                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.firstName}</label>
                        <input
                            type="text"
                            name="guideFirstName"
                            value={formData.guideFirstName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.lastName}</label>
                        <input
                            type="text"
                            name="guideLastName"
                            value={formData.guideLastName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.email}</label>
                        <input
                            type="email"
                            name="guideEmail"
                            value={formData.guideEmail || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.mobile}</label>
                        <input
                            type="tel"
                            name="guideMobile"
                            value={formData.guideMobile || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.landline}</label>
                        <input
                            type="tel"
                            name="guideLandline"
                            value={formData.guideLandline || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>

            <section>
                <h3 className="bg-blue-700 text-white px-3 py-2 m-0 font-semibold">{t.destinationaddress}</h3>
                <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50">
                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.destinationaddress_Accmodation}</label>
                        <input
                            type="text"
                            name="destinationAccommodation"
                            value={formData.destinationAccommodation || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.destinationaddress_Address}</label>
                        <input
                            type="text"
                            name="destinationAddress"
                            value={formData.destinationAddress || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>

            <div className="mt-6 flex justify-between gap-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                    disabled={saving}
                >
                    {et.cancel}
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                    disabled={saving}
                >
                    {saving ? et.saving : et.save}
                </button>
            </div>
        </form>
    );
};

export default TravelCardEdit;
