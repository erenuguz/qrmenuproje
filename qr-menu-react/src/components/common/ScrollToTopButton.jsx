import React from 'react';
import {useScroll} from '@/';

const ScrollToTopButton = () => {
    const {show, scrollToTop} = useScroll(300);

    if (!show) return null;

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '25px',
                right: '25px',
                zIndex: 1000,
                backgroundColor: 'var(--primary)',
                color: 'var(--textWhite)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                boxShadow:
                    '0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
