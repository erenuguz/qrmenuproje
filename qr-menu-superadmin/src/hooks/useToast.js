import {useContext} from 'react';
import {ToastContext} from '@/context/toast-context';

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast, ToastProvider içinde kullanılmalı.');
    }

    return context;
};
