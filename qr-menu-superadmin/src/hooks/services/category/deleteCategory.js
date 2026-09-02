import {
    doc,
    collection,
    getDocs,
    query,
    where,
    limit,
    deleteField,
    updateDoc,
    runTransaction,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const deleteCategoryService = async (restaurantId, id) => {
    const categoryReference = doc(
        db,
        COLLECTIONS.RESTAURANTS,
        restaurantId,
        COLLECTIONS.CATEGORIES,
        id
    );
    const restaurantReference = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);
    let categoryLocked = false;

    try {
        const wasLocked = await runTransaction(db, async (transaction) => {
            const categorySnapshot = await transaction.get(categoryReference);
            if (!categorySnapshot.exists()) return false;

            if (categorySnapshot.data().isDeleting === true) {
                throw new Error('ALREADY_DELETING');
            }

            transaction.update(categoryReference, {
                isDeleting: true,
                updatedAt: serverTimestamp(),
            });

            return true;
        });

        if (!wasLocked) return 'ALREADY_DELETED';

        categoryLocked = true;

        const menuReference = collection(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.MENU
        );
        const productsSnapshot = await getDocs(
            query(menuReference, where('categoryId', '==', id), limit(1))
        );

        if (!productsSnapshot.empty) {
            await updateDoc(categoryReference, {
                isDeleting: deleteField(),
                updatedAt: serverTimestamp(),
            });
            categoryLocked = false;
            throw new Error('HAS_PRODUCTS');
        }

        const wasDeleted = await runTransaction(db, async (transaction) => {
            const [categorySnapshot, restaurantSnapshot] = await Promise.all([
                transaction.get(categoryReference),
                transaction.get(restaurantReference),
            ]);

            if (!categorySnapshot.exists()) return false;
            if (!restaurantSnapshot.exists())
                throw new Error('Restoran bulunamadı.');
            if (categorySnapshot.data().isDeleting !== true)
                throw new Error('Kategori silme kilidi bulunamadı.');

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

        if (!wasDeleted) return 'ALREADY_DELETED';

        return 'SUCCESS';
    } catch (error) {
        if (categoryLocked) {
            await updateDoc(categoryReference, {
                isDeleting: deleteField(),
                updatedAt: serverTimestamp(),
            }).catch((unlockError) => {
                console.error('Kategori kilidi kaldırılamadı:', unlockError);
            });
        }
        throw error;
    }
};
