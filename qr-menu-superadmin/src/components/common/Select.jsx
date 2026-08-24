import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import Badge from '@/components/common/Badge';
import {HomeIcon} from '@/components/common/icon/Icons';
import {cardStyle} from '@/styles/shared';
import {Select} from '@/components/common/Select';

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
                ...cardStyle,
                display: 'flex',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '12px' : undefined,
                padding: '18px 24px',
                marginBottom: '20px',
                width: '100%',
                boxSizing: 'border-box',
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
                <HomeIcon
                    size={16}
                    color="var(--textMuted)"
                    style={{flexShrink: 0}}
                />

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

                {/* Sadece Select bileşeni kullanıldı */}
                <Select
                    value={selectedRestaurantId}
                    onChange={(e) => setSelectedRestaurantId(e.target.value)}
                    isMobile={isMobile}
                    containerStyle={
                        isMobile
                            ? {
                                  flex: '1 1 200px',
                                  minWidth: '150px',
                                  maxWidth: '100%',
                              }
                            : {minWidth: '220px'}
                    }
                    style={{
                        fontWeight: '600',
                        backgroundColor: 'var(--inputBackground)',
                    }}
                >
                    {restaurants.map((res) => (
                        <option key={res.id} value={res.id}>
                            {res.name} (ID: {res.id})
                        </option>
                    ))}
                </Select>
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
