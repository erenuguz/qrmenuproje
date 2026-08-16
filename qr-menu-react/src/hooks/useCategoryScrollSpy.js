import {useEffect, useRef} from 'react';

export const useCategoryScrollSpy = (
    categories,
    activeCategory,
    setActiveCategory
) => {
    const isClickScrolling = useRef(false);

    // Ekran kaydırıldıkça hangi kategorinin ekranda olduğunu bulma
    useEffect(() => {
        const handleScroll = () => {
            if (activeCategory === null || isClickScrolling.current) return;

            const scrollPosition = window.scrollY + 80;
            let currentCategoryId = null;

            for (const category of categories) {
                const element = document.getElementById(
                    `category-${category.id}`
                );
                if (element && element.offsetTop <= scrollPosition) {
                    currentCategoryId = category.id;
                }
            }
            if (currentCategoryId && currentCategoryId !== activeCategory) {
                setActiveCategory(currentCategoryId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories, activeCategory, setActiveCategory]);

    // Aktif kategori değiştiğinde üst menüdeki butonu ortalayarak gösterme
    useEffect(() => {
        if (activeCategory) {
            const activeButton = document.getElementById(
                `btn-${activeCategory}`
            );
            if (activeButton) {
                activeButton.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                });
            }
        }
    }, [activeCategory]);

    // Kullanıcı menüden bir kategoriye tıkladığında oraya kaydırma
    const scrollToCategory = (categoryId) => {
        isClickScrolling.current = true;
        setActiveCategory(categoryId);

        setTimeout(() => {
            const element = document.getElementById(`category-${categoryId}`);
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

    return {scrollToCategory};
};
