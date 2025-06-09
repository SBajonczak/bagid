import React from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TravelCard from './components/Tag/TravelCard';
import { LanguageProvider } from './LanguageContext';
import TravelCardEdit from './components/Tag/TravelCardEdit';
import TagRegistration from './components/Tag/TagRegistration';
import Impressum from './components/Impressum/Impressum';
import { logger } from './utils/logger';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
logger.info('Starting React application...');
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/register/:tagId" element={<TagRegistration />} />
                    {/* <Route path="/:tagId/register" element={<TagRegistration />} /> */}
                    <Route path="/:tagId/edit" element={<TravelCardEdit />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="/:tagId?" element={<TravelCard />} />
                    <Route path="/app" element={<App />} />
                </Routes>
            </Router>
        </LanguageProvider>
    </React.StrictMode>
);