import React, { lazy, Suspense } from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
        <Router>
            <LanguageProvider>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Routes>
                        {/* Redirect root to /de (default language) */}
                        <Route path="/" element={<Navigate to="/de" replace />} />
                        
                        {/* Language-based routes */}
                        <Route path="/:lang" element={<App />} />
                        <Route path="/:lang/register/:tagId" element={<TagRegistration />} />
                        <Route path="/:lang/:tagId/edit" element={<TravelCardEdit />} />
                        <Route path="/:lang/impressum" element={<Impressum />} />
                        <Route path="/:lang/app" element={<App />} />
                        <Route path="/:lang/:tagId" element={<TravelCard />} />
                        
                        {/* Fallback for invalid routes */}
                        <Route path="*" element={<Navigate to="/de" replace />} />
                    </Routes>
                </Suspense>
            </LanguageProvider>
        </Router>
    </React.StrictMode>
);