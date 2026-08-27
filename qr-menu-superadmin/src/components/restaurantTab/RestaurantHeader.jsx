import React from 'react';
import StatCard from '@/components/common/StatCard';
import PageHeader from '@/components/common/PageHeader';
import {useResponsive} from '@/hooks/useResponsive';

const RestaurantHeader = ({restaurants}) => {
    const {isMobile} = useResponsive();

    return (
        <div
            style={{
                display: isMobile ? 'flex' : 'block',
                justifyContent: isMobile ? 'space-between' : undefined,
                alignItems: isMobile ? 'center' : undefined,
                flexWrap: isMobile ? 'wrap' : undefined,
                gap: isMobile ? '20px' : undefined,
                marginBottom: '30px',
            }}
        >
            {/* BAŞLIK */}
            <PageHeader
                title="Restoran Yönetimi"
                subtitle="Tüm restoranları yönetin, yeni restoran ekleyin."
            />

            {/* İSTATİSTİK KARTLARI */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // Ekranı zorla 3 eşit parçaya böler
                    gap: isMobile ? '6px' : '20px', // Mobilde sığması için boşluğu iyice kıstık
                    width: '100%',
                    boxSizing: 'border-box', // Taşırmaları engeller
                }}
            >
                {/* 1. Kart */}
                <div style={{minWidth: 0, height: '100%'}}>
                    <StatCard
                        value={restaurants?.length || 0}
                        label="Toplam Restoran"
                    />
                </div>

                {/* 2. Kart */}
                <div style={{minWidth: 0, height: '100%'}}>
                    <StatCard
                        value={restaurants?.length || 0}
                        label="Aktif Menü"
                    />
                </div>

                {/* 3. Kart */}
                <div style={{minWidth: 0, height: '100%'}}>
                    <StatCard
                        value={restaurants?.length || 0}
                        label="Toplam Kullanıcı"
                    />
                </div>
            </div>
        </div>
    );
};

export default RestaurantHeader;
