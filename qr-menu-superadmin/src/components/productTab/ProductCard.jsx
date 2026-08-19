import React from 'react';

import {useResponsive} from '@/hooks/useResponsive';

import {DeleteButton, EditButton} from '@/';

// 1. TEKRAR EDEN STİLLER (Dışarı alındı)

const textStyles = {
    name: {
        margin: '0 0 4px 0',

        color: 'var(--text)',

        fontSize: '14px',

        fontWeight: 'bold',

        whiteSpace: 'nowrap',

        overflow: 'hidden',

        textOverflow: 'ellipsis',
    },

    desc: {
        fontSize: '12px',

        color: 'var(--textSecondary)',

        display: 'block',

        whiteSpace: 'nowrap',

        overflow: 'hidden',

        textOverflow: 'ellipsis',
    },

    price: {
        fontSize: '15px',

        color: 'var(--text)',

        fontWeight: 'bold',

        flexShrink: 0,
    },
};

export default function ProductCard({
    product,

    isBulkDeleteMode,

    selectedProducts,

    handleProductSelectionChange,

    setActiveForm,

    deleteProduct,

    isLast,
}) {
    const {isMobile} = useResponsive();

    const priceLabel = <span style={textStyles.price}>₺{product.price}</span>;

    return (
        <div
            style={{
                display: 'flex',

                flexDirection: isMobile ? 'column' : 'row', // Mobilde alt alta, PC'de yan yana

                justifyContent: 'space-between',

                padding: isMobile ? '12px 16px' : '16px 20px',

                borderBottom: isLast ? 'none' : '1px solid var(--border)',

                gap: isMobile ? '12px' : '16px',
            }}
        >
            {/* SOL KISIM: Checkbox, Resim ve Metin Bilgileri */}

            <div
                style={{
                    display: 'flex',

                    alignItems: 'center',

                    gap: '12px',

                    flex: 1,

                    minWidth: 0,
                }}
            >
                {isBulkDeleteMode && (
                    <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() =>
                            handleProductSelectionChange(product.id)
                        }
                        style={{
                            transform: 'scale(1.3)',

                            cursor: 'pointer',

                            flexShrink: 0,
                        }}
                    />
                )}

                <img
                    src={product.image}
                    alt="ürün"
                    style={{
                        width: '44px',

                        height: '44px',

                        backgroundColor: 'var(--surface)',

                        borderRadius: '8px',

                        objectFit: 'cover',

                        flexShrink: 0,
                    }}
                />

                <div style={{flex: 1, minWidth: 0}}>
                    <h5 style={textStyles.name}>{product.name}</h5>

                    <span style={textStyles.desc}>{product.description}</span>
                </div>

                {/* Mobilde fiyat yazısı ürün adının hemen sağında yer alır */}

                {isMobile && priceLabel}
            </div>

            {/* SAĞ KISIM: Fiyat (Masaüstü) ve Butonlar */}

            <div
                style={{
                    display: 'flex',

                    alignItems: 'center',

                    gap: isMobile ? '8px' : '40px',

                    width: isMobile ? '100%' : 'auto',
                }}
            >
                {/* Masaüstünde fiyat butonların solunda yer alır */}

                {!isMobile && priceLabel}

                <div
                    style={{
                        display: 'flex',

                        gap: '8px',

                        width: isMobile ? '100%' : 'auto',

                        flex: 1,
                    }}
                >
                    <EditButton
                        onClick={() => setActiveForm(product)}
                        style={{flex: isMobile ? 1 : undefined}}
                    />

                    <DeleteButton
                        onClick={() => deleteProduct(product.id, product.name)}
                        style={{flex: isMobile ? 1 : undefined}}
                    >
                        Sil
                    </DeleteButton>
                </div>
            </div>
        </div>
    );
}
