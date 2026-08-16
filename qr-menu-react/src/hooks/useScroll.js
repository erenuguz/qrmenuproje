import {useState, useEffect} from 'react';

export const useScroll = (threshold = 300) => {
    const [isVisible, setIsVisible] = useState(false); // Butonun görünürlük durumunu tutar

    useEffect(() => {
        // Sayfanın dikey kaydırma miktarını (scrollY) limitle kıyaslar
        const checkScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        // Component mount olduğunda scroll listener'ı dinlemeye başlar
        window.addEventListener('scroll', checkScroll);

        // Component unmount olduğunda bellek sızıntısını (memory leak) önlemek için event'i temizler
        return () => window.removeEventListener('scroll', checkScroll);
    }, [threshold]); // Limit değiştiğinde useEffect yeniden tetiklenir

    // Sayfanın en üstüne yumuşak bir şekilde (smooth) kaydırılmasını sağlayan fonksiyon
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // İhtiyaç duyulan durumu ve fonksiyonu dışarı aktarır
    return {isVisible, scrollToTop};
};
