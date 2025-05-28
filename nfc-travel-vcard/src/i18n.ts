export type SupportedLang = 'de' | 'en' | 'nl' | 'be';

export const messages = {
    de: {
        common: {
            productname: 'BagID',
        },
        edit: 'klicken um zu bearbeiten',
        login: '☁️ Mit Azure B2C anmelden',
        travelCard: {
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
        }
    },
    en: {
        common: {
            productname: 'BagID',
        },
        edit: 'click to edit',
        login: '☁️ Sign in with Azure B2C',
        travelCard: {
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

    },

    nl: {
        common: {
            productname: 'BagID',
        },
        edit: 'klik om te bewerken',
        login: '☁️ Aanmelden met Azure B2C',
        travelCard: {
            productname: 'Bag Tag',
            suitcase: 'Koffer',
            favorite: 'Dit is mijn favoriete koffer',
            notify: 'Eigenaar informeren',
            about: 'Over / Contactgegevens',
            firstName: 'Voornaam:',
            lastName: 'Achternaam:',
            address: 'Adres:',
            email: 'E-mailadres:',
            mobile: 'Mobiel:',
            landline: 'Vast nummer:',
            other: 'Overig:',
            travelData: 'Reisgegevens',
            provider: 'Aanbieder',
            details: 'Details',
            date: 'Aankomstdatum',
            guide: 'Reisleider',
            destinationaddress: "Bestemmingsadres",
            destinationaddress_Accmodation: "Bestemmingsadres / Accommodatie",
            destinationaddress_Address: "Adres",
        },
        noDataSection: {
            testimonialsTitle: "Wat onze klanten zeggen",
            headline: 'Bag Tag – Het slimme bagagelabel',
            subline: 'Met NFC en QR-code. Bewerk contact- en reisgegevens altijd online. Vinders kunnen je direct contacteren of je koffer nasturen.',
            testimonials: [
                {
                    name: "Anna S.",
                    source: "Google",
                    text: "Geen stress meer bij de bagageband. Deze NFC-tag is echt geweldig!",
                    rating: 5,
                },
                {
                    name: "Markus T.",
                    source: "Facebook",
                    text: "Ziet er goed uit en werkt perfect. Gewoon scannen met je mobiel – top!",
                    rating: 4,
                },
                {
                    name: "Lea W.",
                    source: "Google",
                    text: "Gekocht voor het hele gezin. Waterdicht en stevig – ideaal voor op reis.",
                    rating: 5,
                },
            ],
            features: [
                'Directe toegang via NFC & QR-code',
                'Gegevens altijd online bewerken',
                'Ideaal voor frequente reizigers & gezinnen',
                'Bagage kan worden nagezonden',
                'Geen app vereist – werkt op elke smartphone',
                'Privacy beschermd – alleen noodzakelijke gegevens worden gedeeld',
                'Stevig en waterbestendig ontwerp voor elke reis'
            ],
            contact: 'Contact opnemen',
            cta: 'Bestel nu je Bag Tag'
        }
    },
    be: {
        common: {
            productname: 'BagID',
        },
        edit: 'klik om te bewerken',
        login: '☁️ Aanmelden met Azure B2C',
        travelCard: {
            productname: 'Bag Tag',
            suitcase: 'Koffer',
            favorite: 'Dit is mijn favoriete koffer',
            notify: 'Eigenaar informeren',
            about: 'Over / Contactgegevens',
            firstName: 'Voornaam:',
            lastName: 'Achternaam:',
            address: 'Adres:',
            email: 'E-mailadres:',
            mobile: 'Mobiel:',
            landline: 'Vast nummer:',
            other: 'Overig:',
            travelData: 'Reisgegevens',
            provider: 'Aanbieder',
            details: 'Details',
            date: 'Aankomstdatum',
            guide: 'Reisleider',
            destinationaddress: "Bestemmingsadres",
            destinationaddress_Accmodation: "Bestemmingsadres / Accommodatie",
            destinationaddress_Address: "Adres",
        },
        noDataSection: {
            testimonialsTitle: "Wat onze klanten zeggen",
            headline: 'Bag Tag – Het slimme bagagelabel',
            subline: 'Met NFC en QR-code. Bewerk contact- en reisgegevens altijd online. Vinders kunnen je direct contacteren of je koffer nasturen.',
            testimonials: [
                {
                    name: "Anna S.",
                    source: "Google",
                    text: "Geen stress meer bij de bagageband. Deze NFC-tag is echt geweldig!",
                    rating: 5,
                },
                {
                    name: "Markus T.",
                    source: "Facebook",
                    text: "Ziet er goed uit en werkt perfect. Gewoon scannen met je mobiel – top!",
                    rating: 4,
                },
                {
                    name: "Lea W.",
                    source: "Google",
                    text: "Gekocht voor het hele gezin. Waterdicht en stevig – ideaal voor op reis.",
                    rating: 5,
                },
            ],
            features: [
                'Directe toegang via NFC & QR-code',
                'Gegevens altijd online bewerken',
                'Ideaal voor frequente reizigers & gezinnen',
                'Bagage kan worden nagezonden',
                'Geen app vereist – werkt op elke smartphone',
                'Privacy beschermd – alleen noodzakelijke gegevens worden gedeeld',
                'Stevig en waterbestendig ontwerp voor elke reis'
            ],
            contact: 'Contact opnemen',
            cta: 'Bestel nu je Bag Tag'
        }
    }
};

export function getBrowserLanguage(): SupportedLang {
    const lang = navigator.language.slice(0, 2);
    return lang === 'de' ? 'de' : 'en';
}
