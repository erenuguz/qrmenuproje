import React from 'react';

export const CategoryItemInfo = ({name, image, productCount = 0}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flex: 1,
                minWidth: 0,
            }}
        >
            {/* Görsel Kutusu */}
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
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <span style={{fontSize: 'var(--iconSmall)'}}>🍲</span>
                )}
            </div>

            {/* İsim ve Ürün Sayısı */}
            <div
                style={{display: 'flex', flexDirection: 'column', minWidth: 0}}
            >
                <h4
                    style={{
                        margin: '0 0 4px 0',
                        fontSize: 'var(--font-body)',
                        color: 'var(--text)',
                        fontWeight: 'var(--font-semibold)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {name}
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
                    {productCount} ürün
                </div>
            </div>
        </div>
    );
};

export default CategoryItemInfo;
