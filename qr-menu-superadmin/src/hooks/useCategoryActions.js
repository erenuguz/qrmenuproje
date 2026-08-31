import {
    getDocs,
    query,
    where,
    limit,
    deleteField,
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

export const useCategoryActions = (restaurantId, categories) => {
    const toast = useToast();

    const addCategory = async (newName) => {
        const name = String(newName || '').trim();

        if (!name) return false;

        const normalizedName = name.toLocaleLowerCase('tr-TR');

        const alreadyExists = categories.some(
            (category) =>
                String(category.name || '')
                    .trim()
                    .toLocaleLowerCase('tr-TR') === normalizedName
        );

        if (alreadyExists) {
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
            const restaurantReference = doc(db, 'restaurants', restaurantId);

            const categoryReference = doc(
                collection(db, 'restaurants', restaurantId, 'categories')
            );

            const batch = writeBatch(db);

            batch.set(categoryReference, {
                name,
                image: '',
                order: newOrder,
                isInactive: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            batch.update(restaurantReference, {
                categoryCount: increment(1),
                updatedAt: serverTimestamp(),
            });

            await batch.commit();

            return true;
        } catch (error) {
            console.error('Kategori eklenirken hata:', error);
            toast.error('Kategori eklenemedi.');

            return false;
        }
    };

    const updateCategoryName = async (id, oldName, newName) => {
        const trimmedName = String(newName ?? '').trim();
        const trimmedOldName = String(oldName ?? '').trim();

        if (!trimmedName || trimmedOldName === trimmedName) return;

        const normalizedName = trimmedName.toLocaleLowerCase('tr-TR');

        const alreadyExists = categories.some(
            (category) =>
                category.id !== id &&
                String(category.name ?? '')
                    .trim()
                    .toLocaleLowerCase('tr-TR') === normalizedName
        );

        if (alreadyExists) {
            toast.error('Bu isimde başka kategori var!');
            return;
        }

        try {
            await updateDoc(
                doc(db, 'restaurants', restaurantId, 'categories', id),
                {
                    name: trimmedName,
                    updatedAt: serverTimestamp(),
                }
            );
        } catch (error) {
            console.error('Kategori ismi güncellenirken hata:', error);
            toast.error('Güncelleme başarısız.');
        }
    };

    const deleteCategory = async (id, name) => {
        const confirmed = window.confirm(
            `"${name}" kategorisini tamamen silmek istediğine emin misin?`
        );

        if (!confirmed) return;

        const categoryReference = doc(
            db,
            'restaurants',
            restaurantId,
            'categories',
            id
        );

        const restaurantReference = doc(db, 'restaurants', restaurantId);

        let categoryLocked = false;

        try {
            const wasLocked = await runTransaction(db, async (transaction) => {
                const categorySnapshot =
                    await transaction.get(categoryReference);

                if (!categorySnapshot.exists()) {
                    return false;
                }

                transaction.update(categoryReference, {
                    isDeleting: true,
                    updatedAt: serverTimestamp(),
                });

                return true;
            });

            if (!wasLocked) {
                toast.info('Kategori zaten silinmiş.');
                return;
            }

            categoryLocked = true;

            const menuReference = collection(
                db,
                'restaurants',
                restaurantId,
                'menu'
            );

            const [productsSnapshot, legacyProductsSnapshot] =
                await Promise.all([
                    getDocs(
                        query(
                            menuReference,
                            where('categoryId', '==', id),
                            limit(1)
                        )
                    ),
                    getDocs(
                        query(
                            menuReference,
                            where('kategoriId', '==', id),
                            limit(1)
                        )
                    ),
                ]);

            const hasProducts =
                !productsSnapshot.empty || !legacyProductsSnapshot.empty;

            if (hasProducts) {
                await updateDoc(categoryReference, {
                    isDeleting: deleteField(),
                    updatedAt: serverTimestamp(),
                });

                categoryLocked = false;

                toast.error(
                    `"${name}" kategorisinde ürün var. Önce ürünleri silin!`
                );

                return;
            }

            const wasDeleted = await runTransaction(db, async (transaction) => {
                const [categorySnapshot, restaurantSnapshot] =
                    await Promise.all([
                        transaction.get(categoryReference),
                        transaction.get(restaurantReference),
                    ]);

                if (!categorySnapshot.exists()) {
                    return false;
                }

                if (!restaurantSnapshot.exists()) {
                    throw new Error('Restoran bulunamadı.');
                }

                if (categorySnapshot.data().isDeleting !== true) {
                    throw new Error('Kategori silme kilidi bulunamadı.');
                }

                const currentCategoryCount = Number(
                    restaurantSnapshot.data().categoryCount || 0
                );

                transaction.delete(categoryReference);

                transaction.update(restaurantReference, {
                    categoryCount: Math.max(0, currentCategoryCount - 1),
                    updatedAt: serverTimestamp(),
                });

                return true;
            });

            categoryLocked = false;

            if (!wasDeleted) {
                toast.info('Kategori zaten silinmiş.');
            }
        } catch (error) {
            if (categoryLocked) {
                await updateDoc(categoryReference, {
                    isDeleting: deleteField(),
                    updatedAt: serverTimestamp(),
                }).catch(() => {});
            }

            console.error('Kategori silinirken hata:', error);
            toast.error('Kategori silinemedi.');
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
