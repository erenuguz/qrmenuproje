import React from 'react';
import {StatCard, PageHeader} from '@/';

const RestaurantManagementHeader = ({restoranlar}) => {
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
                    value={restoranlar?.length || 0}
                    label="Toplam Restoran"
                    icon={
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    }
                />

                <StatCard
                    size="lg"
                    bgColor="var(--successBg)"
                    iconColor="var(--success)"
                    value={restoranlar?.length || 0}
                    label="Aktif Menü"
                    icon={
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                            <polyline points="16 7 22 7 22 13" />
                        </svg>
                    }
                />

                <StatCard
                    size="lg"
                    bgColor="var(--badge)"
                    iconColor="var(--badgeText)"
                    value={restoranlar?.length || 0}
                    label="Toplam Kullanıcı"
                    icon={
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    }
                />
            </div>
        </div>
    );
};

export default RestaurantManagementHeader;
