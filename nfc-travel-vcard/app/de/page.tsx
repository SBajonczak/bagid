'use client';

import { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import MessageContainer from '../components/MessageContainer';
import StartPageControl from '../components/StartPageControl';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { useAuth } from '../components/AuthProvider';

export default function DeHome() {
  const { isAuthenticated } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    setShowDashboard(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <NavigationBar />

      {!isAuthenticated && (
        
        <header className="w-full flex justify-center bg-gradient-to-br py-6 mt-6">
        
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

      <Header />
      <MessageContainer message={''} type={'none'} />

      <main className="flex flex-col items-center gap-12">
        {showDashboard && <Dashboard hidden={false} />}
        <StartPageControl hidden={false} />
      </main>

      <Footer />
    </>
  );
}
