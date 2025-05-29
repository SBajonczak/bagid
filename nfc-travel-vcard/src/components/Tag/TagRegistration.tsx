import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLanguage } from '../../LanguageContext';
import { messages } from '../../i18n';

const TagRegistration: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = messages[lang].common;

    const [ownerEmail, setOwnerEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegisterTag = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/register-tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tagId, ownerEmail }),
            });

            if (!response.ok) {
                throw new Error('Failed to register tag');
            }

            // Redirect to the tag data page after successful registration
            navigate(`/tag/${tagId}`);
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
                Please register your tag to start managing its data.
            </p>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label htmlFor="ownerEmail" className="block text-gray-700 font-bold mb-2">
                    Owner Email:
                </label>
                <input
                    type="email"
                    id="ownerEmail"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Enter your email"
                />
            </div>
            <button
                onClick={handleRegisterTag}
                disabled={loading}
                className={`bg-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Registering...' : 'Register Tag'}
            </button>
        </div>
    );
};

export default TagRegistration;
