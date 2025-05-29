import React from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TravelCard from './components/Tag/TravelCard';




ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* <Route path="/" element={<App/>} /> */}
                <Route path="/" element={<TravelCard/>} />
                <Route path="/:tagId?" element={<TravelCard />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);