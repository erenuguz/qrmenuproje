import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import {StatCard, PageHeader} from '@/';
import {FolderIcon, PackageIcon} from '@/components/common/icon/Icons';
import {iconContainerStyle} from '@/styles/shared';

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
                    value={totalCategories}
                    label="Toplam Kategori"
                    icon={
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--badge)',
                                color: 'var(--info)',
                            }}
                        >
                            <FolderIcon size={20} />
                        </div>
                    }
                />

                <StatCard
                    value={totalProducts}
                    label="Toplam Ürün"
                    icon={
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--successBg)',
                                color: 'var(--success)',
                            }}
                        >
                            <PackageIcon size={20} />
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default CategoryHeader;
