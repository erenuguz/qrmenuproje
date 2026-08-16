import React from 'react';
import {PageHeader, useResponsive} from '@/';

const ProductHeader = ({
    isBulkDeleteMode,
    setIsBulkDeleteMode,
    selectedProducts,
    setSelectedProducts,
    setActiveForm,
    categories,
    bulkDeleteProducts,
}) => {
    const {isMobile} = useResponsive();

    const handleNewProductClick = () => {
        setActiveForm({
            name: '',
            categoryId: categories.length > 0 ? categories[0].id : '',
            price: '',
            image: '',
            description: '',
        });
        setIsBulkDeleteMode(false);
    };

    /* Toplu sil butonları mobile/desktop aynı → tek kez yaz */
    const actionButtons = (
        <div style={{display: 'flex', gap: '10px'}}>
            {!isBulkDeleteMode ? (
                <button
                    onClick={() => setIsBulkDeleteMode(true)}
                    style={{
                        padding: '10px 16px',
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px',
                        boxShadow: 'var(--shadow)',
                    }}
                >
                    Toplu Sil
                </button>
            ) : (
                <>
                    <button
                        onClick={() => {
                            setIsBulkDeleteMode(false);
                            setSelectedProducts([]);
                        }}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: 'transparent',
                            color: 'var(--textSecondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '13px',
                        }}
                    >
                        İptal
                    </button>
                    <button
                        onClick={bulkDeleteProducts}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: 'var(--dangerBg)',
                            color: 'var(--danger)',
                            border: 'none',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '13px',
                        }}
                    >
                        Seçilenleri Sil ({selectedProducts.length})
                    </button>
                </>
            )}

            {/* Desktop: buton grubu içinde */}
            {!isMobile && (
                <button
                    onClick={handleNewProductClick}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--textWhite)',
                        border: 'none',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        boxShadow: 'var(--shadow)',
                    }}
                >
                    <span style={{fontSize: '16px', lineHeight: '14px'}}>
                        +
                    </span>
                    Yeni Ürün
                </button>
            )}
        </div>
    );

    return (
        <div style={{marginBottom: '20px'}}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    gap: '10px',
                    marginBottom: isMobile ? '12px' : 0,
                }}
            >
                <PageHeader
                    title="Ürünler"
                    subtitle={
                        isMobile
                            ? 'Menüdeki ürünleri yönetin'
                            : 'Menüdeki ürünleri yönetin, ekleyin veya silin.'
                    }
                />
                {actionButtons}
            </div>

            {/* Mobile: tam genişlik buton altta */}
            {isMobile && (
                <button
                    onClick={handleNewProductClick}
                    style={{
                        width: '100%',
                        padding: '14px 20px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--textWhite)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '16px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '22px',
                            lineHeight: '1',
                            fontWeight: '400',
                        }}
                    >
                        +
                    </span>
                    Yeni ürün
                </button>
            )}
        </div>
    );
};

export default ProductHeader;
