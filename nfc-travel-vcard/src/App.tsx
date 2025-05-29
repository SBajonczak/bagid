import React, { useEffect, useState } from 'react';
// import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import MessageContainer from './components/MessageContainer';
import NoDataSection from './components/NoDataSection';
import TravelCard from './components/TravelCard';
import { TravelData } from './types';
import { useParams } from 'react-router';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Testimonial from './components/Testimonial';
import { messages } from './i18n';
import LanguageSelection from './components/LoginSection';
import SeoMeta from './components/SeoMeta';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
    const { tagId } = useParams<{ tagId: string }>(); // <-- tagId aus URL holen

    const { lang } = useLanguage();
    const t = messages[lang].noDataSection.testimonials;


    const [tagData] = useState<TravelData>(

        {
            hasData: true,
            ownerFirstName: 'Max',
            ownerLastName: 'Mustermann',
            ownerAddress: 'Merziger Str. 6, 45481 Mülheim an der Ruhr, Deutschland',
            ownerEmail: 'max.mustermann@test.de',
            ownerMobile: '+49 208 69821931',
            ownerLandline: '+49 208 69821931',
            ownerOther: '',
            guideFirstName: 'Maxima',
            guideLastName: 'Musterfrau',
            guideEmail: 'maxima.musterfrau@test.de',
            guideMobile: '+49 208 69821931',
            guideLandline: '+49 208 69821931',
            destinationAccommodation: 'Hotel Beispiel',
            destinationAddress: 'Beispielstraße 1, 12345 Beispielstadt',
            transportation: 'Deutsche Bahn',
            transportationNumber: 'IC178',
            transportationDate: new Date()
        }

    );
    const [displayMode, setDisplayMode] = useState<'view' | 'advertize'>('view'); // 'view' oder 'edit'



    useEffect(() => {
        console.log(`Aktuelle Tag ID: ${tagId}`);
        setDisplayMode(tagId === undefined ? 'advertize' : 'view');
    }, [tagId]);

    return (
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
                            style={{ height:'55vh', width:'100%' }}
                        >
                            <source src="/assets/bagtap-loop.h264.mp4" type="video/mp4" />
                            <source src="/assets/bagtap-loop.webm" type="video/webm" />
                            Dein Browser unterstützt keine eingebetteten Videos.
                        </video>
                    </div>
                    <Header />
                    <MessageContainer message={''} type={'none'} />

                    {<TravelCard
                        hidden={displayMode === 'advertize' || !tagData.hasData}
                        transportation={tagData.transportation}
                        ownerFirstName={tagData.ownerFirstName}
                        ownerLastName={tagData.ownerLastName}
                        ownerAddress={tagData.ownerAddress}
                        ownerEmail={tagData.ownerEmail}
                        ownerMobile={tagData.ownerMobile}
                        ownerLandline={tagData.ownerLandline}
                        ownerOther={tagData.ownerOther}
                        guideFirstName={tagData.guideFirstName}
                        guideLastName={tagData.guideLastName}
                        guideEmail={tagData.guideEmail}
                        guideMobile={tagData.guideMobile}
                        guideLandline={tagData.guideLandline}
                        destinationAccommodation={tagData.destinationAccommodation}
                        destinationAddress={tagData.destinationAddress}
                        transportationDate={tagData.transportationDate}
                        transportationNumber={tagData.transportationNumber}

                        key={1}
                    />}
                    {<NoDataSection hidden={displayMode === 'view'} />}
                </div>
                {/* Footer-Slider */}
                <Testimonial testimonials={t} />
            </LanguageProvider>
    );
};

export default App;