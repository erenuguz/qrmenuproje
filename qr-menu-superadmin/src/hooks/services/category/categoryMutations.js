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

export const addCategoryService = async (restaurantId, categories, newName) => {
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
        throw new Error('ALREADY_EXISTS');
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
};

export const updateCategoryNameService = async (
    restaurantId,
    categories,
    id,
    oldName,
    newName
) => {
    const trimmedName = String(newName ?? '').trim();
    const trimmedOldName = String(oldName ?? '').trim();

    if (!trimmedName || trimmedOldName === trimmedName) return false;

    const normalizedName = trimmedName.toLocaleLowerCase('tr-TR');
    const alreadyExists = categories.some(
        (category) =>
            category.id !== id &&
            String(category.name ?? '')
                .trim()
                .toLocaleLowerCase('tr-TR') === normalizedName
    );

    if (alreadyExists) {
        throw new Error('ALREADY_EXISTS');
    }

    await updateDoc(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            id
        ),
        {
            name: trimmedName,
            updatedAt: serverTimestamp(),
        }
    );

    return true;
};

export const updateImageService = async (restaurantId, id, url) => {
    await updateDoc(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            id
        ),
        {
            image: url,
            updatedAt: serverTimestamp(),
        }
    );
    return true;
};
