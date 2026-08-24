import React from 'react';
import {
    LoadingSpinner,
    EmptyState,
    useMenu,
    useCategories,
    useCategoryScrollSpy,
    useDraggable,
    CategoryGrid,
    MenuListView,
} from '@/';

const CustomerMenu = ({restaurantId, activeCategory, setActiveCategory}) => {
    const {menu, loading: isMenuLoading} = useMenu(restaurantId);
    const {categories, loading: isCategoriesLoading} =
        useCategories(restaurantId);

    const {scrollToCategory} = useCategoryScrollSpy(
        categories,
        activeCategory,
        setActiveCategory
    );
    const {dragRef, isDragging, dragHandlers} = useDraggable();

    const loading = isMenuLoading || isCategoriesLoading;

    if (loading) return <LoadingSpinner message="Menü Yükleniyor..." />;

    return (
        <div
            style={{
                backgroundColor: 'transparent',
                minHeight: '100vh',
                paddingBottom: '30px',
                fontFamily: 'var(--font-family)',
            }}
        >
            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                {menu.length === 0 ? (
                    <EmptyState message="Menüde henüz ürün yok." />
                ) : activeCategory === null ? (
                    <CategoryGrid
                        categories={categories}
                        menu={menu}
                        scrollToCategory={scrollToCategory}
                    />
                ) : (
                    <MenuListView
                        categories={categories}
                        menu={menu}
                        activeCategory={activeCategory}
                        scrollToCategory={scrollToCategory}
                        navRef={dragRef}
                        isDragging={isDragging}
                        dragHandlers={dragHandlers}
                    />
                )}
            </div>
        </div>
    );
};

export default CustomerMenu;
