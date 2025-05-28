import React from 'react';
import LanguageSelection from './LoginSection';

const Footer: React.FC = () => {
    return (
        <div
            className="fixed top-0 left-0 h-full w-32 flex flex-col items-center p-4 bg-gradient-to-b z-50">
            <LanguageSelection />
        </div>
    );
};

export default Footer;