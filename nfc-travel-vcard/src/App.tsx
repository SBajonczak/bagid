import React from 'react';
// import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import MessageContainer from './components/MessageContainer';
import StartPageControl from './components/StartPageControl';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Testimonial from './components/Testimonial';
import { messages } from './i18n';
// import SeoMeta from './components/SeoMeta';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
    const { lang } = useLanguage();
    const t = messages[lang].noDataSection.testimonials;
    return (
        <LanguageProvider>
            <div>
                {/* <SeoMeta /> */}
                <NavigationBar />
                {/* Video at the top */}
                <div className="w-full flex justify-center bg-gradient-to-br py-6">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full max-w-7xl h-40 object-cover rounded shadow"
                        style={{ height:'55vh', width:'100%' }}
                    >
                        <source src="/assets/bagtap-loop.h264.mp4" type="video/mp4" />
                        <source src="/assets/bagtap-loop.webm" type="video/webm" />
                        Dein Browser unterstützt keine eingebetteten Videos.
                    </video>
                </div>
                <Header />
                <MessageContainer message={''} type={'none'} />
                <StartPageControl hidden={false} />
            </div>
            {/* Footer-Slider */}
            <Testimonial testimonials={t} />
        </LanguageProvider>
    );
};

export default App;