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
