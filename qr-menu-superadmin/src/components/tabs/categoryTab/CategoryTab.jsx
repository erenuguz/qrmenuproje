import React, {useState} from 'react';
import {
    CategoryHeader,
    CategoryAdd,
    CategoryList,
    useCategoryActions,
    useCategories,
} from '@/';

const CategoryTab = ({restoranId, menu}) => {
    const [yeniKategoriAd, setYeniKategoriAd] = useState('');

    // Veriyi Çek
    const {kategoriler} = useCategories(restoranId);

    // İşlemleri Çek
    const {
        kategoriEkle,
        kategoriIsminiGuncelle,
        kategoriSil,
        gorselGuncelle,
        kategoriyiYukariTasi,
        kategoriyiAsagiTasi,
    } = useCategoryActions(restoranId, kategoriler, menu);

    // Ekleme başarılı olursa input'u temizle
    const handleKategoriEkle = async () => {
        const basarili = await kategoriEkle(yeniKategoriAd);
        if (basarili) {
            setYeniKategoriAd('');
        }
    };

    return (
        <div>
            <CategoryHeader kategoriler={kategoriler} menu={menu} />

            <CategoryAdd
                yeniKategoriAd={yeniKategoriAd}
                setYeniKategoriAd={setYeniKategoriAd}
                kategoriEkle={handleKategoriEkle}
            />

            <CategoryList
                kategoriler={kategoriler}
                menu={menu}
                kategoriyiYukariTasi={kategoriyiYukariTasi}
                kategoriyiAsagiTasi={kategoriyiAsagiTasi}
                kategoriSil={kategoriSil}
                kategoriIsminiGuncelle={kategoriIsminiGuncelle}
                gorselGuncelle={gorselGuncelle}
            />
        </div>
    );
};

export default CategoryTab;
