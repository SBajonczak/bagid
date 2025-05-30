import React from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TravelCard from './components/Tag/TravelCard';
import { LanguageProvider } from './LanguageContext';

ReactDOM.render(
    <React.StrictMode>
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<TravelCard />} />
                    <Route path="/:tagId?" element={<TravelCard />} />
                    <Route path="/app" element={<App />} />
                </Routes>
            </Router>
        </LanguageProvider>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);