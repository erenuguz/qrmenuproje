import {useState} from 'react';
import {useToast} from '@/hooks/useToast';
import {saveCategoryService} from '@/hooks/services/category/categoryMutations';
import {deleteCategoryService} from '@/hooks/services/category/deleteCategory';
import {
    moveCategoryUpService,
    moveCategoryDownService,
} from '@/hooks/services/category/reorderCategories';

export const useCategoryActions = (restaurantId, categories) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const saveCategory = async (activeForm, isImageLoading, onSuccess) => {
        if (isImageLoading || isProcessing) {
            return false;
        }

        setIsProcessing(true);

        try {
            const result = await saveCategoryService(
                restaurantId,
                categories,
                activeForm
            );

            if (result === 'CREATED') {
                toast.success(
                    `"${String(activeForm?.name || '').trim()}" kategorisi eklendi.`
                );
            }

            if (result === 'UPDATED') {
                toast.success(
                    `"${String(activeForm?.name || '').trim()}" kategorisi güncellendi.`
                );
            }

            onSuccess?.();

            return true;
        } catch (error) {
            console.error('Kategori kaydedilirken hata:', error);

            if (error.message === 'NAME_REQUIRED') {
                toast.error('Kategori adı boş bırakılamaz.');
            } else if (error.message === 'ALREADY_EXISTS') {
                toast.error('Bu isimde başka kategori var.');
            } else if (error.message === 'RESTAURANT_REQUIRED') {
                toast.error('Restoran bilgisi bulunamadı.');
            } else if (error.code === 'permission-denied') {
                toast.error(
                    'Kategori kaydedilemedi. Restoran pasif veya işlem yetkiniz bulunmuyor.'
                );
            } else {
                toast.error('Kategori kaydedilemedi.');
            }

            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteCategory = async (id, name) => {
        const confirmed = window.confirm(
            `"${name}" kategorisini tamamen silmek istediğine emin misin?`
        );

        if (!confirmed) return;

        try {
            const status = await deleteCategoryService(restaurantId, id);

            if (status === 'ALREADY_DELETED') {
                toast.info('Kategori zaten silinmiş.');
                return;
            }

            toast.success(`"${name}" kategorisi silindi.`);
        } catch (error) {
            console.error('Kategori silinirken hata:', error);

            if (error.message === 'ALREADY_DELETING') {
                toast.info('Bu kategori için zaten silme işlemi devam ediyor.');
            } else if (error.message === 'HAS_PRODUCTS') {
                toast.error(
                    `"${name}" kategorisinde ürün var. Önce ürünleri silin!`
                );
            } else if (error.code === 'permission-denied') {
                toast.error(
                    'Kategori silinemedi. Restoran pasif veya işlem yetkiniz bulunmuyor.'
                );
            } else {
                toast.error(error.message || 'Kategori silinemedi.');
            }
        }
    };

    const moveCategoryUp = async (index) => {
        try {
            await moveCategoryUpService(restaurantId, categories, index);
        } catch (error) {
            console.error('Kategori yukarı taşınırken hata:', error);

            toast.error('Sıralama güncellenemedi.');
        }
    };

    const moveCategoryDown = async (index) => {
        try {
            await moveCategoryDownService(restaurantId, categories, index);
        } catch (error) {
            console.error('Kategori aşağı taşınırken hata:', error);

            toast.error('Sıralama güncellenemedi.');
        }
    };

    return {
        saveCategory,
        deleteCategory,
        moveCategoryUp,
        moveCategoryDown,
        isProcessing,
    };
};
