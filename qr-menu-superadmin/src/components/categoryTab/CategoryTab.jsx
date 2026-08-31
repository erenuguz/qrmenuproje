import {useState} from 'react';
import CategoryHeader from '@/components/categoryTab/CategoryHeader';
import CategoryAdd from '@/components/categoryTab/CategoryAdd';
import CategoryItem from '@/components/categoryTab/CategoryItem';
import EmptyState from '@/components/common/EmptyState';
import {useCategoryActions} from '@/hooks/useCategoryActions';
import {useCategories} from '@/hooks/useCategories';
import {cardStyle} from '@/styles/shared';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import {useMenuIndex} from '@/hooks/useMenuIndex';

const CategoryTab = ({restaurantId, menu}) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const {categories, error: categoriesError} = useCategories(restaurantId);
    const {productsByCategory} = useMenuIndex(menu);

    const {
        addCategory,
        updateCategoryName,
        deleteCategory,
        updateImage,
        moveCategoryUp,
        moveCategoryDown,
    } = useCategoryActions(restaurantId, categories);

    const handleAddCategory = async () => {
        const success = await addCategory(newCategoryName);
        if (success) {
            setNewCategoryName('');
        }
    };

    if (categoriesError) {
        return (
            <SnapshotErrorState
                error={categoriesError}
                resourceName="Kategoriler"
            />
        );
    }

    return (
        <div>
            <CategoryHeader categories={categories} menu={menu} />

            <CategoryAdd
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                addCategory={handleAddCategory}
            />

            {/* Kategori Listesi Ana Çerçevesi */}
            <div
                style={{
                    ...cardStyle,
                    overflow: 'hidden',
                    marginTop: '24px',
                }}
            >
                {categories.length > 0 ? (
                    categories.map((category, index) => {
                        const productCount =
                            productsByCategory.get(category.id)?.length ?? 0;

                        return (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                index={index}
                                totalCategoryCount={categories.length}
                                productCount={productCount}
                                moveCategoryUp={moveCategoryUp}
                                moveCategoryDown={moveCategoryDown}
                                deleteCategory={deleteCategory}
                                updateCategoryName={updateCategoryName}
                                updateImage={updateImage}
                                showHeader={index === 0} // Yalnızca ilk elemanın üstünde başlığı göster
                            />
                        );
                    })
                ) : (
                    // Hiç kategori yoksa gösterilecek boş durum tasarımı
                    <EmptyState
                        title="Henüz kategori yok"
                        message="Menünüzü düzenlemek için ilk kategorinizi ekleyin."
                    />
                )}
            </div>
        </div>
    );
};

export default CategoryTab;
