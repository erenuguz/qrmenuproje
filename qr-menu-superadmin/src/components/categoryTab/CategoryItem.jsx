import {useResponsive} from '@/hooks/useResponsive';
import CategoryListHeader from '@/components/categoryTab/categoryItem/CategoryListHeader';
import CategoryItemOrder from '@/components/categoryTab/categoryItem/CategoryItemOrder';
import CategoryItemInfo from '@/components/categoryTab/categoryItem/CategoryItemInfo';
import CategoryItemActions from '@/components/categoryTab/categoryItem/CategoryItemActions';

export const CategoryItem = ({
    category,
    index,
    totalCategoryCount,
    productCount,
    moveCategoryUp,
    moveCategoryDown,
    deleteCategory,
    onEditCategory,
    showHeader = false,
}) => {
    const {isMobile} = useResponsive();
    const isLast = index === totalCategoryCount - 1;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {showHeader && <CategoryListHeader count={totalCategoryCount} />}

            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'center',
                    padding: isMobile ? '16px 20px' : '16px 24px',
                    borderBottom: isLast
                        ? 'none'
                        : '1px solid var(--borderLight)',
                    gap: isMobile ? '14px' : '20px',
                    boxSizing: 'border-box',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flex: 1,
                        minWidth: 0,
                        width: isMobile ? '100%' : undefined,
                    }}
                >
                    <CategoryItemOrder
                        index={index}
                        totalCount={totalCategoryCount}
                        onMoveUp={moveCategoryUp}
                        onMoveDown={moveCategoryDown}
                        isMobile={isMobile}
                    />

                    <CategoryItemInfo
                        name={category.name}
                        image={category.image}
                        productCount={productCount}
                    />
                </div>

                <div
                    style={{
                        flexShrink: 0,
                        display: 'flex',
                        justifyContent: isMobile ? 'flex-end' : 'center',
                        alignItems: 'center',
                    }}
                >
                    <CategoryItemActions
                        categoryId={category.id}
                        categoryName={category.name}
                        onEditClick={() => onEditCategory(category)}
                        onDeleteClick={deleteCategory}
                        isMobile={isMobile}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;
