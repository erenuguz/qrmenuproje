import React from 'react';
import {MenuItemCard, CategoryBar} from '@/';

const MenuListView = ({
    kategoriler,
    menu,
    aktifKategori,
    kategoriyeKaydir,
    navRef,
    isDragging,
    dragHandlers,
}) => {
    return (
        <>
            {/* ÜST YAPISKAN MENÜ */}
            <CategoryBar
                kategoriler={kategoriler}
                aktifKategori={aktifKategori}
                kategoriyeKaydir={kategoriyeKaydir}
                navRef={navRef}
                isDragging={isDragging}
                dragHandlers={dragHandlers}
            />

            {/* ÜRÜN LİSTESİ */}
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '36px',
                }}
            >
                {kategoriler.map((kat) => {
                    const oKategorininYemekleri = menu.filter(
                        (y) => y.kategoriId === kat.id
                    );
                    if (oKategorininYemekleri.length === 0) return null;

                    return (
                        <div
                            key={`section-${kat.id}`}
                            id={`kategori-${kat.id}`}
                        >
                            {/* Kategori Başlığı */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '9px',
                                    paddingBottom: '10px',
                                    marginBottom: '14px',
                                    borderBottom: '1px solid var(--border)',
                                }}
                            >
                                <h2
                                    style={{
                                        margin: 0,
                                        color: 'var(--text)',
                                        fontSize: 'var(--font-h3)',
                                        fontWeight: 'var(--font-bold)',
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    {kat.ad}
                                </h2>
                            </div>

                            {/* Ürünler */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                }}
                            >
                                {oKategorininYemekleri.map((urun) => (
                                    <MenuItemCard key={urun.id} urun={urun} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MenuListView;
