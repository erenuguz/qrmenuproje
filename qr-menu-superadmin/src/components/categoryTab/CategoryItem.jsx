import React, {useState} from 'react';
import {
    useResponsive,
    CategoryListHeader,
    CategoryItemOrder,
    CategoryItemInfo,
    CategoryItemActions,
    CategoryForm,
} from '@/';

export const CategoryItem = ({
    category,
    index,
    totalCategoryCount,
    productCount,
    moveCategoryUp,
    moveCategoryDown,
    deleteCategory,
    updateCategoryName,
    updateImage,
    showHeader = false,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const {isMobile} = useResponsive();
    const isLast = index === totalCategoryCount - 1;

    // Formdan gelen yeni ismi kaydetme işlemi
    const handleSaveName = (newName) => {
        updateCategoryName(category.id, category.name, newName);
        setIsEditing(false); // Kaydettikten sonra formu kapat
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* 1. Header (İsteğe bağlı veya ilk satırda gösterim için) */}
            {showHeader && <CategoryListHeader count={totalCategoryCount} />}

            {/* 2. Satır İskeleti: Order + Info + Actions */}
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
                    backgroundColor: isEditing ? 'var(--hover)' : 'transparent',
                    transition: 'background-color 0.2s ease',
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
                    {/* Sol: Sıralama */}
                    <CategoryItemOrder
                        index={index}
                        totalCount={totalCategoryCount}
                        onMoveUp={moveCategoryUp}
                        onMoveDown={moveCategoryDown}
                        isMobile={isMobile}
                    />

                    {/* Orta: Düzenleme Formu YADA Kategori Bilgisi (BURASI DEĞİŞTİ) */}
                    <div style={{flex: 1, minWidth: 0}}>
                        {isEditing ? (
                            <CategoryForm
                                initialName={category.name}
                                onSave={handleSaveName}
                                onCancel={() => setIsEditing(false)}
                            />
                        ) : (
                            <CategoryItemInfo
                                name={category.name}
                                image={category.image}
                                productCount={productCount}
                            />
                        )}
                    </div>
                </div>

                {/* Sağ: Aksiyon Butonları */}
                {!isEditing && (
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
                            onEditClick={() => setIsEditing(true)}
                            onDeleteClick={deleteCategory}
                            onImageUpdate={updateImage}
                            isMobile={isMobile}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryItem;
