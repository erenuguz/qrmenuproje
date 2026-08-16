import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';

export default function ProductCard({
    product,
    categoryName,
    isBulkDeleteMode,
    selectedProducts,
    handleProductSelectionChange,
    setActiveForm,
    deleteProduct,
    isLast,
}) {
    const {isMobile} = useResponsive();

    /* ── Shared: Görsel ── */
    const image = (
        <div
            style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'var(--surface)',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            <img
                src={product.image}
                alt="ürün"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
        </div>
    );

    /* ── Shared: Checkbox ── */
    const checkbox = isBulkDeleteMode && (
        <input
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleProductSelectionChange(product.id)}
            style={{transform: 'scale(1.3)', cursor: 'pointer', flexShrink: 0}}
        />
    );

    /* ── Shared: Butonlar (flex farkı koşullu) ── */
    const buttons = (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                ...(isMobile && {marginTop: '10px'}),
            }}
        >
            <button
                onClick={() => setActiveForm(product)}
                style={{
                    flex: isMobile ? 1 : undefined,
                    padding: '4px 10px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--textSecondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                }}
            >
                Düzenle
            </button>
            <button
                onClick={() => deleteProduct(product.id, product.name)}
                style={{
                    flex: isMobile ? 1 : undefined,
                    padding: '4px 10px',
                    backgroundColor: 'var(--dangerBg)',
                    color: 'var(--danger)',
                    border: '1px solid var(--borderLight)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                }}
            >
                Sil
            </button>
        </div>
    );

    /* ── Mobile layout ── */
    if (isMobile) {
        return (
            <div
                style={{
                    padding: '12px 16px',
                    borderBottom: isLast ? 'none' : '1px solid var(--border)',
                }}
            >
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '12px'}}
                >
                    {checkbox}
                    {image}
                    <div style={{flex: 1, minWidth: 0}}>
                        <h5
                            style={{
                                margin: '0 0 4px 0',
                                color: 'var(--text)',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {product.name}
                        </h5>
                        <span
                            style={{
                                fontSize: '12px',
                                color: 'var(--textSecondary)',
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {product.description}
                        </span>
                    </div>
                    <span
                        style={{
                            fontSize: '15px',
                            color: 'var(--text)',
                            fontWeight: 'bold',
                            flexShrink: 0,
                        }}
                    >
                        ₺{product.price}
                    </span>
                </div>
                {buttons}
            </div>
        );
    }

    /* ── Desktop layout ── */
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: isLast ? 'none' : '1px solid var(--border)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flex: 1,
                }}
            >
                {checkbox}
                {image}
                <div>
                    <h5
                        style={{
                            margin: '0 0 4px 0',
                            color: 'var(--text)',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        {product.name}
                    </h5>
                    <span
                        style={{
                            fontSize: '12px',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        {product.description}
                    </span>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '40px'}}>
                <span
                    style={{
                        fontSize: '15px',
                        color: 'var(--text)',
                        fontWeight: 'bold',
                    }}
                >
                    ₺{product.price}
                </span>
                {buttons}
            </div>
        </div>
    );
}
