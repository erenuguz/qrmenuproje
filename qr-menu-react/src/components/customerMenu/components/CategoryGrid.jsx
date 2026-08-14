import React from 'react';

const CategoryGrid = ({kategoriler, menu, kategoriyeKaydir}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                padding: '20px',
            }}
        >
            {kategoriler.map((kat) => {
                // Sadece içinde ürün olan kategorileri gösteriyoruz
                const oKategorininYemekleri = menu.filter(
                    (y) => y.kategoriId === kat.id
                );
                if (oKategorininYemekleri.length === 0) return null;

                return (
                    <div
                        key={`grid-${kat.id}`}
                        onClick={() => kategoriyeKaydir(kat.id)}
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radiusLarge)',
                            padding: '18px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: 'var(--shadow)',
                            cursor: 'pointer',
                            transition:
                                'border-color 0.15s ease, transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                                'var(--primary)';
                            e.currentTarget.style.transform =
                                'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {kat.gorsel ? (
                            <img
                                src={kat.gorsel}
                                alt={kat.ad}
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
                            {kat.ad}
                        </h2>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryGrid;
