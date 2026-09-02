import {doc, writeBatch} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const moveCategoryUpService = async (
    restaurantId,
    categories,
    index
) => {
    if (index === 0) return false;

    const activeCategory = categories[index];
    const upperCategory = categories[index - 1];

    const batch = writeBatch(db);
    batch.update(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            activeCategory.id
        ),
        {
            order: upperCategory.order,
        }
    );
    batch.update(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            upperCategory.id
        ),
        {
            order: activeCategory.order,
        }
    );

    await batch.commit();
    return true;
};

export const moveCategoryDownService = async (
    restaurantId,
    categories,
    index
) => {
    if (index === categories.length - 1) return false;

    const activeCategory = categories[index];
    const lowerCategory = categories[index + 1];

    const batch = writeBatch(db);
    batch.update(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            activeCategory.id
        ),
        {
            order: lowerCategory.order,
        }
    );
    batch.update(
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.CATEGORIES,
            lowerCategory.id
        ),
        {
            order: activeCategory.order,
        }
    );

    await batch.commit();
    return true;
};
