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
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1px solid var(--border)',
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    fontSize: '26px',
                                    backgroundColor:
                                        'color-mix(in srgb, var(--primary) 12%, transparent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                🍽️
                            </div>
                        )}
                        <h2
                            style={{
                                margin: 0,
                                fontSize: 'var(--font-caption)',
                                fontWeight: 'var(--font-semibold)',
                                color: 'var(--text)',
                                textAlign: 'center',
                            }}
                        >
                            {category.name}
                        </h2>
                    </Card>
                );
            })}
        </div>
    );
};

export default CategoryGrid;
