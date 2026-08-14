import {useEffect, useRef} from 'react';

export const useCategoryScrollSpy = (
    kategoriler,
    aktifKategori,
    setAktifKategori
) => {
    const isClickScrolling = useRef(false);

    // Ekran kaydırıldıkça hangi kategorinin ekranda olduğunu bulma
    useEffect(() => {
        const handleScroll = () => {
            if (aktifKategori === null || isClickScrolling.current) return;

            const scrollPosition = window.scrollY + 80;
            let ekrandakiKategoriId = null;

            for (const kat of kategoriler) {
                const element = document.getElementById(`kategori-${kat.id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    ekrandakiKategoriId = kat.id;
                }
            }
            if (ekrandakiKategoriId && ekrandakiKategoriId !== aktifKategori) {
                setAktifKategori(ekrandakiKategoriId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [kategoriler, aktifKategori, setAktifKategori]);

    // Aktif kategori değiştiğinde üst menüdeki butonu ortalayarak gösterme
    useEffect(() => {
        if (aktifKategori) {
            const aktifButon = document.getElementById(`btn-${aktifKategori}`);
            if (aktifButon) {
                aktifButon.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                });
            }
        }
    }, [aktifKategori]);

    // Kullanıcı menüden bir kategoriye tıkladığında oraya kaydırma
    const kategoriyeKaydir = (katId) => {
        isClickScrolling.current = true;
        setAktifKategori(katId);

        setTimeout(() => {
            const element = document.getElementById(`kategori-${katId}`);
            if (element) {
                const y =
                    element.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({top: y, behavior: 'smooth'});

                // Kaydırma animasyonunun bitmesini bekle
                setTimeout(() => {
                    isClickScrolling.current = false;
                }, 800);
            } else {
                isClickScrolling.current = false;
            }
        }, 100);
    };

    return {kategoriyeKaydir};
};
