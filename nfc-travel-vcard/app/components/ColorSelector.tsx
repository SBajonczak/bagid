import React from 'react';

interface ColorSelectorProps {
  language: 'de' | 'en';
}

export default function ColorSelector({ language }: ColorSelectorProps) {
  const colors = [
    { name: 'Schwarz', nameEn: 'Black', hex: '#000000' },
    { name: 'Weiß', nameEn: 'White', hex: '#FFFFFF' },
    { name: 'Rot', nameEn: 'Red', hex: '#DC2626' },
    { name: 'Blau', nameEn: 'Blue', hex: '#2563EB' },
    { name: 'Grün', nameEn: 'Green', hex: '#16A34A' },
  ];

  const title = language === 'de' ? 'Verfügbare Farben' : 'Available Colors';
  const notice = language === 'de'
    ? 'Farbauswahl dient der Übersicht. Verfügbarkeit wird im Shop angezeigt.'
    : 'Color selection is for display purposes only. Availability is shown in the shop.';

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex gap-4 flex-wrap">
        {colors.map((color) => (
          <div key={color.hex} className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.hex }}
              title={language === 'de' ? color.name : color.nameEn}
            />
            <span className="text-sm">
              {language === 'de' ? color.name : color.nameEn}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-4">{notice}</p>
    </div>
  );
}
