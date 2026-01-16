import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { messages } from '@/lib/i18n';
import ReCAPTCHA from 'react-google-recaptcha';

type ChannelKey = 'email' | 'sms';

type ChannelDeliveryReport = {
    attempted: boolean;
    delivered: boolean;
    error?: string;
};

type ChannelReportResponse = Partial<Record<ChannelKey, ChannelDeliveryReport>>;

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    tagId: string;
    supportsEmail: boolean;
    supportsSms: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, tagId, supportsEmail, supportsSms }) => {
    const { language: lang } = useLanguage();
    const t = messages[lang].notification;

    const channelCopy = {
        heading: t.channelHeading || (lang === 'de' ? 'Zustellwege' : 'Delivery channels'),
        helper: t.channelHelper || (lang === 'de' ? 'Wähle, wie deine Nachricht zugestellt werden soll.' : 'Choose how the owner should be notified.'),
        email: t.channelEmail || 'Email',
        sms: t.channelSms || 'SMS',
        required: t.channelRequired || (lang === 'de' ? 'Bitte mindestens einen Zustellweg auswählen.' : 'Please select at least one delivery channel.'),
        unavailable: t.channelUnavailable || (lang === 'de' ? 'Für diesen Tag sind keine Kontaktwege hinterlegt.' : 'No delivery channel is available for this tag.'),
        delivered: t.channelDelivered || (lang === 'de' ? 'Zugestellt' : 'Delivered'),
        failed: t.channelFailed || (lang === 'de' ? 'Fehlgeschlagen' : 'Failed'),
        statusTitle: t.channelStatus || (lang === 'de' ? 'Zustellstatus' : 'Delivery status'),
        warningTitle: t.channelWarningTitle || (lang === 'de' ? 'Hinweise' : 'Notes')
    };

    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [message, setMessage] = useState('');
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [securityToken, setSecurityToken] = useState<string | null>(null);
    const [deliveryOptions, setDeliveryOptions] = useState<Record<ChannelKey, boolean>>({
        email: supportsEmail,
        sms: supportsSms
    });
    const [channelReport, setChannelReport] = useState<ChannelReportResponse | null>(null);
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);

    const hasSelectableChannel = supportsEmail || supportsSms;
    const hasSelectedChannel =
        (supportsEmail && deliveryOptions.email) ||
        (supportsSms && deliveryOptions.sms);

    const renderChannelStatus = (label: string, report?: ChannelDeliveryReport) => {
        if (!report || !report.attempted) {
            return null;
        }

        const success = report.delivered;

        return (
            <div
                key={label}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${success ? 'border-green-200 bg-green-50 text-green-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}
            >
                <span className="font-medium">{label}</span>
                <span>{success ? channelCopy.delivered : report.error || channelCopy.failed}</span>
            </div>
        );
    };

    // Get security token when modal opens
    useEffect(() => {
        if (isOpen) {
            setSent(false);
            setError(null);
            setCaptchaToken(null);
            setChannelReport(null);
            setServerMessage(null);
            setWarnings([]);
            setDeliveryOptions({
                email: supportsEmail,
                sms: supportsSms
            });

            // Get a one-time security token for this notification attempt
            const getSecurityToken = async () => {
                try {
                    const response = await fetch(`/api/notify/token/${tagId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Could not get security token');
                    }

                    const data = await response.json();
                    setSecurityToken(data.token);
                } catch (err) {
                    console.error('Error getting security token:', err);
                    setError(t.securityError);
                }
            };

            getSecurityToken();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        setLocationPermission('granted');
                    },
                    () => {
                        setLocationPermission('denied');
                    }
                );
            } else {
                setLocationPermission('denied');
            }
        }
    }, [isOpen, tagId, t, supportsEmail, supportsSms]);

    // Generate Google Maps URL for static map
    const mapUrl = location
        ? `https://maps.googleapis.com/maps/api/staticmap?size=640x220&key=AIzaSyADLvGq86aaaEVwj1evuZog8w2l-tVWId0&markers=color:red%7C${location.lat},${location.lng}`
        : '';

    // Generate Google Maps link for directions
    const directionsUrl = location
        ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
        : '';

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!location || !captchaToken || !securityToken) return;

        if (!location || !securityToken) return;
        if (!hasSelectableChannel) {
            setError(channelCopy.unavailable);
            return;
        }

        if (!hasSelectedChannel) {
            setError(channelCopy.required);
            return;
        }

        setSending(true);
        setError(null);
        setChannelReport(null);
        setServerMessage(null);
        setWarnings([]);

        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Security-Token': securityToken
                },
                body: JSON.stringify({
                    tagId,
                    location: {
                        lat: location.lat,
                        lng: location.lng
                    },
                    message,
                    mapUrl: directionsUrl,
                    captchaToken,
                    timestamp: Date.now(),
                    channels: {
                        email: supportsEmail ? deliveryOptions.email : false,
                        sms: supportsSms ? deliveryOptions.sms : false
                    }
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || t.sendError);
            }

            setChannelReport(responseData.channels || null);
            setWarnings(Array.isArray(responseData.warnings) ? responseData.warnings : []);
            setServerMessage(responseData.message || null);
            setSent(true);

            // Reset captcha after use
            setCaptchaToken(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.sendError);
        } finally {
            setSending(false);
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{t.title}</h2>

                    {sent ? (
                        <div className="text-center py-8">
                            <div className="text-green-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-lg mb-6">{serverMessage || t.success}</p>

                            {channelReport && (
                                <div className="mb-6 text-left">
                                    <p className="text-sm font-semibold text-slate-600 mb-2">{channelCopy.statusTitle}</p>
                                    <div className="space-y-2">
                                        {renderChannelStatus(channelCopy.email, channelReport.email)}
                                        {renderChannelStatus(channelCopy.sms, channelReport.sms)}
                                    </div>
                                </div>
                            )}

                            {warnings.length > 0 && (
                                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-800">
                                    <p className="font-semibold mb-2">{channelCopy.warningTitle}</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {warnings.map((warning) => (
                                            <li key={warning}>{warning}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                onClick={onClose}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                {t.close}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <p className="mb-2">{t.description}</p>

                                {locationPermission === 'pending' && (
                                    <div className="flex justify-center items-center h-32">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                                    </div>
                                )}

                                {locationPermission === 'denied' && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                        {t.locationDenied}
                                    </div>
                                )}

                                {location && (
                                    <div className="mb-4">
                                        <p className="mb-2 font-medium">{t.yourLocation}</p>
                                        <div className="border rounded-lg overflow-hidden">
                                            <img
                                                src={mapUrl}
                                                alt="Your current location"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <div className="mt-2 text-sm">
                                            <a
                                                href={directionsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t.openInMaps}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {hasSelectableChannel ? (
                                <div className="mb-6">
                                    <p className="font-medium mb-1">{channelCopy.heading}</p>
                                    <p className="text-sm text-gray-500 mb-3">{channelCopy.helper}</p>
                                    <div className="space-y-2">
                                        {supportsEmail && (
                                            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    checked={deliveryOptions.email}
                                                    onChange={(e) =>
                                                        setDeliveryOptions((prev) => ({ ...prev, email: e.target.checked }))
                                                    }
                                                />
                                                <span className="text-sm text-slate-800">{channelCopy.email}</span>
                                            </label>
                                        )}
                                        {supportsSms && (
                                            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    checked={deliveryOptions.sms}
                                                    onChange={(e) =>
                                                        setDeliveryOptions((prev) => ({ ...prev, sms: e.target.checked }))
                                                    }
                                                />
                                                <span className="text-sm text-slate-800">{channelCopy.sms}</span>
                                            </label>
                                        )}
                                    </div>
                                    {!hasSelectedChannel && (
                                        <p className="mt-2 text-sm text-amber-600">{channelCopy.required}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                                    {channelCopy.unavailable}
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block mb-2 font-medium" htmlFor="message">
                                    {t.messageLabel}
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    placeholder={t.messagePlaceholder}
                                    required
                                    maxLength={500} // Limit message length
                                ></textarea>
                            </div>

                            {/* CAPTCHA verification
                            <div className="mb-6">
                                <ReCAPTCHA
                                    sitekey="6LeI-UssAAAAADPUrZfbZHjOV0hGXWzdDBUdrGF1"
                                    onChange={handleCaptchaChange}
                                    hl={lang}
                                />
                                {!captchaToken && (
                                    <p className="text-sm text-red-600 mt-1">{t.captchaRequired}</p>
                                )}
                            </div> */}

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    {t.cancel}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    disabled={!location || sending || message.trim() === ''  || !securityToken || !hasSelectedChannel}
                                >
                                    {sending ? t.sending : t.send}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
