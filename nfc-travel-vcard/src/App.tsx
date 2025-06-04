import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import MessageContainer from './components/MessageContainer';
import StartPageControl from './components/StartPageControl';
import { LanguageProvider } from './LanguageContext';
import SeoMeta from './components/SeoMeta';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
    return (
        <HelmetProvider>
            <LanguageProvider>
                <div>
                    <SeoMeta />
                    <NavigationBar />
                    {/* Video at the top */}
                    <div className="w-full flex justify-center bg-gradient-to-br py-6">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full max-w-7xl h-40 object-cover rounded shadow"
                            style={{ height: '55vh', width: '100%' }}
                            preload="auto"
                            controls={false}
                            disablePictureInPicture
                            controlsList="nodownload noremoteplayback"
                            aria-label="Bag Tag Produktdemonstration"
                            title="Bag Tag Produktdemonstration">
                            <source src="/assets/bagid-loop.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
                            Dein Browser unterstützt keine eingebetteten Videos.
                        </video>
                    </div>
                    <Header />
                    <MessageContainer message={''} type={'none'} />
                    <StartPageControl hidden={false} />
                </div>
                <footer className="mt-10 py-4 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Bag-Tag.de - Alle Rechte vorbehalten</p>
                </footer>
            </LanguageProvider>
        </HelmetProvider>
    );
};

export default App;