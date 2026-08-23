import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import {SearchIcon, ChevronDownIcon} from '@/components/common/icon/Icons';
import {Input} from '@/';

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
                <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    style={{
                        width: '100%',
                        height: isMobile ? '42px' : '45px',

                        // Sadece sağdaki ok için boşluk bırakıyoruz
                        padding: isMobile ? '0 36px 0 12px' : '0 44px 0 16px',

                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',

                        border: '1px solid var(--inputBorder)',
                        backgroundColor: 'var(--inputBackground)',
                        color: 'var(--text)',

                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',

                        fontWeight: 'var(--font-medium)',
                        fontFamily: 'var(--font-family)',

                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        outline: 'none',

                        boxSizing: 'border-box',
                        boxShadow: 'var(--shadow)',

                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <option value="Hepsi">Tümü</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <ChevronDownIcon
                    size={isMobile ? 16 : 18}
                    color="var(--textMuted)"
                    style={{
                        position: 'absolute',
                        right: isMobile ? '12px' : '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default ProductFilters;
