import {useToast} from '@/hooks/useToast';
import {
    addCategoryService,
    updateCategoryNameService,
    updateImageService,
} from '@/hooks/services/category/categoryMutations';
import {deleteCategoryService} from '@/hooks/services/category/deleteCategory';
import {
    moveCategoryUpService,
    moveCategoryDownService,
} from '@/hooks/services/category/reorderCategories';

export const useCategoryActions = (restaurantId, categories) => {
    const toast = useToast();

    const addCategory = async (newName) => {
        try {
            await addCategoryService(restaurantId, categories, newName);
            return true;
        } catch (error) {
            console.error('Kategori eklenirken hata:', error);
            if (error.message === 'ALREADY_EXISTS') {
                toast.error('Bu kategori zaten mevcut!');
            } else {
                toast.error('Kategori eklenemedi.');
            }
            return false;
        }
    };

    const updateCategoryName = async (id, oldName, newName) => {
        try {
            await updateCategoryNameService(
                restaurantId,
                categories,
                id,
                oldName,
                newName
            );
        } catch (error) {
            console.error('Kategori ismi güncellenirken hata:', error);
            if (error.message === 'ALREADY_EXISTS') {
                toast.error('Bu isimde başka kategori var!');
            } else {
                toast.error('Güncelleme başarısız.');
            }
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

    const updateImage = async (id, url) => {
        try {
            await updateImageService(restaurantId, id, url);
        } catch (error) {
            console.error('Görsel güncellenirken hata:', error);
            toast.error('Görsel güncellenemedi.');
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
        addCategory,
        updateCategoryName,
        deleteCategory,
        updateImage,
        moveCategoryUp,
        moveCategoryDown,
    };
};
