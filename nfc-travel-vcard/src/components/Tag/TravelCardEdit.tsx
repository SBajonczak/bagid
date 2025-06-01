import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import { TravelData } from '../../types';
import authService from '../../services/AuthService';
import { logger } from '@/utils/logger';
import { FaLock, FaExclamationTriangle, FaSignInAlt } from 'react-icons/fa';

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

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
    const [isTagOwner, setIsTagOwner] = useState<boolean>(false);

    // Check authentication and tag ownership
    useEffect(() => {
        const checkAuthentication = async () => {
            setCheckingAuth(true);

            const isAuth = authService.isAuthenticated();
            setIsAuthenticated(isAuth);

            if (!isAuth) {
                setCheckingAuth(false);
                return;
            }

            try {
                const user = authService.getCurrentUser();
                if (user && user.email) {
                    setUserEmail(user.email);
                }

                // Skip tag ownership check for demo
                if (isDemoRequest()) {
                    setIsTagOwner(true);
                    setCheckingAuth(false);
                    return;
                }

                // Check if the user is the owner of the tag
                const token = await authService.getIdToken();
                const response = await fetch(`/api/tag-owners/${tagId}/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    logger.error('Failed to verify tag ownership');
                    setIsTagOwner(false);
                    setCheckingAuth(false);
                    return;
                }

                const data = await response.json();
                setIsTagOwner(data.isOwner);
                setCheckingAuth(false);
            } catch (error) {
                logger.error('Error checking authentication:', error);
                setIsTagOwner(false);
                setCheckingAuth(false);
            }
        };

        checkAuthentication();
    }, [tagId]);

    // Fetch data from the API
    useEffect(() => {
        // Only fetch data if user is authenticated and owns the tag, or if it's a demo
        if ((isAuthenticated && isTagOwner) || isDemoRequest()) {
            const fetchTravelData = async () => {
                if (tagId) {
                    try {
                        setLoading(true);

                        // Get auth token for the request
                        const token = await authService.getIdToken();

                        const response = await fetch(`/api/travel/${tagId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

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
        }
    }, [tagId, isAuthenticated, isTagOwner]);

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

        if (!tagId || !isAuthenticated || !isTagOwner) return;

        try {
            setSaving(true);
            setSaveMessage(null);
            setError(null);

            const token = await authService.getIdToken();

            const response = await fetch(`/api/travel/${tagId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            navigate(`/${tagId}`);
        } else {
            navigate('/');
        }
    };

    // Handle login
    const handleLogin = async () => {
        await authService.login();
    };

    function isDemoRequest(): boolean {
        return tagId === "demo";
    }


    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">{t.checkingAuth}</h2>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-red-50 border-l-4 border-red-400 p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FaLock className="h-6 w-6 text-red-500" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-red-800">{t.authRequired}</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{t.authRequiredMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FaSignInAlt className="mr-2" /> {t.loginButton}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full mt-4 px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {et.cancel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isTagOwner && !isDemoRequest()) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FaExclamationTriangle className="h-6 w-6 text-amber-500" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-amber-800">{t.notYourTag}</h3>
                                <div className="mt-2 text-sm text-amber-700">
                                    <p>{t.notYourTagMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <button
                            onClick={handleCancel}
                            className="w-full px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {et.cancel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">{et.loading}</h2>
                </div>
            </div>
        );
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
