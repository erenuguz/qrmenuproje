import {
    collection,
    doc,
    updateDoc,
    addDoc,
    deleteDoc,
    writeBatch,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {useToast} from '@/';

export const useCategoryActions = (restoranId, kategoriler, menu) => {
    const toast = useToast();

    const kategoriEkle = async (yeniAd) => {
        const ad = yeniAd.trim();
        if (!ad) return false;

        if (kategoriler.some((k) => k.ad.toLowerCase() === ad.toLowerCase())) {
            toast.error('Bu kategori zaten mevcut!');
            return false;
        }

        const yeniSira =
            kategoriler.length > 0
                ? Math.max(...kategoriler.map((k) => k.sira)) + 1
                : 0;

        try {
            await addDoc(
                collection(db, 'restaurants', restoranId, 'categories'),
                {
                    ad: ad,
                    gorsel: '',
                    sira: yeniSira,
                    aktif: true,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                }
            );
            return true; // Başarılı olursa true dönüyoruz ki input'u temizleyelim
        } catch (error) {
            console.error('Kategori eklenirken hata:', error);
            toast.error('Kategori eklenemedi.');
            return false;
        }
    };

    const kategoriIsminiGuncelle = async (id, eskiAd, yeniAd) => {
        if (!yeniAd || eskiAd === yeniAd) return;

        if (
            kategoriler.some(
                (k) =>
                    k.id !== id && k.ad.toLowerCase() === yeniAd.toLowerCase()
            )
        ) {
            toast.error('Bu isimde başka kategori var!');
            return;
        }

        try {
            await updateDoc(
                doc(db, 'restaurants', restoranId, 'categories', id),
                {
                    ad: yeniAd,
                    updatedAt: serverTimestamp(),
                }
            );
        } catch (error) {
            console.error('Kategori ismi güncellenirken hata:', error);
            toast.error('Güncelleme başarısız.');
        }
    };

    const kategoriSil = async (id, ad) => {
        const buKategoridekiUrunler = menu.filter((y) => y.kategoriId === id);
        if (buKategoridekiUrunler.length > 0) {
            toast.error(
                `"${ad}" kategorisinde ${buKategoridekiUrunler.length} adet ürün var. Önce ürünleri silin!`
            );
            return;
        }

        if (
            window.confirm(
                `"${ad}" kategorisini tamamen silmek istediğine emin misin?`
            )
        ) {
            try {
                await deleteDoc(
                    doc(db, 'restaurants', restoranId, 'categories', id)
                );
            } catch (error) {
                console.error('Kategori silinirken hata:', error);
                toast.error('Kategori silinemedi.');
            }
        }
    };

    const gorselGuncelle = async (id, url) => {
        try {
            await updateDoc(
                doc(db, 'restaurants', restoranId, 'categories', id),
                {
                    gorsel: url,
                    updatedAt: serverTimestamp(),
                }
            );
        } catch (error) {
            console.error('Görsel güncellenirken hata:', error);
            toast.error('Görsel güncellenemedi.');
        }
    };

    const kategoriyiYukariTasi = async (index) => {
        if (index === 0) return;
        const aktifKategori = kategoriler[index];
        const ustKategori = kategoriler[index - 1];

        try {
            const batch = writeBatch(db);
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restoranId,
                    'categories',
                    aktifKategori.id
                ),
                {sira: ustKategori.sira}
            );
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restoranId,
                    'categories',
                    ustKategori.id
                ),
                {sira: aktifKategori.sira}
            );
            await batch.commit();
        } catch (error) {
            console.error('Kategori yukarı taşınırken hata:', error);
            toast.error('Görsel güncellenemedi.');
        }
    };

    const kategoriyiAsagiTasi = async (index) => {
        if (index === kategoriler.length - 1) return;
        const aktifKategori = kategoriler[index];
        const altKategori = kategoriler[index + 1];

        try {
            const batch = writeBatch(db);
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restoranId,
                    'categories',
                    aktifKategori.id
                ),
                {sira: altKategori.sira}
            );
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restoranId,
                    'categories',
                    altKategori.id
                ),
                {sira: aktifKategori.sira}
            );
            await batch.commit();
        } catch (error) {
            console.error('Kategori aşağı taşınırken hata:', error);
            toast.error('Sıralama güncellenemedi.');
        }
    };

    return {
        kategoriEkle,
        kategoriIsminiGuncelle,
        kategoriSil,
        gorselGuncelle,
        kategoriyiYukariTasi,
        kategoriyiAsagiTasi,
    };
};
