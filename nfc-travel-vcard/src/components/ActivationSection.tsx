import React from 'react';

interface ActivationSectionProps {
    onActivate: () => void;
    isUserLoggedIn: boolean;
    showMessage: (message: string, type: 'success' | 'error') => void;
}

const ActivationSection: React.FC<ActivationSectionProps> = ({ onActivate, isUserLoggedIn, showMessage }) => {
    const handleActivateClick = () => {
        if (!isUserLoggedIn) {
            showMessage('Bitte melden Sie sich zuerst an.', 'error');
            return;
        }
        onActivate();
        showMessage('NFC Tag erfolgreich aktiviert!', 'success');
    };

    return (
        <div className="activation-section" style={{ textAlign: 'center', padding: '20px' }}>
            <h3>NFC Tag aktivieren</h3>
            <p>Dieser NFC Tag ist noch nicht aktiviert. Möchten Sie ihn zu Ihrem Konto hinzufügen?</p>
            <button className="activation-btn" onClick={handleActivateClick}>
                ✅ Tag aktivieren
            </button>
        </div>
    );
};

export default ActivationSection;