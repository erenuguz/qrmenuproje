import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import {StatCard, PageHeader} from '@/';

const CategoryHeader = ({categories, menu}) => {
    const totalCategories = categories.length;
    const totalProducts = menu.length;
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
            {/* Başlık */}
            <PageHeader
                title="Kategoriler"
                subtitle="Menü kategorilerini sıralayın, düzenleyin veya silin."
            />

            {/* Kartlar */}
            <div
                style={{
                    display: isMobile ? 'flex' : 'grid',
                    gridTemplateColumns: isMobile
                        ? undefined
                        : 'repeat(2, 1fr)',
                    gap: '20px',
                }}
            >
                <StatCard
                    bgColor="var(--badge)"
                    iconColor="var(--info)"
                    value={totalCategories}
                    label="Toplam Kategori"
                    icon={
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                    }
                />
                <StatCard
                    bgColor="var(--successBg)"
                    iconColor="var(--success)"
                    value={totalProducts}
                    label="Toplam Ürün"
                    icon={
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    }
                />
            </div>
        </div>
    );
};

export default CategoryHeader;
