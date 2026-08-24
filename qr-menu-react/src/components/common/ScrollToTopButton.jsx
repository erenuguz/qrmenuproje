import React from 'react';
import {useScroll} from '@/';
import {ChevronUpIcon} from '@/components/common/icon/Icons';

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
            <ChevronUpIcon size={24} strokeWidth={2.5} />
        </button>
    );
};

export default ScrollToTopButton;
