import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { messages } from '../i18n';
import { Link } from 'react-router-dom';
import { FaTag, FaSuitcase, FaEdit } from 'react-icons/fa';
import { logger } from '@/utils/logger';
import authService from '@/services/AuthService';

/**
 * Interface for tag data structure
 */
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

/**
 * Dashboard component displays all tags owned by the current user
 */
const Dashboard: React.FC<DashboardProps> = ({ hidden }) => {
    // Hooks and state
    const { lang } = useLanguage();
    const t = messages[lang].common;
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Check authentication status
     */
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const isAuth = authService.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const user = authService.getCurrentUser();
                    if (user) {
                        logger.debug("Dashboard: User is authenticated as:", user.email);
                    }
                }
            } catch (error) {
                logger.error("Dashboard: Error checking authentication status:", error);
            }
        };

        // Initial check
        checkAuthStatus();

        // Listen for window focus events (useful after redirect)
        const handleFocus = () => checkAuthStatus();
        window.addEventListener('focus', handleFocus);

        // Clean up
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    /**
     * Fetch user's tags
     */
    useEffect(() => {
        const fetchUserTags = async () => {
            setError(null);
            
            if (!isAuthenticated) {
                setError(t.notAuthenticated || 'You need to log in to view this page');
                setLoading(false);
                return;
            }
            setLoading(true)
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
            } catch (err) {
                console.error('Error fetching tags:', err);
                setError(t.errorFetchingTags || 'Could not load your tags');
            } finally {
                setLoading(false);
            }
        };

        fetchUserTags();
    }, [isAuthenticated, t.notAuthenticated, t.errorFetchingTags]);

    /**
     * Render a loading skeleton
     */
    const renderLoadingSkeleton = () => (
        <div className="w-full max-w-7xl mx-auto p-4 mt-24 text-center" hidden={hidden}>
            {/* Header skeleton */}
            <div className="flex items-center mb-8">
                <div className="bg-gray-200 rounded-full p-3 mr-4 h-14 w-14"></div>
                <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            
            <div className="animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-lg p-6 shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-6"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3 mb-6"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/3 mt-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    /**
     * Render the empty state when no tags are found
     */
    const renderEmptyState = () => (
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
    );

    /**
     * Render a single tag card
     */
    const renderTagCard = (tag: Tag) => (
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

            {!tag.hasData && (
                <div className="bg-yellow-100 text-yellow-800 text-sm p-2 rounded mb-3">
                    {t.noDataWarning || 'This tag has no travel data yet'}
                </div>
            )}

            <div className="mt-4">
                <Link
                    to={`/${tag.tagId}`}
                    className="bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700"
                >
                    {t.viewDetails || 'View Details'}
                </Link>
            </div>
        </div>
    );

    /**
     * Render the list of tags
     */
    const renderTagsList = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map(renderTagCard)}
        </div>
    );

    // Show loading state if data is being fetched
    if (loading) {
        return renderLoadingSkeleton();
    }

    // Main component render
    return (
        <div className="w-full max-w-7xl mx-auto p-4 mt-24" hidden={hidden}>
            {/* Dashboard header */}
            <div className="flex items-center mb-8">
                <div className="bg-blue-100 rounded-full p-3 mr-4 shadow"> 
                    <FaSuitcase className="text-blue-600 text-3xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                        {t.myTags || 'My Tags'}
                    </h1>
                    <p className="text-gray-500 text-base">
                        {t.dashboardSubtitle || 'Verwalte deine NFC-Reise-Tags bequem an einem Ort.'}
                    </p>
                </div>
            </div>

            {/* Error message if present */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                </div>
            )}

            {/* Empty state or tag list */}
            {tags.length === 0 ? renderEmptyState() : renderTagsList()}
        </div>
    );
};

export default Dashboard;
