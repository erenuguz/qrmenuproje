import {useState} from 'react';
import CategoryHeader from '@/components/categoryTab/CategoryHeader';
import CategoryItem from '@/components/categoryTab/CategoryItem';
import CategoryForm from '@/components/categoryTab/CategoryForm';
import EmptyState from '@/components/common/EmptyState';
import {useCategoryActions} from '@/hooks/useCategoryActions';
import {useCategories} from '@/hooks/useCategories';
import Card from '@/components/common/Card';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import {useMenuIndex} from '@/hooks/useMenuIndex';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CategoryTab = ({restaurantId, menu = []}) => {
    const [activeForm, setActiveForm] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories(restaurantId);

    const {productsByCategory} = useMenuIndex(menu, categories);

    const {
        saveCategory,
        deleteCategory,
        moveCategoryUp,
        moveCategoryDown,
        isProcessing,
    } = useCategoryActions(restaurantId, categories);

    const handleNewCategory = () => {
        setActiveForm({
            name: '',
            image: '',
        });
    };

    const handleEditCategory = (category) => {
        setActiveForm({
            id: category.id,
            name: category.name ?? '',
            image: category.image ?? '',
        });
    };

    const handleSaveCategory = () => {
        saveCategory(activeForm, isImageLoading, () => {
            setActiveForm(null);
        });
    };

    if (categoriesError) {
        return (
            <SnapshotErrorState
                error={categoriesError}
                resourceName="Kategoriler"
            />
        );
    }

    if (categoriesLoading) {
        return <LoadingSpinner message="Kategoriler yükleniyor..." />;
    }

    if (activeForm) {
        return (
            <CategoryForm
                activeForm={activeForm}
                setActiveForm={setActiveForm}
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
                saveForm={handleSaveCategory}
                isProcessing={isProcessing}
            />
        );
    }

    return (
        <div>
            <CategoryHeader
                categories={categories}
                menu={menu}
                onAddCategory={handleNewCategory}
                isProcessing={isProcessing}
            />

            <Card padding={0} style={{overflow: 'hidden'}}>
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
                                onEditCategory={handleEditCategory}
                                showHeader={index === 0}
                            />
                        );
                    })
                ) : (
                    <EmptyState
                        title="Henüz kategori yok"
                        message="Menünüzü düzenlemek için ilk kategorinizi ekleyin."
                    />
                )}
            </Card>
        </div>
    );
};

export default CategoryTab;
