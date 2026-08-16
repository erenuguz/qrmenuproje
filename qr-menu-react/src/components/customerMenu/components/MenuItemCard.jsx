import React from 'react';

const MenuItemCard = ({item}) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '14px',
                padding: '14px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radiusLarge)',
                boxShadow: 'var(--shadow)',
            }}
        >
            <img
                src={
                    item.image ||
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'
                }
                alt={item.name}
                style={{
                    width: '84px',
                    height: '84px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    flexShrink: 0,
                }}
            />
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '4px',
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        color: 'var(--text)',
                        fontSize: 'var(--font-body)',
                        fontWeight: 'var(--font-semibold)',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {item.name}
                </h3>
                {item.description && (
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--textSecondary)',
                            fontSize: 'var(--font-small)',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {item.description}
                    </p>
                )}
                <span
                    style={{
                        color: 'var(--primary)',
                        fontWeight: 'var(--font-bold)',
                        fontSize: 'var(--font-body)',
                        marginTop: '2px',
                    }}
                >
                    {item.price} ₺
                </span>
            </div>
        </div>
    );
};

export default MenuItemCard;
