import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
import { Link } from 'react-router-dom';
import { FaTag, FaSuitcase, FaEdit } from 'react-icons/fa';
import { logger } from '@/utils/logger';
import authService from '@/services/AuthService';

interface Tag {
    tagId: string;
    tagName: string;
    ownerFirstName: string;
    ownerLastName: string;
    hasData: boolean;
}

export interface DashboardProps {
    hidden: boolean;
}


const Dashboard: React.FC<DashboardProps> = (props:DashboardProps) => {
    const { lang } = useLanguage();
    const t = messages[lang].common;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserTags = async () => {
            setError(null);
            if (!isAuthenticated) {
                setError(t.notAuthenticated || 'You need to log in to view this page');
                setLoading(false);
                return;
            }
            try {
                const token = await authService.getIdToken();
                const response = await fetch('/api/user/tags', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                setTags(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tags:', err);
                setError(t.errorFetchingTags || 'Could not load your tags');
                setLoading(false);
            }
        };

        fetchUserTags();
    }, [isAuthenticated, t.notAuthenticated, t.errorFetchingTags]);

    useEffect(() => {

        const checkAuthStatus = () => {
            try {
                const isAuth = authService.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const user = authService.getCurrentUser();
                    if (user) {
                        logger.debug("NavigationBar: User is authenticated as:", user.email);
                    }
                }
            } catch (error) {
                logger.error("NavigationBar: Error checking authentication status:", error);
            }
        };



        // Initial check
        checkAuthStatus();

        // Listen for window focus events (useful after redirect)
        const handleFocus = () => {
            checkAuthStatus();
        };

        window.addEventListener('focus', handleFocus);

        // Clean up
        return () => {
            window.removeEventListener('focus', handleFocus);
        };

    }, []);
    

    if (loading) {
        return (
            <div className="container mx-auto p-4 mt-24 text-center" hidden={props.hidden}>
                {isAuthenticated}
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border rounded-lg p-4 shadow">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="w-full max-w-7xl mx-auto p-4 mt-24" hidden={props.hidden}>
            <div className="flex items-center mb-8">
                <div className="bg-blue-100 rounded-full p-3 mr-4 shadow"> 
                    <FaSuitcase className="text-blue-600 text-3xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-1">{t.myTags || 'My Tags'}</h1>
                    <p className="text-gray-500 text-base">{t.dashboardSubtitle || 'Verwalte deine NFC-Reise-Tags bequem an einem Ort.'}</p>
                </div>
            </div>

            {tags.length === 0 ? (
            <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="mb-4">{t.noTagsFound || 'You do not have any tags yet.'}</p>
                <a
                href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                {t.buyTag || 'Buy a tag'}
                </a>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                <div
                    key={tag.tagId}
                    className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">
                        <FaTag className="inline-block mr-2 text-blue-600" />
                        {tag.tagName || `${t.untitledTag || 'Untitled Tag'}`}
                    </h2>
                    <Link
                        to={`/${tag.tagId}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                        title={t.editTag || 'Edit tag'}
                    >
                        <FaEdit />
                    </Link>
                    </div>

                    <p className="text-gray-600 text-sm mb-1">
                    {tag.ownerFirstName} {tag.ownerLastName}
                    </p>

                    <div className="text-xs text-gray-500 mb-3">
                    ID: {tag.tagId}
                    </div>

                    {!tag.hasData ? (
                    <div className="bg-yellow-100 text-yellow-800 text-sm p-2 rounded mb-3">
                        {t.noDataWarning || 'This tag has no travel data yet'}
                    </div>
                    ) : null}

                    <div className="mt-4">
                    <Link
                        to={`/${tag.tagId}`}
                        className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
                    >
                        {t.viewDetails || 'View Details'}
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default Dashboard;
