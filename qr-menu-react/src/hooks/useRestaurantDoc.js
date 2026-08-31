import {useEffect, useState} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

const INITIAL_STATE = {
    restaurantId: null,
    restaurantData: null,
    error: null,
};

export const useRestaurantDoc = (restaurantId) => {
    const [snapshotState, setSnapshotState] = useState(INITIAL_STATE);

    useEffect(() => {
        if (!restaurantId) {
            return undefined;
        }

        const restaurantReference = doc(db, 'restaurants', restaurantId);

        const unsubscribe = onSnapshot(
            restaurantReference,

            (documentSnapshot) => {
                setSnapshotState({
                    restaurantId,

                    restaurantData: documentSnapshot.exists()
                        ? documentSnapshot.data()
                        : null,

                    error: null,
                });
            },

            (snapshotError) => {
                console.error('Restoran verisi alınamadı:', snapshotError);

                setSnapshotState({
                    restaurantId,
                    restaurantData: null,
                    error: snapshotError,
                });
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    const belongsToCurrentRestaurant =
        snapshotState.restaurantId === restaurantId;

    return {
        restaurantData: belongsToCurrentRestaurant
            ? snapshotState.restaurantData
            : null,

        loading: Boolean(restaurantId) && !belongsToCurrentRestaurant,

        error: belongsToCurrentRestaurant ? snapshotState.error : null,
    };
};
