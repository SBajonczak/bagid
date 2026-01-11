import { ReactNode } from 'react';
import { LanguageProvider } from '../components/LanguageProvider';

export default function TagLayout({ children }: { children: ReactNode }) {
  // No initialLanguage -> detect from browser and/or saved preference
  return (
    <LanguageProvider>{children}</LanguageProvider>
  );
}
