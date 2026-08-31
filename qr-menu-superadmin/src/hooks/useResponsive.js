import {useSyncExternalStore} from 'react';
import {BREAKPOINTS} from '@/styles/tokens';

const MOBILE_QUERY = `(max-width: ${BREAKPOINTS.mobile}px)`;

const subscribers = new Set();

let mediaQueryList = null;

const getMediaQueryList = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    if (!mediaQueryList) {
        mediaQueryList = window.matchMedia(MOBILE_QUERY);
    }

    return mediaQueryList;
};

const notifySubscribers = () => {
    subscribers.forEach((subscriber) => {
        subscriber();
    });
};

const subscribe = (subscriber) => {
    const queryList = getMediaQueryList();

    subscribers.add(subscriber);

    // İlk bileşen abone olduğunda tarayıcı listener'ı açılır.
    if (subscribers.size === 1) {
        queryList?.addEventListener('change', notifySubscribers);
    }

    return () => {
        subscribers.delete(subscriber);

        // Son bileşen kaldırıldığında listener temizlenir.
        if (subscribers.size === 0) {
            queryList?.removeEventListener('change', notifySubscribers);

            mediaQueryList = null;
        }
    };
};

const getSnapshot = () => {
    return getMediaQueryList()?.matches ?? false;
};

const getServerSnapshot = () => {
    return false;
};

export function useResponsive() {
    const isMobile = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    return {isMobile};
}
