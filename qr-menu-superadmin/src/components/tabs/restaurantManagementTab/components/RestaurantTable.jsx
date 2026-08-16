import React from 'react';
import {RestaurantTableRow, EmptyState} from '@/';

const RestaurantTable = ({
    searchQuery,
    setSearchQuery,
    setIsModalOpen,
    filteredRestaurants,
    handleDelete,
}) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radiusLarge)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
            }}
        >
            {/* Tablo Üst Araç Çubuğu */}
            <div
                style={{
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                    style={{display: 'flex', gap: '15px', alignItems: 'center'}}
                >
                    {/* Arama */}
                    <div style={{position: 'relative'}}>
                        <svg
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '10px',
                                color: 'var(--textMuted)',
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: '8px 12px 8px 36px',
                                borderRadius: 'var(--radiusSmall)',
                                border: '1px solid var(--inputBorder)',
                                backgroundColor: 'var(--inputBackground)',
                                color: 'var(--text)',
                                fontSize: 'var(--font-caption)',
                                outline: 'none',
                                width: '200px',
                            }}
                        />
                    </div>

                    {/* Yeni Restoran Butonu */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'var(--textWhite)',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: 'var(--radiusSmall)',
                            fontSize: 'var(--font-caption)',
                            fontWeight: 'var(--font-medium)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        + Yeni Restoran
                    </button>
                </div>
            </div>

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
