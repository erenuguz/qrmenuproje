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

export const useCategoryActions = (restaurantId, categories, menu) => {
    const toast = useToast();

    const addCategory = async (newName) => {
        const name = newName.trim();
        if (!name) return false;

        if (
            categories.some(
                (category) => category.name.toLowerCase() === name.toLowerCase()
            )
        ) {
            toast.error('Bu kategori zaten mevcut!');
            return false;
        }

        const newOrder =
            categories.length > 0
                ? Math.max(
                      ...categories.map(
                          (category) => Number(category.order) || 0
                      )
                  ) + 1
                : 0;

        try {
            await addDoc(
                collection(db, 'restaurants', restaurantId, 'categories'),
                {
                    name: name,
                    image: '',
                    order: newOrder,
                    isActive: true,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                }
            );
            return true;
        } catch (error) {
            console.error('Kategori eklenirken hata:', error);
            toast.error('Kategori eklenemedi.');
            return false;
        }
    };

    const updateCategoryName = async (id, oldName, newName) => {
        if (!newName || oldName === newName) return;

        if (
            categories.some(
                (category) =>
                    category.id !== id &&
                    category.name.toLowerCase() === newName.toLowerCase()
            )
        ) {
            toast.error('Bu isimde başka kategori var!');
            return;
        }

        try {
            await updateDoc(
                doc(db, 'restaurants', restaurantId, 'categories', id),
                {
                    name: newName,
                    updatedAt: serverTimestamp(),
                }
            );
        } catch (error) {
            console.error('Kategori ismi güncellenirken hata:', error);
            toast.error('Güncelleme başarısız.');
        }
    };

    const deleteCategory = async (id, name) => {
        const productsInCategory = menu.filter(
            (product) => product.categoryId === id
        );
        if (productsInCategory.length > 0) {
            toast.error(
                `"${name}" kategorisinde ${productsInCategory.length} adet ürün var. Önce ürünleri silin!`
            );
            return;
        }

        if (
            window.confirm(
                `"${name}" kategorisini tamamen silmek istediğine emin misin?`
            )
        ) {
            try {
                await deleteDoc(
                    doc(db, 'restaurants', restaurantId, 'categories', id)
                );
            } catch (error) {
                console.error('Kategori silinirken hata:', error);
                toast.error('Kategori silinemedi.');
            }
        }
    };

    const updateImage = async (id, url) => {
        try {
            await updateDoc(
                doc(db, 'restaurants', restaurantId, 'categories', id),
                {
                    image: url,
                    updatedAt: serverTimestamp(),
                }
            );
        } catch (error) {
            console.error('Görsel güncellenirken hata:', error);
            toast.error('Görsel güncellenemedi.');
        }
    };

    const moveCategoryUp = async (index) => {
        if (index === 0) return;
        const activeCategory = categories[index];
        const upperCategory = categories[index - 1];

        try {
            const batch = writeBatch(db);
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restaurantId,
                    'categories',
                    activeCategory.id
                ),
                {order: upperCategory.order}
            );
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restaurantId,
                    'categories',
                    upperCategory.id
                ),
                {order: activeCategory.order}
            );
            await batch.commit();
        } catch (error) {
            console.error('Kategori yukarı taşınırken hata:', error);
            toast.error('Sıralama güncellenemedi.');
        }
    };

    const moveCategoryDown = async (index) => {
        if (index === categories.length - 1) return;
        const activeCategory = categories[index];
        const lowerCategory = categories[index + 1];

        try {
            const batch = writeBatch(db);
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restaurantId,
                    'categories',
                    activeCategory.id
                ),
                {order: lowerCategory.order}
            );
            batch.update(
                doc(
                    db,
                    'restaurants',
                    restaurantId,
                    'categories',
                    lowerCategory.id
                ),
                {order: activeCategory.order}
            );
            await batch.commit();
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
