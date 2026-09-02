import {useState} from 'react';
import {useToast} from '@/hooks/useToast';
import {validateProductForm} from '@/hooks/services/product/productValidation';
import {
    saveProductService,
    deleteProductService,
} from '@/hooks/services/product/productMutations';
import {bulkDeleteProductsService} from '@/hooks/services/product/bulkDeleteProducts';

export const useProductActions = (restaurantId) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const deleteProduct = async (id, name) => {
        const confirmed = window.confirm(
            `"${name}" ürününü silmek istediğine emin misin?`
        );

        if (!confirmed) return;

        try {
            setIsProcessing(true);

            const wasDeleted = await deleteProductService(restaurantId, id);

            if (!wasDeleted) {
                toast.info('Ürün zaten silinmiş.');
            } else {
                toast.success('Ürün başarıyla silindi.');
            }
        } catch (error) {
            console.error('Ürün silme hatası:', error);
            toast.error('Ürün silinirken bir hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    const saveForm = async (activeForm, isImageLoading, onSuccess) => {
        try {
            const payload = validateProductForm(activeForm, isImageLoading);

            setIsProcessing(true);

            await saveProductService(restaurantId, activeForm?.id, payload);

            onSuccess?.();
        } catch (error) {
            console.error('Ürün kaydetme hatası:', error);

            if (error.message === 'IMAGE_LOADING') {
                toast.error('Resim yükleniyor, lütfen bekleyin!');
                return;
            }
            if (error.message === 'MISSING_FIELDS') {
                toast.error('Ad, fiyat ve kategori seçimi zorunludur!');
                return;
            }
            if (error.message === 'INVALID_PRICE') {
                toast.error('Geçerli bir fiyat girin!');
                return;
            }

            if (error.code === 'permission-denied') {
                toast.error(
                    'Ürün kaydedilemedi. Kategori siliniyor, restoran pasif veya işlem yetkiniz bulunmuyor.'
                );
            } else {
                toast.error(error.message || 'Ürün kaydedilirken hata oluştu.');
            }
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

        try {
            setIsProcessing(true);

            const deletedProductCount = await bulkDeleteProductsService(
                restaurantId,
                selectedProducts
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
