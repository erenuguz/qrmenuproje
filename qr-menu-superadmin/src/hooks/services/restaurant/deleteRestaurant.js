import {collection, doc, getDoc, getDocs, writeBatch} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const deleteRestaurantService = async (cleanId) => {
    const restaurantReference = doc(db, COLLECTIONS.RESTAURANTS, cleanId);
    const categoriesReference = collection(
        db,
        COLLECTIONS.RESTAURANTS,
        cleanId,
        COLLECTIONS.CATEGORIES
    );
    const menuReference = collection(
        db,
        COLLECTIONS.RESTAURANTS,
        cleanId,
        COLLECTIONS.MENU
    );

    const [restaurantSnapshot, categoriesSnapshot, menuSnapshot] =
        await Promise.all([
            getDoc(restaurantReference),
            getDocs(categoriesReference),
            getDocs(menuReference),
        ]);

    if (!restaurantSnapshot.exists()) {
        return false; // Zaten silinmiş
    }

    const totalDeleteCount = categoriesSnapshot.size + menuSnapshot.size + 1;

    if (totalDeleteCount > 500) {
        throw new Error(
            `Bu restoran toplam ${totalDeleteCount} belge içeriyor. ` +
                'Firestore tek batch sınırı 500 belgedir. ' +
                'Veri kaybını önlemek için silme işlemi başlatılmadı.'
        );
    }

    const batch = writeBatch(db);

    categoriesSnapshot.docs.forEach((categoryDocument) => {
        batch.delete(categoryDocument.ref);
    });

    menuSnapshot.docs.forEach((productDocument) => {
        batch.delete(productDocument.ref);
    });

    batch.delete(restaurantReference);

    await batch.commit();

    return true;
};
