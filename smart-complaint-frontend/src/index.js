import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import "./styles/Variables.css";
import App from './App';
import './styles/Global.css';
import AuthProvider from "./context/AuthContext";

//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);



