'use client';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}
