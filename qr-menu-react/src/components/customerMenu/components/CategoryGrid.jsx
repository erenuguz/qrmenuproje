import React from 'react';
import Card from '@/components/common/Card';

const CategoryGrid = ({categories, menu, scrollToCategory}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                padding: '20px',
            }}
        >
            {categories.map((category) => {
                const categoryItems = menu.filter(
                    (item) => item.categoryId === category.id
                );
                if (categoryItems.length === 0) return null;

                return (
                    <Card
                        key={`grid-${category.id}`}
                        onClick={() => scrollToCategory(category.id)}
                        padding="18px"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        {category.image ? (
                            <img
                                src={category.image}
                                alt={category.name}
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: 'var(--radiusCircle)',
                                    objectFit: 'cover',
                                    border: '1px solid var(--border)',
                                }}
                            />
                        ) : (
                            <span
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: 'var(--radiusCircle)',
                                    fontSize: 'var(--iconMedium)',
                                    backgroundColor:
                                        'color-mix(in srgb, var(--primary) 12%, transparent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                🍽️
                            </span>
                        )}
                        <span
                            style={{
                                fontSize: 'var(--font-caption)',
                                fontWeight: 'var(--font-semibold)',
                                color: 'var(--text)',
                                textAlign: 'center',
                            }}
                        >
                            {category.name}
                        </span>
                    </Card>
                );
            })}
        </div>
    );
};

export default CategoryGrid;
