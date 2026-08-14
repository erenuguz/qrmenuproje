import {useState, useEffect} from 'react';

export const useScroll = (limit = 300) => {
    const [goster, setGoster] = useState(false);

    useEffect(() => {
        const kontrolEt = () => {
            setGoster(window.scrollY > limit);
        };

        window.addEventListener('scroll', kontrolEt);

        return () => window.removeEventListener('scroll', kontrolEt);
    }, [limit]);

    const usteCik = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return {goster, usteCik};
};
