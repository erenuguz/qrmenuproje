import {useState, useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'restaurants'),
            (snapshot) => {
                const list = snapshot.docs
                    .map((document) => ({
                        id: document.id,
                        ...document.data(),
                    }))
                    .filter((restaurant) => restaurant.id !== TEMPLATE_ID);

                setRestaurants(list);

                setSelectedRestaurantId((currentId) => {
                    const stillExists = list.some(
                        (restaurant) => restaurant.id === currentId
                    );

                    return stillExists ? currentId : list[0]?.id || '';
                });

                setLoading(false);
            },
            (snapshotError) => {
                console.error('Restoranlar alınamadı:', snapshotError);
                setRestaurants([]);
                setError(snapshotError);
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    return {
        restaurants,
        loading,
        selectedRestaurantId,
        setSelectedRestaurantId,
        error,
    };
};
