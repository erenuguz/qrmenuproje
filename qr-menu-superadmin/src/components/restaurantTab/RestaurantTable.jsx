import React from 'react';
import RestaurantTableRow from '@/components/restaurantTab/restaurantTable/RestaurantTableRow';
import EmptyState from '@/components/common/EmptyState';
import RestaurantTableHeader from '@/components/restaurantTab/restaurantTable/RestaurantTableHeader';
import {cardStyle} from '@/styles/shared';

const RestaurantTable = ({
    searchQuery,
    setSearchQuery,
    setIsModalOpen,
    filteredRestaurants,
    handleDelete,
}) => {
    return (
        <div style={cardStyle}>
            {/* Taşıdığımız Header Bileşeni */}
            <RestaurantTableHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsModalOpen={setIsModalOpen}
            />

            {/* TABLO */}
            <div style={{overflowX: 'auto'}}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        textAlign: 'left',
                    }}
                >
                    <thead>
                        <tr style={{borderBottom: '1px solid var(--border)'}}>
                            {[
                                'SİSTEM ID',
                                'RESTORAN ADI',
                                'YÖNETİCİ E-POSTA',
                                'DURUM',
                                'İŞLEM',
                            ].map((baslik, index) => (
                                <th
                                    key={index}
                                    style={{
                                        padding: '16px 24px',
                                        fontSize: 'var(--font-small)',
                                        fontWeight: 'var(--font-semibold)',
                                        color: 'var(--textMuted)',
                                        letterSpacing: '0.5px',
                                        textAlign:
                                            baslik === 'İŞLEM'
                                                ? 'right'
                                                : 'left',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {baslik}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((res, index) => (
                                <RestaurantTableRow
                                    key={res.id || index}
                                    res={res}
                                    isLast={
                                        index === filteredRestaurants.length - 1
                                    }
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    <EmptyState message="Aranan kriterlere uygun restoran bulunamadı." />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantTable;
