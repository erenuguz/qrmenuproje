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

export const useProductActions = (restaurantId) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    // Tekli Ürün Sil
    const deleteProduct = async (id, name) => {
        if (!window.confirm(`"${name}" ürününü silmek istediğine emin misin?`))
            return;

        try {
            setIsProcessing(true);
            await deleteDoc(doc(db, 'restaurants', restaurantId, 'menu', id));
        } catch (error) {
            console.error('Ürün silme hatası:', error);
            toast.error('Ürün silinirken bir hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Formu Kaydet (Ekle veya Güncelle)
    const saveForm = async (activeForm, isImageLoading, onSuccess) => {
        if (isImageLoading)
            return toast.error('Resim yükleniyor, lütfen bekleyin!');
        if (!activeForm.name || !activeForm.price || !activeForm.categoryId)
            return toast.error('Ad, Fiyat ve Kategori seçimi zorunludur!');

        const payload = {
            name: activeForm.name,
            categoryId: activeForm.categoryId,
            image:
                activeForm.image ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
            price: Number(activeForm.price),
            description: activeForm.description || '',
            updatedAt: serverTimestamp(),
        };

        try {
            setIsProcessing(true);
            if (activeForm.id) {
                await updateDoc(
                    doc(db, 'restaurants', restaurantId, 'menu', activeForm.id),
                    payload
                );
            } else {
                payload.createdAt = serverTimestamp();
                await addDoc(
                    collection(db, 'restaurants', restaurantId, 'menu'),
                    payload
                );
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Ürün kaydetme hatası:', error);
            toast.error('Ürün kaydedilirken hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Toplu Ürün Sil
    const deleteMultipleProducts = async (selectedProducts, onSuccess) => {
        if (!selectedProducts || selectedProducts.length === 0) return;
        const onay = window.confirm(
            `Seçtiğiniz ${selectedProducts.length} adet ürünü silmek istediğinize emin misiniz?`
        );
        if (!onay) return;

        try {
            setIsProcessing(true);
            const batch = writeBatch(db);
            selectedProducts.forEach((productId) => {
                batch.delete(
                    doc(db, 'restaurants', restaurantId, 'menu', productId)
                );
            });
            await batch.commit();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Toplu silme hatası:', error);
            toast.error('Ürünler silinirken hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    return {deleteProduct, saveForm, deleteMultipleProducts, isProcessing};
};
