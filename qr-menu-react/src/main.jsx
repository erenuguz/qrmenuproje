import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import {ThemeProvider} from './context/ThemeContext';
import {validateEnv} from './config/env';
import '@/styles/global.css';

validateEnv();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </ThemeProvider>
    </StrictMode>
);
