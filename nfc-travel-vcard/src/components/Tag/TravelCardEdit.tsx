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
import AuthRequired from '../Auth/AuthRequired';

dayjs.extend(localizedFormat);

const TravelCardEdit: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].travelCard;

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

    // Add a ref to track if we've already checked auth for this tagId
    const authCheckedRef = React.useRef<{[key: string]: boolean}>({});
    
    // Add a ref to prevent cleanup actions from causing re-rendering loops
    const isComponentMounted = React.useRef<boolean>(true);

    // Check authentication and tag ownership
    const checkAuthentication = async () => {
        // Prevent running if the component is unmounting
        if (!isComponentMounted.current) return;
        
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
            console.log('Checking tag ownership for tagId:', tagId, 'with token:', token);
            
            try {
                const response = await fetch(`/api/tag-owners/${tagId}/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Explicitly handle 403 (Forbidden) response
                if (response.status === 403) {
                    console.log('User is not the owner of this tag (403 Forbidden)');
                    // We still mark auth as checked even if it failed with 403
                    setIsTagOwner(false);
                    setCheckingAuth(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setIsTagOwner(data.isOwner);
            } catch (error) {
                // Handle network errors or other fetch problems
                logger.error('Error during tag ownership verification:', error);
                setIsTagOwner(false);
            } finally {
                // Always mark auth as checked when done
                setCheckingAuth(false);
            }
        } catch (error) {
            logger.error('Error checking authentication:', error);
            setIsTagOwner(false);
            setCheckingAuth(false);
        }
    };

    useEffect(() => {
        // Only check authentication if we haven't checked for this tagId yet
        if (tagId && !authCheckedRef.current[tagId]) {
            authCheckedRef.current[tagId] = true;
            checkAuthentication();
        }
        
        // Set up cleanup to prevent state updates after unmount
        return () => {
            isComponentMounted.current = false;
        };
    }, [tagId]);

    // Handle auth state changes
    const handleAuthStateChange = () => {
        // Only re-run authentication check if the component is still mounted
        if (isComponentMounted.current) {
            // Clear the previously checked state for the current tagId to force a recheck
            if (tagId) {
                authCheckedRef.current[tagId] = false;
            }
            checkAuthentication();
        }
    };

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

            setSaveMessage(t.saveSuccess);
            setSaving(false);

            // Redirect to view mode after successful save
            navigate(`/${tagId}`);
        } catch (err) {
            console.error('Error saving travel data:', err);
            setError(t.saveError);
            setSaving(false);
        }
    };

    // Handle login
    const handleLogin = async () => {
        try {
            await authService.login();
            // We'll check auth status via the handleAuthStateChange callback
        } catch (error) {
            logger.error('Error during login:', error);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        if (tagId) {
            navigate(`/${tagId}`);
        } else {
            navigate('/');
        }
    };

    function isDemoRequest(): boolean {
        return tagId === "demo";
    }

    // Show loading spinner
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

    // Show login component if not authenticated
    if (!isAuthenticated) {
        return (
            <AuthRequired 
                type="unauthenticated"
                onLogin={handleLogin}
                onCancel={handleCancel}
                onAuthChange={handleAuthStateChange}
            />
        );
    }

    // Show unauthorized component if not tag owner
    if (!isTagOwner && !isDemoRequest()) {
        return (
            <AuthRequired 
                type="unauthorized"
                onLogin={handleLogin}
                onCancel={handleCancel}
                email={userEmail}
                onAuthChange={handleAuthStateChange}
            />
        );
    }

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">{t.loading}</h2>
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
                        {t.cancel}
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                        disabled={saving}
                    >
                        {saving ? t.saving : t.save}
                    </button>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="px-3 py-2 m-0 font-semibold bg-blue-700 text-white">
                    {t.tagDetails || "Tag Details"}
                </h3>

                <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50">
                    <div className="form-group">
                        <label className="block font-bold text-blue-800 mb-1">{t.tagName || "Tag Name"} <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="tagName"
                            value={formData.tagName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <small className="text-gray-500">{t.tagNameHelp || "Enter a name to identify this tag in your dashboard"}</small>
                    </div>
                </div>
            </section>

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
                    {t.cancel}
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white rounded px-8 py-3 text-lg cursor-pointer w-1/2"
                    disabled={saving}
                >
                    {saving ? t.saving : t.save}
                </button>
            </div>
        </form>
    );
};

export default TravelCardEdit;
