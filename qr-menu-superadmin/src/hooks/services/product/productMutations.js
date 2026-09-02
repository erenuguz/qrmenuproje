import {
    collection,
    doc,
    getDoc,
    updateDoc,
    writeBatch,
    runTransaction,
    increment,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const saveProductService = async (restaurantId, productId, payload) => {
    const categoryReference = doc(
        db,
        COLLECTIONS.RESTAURANTS,
        restaurantId,
        COLLECTIONS.CATEGORIES,
        payload.categoryId
    );
    const categorySnapshot = await getDoc(categoryReference);

    if (!categorySnapshot.exists()) {
        throw new Error('Seçilen kategori artık mevcut değil.');
    }

    if (categorySnapshot.data().isDeleting === true) {
        throw new Error('Seçilen kategori şu anda siliniyor.');
    }

    const finalPayload = {
        ...payload,
        updatedAt: serverTimestamp(),
    };

    if (productId) {
        // Düzenleme işlemi
        await updateDoc(
            doc(
                db,
                COLLECTIONS.RESTAURANTS,
                restaurantId,
                COLLECTIONS.MENU,
                productId
            ),
            finalPayload
        );
    } else {
        const restaurantReference = doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId
        );
        const productReference = doc(
            collection(
                db,
                COLLECTIONS.RESTAURANTS,
                restaurantId,
                COLLECTIONS.MENU
            )
        );

        const batch = writeBatch(db);

        batch.set(productReference, {
            ...finalPayload,
            createdAt: serverTimestamp(),
        });

        batch.update(restaurantReference, {
            productCount: increment(1),
            updatedAt: serverTimestamp(),
        });

        await batch.commit();
    }
};

export const deleteProductService = async (restaurantId, productId) => {
    const productReference = doc(
        db,
        COLLECTIONS.RESTAURANTS,
        restaurantId,
        COLLECTIONS.MENU,
        productId
    );
    const restaurantReference = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);

    const wasDeleted = await runTransaction(db, async (transaction) => {
        const [productSnapshot, restaurantSnapshot] = await Promise.all([
            transaction.get(productReference),
            transaction.get(restaurantReference),
        ]);

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

    return wasDeleted;
};
