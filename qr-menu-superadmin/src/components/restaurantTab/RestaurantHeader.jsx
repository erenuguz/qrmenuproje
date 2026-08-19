import React from 'react';
import {StatCard, PageHeader} from '@/';
import {
    HomeIcon,
    TrendingUpIcon,
    UsersIcon,
} from '@/components/common/icon/Icons';
import {iconContainerStyle} from '@/styles/shared';

const RestaurantHeader = ({restaurants}) => {
    return (
        <div style={{marginBottom: '30px'}}>
            {/* BAŞLIK */}
            <PageHeader
                title="Restoran Yönetimi"
                subtitle="Tüm restoranları yönetin, yeni restoran ekleyin."
            />

            {/* İSTATİSTİK KARTLARI */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                }}
            >
                <StatCard
                    size="lg"
                    value={restaurants?.length || 0}
                    label="Toplam Restoran"
                    icon={
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--infoBg)',
                                color: 'var(--info)',
                            }}
                        >
                            <HomeIcon size={24} />
                        </div>
                    }
                />

                <StatCard
                    size="lg"
                    value={restaurants?.length || 0}
                    label="Aktif Menü"
                    icon={
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--successBg)',
                                color: 'var(--success)',
                            }}
                        >
                            <TrendingUpIcon size={24} />
                        </div>
                    }
                />

                <StatCard
                    size="lg"
                    value={restaurants?.length || 0}
                    label="Toplam Kullanıcı"
                    icon={
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--badge)',
                                color: 'var(--badgeText)',
                            }}
                        >
                            <UsersIcon size={24} />
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default RestaurantHeader;
