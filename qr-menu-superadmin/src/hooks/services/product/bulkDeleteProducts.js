import {doc, runTransaction, serverTimestamp} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const bulkDeleteProductsService = async (
    restaurantId,
    selectedProducts
) => {
    const restaurantReference = doc(db, COLLECTIONS.RESTAURANTS, restaurantId);

    const productReferences = selectedProducts.map((productId) =>
        doc(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.MENU,
            productId
        )
    );

    const deletedProductCount = await runTransaction(
        db,
        async (transaction) => {
            const productSnapshots = [];

            for (const productReference of productReferences) {
                const productSnapshot = await transaction.get(productReference);
                productSnapshots.push(productSnapshot);
            }

            const restaurantSnapshot =
                await transaction.get(restaurantReference);

            if (!restaurantSnapshot.exists()) {
                throw new Error('Restoran bulunamadı.');
            }

            const existingProducts = productSnapshots.filter(
                (productSnapshot) => productSnapshot.exists()
            );

            if (existingProducts.length === 0) {
                return 0;
            }

            const currentProductCount = Number(
                restaurantSnapshot.data().productCount || 0
            );

            existingProducts.forEach((productSnapshot) => {
                transaction.delete(productSnapshot.ref);
            });

            transaction.update(restaurantReference, {
                productCount: Math.max(
                    0,
                    currentProductCount - existingProducts.length
                ),
                updatedAt: serverTimestamp(),
            });

            return existingProducts.length;
        }
    );

    return deletedProductCount;
};
