import {useState} from 'react';
import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    writeBatch,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {useToast} from '@/';

export const useProductActions = (restoranId) => {
    const [islemYapiliyor, setIslemYapiliyor] = useState(false);
    const toast = useToast();

    // Tekli Ürün Sil
    const urunSil = async (id, ad) => {
        if (!window.confirm(`"${ad}" ürününü silmek istediğine emin misin?`))
            return;

        try {
            setIslemYapiliyor(true);
            await deleteDoc(doc(db, 'restaurants', restoranId, 'menu', id));
        } catch (error) {
            console.error('Ürün silme hatası:', error);
            toast.error('Ürün silinirken bir hata oluştu.');
        } finally {
            setIslemYapiliyor(false);
        }
    };

    // Formu Kaydet (Ekle veya Güncelle)
    const formuKaydet = async (aktifForm, resimYukleniyor, onSuccess) => {
        if (resimYukleniyor)
            return toast.error('Resim yükleniyor, lütfen bekleyin!');
        if (!aktifForm.ad || !aktifForm.fiyat || !aktifForm.kategoriId)
            return toast.error('Ad, Fiyat ve Kategori seçimi zorunludur!');

        const payload = {
            ad: aktifForm.ad,
            kategoriId: aktifForm.kategoriId,
            resim:
                aktifForm.resim ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
            fiyat: Number(aktifForm.fiyat),
            aciklama: aktifForm.aciklama || '',
            updatedAt: serverTimestamp(),
        };

        try {
            setIslemYapiliyor(true);
            if (aktifForm.id) {
                await updateDoc(
                    doc(db, 'restaurants', restoranId, 'menu', aktifForm.id),
                    payload
                );
            } else {
                payload.createdAt = serverTimestamp();
                await addDoc(
                    collection(db, 'restaurants', restoranId, 'menu'),
                    payload
                );
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Ürün kaydetme hatası:', error);
            toast.error('Ürün kaydedilirken hata oluştu.');
        } finally {
            setIslemYapiliyor(false);
        }
    };

    // Toplu Ürün Sil
    const topluUrunSil = async (secilenUrunler, onSuccess) => {
        if (!secilenUrunler || secilenUrunler.length === 0) return;
        const onay = window.confirm(
            `Seçtiğiniz ${secilenUrunler.length} adet ürünü silmek istediğinize emin misiniz?`
        );
        if (!onay) return;

        try {
            setIslemYapiliyor(true);
            const batch = writeBatch(db);
            secilenUrunler.forEach((urunId) => {
                batch.delete(
                    doc(db, 'restaurants', restoranId, 'menu', urunId)
                );
            });
            await batch.commit();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Toplu silme hatası:', error);
            toast.error('Ürünler silinirken hata oluştu.');
        } finally {
            setIslemYapiliyor(false);
        }
    };

    return {urunSil, formuKaydet, topluUrunSil, islemYapiliyor};
};
