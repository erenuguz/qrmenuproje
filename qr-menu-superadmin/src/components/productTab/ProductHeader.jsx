import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import {useResponsive} from '@/hooks/useResponsive';
import {
    CancelButton,
    DeleteButton,
    NewProductButton,
} from '@/components/common/button/Buttons';

const ProductHeader = ({
    isBulkDeleteMode,
    setIsBulkDeleteMode,
    selectedProducts,
    setSelectedProducts,
    setActiveForm,
    categories,
    bulkDeleteProducts,
    isProcessing,
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

    // 1. Tekrar eden butonu tek bir değişkende tanımlıyoruz
    const newProductBtn = (
        <NewProductButton
            onClick={handleNewProductClick}
            style={{
                width: '100%',
                justifyContent: 'center',
            }}
        />
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '12px' : '0', // Mobilde alt satırla arasına boşluk ekler
                marginBottom: '20px',
            }}
        >
            {/* Üst Satır: Başlık ve Butonlar */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    gap: '10px',
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

                {/* Sağ Üst Aksiyon Butonları */}
                <div style={{display: 'flex', gap: '10px'}}>
                    {!isBulkDeleteMode ? (
                        <DeleteButton
                            onClick={() => setIsBulkDeleteMode(true)}
                            borderRadius="var(--radiusPill)"
                            disabled={isProcessing}
                        >
                            Toplu Sil
                        </DeleteButton>
                    ) : (
                        <>
                            <CancelButton
                                onClick={() => {
                                    setIsBulkDeleteMode(false);
                                    setSelectedProducts([]);
                                }}
                                borderRadius="var(--radiusPill)"
                            />
                            <DeleteButton
                                onClick={bulkDeleteProducts}
                                borderRadius="var(--radiusPill)"
                                disabled={
                                    selectedProducts.length === 0 ||
                                    isProcessing
                                }
                                isLoading={isProcessing}
                                loadingText="Siliniyor..."
                            >
                                Seçilenleri Sil ({selectedProducts.length})
                            </DeleteButton>
                        </>
                    )}

                    {/* Masaüstünde "Yeni Ürün" butonu burada gösterilir */}
                    {!isMobile && newProductBtn}
                </div>
            </div>

            {/* Mobilde "Yeni Ürün" butonu tam genişlikte alt satırda gösterilir */}
            {isMobile && newProductBtn}
        </div>
    );
};

export default ProductHeader;
