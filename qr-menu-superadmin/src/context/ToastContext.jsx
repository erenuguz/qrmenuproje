import {useCallback, useState} from 'react';
import {ToastContainer} from '@/components/common/Toast';
import {ToastContext} from '@/context/toast-context';

let idCounter = 0;

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, type = 'info', duration = 4000) => {
            const id = ++idCounter;
            setToasts((prev) => [...prev, {id, message, type}]);
            if (duration) {
                setTimeout(() => removeToast(id), duration);
            }
        },
        [removeToast]
    );

    const toast = {
        success: (message, duration) => showToast(message, 'success', duration),
        error: (message, duration) => showToast(message, 'error', duration),
        info: (message, duration) => showToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={{toast}}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}
