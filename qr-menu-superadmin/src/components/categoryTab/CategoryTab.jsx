import React, {useState} from 'react';
import {
    CategoryHeader,
    CategoryAdd,
    CategoryItem,
    useCategoryActions,
    useCategories,
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
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow)',
                    marginTop: '24px', // Araya boşluk eklemek tasarımı rahatlatır
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
                    <div
                        style={{
                            padding: '32px 24px',
                            textAlign: 'center',
                            color: 'var(--textMuted)',
                            fontSize: 'var(--font-body)',
                        }}
                    >
                        Henüz kategori eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryTab;
