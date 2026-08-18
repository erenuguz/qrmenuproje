import React from 'react';
import {SearchIcon} from '@/components/common/icon/Icons';
import {NewRestaurantButton} from '@/components/common/button/Buttons';
import {useResponsive} from '@/hooks/useResponsive';

const RestaurantTableHeader = ({
    searchQuery,
    setSearchQuery,
    setIsModalOpen,
}) => {
    const {isMobile} = useResponsive();

    return (
        <div
            style={{
                padding: isMobile ? '16px' : '24px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row', // Mobilde alt alta, PC'de yan yana
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? '16px' : '0', // Mobilde elemanlar arası boşluk
                borderBottom: '1px solid var(--border)',
            }}
        >
            <h3
                style={{
                    fontSize: 'var(--font-body)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text)',
                    margin: 0,
                }}
            >
                Kayıtlı Restoranlar
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', // Mobilde arama ve buton da alt alta olsun
                    gap: '12px',
                    width: isMobile ? '100%' : 'auto',
                }}
            >
                {/* Arama */}
                <div
                    style={{
                        position: 'relative',
                        width: isMobile ? '100%' : 'auto',
                    }}
                >
                    <SearchIcon
                        size={16}
                        color="var(--textMuted)"
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)', // İkonu tam dikey ortalar
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '10px 12px 10px 36px',
                            borderRadius: 'var(--radiusSmall)',
                            border: '1px solid var(--inputBorder)',
                            backgroundColor: 'var(--inputBackground)',
                            color: 'var(--text)',
                            fontSize: 'var(--font-caption)',
                            outline: 'none',
                            width: isMobile ? '100%' : '200px', // Mobilde tam genişlik
                            boxSizing: 'border-box', // Taşımları önler
                        }}
                    />
                </div>

                {/* Yeni Restoran Butonu */}
                <div style={{width: isMobile ? '100%' : 'auto'}}>
                    <NewRestaurantButton
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            width: isMobile ? '100%' : 'auto',
                            justifyContent: 'center',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RestaurantTableHeader;
