import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import {ThemeProvider} from './context/ThemeContext';
import {ToastProvider} from './context/ToastContext';
import {validateEnv} from './config/env';
import '@/styles/global.css';

validateEnv();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <ToastProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>
);
