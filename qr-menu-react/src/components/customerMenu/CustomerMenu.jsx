import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import CategoryGrid from '@/components/customerMenu/components/CategoryGrid';
import MenuListView from '@/components/customerMenu/components/MenuListView';
import {useMenu} from '@/hooks/useMenu';
import {useCategories} from '@/hooks/useCategories';
import {useCategoryScrollSpy} from '@/hooks/useCategoryScrollSpy';
import {useDraggable} from '@/hooks/useDraggable';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import {useMenuIndex} from '@/hooks/useMenuIndex';

const CustomerMenu = ({restaurantId, activeCategory, setActiveCategory}) => {
    const {
        menu,
        loading: isMenuLoading,
        error: menuError,
    } = useMenu(restaurantId);

    const {
        categories,
        loading: isCategoriesLoading,
        error: categoriesError,
    } = useCategories(restaurantId);

    const {scrollToCategory} = useCategoryScrollSpy(
        categories,
        activeCategory,
        setActiveCategory
    );
    const {dragRef, isDragging, dragHandlers} = useDraggable();
    const loading = isMenuLoading || isCategoriesLoading;
    const {productsByCategory} = useMenuIndex(menu);

    if (loading) return <LoadingSpinner message="Menü Yükleniyor..." />;

    const snapshotError = menuError || categoriesError;

    if (snapshotError) {
        return (
            <SnapshotErrorState
                error={snapshotError}
                resourceName="Menü"
                minHeight="60vh"
            />
        );
    }

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
                    <EmptyState
                        title="Henüz ürün yok"
                        message="Menünüzde gösterilecek bir ürün bulunmuyor."
                    />
                ) : activeCategory === null ? (
                    <CategoryGrid
                        categories={categories}
                        productsByCategory={productsByCategory}
                        scrollToCategory={scrollToCategory}
                    />
                ) : (
                    <MenuListView
                        categories={categories}
                        productsByCategory={productsByCategory}
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
