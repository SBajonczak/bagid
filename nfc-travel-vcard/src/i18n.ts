export type SupportedLang = 'de' | 'en';
export const messages = {
    de: {
        common: {
            offerText: '🔥 Exklusives Angebot: Spare jetzt 15%! Nur für kurze Zeit – sichere dir deinen NFC-Kofferanhänger!',
            productname: 'BagID',
            features: 'Eigenschaften',
            faq: 'FAQ',
        },
        edit: 'klicken um zu bearbeiten',
        login: '☁️ Mit Azure B2C anmelden',
        travelCard: {
            edit: 'Bearbeiten',
            productname: 'Bag Tag',
            suitcase: 'Reisekoffer',
            favorite: 'Dies ist mein Lieblingskoffer',
            notify: 'Besitzer benachrichtigen',
            about: 'Kontakt / Über mich',
            firstName: 'Vorname:',
            lastName: 'Nachname:',
            address: 'Adresse:',
            email: 'E-Mail:',
            mobile: 'Mobil:',
            landline: 'Festnetz:',
            other: 'Sonstiges:',
            travelData: 'Reisedaten',
            provider: 'Anbieter',
            details: 'Details',
            date: 'Ankunftsdatum',
            guide: 'Reiseleitung',
            destinationaddress: "Zieladresse",
            destinationaddress_Accmodation: "Zieladresse / Unterkunft",
            destinationaddress_Address: "Adresse",
        },
        noDataSection: {
            demoLinkText: "Demo ansehen",
            testimonialsTitle: "Was unsere Kunden sagen",
            testimonials: [
                {
                    name: "Anna S.",
                    source: "Google",
                    text: "Endlich keine Sorge mehr am Gepäckband. Der NFC-Tag ist genial – ich liebe es!",
                    // image: require('./assets/anna.jpg'),
                    rating: 5,
                },
                {
                    name: "Markus T.",
                    source: "Facebook",
                    text: "Die Tags sehen super aus und funktionieren perfekt. Einfach mit dem Handy scannen – top!",
                    // image: require('./assets/markus.jpg'),
                    rating: 4,
                },
                {
                    name: "Lea W.",
                    source: "Google",
                    text: "Ich hab das Set für meine Familie gekauft. Robust, wasserdicht und richtig praktisch.",
                    // image: require('./assets/lea.jpg'),
                    rating: 5,
                },
            ],
            headline: 'Bag Tag – Der smarte Kofferanhänger',
            subline: 'Mit NFC & QR-Code. Kontaktdaten und Reisedaten jederzeit online ändern. Finder können dich sofort kontaktieren oder den Koffer nachsenden.',
            features: [
                'Sofortiger Zugriff per NFC & QR-Code',
                'Daten jederzeit online aktualisieren',
                'Ideal für Vielreisende & Familien',
                'Koffer kann nachgesendet werden',
                'Keine App erforderlich – funktioniert mit jedem Smartphone',
                'Schützt deine Privatsphäre – nur die nötigen Daten werden geteilt',
                'Robustes und wasserfestes Design für jede Reise'
            ],
            contact: 'Kontakt aufnehmen',
            cta: 'Bag Tag jetzt sichern'
        },
        faq: {
            title: 'Häufig gestellte Fragen',
            questions: [
                {
                    question: 'Wie funktioniert der Bag Tag?',
                    answer: 'Der Bag Tag nutzt NFC und QR-Code-Technologie, um Ihre Kontaktdaten sicher zu speichern und Finder zu ermöglichen, Sie schnell zu kontaktieren.',
                },
                {
                    question: 'Kann ich meine Daten jederzeit ändern?',
                    answer: 'Ja, Sie können Ihre Daten jederzeit online aktualisieren, um sicherzustellen, dass sie immer aktuell sind.',
                },
                {
                    question: 'Ist der Bag Tag wasserdicht?',
                    answer: 'Ja, der Bag Tag ist robust und wasserdicht, sodass er für jede Reise geeignet ist.',
                },
                {
                    question: 'Was ist in dem Paket enthalten?',
                    answer: 'Sie erhalten ihr Persönliches Tag und ein Metallring zum befestigen des Tags.',
                },
            ],
        },
    },
    en: {
        common: {
            offerText: '🔥 Exclusive offer: Save 15% now! Limited time only – get your NFC luggage tag today!',
            productname: 'BagID',
            features: 'Features',
            faq: 'FAQ',
        },
        edit: 'click to edit',
        login: '☁️ Sign in with Azure B2C',
        travelCard: {
            edit: 'Edit',
            productname: 'Bag Tag',
            suitcase: 'Suitcase',
            favorite: 'This is my favorite suitcase',
            notify: 'Notify the owner',
            about: 'About / Contact data',
            firstName: 'First name:',
            lastName: 'Last name:',
            address: 'Address:',
            email: 'E-Mail:',
            mobile: 'Mobile:',
            landline: 'Landline:',
            other: 'Other:',
            travelData: 'Travel data',
            provider: 'Provider',
            details: 'Details',
            date: 'Arrival date',
            guide: 'Guide',
            destinationaddress: "Destination address",
            destinationaddress_Accmodation: "Destination address / Accommodation",
            destinationaddress_Address: "Address",
        },
        noDataSection: {
            demoLinkText: "View Demo",
            testimonialsTitle: "What our customers say",
            headline: 'Bag Tag – The smart luggage tag',
            subline: 'With NFC & QR code. Update your contact and travel data online anytime. Finders can contact you instantly or forward your luggage.',
            testimonials: [
                {
                    name: "Anna S.",
                    source: "Google",
                    text: "No more worries at baggage claim. The NFC tag is brilliant – I love it!",
                    // image: require('./assets/anna.jpg'),
                    rating: 5,
                },
                {
                    name: "Markus T.",
                    source: "Facebook",
                    text: "Tags look amazing and work flawlessly. Just scan with your phone – perfect!",
                    // image: require('./assets/markus.jpg'),
                    rating: 4,
                },
                {
                    name: "Lea W.",
                    source: "Google",
                    text: "Bought the set for my family. Durable, waterproof, and super useful.",
                    // image: require('./assets/lea.jpg'),
                    rating: 5,
                },
            ],
            features: [
                'Instant access via NFC & QR code',
                'Update data online anytime',
                'Perfect for frequent travelers & families',
                'Luggage can be forwarded',
                'No app required – works with any smartphone',
                'Protects your privacy – only share necessary data',
                'Durable and waterproof design for every journey'
            ],
            contact: 'Contact us',
            cta: 'Get your Bag Tag now'
        },
        faq: {
            title: 'Frequently Asked Questions',
            questions: [
                {
                    question: 'How does the Bag Tag work?',
                    answer: 'The Bag Tag uses NFC and QR code technology to securely store your contact details and allow finders to contact you quickly.',
                },
                {
                    question: 'Can I update my data anytime?',
                    answer: 'Yes, you can update your data online anytime to ensure it is always up-to-date.',
                },
                {
                    question: 'Is the Bag Tag waterproof?',
                    answer: 'Yes, the Bag Tag is durable and waterproof, making it suitable for any journey.',
                },
                {
                    question: 'What is included in the package?',
                    answer: 'You will receive your personalized tag and a metal ring to attach the tag.',
                }
            ],
        },
    }

};

export function getBrowserLanguage(): SupportedLang {
    const lang = navigator.language.slice(0, 2);
    return lang === 'de' ? 'de' : 'en';
}
