import {useState, useEffect} from 'react';

export const useScroll = (limit = 300) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setShow(window.scrollY > limit);
        };

        window.addEventListener('scroll', checkScroll);

        return () => window.removeEventListener('scroll', checkScroll);
    }, [limit]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return {show, scrollToTop};
};
