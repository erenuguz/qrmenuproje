import {useState, useEffect} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useRestaurantDoc = (restaurantId) => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!restaurantId) {
            setLoading(false);
            return;
        }

        const unsubRestaurant = onSnapshot(
            doc(db, 'restaurants', restaurantId),
            (docSnap) => {
                if (docSnap.exists()) {
                    setRestaurantData(docSnap.data());
                } else {
                    setRestaurantData(null);
                }
                setLoading(false);
            }
        );

        return () => unsubRestaurant();
    }, [restaurantId]);

    return {restaurantData, loading};
};
