import Card from '@/components/common/Card';

const MenuItemCard = ({item}) => {
    return (
        <Card
            padding="14px"
            style={{
                display: 'flex',
                gap: '14px',
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
        </Card>
    );
};

export default MenuItemCard;
