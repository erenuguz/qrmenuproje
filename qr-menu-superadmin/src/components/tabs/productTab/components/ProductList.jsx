import React from 'react';
import {ProductCard, EmptyState, Badge} from '@/';

const ProductList = ({
    menu,
    kategoriler,
    aramaMetni,
    aramaSonuclari,
    gosterilecekKategoriler,
    topluSilModu,
    secilenUrunler,
    urunSecimiDegistir,
    setAktifForm,
    urunSil,
}) => {
    return (
        <div>
            {aramaMetni.trim() !== '' ? (
                // ARAMA SONUÇLARI KUTUSU (kategori filtresine de uyar)
                <div
                    style={{
                        backgroundColor: 'var(--surface)', // --card yerine --surface güncellendi
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)', // 12px yerine tema değişkeni
                        boxShadow: 'var(--shadow)', // Derinlik için eklendi
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            padding: '14px 20px',
                            borderBottom: '1px solid var(--borderLight)', // İç ayırıcılar için borderLight
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <h4
                            style={{
                                margin: 0,
                                color: 'var(--text)',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        >
                            Arama Sonuçları
                        </h4>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {aramaSonuclari.map((yemek, index) => {
                            return (
                                <ProductCard
                                    key={yemek.id}
                                    yemek={yemek}
                                    kategoriAdi={
                                        kategoriler.find(
                                            (k) => k.id === yemek.kategoriId
                                        )?.ad
                                    }
                                    topluSilModu={topluSilModu}
                                    secilenUrunler={secilenUrunler}
                                    urunSecimiDegistir={urunSecimiDegistir}
                                    setAktifForm={setAktifForm}
                                    urunSil={urunSil}
                                    isLast={index === aramaSonuclari.length - 1}
                                />
                            );
                        })}
                        {aramaSonuclari.length === 0 && (
                            <EmptyState message="Sonuç bulunamadı." />
                        )}
                    </div>
                </div>
            ) : (
                // KATEGORİLERE GÖRE GRUPLANMIŞ LİSTE
                gosterilecekKategoriler.map((kategori) => {
                    const oKategorininYemekleri = menu.filter(
                        (y) => y.kategoriId === kategori.id
                    );
                    if (oKategorininYemekleri.length === 0) return null;

                    return (
                        <div
                            key={kategori.id}
                            style={{
                                backgroundColor: 'var(--surface)', // --card yerine --surface
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)', // 12px yerine tema değişkeni
                                boxShadow: 'var(--shadow)', // Derinlik için eklendi
                                marginBottom: '24px',
                                overflow: 'hidden', // Kart içindeki son elemanın taşmasını önler
                            }}
                        >
                            {/* Kategori Başlığı ve Etiket (Badge) */}
                            <div
                                style={{
                                    padding: '14px 20px',
                                    borderBottom:
                                        '1px solid var(--borderLight)', // İç ayırıcılar için borderLight
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <svg
                                    style={{
                                        color: 'var(--textSecondary)',
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                                <h4
                                    style={{
                                        color: 'var(--text)',
                                        margin: 0,
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {kategori.ad}
                                </h4>
                                <Badge>
                                    {oKategorininYemekleri.length} ürün
                                </Badge>
                            </div>

                            {/* Kategori İçindeki Ürünler */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {oKategorininYemekleri.map((yemek, index) => (
                                    <ProductCard
                                        key={yemek.id}
                                        yemek={yemek}
                                        kategoriAdi={kategori.ad}
                                        topluSilModu={topluSilModu}
                                        secilenUrunler={secilenUrunler}
                                        urunSecimiDegistir={urunSecimiDegistir}
                                        setAktifForm={setAktifForm}
                                        urunSil={urunSil}
                                        isLast={
                                            index ===
                                            oKategorininYemekleri.length - 1
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
            {menu.length === 0 && (
                <EmptyState message="Menüde henüz ürün yok." />
            )}
        </div>
    );
};

export default ProductList;
