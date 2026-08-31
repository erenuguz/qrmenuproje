import {useCallback, useEffect, useRef} from 'react';

const SCROLL_OFFSET = 60;
const CATEGORY_ID_PREFIX = 'category-';

export const useCategoryScrollSpy = (
    categories,
    activeCategory,
    setActiveCategory
) => {
    const activeCategoryRef = useRef(activeCategory);
    const scrollFrameRef = useRef(null);

    const isMenuListVisible = activeCategory !== null;

    useEffect(() => {
        activeCategoryRef.current = activeCategory;
    }, [activeCategory]);

    useEffect(() => {
        if (!isMenuListVisible || categories.length === 0) {
            return;
        }

        const categoryElements = categories
            .map((category) =>
                document.getElementById(`${CATEGORY_ID_PREFIX}${category.id}`)
            )
            .filter(Boolean);

        if (categoryElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (firstEntry, secondEntry) =>
                            Math.abs(
                                firstEntry.boundingClientRect.top -
                                    SCROLL_OFFSET
                            ) -
                            Math.abs(
                                secondEntry.boundingClientRect.top -
                                    SCROLL_OFFSET
                            )
                    );

                const closestEntry = visibleEntries[0];

                if (!closestEntry) {
                    return;
                }

                const categoryId = closestEntry.target.id.slice(
                    CATEGORY_ID_PREFIX.length
                );

                if (categoryId && categoryId !== activeCategoryRef.current) {
                    activeCategoryRef.current = categoryId;
                    setActiveCategory(categoryId);
                }
            },
            {
                root: null,
                rootMargin: `-${SCROLL_OFFSET}px 0px -65% 0px`,
                threshold: [0, 0.1, 0.5],
            }
        );

        categoryElements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [categories, isMenuListVisible, setActiveCategory]);

    useEffect(() => {
        if (!activeCategory) {
            return;
        }

        const activeButton = document.getElementById(`btn-${activeCategory}`);

        activeButton?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    }, [activeCategory]);

    const scrollToCategory = useCallback(
        (categoryId) => {
            activeCategoryRef.current = categoryId;
            setActiveCategory(categoryId);

            if (scrollFrameRef.current !== null) {
                cancelAnimationFrame(scrollFrameRef.current);
            }

            const findAndScroll = (remainingAttempts) => {
                const element = document.getElementById(
                    `${CATEGORY_ID_PREFIX}${categoryId}`
                );

                if (element) {
                    const targetPosition =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        SCROLL_OFFSET;

                    const prefersReducedMotion = window.matchMedia(
                        '(prefers-reduced-motion: reduce)'
                    ).matches;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    });

                    scrollFrameRef.current = null;
                    return;
                }

                if (remainingAttempts > 0) {
                    scrollFrameRef.current = requestAnimationFrame(() => {
                        findAndScroll(remainingAttempts - 1);
                    });

                    return;
                }

                scrollFrameRef.current = null;
            };

            scrollFrameRef.current = requestAnimationFrame(() => {
                findAndScroll(2);
            });
        },
        [setActiveCategory]
    );

    useEffect(() => {
        return () => {
            if (scrollFrameRef.current !== null) {
                cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    return {scrollToCategory};
};
