import {useState} from 'react';
import {
    collection,
    doc,
    updateDoc,
    writeBatch,
    runTransaction,
    increment,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {useToast} from '@/hooks/useToast';

export const useProductActions = (restaurantId) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const deleteProduct = async (id, name) => {
        const confirmed = window.confirm(
            `"${name}" ürününü silmek istediğine emin misin?`
        );

        if (!confirmed) return;

        const productReference = doc(
            db,
            'restaurants',
            restaurantId,
            'menu',
            id
        );

        const restaurantReference = doc(db, 'restaurants', restaurantId);

        try {
            setIsProcessing(true);

            const wasDeleted = await runTransaction(db, async (transaction) => {
                const [productSnapshot, restaurantSnapshot] = await Promise.all(
                    [
                        transaction.get(productReference),
                        transaction.get(restaurantReference),
                    ]
                );

                // Ürün daha önce silinmişse count tekrar azaltılmaz.
                if (!productSnapshot.exists()) {
                    return false;
                }

                if (!restaurantSnapshot.exists()) {
                    throw new Error('Restoran bulunamadı.');
                }

                const currentProductCount = Number(
                    restaurantSnapshot.data().productCount || 0
                );

                transaction.delete(productReference);

                transaction.update(restaurantReference, {
                    productCount: Math.max(0, currentProductCount - 1),
                    updatedAt: serverTimestamp(),
                });

                return true;
            });

            if (!wasDeleted) {
                toast.info('Ürün zaten silinmiş.');
            }
        } catch (error) {
            console.error('Ürün silme hatası:', error);
            toast.error('Ürün silinirken bir hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    const saveForm = async (activeForm, isImageLoading, onSuccess) => {
        if (isImageLoading) {
            toast.error('Resim yükleniyor, lütfen bekleyin!');
            return;
        }

        const trimmedName = String(activeForm?.name || '').trim();
        const trimmedDescription = String(activeForm?.description || '').trim();

        const rawPrice = String(activeForm?.price ?? '').trim();

        if (!trimmedName || !rawPrice || !activeForm?.categoryId) {
            toast.error('Ad, fiyat ve kategori seçimi zorunludur!');
            return;
        }

        const numericPrice = Number(rawPrice);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            toast.error('Geçerli bir fiyat girin!');
            return;
        }

        const payload = {
            name: trimmedName,
            categoryId: activeForm.categoryId,
            image:
                activeForm.image ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
            price: numericPrice,
            description: trimmedDescription,
            updatedAt: serverTimestamp(),
        };

        try {
            setIsProcessing(true);

            if (activeForm.id) {
                // Düzenlemede ürün sayısı değişmez.
                await updateDoc(
                    doc(db, 'restaurants', restaurantId, 'menu', activeForm.id),
                    payload
                );
            } else {
                const restaurantReference = doc(
                    db,
                    'restaurants',
                    restaurantId
                );

                const productReference = doc(
                    collection(db, 'restaurants', restaurantId, 'menu')
                );

                const batch = writeBatch(db);

                batch.set(productReference, {
                    ...payload,
                    createdAt: serverTimestamp(),
                });

                batch.update(restaurantReference, {
                    productCount: increment(1),
                    updatedAt: serverTimestamp(),
                });

                await batch.commit();
            }

            onSuccess?.();
        } catch (error) {
            console.error('Ürün kaydetme hatası:', error);
            toast.error('Ürün kaydedilirken hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    const bulkDeleteProducts = async (selectedProducts, onSuccess) => {
        if (!selectedProducts || selectedProducts.length === 0) {
            toast.info('Silmek için en az bir ürün seçin.');
            return;
        }

        const confirmed = window.confirm(
            `Seçtiğiniz ${selectedProducts.length} adet ürünü silmek istediğinize emin misiniz?`
        );

        if (!confirmed) return;

        const restaurantReference = doc(db, 'restaurants', restaurantId);

        const productReferences = selectedProducts.map((productId) =>
            doc(db, 'restaurants', restaurantId, 'menu', productId)
        );

        try {
            setIsProcessing(true);

            const deletedProductCount = await runTransaction(
                db,
                async (transaction) => {
                    // Transaction içinde bütün okumalar yazmalardan önce yapılmalı.
                    const productSnapshots = [];

                    for (const productReference of productReferences) {
                        const productSnapshot =
                            await transaction.get(productReference);

                        productSnapshots.push(productSnapshot);
                    }

                    const restaurantSnapshot =
                        await transaction.get(restaurantReference);

                    if (!restaurantSnapshot.exists()) {
                        throw new Error('Restoran bulunamadı.');
                    }

                    const existingProducts = productSnapshots.filter(
                        (productSnapshot) => productSnapshot.exists()
                    );

                    if (existingProducts.length === 0) {
                        return 0;
                    }

                    const currentProductCount = Number(
                        restaurantSnapshot.data().productCount || 0
                    );

                    existingProducts.forEach((productSnapshot) => {
                        transaction.delete(productSnapshot.ref);
                    });

                    transaction.update(restaurantReference, {
                        productCount: Math.max(
                            0,
                            currentProductCount - existingProducts.length
                        ),
                        updatedAt: serverTimestamp(),
                    });

                    return existingProducts.length;
                }
            );

            if (deletedProductCount === 0) {
                toast.info('Seçilen ürünler zaten silinmiş.');
                return;
            }

            toast.success(`${deletedProductCount} ürün silindi.`);
            onSuccess?.();
        } catch (error) {
            console.error('Toplu silme hatası:', error);
            toast.error('Ürünler silinirken hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        deleteProduct,
        saveForm,
        bulkDeleteProducts,
        isProcessing,
    };
};
