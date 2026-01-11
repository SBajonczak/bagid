'use client';

import { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import MessageContainer from '../components/MessageContainer';
import StartPageControl from '../components/StartPageControl';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { useAuth } from '../components/AuthProvider';
import type { Locale } from '@/lib/i18n-config';

export default function Home({ params }: { params: { lang: Locale } }) {
  const { isAuthenticated } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    setShowDashboard(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <NavigationBar lang={params.lang} />

      {/* Video header shown only when NOT authenticated */}
      {!isAuthenticated && (
        <header className="w-full flex justify-center bg-gradient-to-br py-6">
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
            title="Bag Tag Produktdemonstration"
            width="1920"
            height="1080">
            <source src="/assets/bagid-loop.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
            Dein Browser unterstützt keine eingebetteten Videos.
          </video>
        </header>
      )}

      <Header lang={params.lang} />
      <MessageContainer message={''} type={'none'} />

      {/* Dashboard shown only when authenticated */}
      <Dashboard hidden={!showDashboard} lang={params.lang} />

      {/* Start page controls shown only when NOT authenticated */}
      {!isAuthenticated && <StartPageControl lang={params.lang} />}

      <Footer lang={params.lang} />
    </>
  );
}
