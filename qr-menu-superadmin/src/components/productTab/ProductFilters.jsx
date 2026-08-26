import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import {SearchIcon} from '@/components/common/icon/Icons';
import {Input, Select} from '@/';

const ProductFilters = ({
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    categories,
}) => {
    const {isMobile} = useResponsive();

    return (
        <div
            style={{
                display: 'flex',
                gap: isMobile ? '12px' : '16px',
                marginBottom: '24px',
                alignItems: 'center',
            }}
        >
            {/* Arama */}
            <div style={{flex: 1, position: 'relative', minWidth: 0}}>
                <Input
                    icon={<SearchIcon size={20} />}
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    isMobile={isMobile}
                />
            </div>

            {/* Filtre */}
            <div
                style={{
                    width: isMobile ? '140px' : '220px',
                    position: 'relative',
                    flexShrink: 0,
                }}
            >
                <Select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    isMobile={isMobile}
                    style={{
                        backgroundColor: 'var(--inputBackground)',
                        boxShadow: 'var(--shadow)',
                    }}
                >
                    <option value="all">Tümü</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default ProductFilters;
