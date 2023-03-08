import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Router} from "react-router-dom";
import history from './history';
import './index.css';

const app = (
    <Router history={history}>
        <App/>
    </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
