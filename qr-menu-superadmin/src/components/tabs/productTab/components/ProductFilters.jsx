import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';

const ProductFilters = ({
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    categories,
}) => {
    const {isMobile} = useResponsive();

    return (
        <div
            style={{
                display: 'flex',
                gap: isMobile ? '12px' : '16px',
                marginBottom: '24px',
                alignItems: 'center',
            }}
        >
            {/* Arama */}
            <div style={{flex: 1, position: 'relative', minWidth: 0}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isMobile ? 18 : 22}
                    height={isMobile ? 18 : 22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: 'absolute',
                        left: isMobile ? '12px' : '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--textMuted)',
                        pointerEvents: 'none',
                    }}
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        height: isMobile ? '42px' : '45px',
                        padding: isMobile ? '0 16px 0 38px' : '0 24px 0 56px',
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: '1px solid var(--inputBorder)',
                        background: 'var(--inputBackground)',
                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',
                        color: 'var(--text)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        boxShadow: 'var(--shadow)',
                    }}
                />
            </div>

            {/* Filtre */}
            <div
                style={{
                    width: isMobile ? '110px' : '250px',
                    position: 'relative',
                    flexShrink: 0,
                }}
            >
                {/* Sol filtre ikonu — sadece desktop */}
                {!isMobile && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--textMuted)',
                            pointerEvents: 'none',
                        }}
                    >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                )}

                <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    style={{
                        width: '100%',
                        height: isMobile ? '42px' : '45px',
                        padding: isMobile ? '0 32px 0 12px' : '0 52px 0 56px',
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: '1px solid var(--inputBorder)',
                        background: 'var(--inputBackground)',
                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        appearance: 'none',
                        outline: 'none',
                        boxSizing: 'border-box',
                        boxShadow: 'var(--shadow)',
                    }}
                >
                    <option value="Hepsi">Tümü</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Sağ ok ikonu */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isMobile ? 16 : 18}
                    height={isMobile ? 16 : 18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: 'absolute',
                        right: isMobile ? '10px' : '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--textMuted)',
                        pointerEvents: 'none',
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </div>
    );
};

export default ProductFilters;
