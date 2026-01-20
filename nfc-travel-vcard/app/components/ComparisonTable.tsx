import React from 'react';

interface ComparisonTableProps {
  language: 'de' | 'en';
}

export default function ComparisonTable({ language }: ComparisonTableProps) {
  const content = language === 'de' ? {
    title: 'NFC vs. QR-Code – Der Vergleich',
    headers: ['Eigenschaft', 'NFC', 'QR-Code'],
    rows: [
      ['Scannen', 'Berührungslos, einfach Smartphone ranhalten', 'Kamera öffnen und scannen'],
      ['Geschwindigkeit', 'Sofort, < 1 Sekunde', '2-3 Sekunden'],
      ['App erforderlich', 'Nein (ab iOS 13 / Android 5)', 'Oft ja (ältere Geräte)'],
      ['Funktioniert bei Schmutz', 'Ja', 'Nein, QR-Code muss sichtbar sein'],
      ['Wasserfest', 'Ja', 'Nur mit Schutzfolie'],
      ['Datenspeicher', 'Bis zu 888 Bytes', 'Begrenzt durch Größe'],
      ['Sicherheit', 'Verschlüsselt möglich', 'Öffentlich lesbar'],
    ],
    conclusion: 'NFC-Tags bieten eine deutlich bessere Nutzererfahrung und sind robuster im Alltag.',
  } : {
    title: 'NFC vs. QR Code – Comparison',
    headers: ['Feature', 'NFC', 'QR Code'],
    rows: [
      ['Scanning', 'Contactless, just hold smartphone close', 'Open camera and scan'],
      ['Speed', 'Instant, < 1 second', '2-3 seconds'],
      ['App required', 'No (from iOS 13 / Android 5)', 'Often yes (older devices)'],
      ['Works when dirty', 'Yes', 'No, QR code must be visible'],
      ['Waterproof', 'Yes', 'Only with protective film'],
      ['Data storage', 'Up to 888 bytes', 'Limited by size'],
      ['Security', 'Encryption possible', 'Publicly readable'],
    ],
    conclusion: 'NFC tags offer a significantly better user experience and are more robust in daily use.',
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">{content.title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {content.headers.map((header, idx) => (
                <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">{content.conclusion}</p>
    </div>
  );
}
