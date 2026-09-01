import {useCallback, useMemo, useRef, useState} from 'react';
import {ToastContainer} from '@/components/common/Toast';
import {ToastContext} from '@/context/toast-context';

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);
    const idCounter = useRef(0);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, type = 'info', duration = 4000) => {
            const id = ++idCounter.current;

            setToasts((prev) => [...prev, {id, message, type}]);

            if (duration && duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        },
        [removeToast]
    );

    const toast = useMemo(
        () => ({
            show: showToast,
            success: (message, duration) =>
                showToast(message, 'success', duration),
            error: (message, duration) => showToast(message, 'error', duration),
            info: (message, duration) => showToast(message, 'info', duration),
            warning: (message, duration) =>
                showToast(message, 'warning', duration),
            remove: removeToast,
        }),
        [showToast, removeToast]
    );

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}
