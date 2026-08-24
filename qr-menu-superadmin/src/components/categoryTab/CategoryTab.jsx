import React, {useState} from 'react';
import {
    CategoryHeader,
    CategoryAdd,
    CategoryItem,
    useCategoryActions,
    useCategories,
    cardStyle,
} from '@/';

const CategoryTab = ({restaurantId, menu}) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    // Veriyi Çek
    const {categories} = useCategories(restaurantId);

    // İşlemleri Çek
    const {
        addCategory,
        updateCategoryName,
        deleteCategory,
        updateImage,
        moveCategoryUp,
        moveCategoryDown,
    } = useCategoryActions(restaurantId, categories, menu);

    // Ekleme başarılı olursa input'u temizle
    const handleAddCategory = async () => {
        const success = await addCategory(newCategoryName);
        if (success) {
            setNewCategoryName('');
        }
    };

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
                        // Her bir kategoriye ait ürün sayısını hesapla
                        const productCount = menu.filter(
                            (product) => product.categoryId === category.id
                        ).length;

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
