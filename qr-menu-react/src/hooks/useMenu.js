import {useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

const INITIAL_STATE = {
    restaurantId: null,
    menu: [],
    error: null,
};

export const useMenu = (restaurantId) => {
    const [snapshotState, setSnapshotState] = useState(INITIAL_STATE);

    useEffect(() => {
        if (!restaurantId) {
            return undefined;
        }

        const menuReference = collection(
            db,
            COLLECTIONS.RESTAURANTS,
            restaurantId,
            COLLECTIONS.MENU
        );

        const unsubscribe = onSnapshot(
            menuReference,

            (snapshot) => {
                const menu = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));

                setSnapshotState({
                    restaurantId,
                    menu,
                    error: null,
                });
            },

            (snapshotError) => {
                console.error('Menü alınamadı:', snapshotError);

                setSnapshotState({
                    restaurantId,
                    menu: [],
                    error: snapshotError,
                });
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    const belongsToCurrentRestaurant =
        snapshotState.restaurantId === restaurantId;

    return {
        menu: belongsToCurrentRestaurant ? snapshotState.menu : [],

        loading: Boolean(restaurantId) && !belongsToCurrentRestaurant,

        error: belongsToCurrentRestaurant ? snapshotState.error : null,
    };
};
