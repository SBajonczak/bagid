import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-500.css';
import '@fontsource/barlow/latin-600.css';
import '@fontsource/barlow-semi-condensed/latin-500.css';
import '@fontsource/barlow-semi-condensed/latin-600.css';
import '@fontsource/barlow-semi-condensed/latin-700.css';
import '../components/home/home.css';
import '../components/content/content.css';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

/**
 * Rahmen für alle Ratgeber-, Hilfe- und Produktunterseiten:
 * gleiches Design-System wie die Startseite (Tokens aus home.css).
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      <main className="bt-home bt-content">{children}</main>
      <Footer />
    </>
  );
}
