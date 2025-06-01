import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';
import authService from '../../services/AuthService';
import { logger } from '@/utils/logger';

const TagRegistration: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].common;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | undefined>('');

    // Check if user is authenticated
    useEffect(() => {
        logger.info('Checking authentication status...');
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
    }, []);

    // Handle login
    const handleLogin = async () => {
        await authService.login();
        // Redirect will happen automatically
    };

    // Handle tag registration
    const handleRegisterTag = async () => {
        if (!isAuthenticated) {
            handleLogin();
            return;
        }
        
        try {
            setLoading(true);
            const user = authService.getCurrentUser();
            
            if (!user) {
                throw new Error('User information not available');
            }
            
            const accessToken = await authService.getAccessToken();
            
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
            navigate(`/travel/${tagId}/edit`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tag-registration text-black bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-6">
            <h1 className="text-2xl font-bold mb-4">{t.productname} - Tag Registration</h1>
            <p className="text-gray-700 mb-6">
                {isAuthenticated 
                    ? `You are logged in as ${userEmail}. Click below to register this tag with your account.`
                    : 'Please log in to register this tag with your account.'}
            </p>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <button
                onClick={handleRegisterTag}
                disabled={loading}
                className={`bg-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading 
                    ? 'Processing...' 
                    : isAuthenticated 
                        ? 'Register Tag' 
                        : 'Log in and Register Tag'}
            </button>
        </div>
    );
};

export default TagRegistration;
