import {useEffect, useState} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useRestaurantDoc = (restaurantId) => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setRestaurantData(null);

        if (!restaurantId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(
            doc(db, 'restaurants', restaurantId),
            (documentSnapshot) => {
                setRestaurantData(
                    documentSnapshot.exists() ? documentSnapshot.data() : null
                );
                setLoading(false);
            },
            (snapshotError) => {
                console.error('Restoran verisi alınamadı:', snapshotError);
                setRestaurantData(null);
                setError(snapshotError);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    return {restaurantData, loading, error};
};
