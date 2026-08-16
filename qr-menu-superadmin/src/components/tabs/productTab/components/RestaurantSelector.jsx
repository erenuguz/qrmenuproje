import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import {Badge} from '@/';

const RestaurantSelector = ({
    restaurants,
    selectedRestaurantId,
    setSelectedRestaurantId,
    totalProducts,
}) => {
    const {isMobile} = useResponsive();

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '12px' : undefined,
                padding: '18px 24px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radiusLarge)',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow)',
                marginBottom: '20px',
            }}
        >
            {/* Sol: İkon + Label + Select */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    alignItems: 'center',
                    gap: isMobile ? '12px' : '16px',
                    flex: isMobile ? '1 1 260px' : undefined,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{color: 'var(--textMuted)', flexShrink: 0}}
                >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>

                <span
                    style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--textSecondary)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    İşlem Yapılacak Restoran:
                </span>

                <select
                    value={selectedRestaurantId}
                    onChange={(e) => setSelectedRestaurantId(e.target.value)}
                    style={{
                        padding: '10px 14px',
                        border: '1px solid var(--inputBorder)',
                        borderRadius: 'var(--radiusSmall)',
                        backgroundColor: 'var(--inputBackground)',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        outline: 'none',
                        ...(isMobile
                            ? {
                                  flex: '1 1 200px',
                                  minWidth: '150px',
                                  maxWidth: '100%',
                                  boxSizing: 'border-box',
                              }
                            : {minWidth: '220px'}),
                    }}
                >
                    {restaurants.map((res) => (
                        <option key={res.id} value={res.id}>
                            {res.name} (ID: {res.id})
                        </option>
                    ))}
                </select>
            </div>

            {/* Sağ: Ürün sayısı badge */}
            <div
                style={{
                    marginLeft: isMobile ? undefined : 'auto',
                    flexShrink: isMobile ? 0 : undefined,
                }}
            >
                <Badge>{totalProducts} toplam ürün</Badge>
            </div>
        </div>
    );
};

export default RestaurantSelector;
