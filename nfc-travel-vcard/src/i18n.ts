export type SupportedLang = 'de' | 'en';
export const messages = {
    de: {
        common: {
            offerText: '🔥 Exklusives Angebot: Spare jetzt 15%! Nur für kurze Zeit – sichere dir deinen NFC-Kofferanhänger!',
            productname: 'Bag-Tag',
            features: 'Eigenschaften',
            faq: 'FAQ',
        },
        seo: {
            title: 'Bag-Tag.de | Smarte NFC Gepäckanhänger für sicheres Reisen',
            description: 'Innovative NFC Gepäckanhänger zum schnellen Auffinden verlorenen Gepäcks. Moderne Reisebegleiter mit kontaktloser NFC-Technologie für alle Koffer und Taschen.',
            keywords: 'NFC Gepäckanhänger, Kofferanhänger, Gepäck ID, verlorenes Gepäck, Reisezubehör, Koffer Tag, kontaktlose Technologie, smarter Gepäckanhänger',
            productName: 'NFC Bag Tag',
            brandName: 'Bag-Tag',
            productPrice: '10.99',
            shippingDetails: {
                sameDay: false,
                overnight: false,
                twoDay: true,
                deliveryTime: '2-3 Werktage',
                shippingRate: '3.99',
                shippingDestination: 'DE'
            },
            returnPolicy: {
                merchantReturnDays: "14",
                returnPolicyCategory: "MerchantReturnFiniteReturnWindow"
            }
        },
        edit: 'klicken um zu bearbeiten',
        login: '☁️ Mit Azure B2C anmelden',
        travelCard: {
            loggedInAs: 'Angemeldet als',
            edit: 'Bearbeiten',
            productname: 'Bag-Tag',
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
            authRequired: 'Anmeldung erforderlich',
            authRequiredMessage: 'Du musst angemeldet sein, um diesen Tag zu bearbeiten.',
            notYourTag: 'Kein Zugriff',
            notYourTagMessage: 'Dieser Tag ist nicht mit deinem Konto verknüpft.',
            loginButton: 'Anmelden',
            checkingAuth: 'Überprüfe Berechtigung...',
            unauthorized: 'Keine Berechtigung',
            cancelButton: 'Zurück',
            secureAccessMessage: 'Sicherer Zugriff von Bag-Tag',
            loginHelp: 'Melde dich mit deinem Konto an, um deine Tags zu verwalten.',
            unauthorizedHelp: 'Nur der Besitzer dieses Tags kann die Daten bearbeiten.',
            // Edit messages
            save: 'Speichern',
            cancel: 'Abbrechen',
            saving: 'Speichern...',
            saveSuccess: 'Änderungen gespeichert',
            saveError: 'Fehler beim Speichern',
            loading: 'Lade Daten...',
            required: 'Pflichtfeld',
            na: "k.A",
            noData: "Keine Daten verfügbar"

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
            headline: 'Bag-Tag – Der smarte Kofferanhänger',
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
            cta: 'Bag-Tag jetzt sichern'
        },
        faq: {
            title: 'Häufig gestellte Fragen',
            questions: [
                {
                    question: 'Wie funktioniert der Bag-Tag?',
                    answer: 'Der Bag-Tag nutzt NFC und QR-Code-Technologie, um Ihre Kontaktdaten sicher zu speichern und Finder zu ermöglichen, Sie schnell zu kontaktieren.',
                },
                {
                    question: 'Kann ich meine Daten jederzeit ändern?',
                    answer: 'Ja, Sie können Ihre Daten jederzeit online aktualisieren, um sicherzustellen, dass sie immer aktuell sind.',
                },
                {
                    question: 'Ist der Bag-Tag wasserdicht?',
                    answer: 'Ja, der Bag-Tag ist robust und wasserdicht, sodass er für jede Reise geeignet ist.',
                },
                {
                    question: 'Was ist in dem Paket enthalten?',
                    answer: 'Sie erhalten ihr Persönliches Tag und ein Metallring zum befestigen des Tags.',
                },
            ],
        },
        tagRegistration: {
            title: 'Tag Registrierung',
            subtitle: 'Verbinde deinen Bag-Tag Tag mit deinem Konto',
            loading: 'Lade Informationen...',
            unknownDeviceTitle: 'Unbekanntes Gerät',
            unknownDeviceDescription: 'Dieser Tag ist nicht in unserem System registriert. Erwirbst du gerade einen neuen Bag-Tag Tag?',
            considerPurchase: 'Entdecke unsere Bag-Tag Tags und mach jedes Gepäckstück smart:',
            loginPrompt: 'Bitte melde dich an, um diesen Tag mit deinem Konto zu verknüpfen.',
            loggedInAs: 'Du bist angemeldet als',
            registerTagButton: 'Tag registrieren',
            loginAndRegisterButton: 'Anmelden und Tag registrieren',
            processingButton: 'Verarbeitung...',
            processingDescription: 'Wir verknüpfen deinen Tag mit deinem Konto...',
            howItWorksTitle: 'So funktioniert\'s:',
            howItWorksSteps: [
                'Melde dich mit deinem Konto an',
                'Registriere deinen Tag',
                'Aktualisiere deine Kontakt- und Reisedaten',
                'Befestige den Tag an deinem Gepäck'
            ],
            whyRegisterTitle: 'Warum registrieren?',
            whyRegisterPoints: [
                'Deine Daten sicher in der Cloud speichern',
                'Kontaktdaten jederzeit aktualisieren',
                'Mehrere Tags mit einem Konto verwalten',
                'Bei Verlust schneller gefunden werden'
            ]
        },
        notification: {
            title: 'Besitzer benachrichtigen',
            description: 'Sende dem Besitzer eine Nachricht mit deinem aktuellen Standort.',
            yourLocation: 'Dein aktueller Standort:',
            locationDenied: 'Standortfreigabe wurde verweigert. Bitte erlaube den Zugriff auf deinen Standort, um den Besitzer zu benachrichtigen.',
            openInMaps: 'In Google Maps öffnen',
            messageLabel: 'Deine Nachricht:',
            messagePlaceholder: 'Ich habe deinen Koffer gefunden und bin hier...',
            send: 'Nachricht senden',
            sending: 'Wird gesendet...',
            success: 'Nachricht erfolgreich gesendet! Der Besitzer wurde benachrichtigt.',
            sendError: 'Fehler beim Senden der Nachricht. Bitte versuche es später erneut.',
            cancel: 'Abbrechen',
            close: 'Schließen',
            captchaRequired: 'Bitte bestätige, dass du kein Roboter bist.',
            securityError: 'Sicherheitsproblem beim Verbindungsaufbau. Bitte versuche es später erneut.',
            tooManyRequests: 'Zu viele Anfragen. Bitte warte einen Moment und versuche es dann erneut.',
        }
    },
    en: {
        common: {
            offerText: '🔥 Exclusive offer: Save 15% now! Limited time only – get your NFC luggage tag today!',
            productname: 'Bag-Tag',
            features: 'Features',
            faq: 'FAQ',
        },
        seo: {
            title: 'Bag-Tag.de | Smart NFC Luggage Tags for Safe Travel',
            description: 'Innovative NFC luggage tags for quick recovery of lost luggage. Modern travel companions with contactless NFC technology for all suitcases and bags.',
            keywords: 'NFC luggage tags, luggage identifier, baggage ID, lost luggage, travel accessories, suitcase tag, contactless technology, smart luggage tag',
            productName: 'NFC Bag Tag',
            brandName: 'Bag-Tag',
            productPrice: '10.99',
            shippingDetails: {
                sameDay: false,
                overnight: false,
                twoDay: true,
                deliveryTime: '2-3 business days',
                shippingRate: '3.99',
                shippingDestination: 'DE'
            },
            returnPolicy: {
                merchantReturnDays: "14",
                returnPolicyCategory: "MerchantReturnFiniteReturnWindow"
            }
        },
        edit: 'click to edit',
        login: '☁️ Sign in with Azure B2C',
        travelCard: {
            loggedInAs: 'Logged in as',
            edit: 'Edit',
            productname: 'Bag-Tag',
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
            authRequired: 'Authentication required',
            authRequiredMessage: 'You need to be logged in to edit this tag.',
            notYourTag: 'No access',
            notYourTagMessage: 'This tag is not linked to your account.',
            loginButton: 'Sign in',
            checkingAuth: 'Checking authorization...',
            unauthorized: 'Unauthorized',
            cancelButton: 'Back',
            secureAccessMessage: 'Secure access control by Bag-Tag',
            loginHelp: 'Sign in with your account to manage your tags.',
            unauthorizedHelp: 'Only the owner of this tag can edit the data.',
            // Edit messages
            save: 'Save',
            cancel: 'Cancel',
            saving: 'Saving...',
            saveSuccess: 'Changes saved',
            saveError: 'Error saving',
            loading: 'Loading data...',
            required: 'Required',
            na: "N/A",
            noData: "No data available"
        },
        noDataSection: {
            demoLinkText: "View Demo",
            testimonialsTitle: "What our customers say",
            headline: 'Bag-Tag – The smart luggage tag',
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
            cta: 'Get your Bag-Tag now'
        },
        faq: {
            title: 'Frequently Asked Questions',
            questions: [
                {
                    question: 'How does the Bag-Tag work?',
                    answer: 'The Bag-Tag uses NFC and QR code technology to securely store your contact details and allow finders to contact you quickly.',
                },
                {
                    question: 'Can I update my data anytime?',
                    answer: 'Yes, you can update your data online anytime to ensure it is always up-to-date.',
                },
                {
                    question: 'Is the Bag-Tag waterproof?',
                    answer: 'Yes, the Bag-Tag is durable and waterproof, making it suitable for any journey.',
                },
                {
                    question: 'What is included in the package?',
                    answer: 'You will receive your personalized tag and a metal ring to attach the tag.',
                }
            ],
        },
        tagRegistration: {
            title: 'Tag Registration',
            subtitle: 'Connect your Bag-Tag tag to your account',
            loading: 'Loading information...',
            unknownDeviceTitle: 'Unknown Device',
            unknownDeviceDescription: 'This tag is not registered in our system. Are you looking to purchase a new Bag-Tag tag?',
            considerPurchase: 'Discover our Bag-Tag tags and make any luggage smart:',
            loginPrompt: 'Please log in to link this tag to your account.',
            loggedInAs: 'You are logged in as',
            registerTagButton: 'Register Tag',
            loginAndRegisterButton: 'Log in and Register Tag',
            processingButton: 'Processing...',
            processingDescription: 'We\'re connecting your tag to your account...',
            howItWorksTitle: 'How it works:',
            howItWorksSteps: [
                'Sign in with your account',
                'Register your tag',
                'Update your contact and travel information',
                'Attach the tag to your luggage'
            ],
            whyRegisterTitle: 'Why register?',
            whyRegisterPoints: [
                'Store your data securely in the cloud',
                'Update contact information anytime',
                'Manage multiple tags with one account',
                'Get found faster if lost'
            ]
        },
        notification: {
            title: 'Notify Owner',
            description: 'Send a message to the owner with your current location.',
            yourLocation: 'Your current location:',
            locationDenied: 'Location access denied. Please allow access to your location to notify the owner.',
            openInMaps: 'Open in Google Maps',
            messageLabel: 'Your message:',
            messagePlaceholder: 'I found your luggage and I\'m at...',
            send: 'Send Message',
            sending: 'Sending...',
            success: 'Message sent successfully! The owner has been notified.',
            sendError: 'Error sending message. Please try again later.',
            cancel: 'Cancel',
            close: 'Close',
            captchaRequired: 'Please verify that you are not a robot.',
            securityError: 'Security issue while establishing connection. Please try again later.',
            tooManyRequests: 'Too many requests. Please wait a moment and try again later.',
        }
    }

};

export function getBrowserLanguage(): SupportedLang {
    const lang = navigator.language.slice(0, 2);
    return lang === 'de' ? 'de' : 'en';
}
