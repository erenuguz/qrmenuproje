import React, {useState} from 'react';
import {
    CategoryHeader,
    CategoryAdd,
    CategoryList,
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

            <CategoryList
                categories={categories}
                menu={menu}
                moveCategoryUp={moveCategoryUp}
                moveCategoryDown={moveCategoryDown}
                deleteCategory={deleteCategory}
                updateCategoryName={updateCategoryName}
                updateImage={updateImage}
            />
        </div>
    );
};

export default CategoryTab;
