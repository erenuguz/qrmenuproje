import {useEffect, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

const INITIAL_STATE = {
    restaurantId: null,
    categories: [],
    error: null,
};

export const useCategories = (restaurantId) => {
    const [snapshotState, setSnapshotState] = useState(INITIAL_STATE);

    useEffect(() => {
        if (!restaurantId) {
            return undefined;
        }

        const categoriesQuery = query(
            collection(
                db,
                COLLECTIONS.RESTAURANTS,
                restaurantId,
                COLLECTIONS.CATEGORIES
            ),
            orderBy('order', 'asc')
        );

        const unsubscribe = onSnapshot(
            categoriesQuery,

            (snapshot) => {
                const categories = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));

                setSnapshotState({
                    restaurantId,
                    categories,
                    error: null,
                });
            },

            (snapshotError) => {
                console.error('Kategoriler alınamadı:', snapshotError);

                setSnapshotState({
                    restaurantId,
                    categories: [],
                    error: snapshotError,
                });
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    const belongsToCurrentRestaurant =
        snapshotState.restaurantId === restaurantId;

    return {
        categories: belongsToCurrentRestaurant ? snapshotState.categories : [],
        loading: Boolean(restaurantId) && !belongsToCurrentRestaurant,
        error: belongsToCurrentRestaurant ? snapshotState.error : null,
    };
};
