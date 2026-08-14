import React, {useState, useMemo, useCallback} from 'react';
import {
    ProductHeader,
    RestaurantSelector,
    ProductFilters,
    ProductList,
    ProductForm,
    useProductActions,
    useCategories,
    useSearch,
} from '@/';

const ProductTab = ({
    restoranId,
    menu = [],
    restoranlar,
    seciliRestoranId,
    setSeciliRestoranId,
}) => {
    const [aktifForm, setAktifForm] = useState(null);
    const [resimYukleniyor, setResimYukleniyor] = useState(false);
    const [topluSilModu, setTopluSilModu] = useState(false);
    const [secilenUrunler, setSecilenUrunler] = useState([]);

    // Kategori filtresi state'i kalıyor (aramaMetni state'i useSearch'e devredildi)
    const [seciliKategoriFiltresi, setSeciliKategoriFiltresi] =
        useState('Hepsi');

    const {kategoriler} = useCategories(restoranId);
    const {urunSil, formuKaydet, topluUrunSil} = useProductActions(restoranId);

    // 2. Kategori filtresini useCallback ile sabitliyoruz
    const kategoriFiltresi = useCallback(
        (urun) =>
            seciliKategoriFiltresi === 'Hepsi' ||
            urun.kategoriId === seciliKategoriFiltresi,
        [seciliKategoriFiltresi]
    );

    // 3. useSearch Hook'unun Doğru Kullanımı
    const {
        aramaMetni,
        setAramaMetni,
        filtrelenmisVeri: aramaSonuclari,
    } = useSearch(menu, ['ad'], {extraFilter: kategoriFiltresi});

    // Formu Kaydetme Handleri
    const handleFormuKaydet = () => {
        formuKaydet(aktifForm, resimYukleniyor, () => {
            setAktifForm(null);
        });
    };

    // Toplu Silme Handleri
    const handleTopluSil = () => {
        topluUrunSil(secilenUrunler, () => {
            setSecilenUrunler([]);
            setTopluSilModu(false);
        });
    };

    // Seçim kutucuğu mantığı
    const urunSecimiDegistir = (urunId) => {
        if (secilenUrunler.includes(urunId)) {
            setSecilenUrunler(secilenUrunler.filter((id) => id !== urunId));
        } else {
            setSecilenUrunler([...secilenUrunler, urunId]);
        }
    };

    // useMemo ile Gösterilecek Kategorileri Filtreleme
    const gosterilecekKategoriler = useMemo(() => {
        return seciliKategoriFiltresi === 'Hepsi'
            ? kategoriler
            : kategoriler.filter((k) => k.id === seciliKategoriFiltresi);
    }, [kategoriler, seciliKategoriFiltresi]);

    return (
        <div style={{backgroundColor: 'var(--background)'}}>
            {aktifForm ? (
                <ProductForm
                    aktifForm={aktifForm}
                    setAktifForm={setAktifForm}
                    kategoriler={kategoriler}
                    resimYukleniyor={resimYukleniyor}
                    setResimYukleniyor={setResimYukleniyor}
                    formuKaydet={handleFormuKaydet}
                />
            ) : (
                <div>
                    <ProductHeader
                        topluSilModu={topluSilModu}
                        setTopluSilModu={setTopluSilModu}
                        secilenUrunler={secilenUrunler}
                        setSecilenUrunler={setSecilenUrunler}
                        setAktifForm={setAktifForm}
                        kategoriler={kategoriler}
                        topluUrunSil={handleTopluSil}
                    />

                    {restoranlar && (
                        <RestaurantSelector
                            restoranlar={restoranlar}
                            seciliRestoranId={seciliRestoranId}
                            setSeciliRestoranId={setSeciliRestoranId}
                            toplamUrun={menu.length}
                        />
                    )}

                    <ProductFilters
                        aramaMetni={aramaMetni}
                        setAramaMetni={setAramaMetni}
                        seciliKategoriFiltresi={seciliKategoriFiltresi}
                        setSeciliKategoriFiltresi={setSeciliKategoriFiltresi}
                        kategoriler={kategoriler}
                    />

                    <ProductList
                        menu={menu}
                        kategoriler={kategoriler}
                        aramaMetni={aramaMetni}
                        aramaSonuclari={aramaSonuclari}
                        gosterilecekKategoriler={gosterilecekKategoriler}
                        topluSilModu={topluSilModu}
                        secilenUrunler={secilenUrunler}
                        urunSecimiDegistir={urunSecimiDegistir}
                        setAktifForm={setAktifForm}
                        urunSil={urunSil}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductTab;
