import React, {useState} from 'react';
import {useResponsive, useToast, uploadImageAndGetUrl} from '@/';

const CategoryItem = ({
    category,
    index,
    totalCategoryCount,
    productCount,
    moveCategoryUp,
    moveCategoryDown,
    deleteCategory,
    updateCategoryName,
    updateImage,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(category.name);
    const [isUploading, setIsUploading] = useState(false);
    const {isMobile} = useResponsive();
    const toast = useToast();
    const isLast = index === totalCategoryCount - 1;

    const handleSave = () => {
        if (editName.trim() !== category.name) {
            updateCategoryName(category.id, category.name, editName.trim());
        }
        setIsEditing(false);
    };

    /* ── Shared: Görsel ── */
    const imageDiv = (
        <div
            style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radiusSmall)',
                backgroundColor: 'var(--badge)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            {category.image ? (
                <img
                    src={category.image}
                    alt={category.name}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
            ) : (
                <span style={{fontSize: '20px'}}>🍲</span>
            )}
        </div>
    );

    /* ── Shared: Düzenleme formu ── */
    const editForm = (
        <div style={{display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap'}}>
            <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
                style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '8px 12px',
                    borderRadius: 'var(--radiusSmall)',
                    border: '1px solid var(--primary)',
                    backgroundColor: 'var(--inputBackground)',
                    color: 'var(--text)',
                    outline: 'none',
                    fontSize: 'var(--font-body)',
                }}
            />
            <button
                onClick={handleSave}
                style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radiusSmall)',
                    fontSize: 'var(--font-small)',
                    fontWeight: 'var(--font-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--textWhite)',
                }}
            >
                Kaydet
            </button>
            <button
                onClick={() => {
                    setIsEditing(false);
                    setEditName(category.name);
                }}
                style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radiusSmall)',
                    fontSize: 'var(--font-small)',
                    fontWeight: 'var(--font-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'var(--borderLight)',
                    color: 'var(--text)',
                }}
            >
                İptal
            </button>
        </div>
    );

    /* ── Shared: Kategori bilgisi ── */
    const categoryInfo = (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h4
                style={{
                    margin: '0 0 4px 0',
                    fontSize: 'var(--font-body)',
                    color: 'var(--text)',
                    fontWeight: 'var(--font-semibold)',
                }}
            >
                {category.name}
            </h4>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--textSecondary)',
                    fontSize: 'var(--font-small)',
                }}
            >
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                {productCount} ürün
            </div>
        </div>
    );

    /* ── Shared: Aksiyon butonları ── */
    const actionButtons = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                ...(isMobile && {width: '100%'}),
            }}
        >
            <div style={{position: 'relative', ...(isMobile && {flex: 1})}}>
                <button
                    style={{
                        width: isMobile ? '100%' : 'auto',
                        padding: isMobile ? '8px 12px' : '6px 12px',
                        borderRadius: 'var(--radiusSmall)',
                        fontSize: 'var(--font-small)',
                        fontWeight: 'var(--font-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: '1px solid var(--border)',
                        cursor: isUploading ? 'wait' : 'pointer',
                        backgroundColor: 'var(--surface)',
                        color: 'var(--textSecondary)',
                    }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {isUploading
                        ? 'Yükleniyor...'
                        : isMobile
                          ? 'Görsel'
                          : 'Görsel Ekle'}
                </button>
                <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setIsUploading(true);
                            const url = await uploadImageAndGetUrl(
                                file,
                                () => {}
                            );
                            if (url) {
                                updateImage(category.id, url);
                            } else {
                                toast.error('Resim yüklenirken hata oluştu.');
                            }
                            setIsUploading(false);
                        }
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                    }}
                />
            </div>

            <button
                onClick={() => setIsEditing(true)}
                style={{
                    ...(isMobile && {flex: 1}),
                    padding: isMobile ? '8px 12px' : '4px 10px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--textSecondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radiusSmall)',
                    cursor: 'pointer',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--font-small)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Düzenle
            </button>

            <button
                onClick={() => deleteCategory(category.id, category.name)}
                style={{
                    ...(isMobile && {flex: 1}),
                    padding: isMobile ? '8px 12px' : '4px 10px',
                    backgroundColor: 'var(--dangerBg)',
                    color: 'var(--danger)',
                    border: '1px solid var(--danger)',
                    borderRadius: 'var(--radiusSmall)',
                    cursor: 'pointer',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--font-small)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                Sil
            </button>
        </div>
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? undefined : 'center',
                padding: isMobile ? '16px 20px' : '16px 24px',
                borderBottom: isLast ? 'none' : '1px solid var(--borderLight)',
                gap: isMobile ? '14px' : '20px',
                backgroundColor: isEditing ? 'var(--hover)' : 'transparent',
                transition: 'background-color 0.2s ease',
            }}
        >
            {/* İçerik satırı: oklar + görsel + isim/form */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flex: 1,
                    width: isMobile ? '100%' : undefined,
                }}
            >
                {/* Sıralama okları */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        ...(isMobile ? {minWidth: '24px'} : {width: '50px'}),
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                        }}
                    >
                        <button
                            onClick={() => moveCategoryUp(index)}
                            disabled={index === 0}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--textMuted)',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: index === 0 ? 0.3 : 1,
                                cursor: index === 0 ? 'default' : 'pointer',
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="18 15 12 9 6 15" />
                            </svg>
                        </button>
                        <button
                            onClick={() => moveCategoryDown(index)}
                            disabled={isLast}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--textMuted)',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isLast ? 0.3 : 1,
                                cursor: isLast ? 'default' : 'pointer',
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                    </div>
                    <span
                        style={{
                            fontSize: 'var(--font-small)',
                            color: 'var(--textMuted)',
                            fontWeight: 'var(--font-medium)',
                            lineHeight: '1',
                        }}
                    >
                        {index + 1}
                    </span>
                </div>

                {imageDiv}
                {isEditing ? editForm : categoryInfo}
            </div>

            {/* Aksiyon butonları: mobilde alt satır, desktopda sağ taraf */}
            {!isEditing && actionButtons}
        </div>
    );
};

export default CategoryItem;
