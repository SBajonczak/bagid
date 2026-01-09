import React, { lazy, Suspense } from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LanguageProvider } from './LanguageContext';
import { logger } from './utils/logger';

// Lazy load components for better code splitting
const TravelCard = lazy(() => import('./components/Tag/TravelCard'));
const TravelCardEdit = lazy(() => import('./components/Tag/TravelCardEdit'));
const TagRegistration = lazy(() => import('./components/Tag/TagRegistration'));
const Impressum = lazy(() => import('./components/Impressum/Impressum'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
logger.info('Starting React application...');
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <Router>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/register/:tagId" element={<TagRegistration />} />
                        {/* <Route path="/:tagId/register" element={<TagRegistration />} /> */}
                        <Route path="/:tagId/edit" element={<TravelCardEdit />} />
                        <Route path="/impressum" element={<Impressum />} />
                        <Route path="/:tagId?" element={<TravelCard />} />
                        <Route path="/app" element={<App />} />
                    </Routes>
                </Suspense>
            </Router>
        </LanguageProvider>
    </React.StrictMode>
);