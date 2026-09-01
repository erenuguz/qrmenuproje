import {useEffect} from 'react';
import Card from '@/components/common/Card';

const CategoryGrid = ({
    categories = [],
    productsByCategory,
    scrollToCategory,
}) => {
    // Sayfa/bileşen yüklendiğinde ekranı otomatik olarak en üste kaydırır
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant', // Açılışta gecikme olmadan anında tepeye alır
        });
    }, []);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                alignContent: 'start', // Öğeler az olduğunda grid satırlarının dikeyde gereksiz esnemesini engeller
                gap: '14px',
                padding: '20px',
                minHeight: 'calc(100dvh - 180px)', // Ekran boyunu doldurur, footer'ı doğal olarak alta iter (180px: Header/Footer yaklaşık payı)
            }}
        >
            {categories.map((category) => {
                const categoryItems =
                    productsByCategory?.get(category.id) ?? [];
                if (categoryItems.length === 0) return null;

                return (
                    <Card
                        key={`grid-${category.id}`}
                        onClick={() => scrollToCategory(category.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${category.name} kategorisine git`}
                        padding="18px"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        {category.image ? (
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
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
