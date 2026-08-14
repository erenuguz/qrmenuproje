import React from 'react';
import {CategoryItem, EmptyState, Badge} from '@/';

const CategoryList = ({
    kategoriler,
    menu,
    kategoriyiYukariTasi,
    kategoriyiAsagiTasi,
    kategoriSil,
    kategoriIsminiGuncelle,
    gorselGuncelle,
}) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
            }}
        >
            {/* Liste Başlığı */}
            <div
                style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--borderLight)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '10px'}}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--textMuted)"
                        strokeWidth="2"
                    >
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-body)',
                            fontWeight: 'var(--font-semibold)',
                            color: 'var(--text)',
                        }}
                    >
                        Kategori Listesi
                    </h3>
                    <Badge>{kategoriler.length} kategori</Badge>
                </div>
                <span
                    style={{
                        fontSize: 'var(--font-small)',
                        color: 'var(--textMuted)',
                    }}
                >
                    Okları kullanarak sırayı değiştirin
                </span>
            </div>

            {/* Liste İçeriği */}
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {kategoriler.map((kat, index) => {
                    const urunSayisi = menu.filter(
                        (y) => y.kategoriId === kat.id
                    ).length;

                    return (
                        <CategoryItem
                            key={kat.id}
                            kat={kat}
                            index={index}
                            toplamKategoriSayisi={kategoriler.length}
                            urunSayisi={urunSayisi}
                            kategoriyiYukariTasi={kategoriyiYukariTasi}
                            kategoriyiAsagiTasi={kategoriyiAsagiTasi}
                            kategoriSil={kategoriSil}
                            kategoriIsminiGuncelle={kategoriIsminiGuncelle}
                            gorselGuncelle={gorselGuncelle}
                        />
                    );
                })}

                {kategoriler.length === 0 && (
                    <EmptyState message="Henüz kategori eklenmemiş." />
                )}
            </div>
        </div>
    );
};

export default CategoryList;
