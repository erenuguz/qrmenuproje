import {
    collection,
    doc,
    updateDoc,
    writeBatch,
    increment,
    serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const saveCategoryService = async (
    restaurantId,
    categories,
    activeForm
) => {
    const id = activeForm?.id;
    const name = String(activeForm?.name || '').trim();
    const image = String(activeForm?.image || '').trim();

    if (!restaurantId) {
        throw new Error('RESTAURANT_REQUIRED');
    }

    if (!name) {
        throw new Error('NAME_REQUIRED');
    }

    const normalizedName = name.toLocaleLowerCase('tr-TR');

    const alreadyExists = categories.some(
        (category) =>
            category.id !== id &&
            String(category.name || '')
                .trim()
                .toLocaleLowerCase('tr-TR') === normalizedName
    );

    if (alreadyExists) {
        throw new Error('ALREADY_EXISTS');
    }

    if (id) {
        await updateDoc(
            doc(
                db,
                COLLECTIONS.RESTAURANTS,
                restaurantId,
                COLLECTIONS.CATEGORIES,
                id
            ),
            {
                name,
                image,
                updatedAt: serverTimestamp(),
            }
        );

        return 'UPDATED';
    }

    const newOrder =
        categories.length > 0
            ? Math.max(
                  ...categories.map((category) => Number(category.order) || 0)
              ) + 1
            : 0;

    const restaurantReference = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);

    const categoryReference = doc(
        collection(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES
        )
    );

    const batch = writeBatch(db);

    batch.set(categoryReference, {
        name,
        image,
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

    return 'CREATED';
};
