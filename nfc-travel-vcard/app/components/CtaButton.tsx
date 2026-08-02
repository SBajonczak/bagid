import React from 'react';

interface CtaButtonProps {
  language: 'de' | 'en';
  className?: string;
}

export default function CtaButton({ language, className = '' }: CtaButtonProps) {
  const text = language === 'de' 
    ? 'Jetzt bei Kreativschicht kaufen' 
    : 'Buy now on Kreativschicht';
  
  const disclaimer = language === 'de'
    ? 'Der Kauf und die Zahlung erfolgen über unseren Partner-Shop kreativschicht.de.'
    : 'Checkout and payment are handled via our partner shop kreativschicht.de.';

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <a
        href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
      >
        {text}
      </a>
      <p className="text-sm text-gray-600 text-center max-w-md">
        {disclaimer}
      </p>
    </div>
  );
}
