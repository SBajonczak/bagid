'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { useLanguage } from '../../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';

interface TagRegistrationClientProps {
  tagId: string;
}

const TagRegistrationClient: React.FC<TagRegistrationClientProps> = ({ tagId }) => {
    const router = useRouter();
    const { isAuthenticated, user, getToken, login, isInitializing } = useAuth();
    const { language: lang } = useLanguage();
    const t = messages[lang].tagRegistration;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tagExists, setTagExists] = useState(false);

    useEffect(() => {
        const checkTag = async () => {
            try {
                const response = await fetch(`/api/tags/${tagId}/exists`);
                if (!response.ok) {
                    setError(t.unknownDeviceTitle);
                    return;
                }
                const data = await response.json();
                setTagExists(data.exists);
                
                if (data.registered) {
                    router.push(`/${tagId}`);
                }
            } catch (err) {
                console.error('Error checking tag:', err);
                setError(t.unknownDeviceTitle);
            }
        };

        if (tagId) {
            checkTag();
        }
    }, [tagId, router, t]);

    const handleRegister = async () => {
        if (!isAuthenticated || !user) {
            login();
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const response = await fetch('/api/tag-owners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    tagId,
                    userId: user.homeAccountId,
                    userEmail:  user.username
                })
            });

            if (response.ok) {
                router.push(`/${tagId}/edit`);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
            }
        } catch (err) {
            console.error('Error registering tag:', err);
            setError('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    if (error && !tagExists) {
        return (
            <div className="min-h-screen flex flex-col">
                <NavigationBar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-3xl font-bold mb-4 text-red-600">{t.unknownDeviceTitle}</h1>
                        <p className="mb-4">{t.unknownDeviceDescription}</p>
                        <p className="mb-6">{t.considerPurchase}</p>
                        <a
                            href="https://bag-tag.de"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Shop
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
                    <p className="text-lg mb-6">{t.subtitle}</p>

                    {!isAuthenticated ? (
                        <div>
                            <p className="mb-4">{t.loginPrompt}</p>
                            <button
                                onClick={login}
                                disabled={isInitializing}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                            >
                                {t.loginAndRegisterButton}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="mb-4">
                                {t.loggedInAs}: <strong>{user?.username}</strong>
                            </p>
                            <button
                                onClick={handleRegister}
                                disabled={loading}
                                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
                            >
                                {loading ? t.processingButton : t.registerTagButton}
                            </button>
                        </div>
                    )}

                    {error && tagExists && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* How it works section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">{t.howItWorksTitle}</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            {t.howItWorksSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Why register section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">{t.whyRegisterTitle}</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {t.whyRegisterPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TagRegistrationClient;
