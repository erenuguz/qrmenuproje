import React from 'react';
import {useScroll} from '@/';
import {ChevronUpIcon} from '@/components/common/icon/Icons';
import {FloatingButton} from '@/components/common/button/Buttons';

const ScrollToTopButton = () => {
    const {show, scrollToTop} = useScroll(300);

    if (!show) return null;

    return (
        <FloatingButton
            onClick={scrollToTop}
            icon={<ChevronUpIcon size={24} strokeWidth={2.5} />}
            ariaLabel="Sayfanın başına dön"
        />
    );
};

export default ScrollToTopButton;
