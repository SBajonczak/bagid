import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import authService from '../../services/AuthService';
import { logger } from '@/utils/logger';
import App from '@/App';

// Import icons
import { FaCheckCircle, FaExclamationTriangle, FaLock, FaSuitcase, FaUserCheck } from 'react-icons/fa';

const TagRegistration: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].common;
    const tr = messages[lang].tagRegistration;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | undefined>('');
    const [tagExists, setTagExists] = useState<boolean | null>(null);

    // Check if tag exists
    const checkTagExists = async () => {
        try {
            const res = await fetch(`/api/tags/${tagId}/exists`);
            if (!res.ok) {
                logger.error('Failed to check if tag exists');
                setTagExists(false);
                return;
            }
            
            const data = await res.json();
            logger.info('Tag existence check successful:', data);
            setTagExists(data.exists);
        } catch (error) {
            logger.error('Error checking if tag exists:', error);
            setTagExists(false);
        }
    };

    // Check if user is authenticated and if tag exists
    useEffect(() => {
        logger.info('Checking authentication status and tag existence...');
        const checkAuth = async () => {
            const isAuth = authService.isAuthenticated();
            setIsAuthenticated(isAuth);

            if (isAuth) {
                const user = authService.getCurrentUser();
                if (user) {
                    setUserEmail(user.email);
                }
            }
        };

        checkAuth();
        checkTagExists();
    }, [tagId]);

    // Handle login
    const handleLogin = async () => {
        await authService.login();
    };

    // Handle tag registration
    const handleRegisterTag = async () => {
        if (!isAuthenticated) {
            handleLogin();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const user = authService.getCurrentUser();

            if (!user) {
                throw new Error('User information not available');
            }

            const accessToken = await authService.getIdToken();
            if (!accessToken) {
                throw new Error('Authentication token not available');
            }

            const response = await fetch('/api/tag-owners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    tagId,
                    userId: user.userId,
                    userEmail: user.email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register tag');
            }

            // Redirect to the edit page after successful registration
            navigate(`/${tagId}/edit`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Display loading state while checking if tag exists
    if (tagExists === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">{tr.loading}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        {t.productname} - {tr.title}
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        {tr.subtitle}
                    </p>
                </div>

                {/* Main content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {!tagExists ? (
                        <div>
                            {/* Unknown tag section */}
                            <div className="p-8 border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <FaExclamationTriangle className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{tr.unknownDeviceTitle}</h2>
                                        <p className="mt-2 text-gray-600">{tr.unknownDeviceDescription}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-5 bg-amber-50 rounded-lg border border-amber-200">
                                    <p className="font-medium text-amber-700">{tr.considerPurchase}</p>
                                </div>
                            </div>

                            {/* App component for purchasing */}
                            <div className="p-6">
                                <App />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Registration section when tag exists */}
                            <div className="md:flex">
                                {/* Left side - Registration action */}
                                <div className="p-8 md:w-1/2">
                                    <div className="flex items-center mb-6">
                                        <FaSuitcase className="h-6 w-6 text-blue-500 mr-3" />
                                        <h2 className="text-2xl font-bold text-gray-900">Tag ID: {tagId}</h2>
                                    </div>
                                    
                                    {isAuthenticated ? (
                                        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-center">
                                            <FaUserCheck className="h-5 w-5 text-green-500 mr-3" />
                                            <p className="text-green-700">{tr.loggedInAs} <span className="font-semibold">{userEmail}</span></p>
                                        </div>
                                    ) : (
                                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-blue-700">{tr.loginPrompt}</p>
                                        </div>
                                    )}
                                    
                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                            <p className="text-red-700">{error}</p>
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={handleRegisterTag}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></span>
                                                {tr.processingButton}
                                            </>
                                        ) : isAuthenticated ? (
                                            <>
                                                <FaCheckCircle className="mr-2" /> {tr.registerTagButton}
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="mr-2" /> {tr.loginAndRegisterButton}
                                            </>
                                        )}
                                    </button>
                                    
                                    {loading && (
                                        <p className="mt-3 text-sm text-gray-500 text-center">{tr.processingDescription}</p>
                                    )}
                                </div>
                                
                                {/* Right side - Information */}
                                <div className="bg-gray-50 p-8 md:w-1/2">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                                            {tr.howItWorksTitle}
                                        </h3>
                                        <ol className="space-y-3">
                                            {tr.howItWorksSteps.map((step, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium text-sm mr-3">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-gray-600">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                                            {tr.whyRegisterTitle}
                                        </h3>
                                        <ul className="space-y-3">
                                            {tr.whyRegisterPoints.map((point, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagRegistration;
