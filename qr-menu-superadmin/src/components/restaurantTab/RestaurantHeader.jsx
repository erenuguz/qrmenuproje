import React from 'react';
import {StatCard, PageHeader} from '@/';
import {
    HomeIcon,
    TrendingUpIcon,
    UsersIcon,
} from '@/components/common/icon/Icons';

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
                    bgColor="var(--info)"
                    iconColor="var(--textWhite)"
                    value={restaurants?.length || 0}
                    label="Toplam Restoran"
                    icon={<HomeIcon size={24} />}
                />

                <StatCard
                    size="lg"
                    bgColor="var(--successBg)"
                    iconColor="var(--success)"
                    value={restaurants?.length || 0}
                    label="Aktif Menü"
                    icon={<TrendingUpIcon size={24} />}
                />

                <StatCard
                    size="lg"
                    bgColor="var(--badge)"
                    iconColor="var(--badgeText)"
                    value={restaurants?.length || 0}
                    label="Toplam Kullanıcı"
                    icon={<UsersIcon size={24} />}
                />
            </div>
        </div>
    );
};

export default RestaurantHeader;
