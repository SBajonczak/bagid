import React from 'react';
import App from './App';
import './styles/App.css';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/:tagId?" element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);