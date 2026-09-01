import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ToastContainer} from '@/components/common/Toast';
import {ToastContext} from '@/context/toast-context';

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);

    const idCounterRef = useRef(0);
    const timersRef = useRef(new Map());

    const removeToast = useCallback((id) => {
        const timerId = timersRef.current.get(id);

        if (timerId !== undefined) {
            clearTimeout(timerId);
            timersRef.current.delete(id);
        }

        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    const showToast = useCallback(
        (message, type = 'info', duration = 4000) => {
            const id = ++idCounterRef.current;

            setToasts((currentToasts) => [
                ...currentToasts,
                {
                    id,
                    message,
                    type,
                },
            ]);

            if (duration > 0) {
                const timerId = setTimeout(() => {
                    removeToast(id);
                }, duration);

                timersRef.current.set(id, timerId);
            }

            return id;
        },
        [removeToast]
    );

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timerId) => {
                clearTimeout(timerId);
            });

            timersRef.current.clear();
        };
    }, []);

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
