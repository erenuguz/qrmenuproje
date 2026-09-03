import {useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, COLLECTIONS.RESTAURANTS),
            (snapshot) => {
                const restaurantList = snapshot.docs
                    .map((document) => ({
                        id: document.id,
                        ...document.data(),
                    }))
                    .filter((restaurant) => restaurant.id !== TEMPLATE_ID);

                setRestaurants(restaurantList);
                setError(null);
                setLoading(false);
            },
            (snapshotError) => {
                console.error('Restoranlar alınamadı:', snapshotError);

                setRestaurants([]);
                setError(snapshotError);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    return {
        restaurants,
        loading,
        error,
    };
};
