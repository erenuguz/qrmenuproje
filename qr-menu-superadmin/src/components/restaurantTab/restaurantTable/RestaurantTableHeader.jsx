import React from 'react';
import {SearchIcon} from '@/components/common/icon/Icons';
import {NewRestaurantButton} from '@/components/common/button/Buttons';
import {useResponsive} from '@/hooks/useResponsive';
import Input from '@/components/common/Input';

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
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? '16px' : '0',
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
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px',
                    width: isMobile ? '100%' : 'auto',
                }}
            >
                {/* Arama Input'u */}
                <Input
                    icon={<SearchIcon size={16} />}
                    placeholder="Ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    isMobile={isMobile}
                    containerStyle={{
                        width: isMobile ? '100%' : '200px',
                    }}
                />

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
