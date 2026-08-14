import React from 'react';
import {cardStyle, inputStyle, useResponsive} from '@/';

const CategoryAdd = ({yeniKategoriAd, setYeniKategoriAd, kategoriEkle}) => {
    const {isMobile} = useResponsive();
    const aktif = yeniKategoriAd.trim();

    return (
        <div style={cardStyle}>
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: 'var(--font-body)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text)',
                }}
            >
                Yeni Kategori Ekle
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px',
                }}
            >
                {/* Input */}
                <div
                    style={{
                        position: 'relative',
                        ...(isMobile ? {width: '100%'} : {flex: 1}),
                    }}
                >
                    <svg
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--textMuted)',
                        }}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    <input
                        type="text"
                        placeholder={
                            isMobile
                                ? 'Kategori adı girin'
                                : 'Kategori adı girin (örn. Çorbalar)'
                        }
                        value={yeniKategoriAd}
                        onChange={(e) => setYeniKategoriAd(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && kategoriEkle()}
                        style={{...inputStyle, padding: '12px 16px 12px 42px'}}
                    />
                </div>

                {/* Buton */}
                <button
                    onClick={kategoriEkle}
                    disabled={!aktif}
                    style={{
                        width: isMobile ? '100%' : 'auto',
                        padding: isMobile ? '12px 16px' : '10px 16px',
                        backgroundColor: aktif
                            ? 'var(--primary)'
                            : 'var(--badge)',
                        color: aktif ? 'var(--textWhite)' : 'var(--textMuted)',
                        border: 'none',
                        borderRadius: 'var(--radiusSmall)',
                        fontSize: '14px',
                        fontWeight: 'var(--font-medium)',
                        cursor: aktif ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    + Ekle
                </button>
            </div>
        </div>
    );
};

export default CategoryAdd;
