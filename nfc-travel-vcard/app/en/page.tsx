'use client';

import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import MessageContainer from '../components/MessageContainer';
import StartPageControl from '../components/StartPageControl';
import Footer from '../components/Footer';

export default function EnHome() {

  return (
    <>
      <NavigationBar />

      <Header />
      <MessageContainer message={''} type={'none'} />

      <main className="flex flex-col items-center gap-12">
        <StartPageControl hidden={false} />
      </main>

      <Footer />
    </>
  );
}
