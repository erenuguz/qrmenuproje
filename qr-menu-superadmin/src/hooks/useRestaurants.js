import {useState, useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'restaurants'), (snapshot) => {
            const list = snapshot.docs
                .map((doc) => ({id: doc.id, ...doc.data()}))
                .filter((res) => res.id !== TEMPLATE_ID);

            setRestaurants(list);

            // ✅ Fonksiyonel update: closure değil, anlık state'i okur
            setSelectedRestaurantId((current) => current || list[0]?.id || '');

            setLoading(false);
        });

        return () => unsub();
    }, []);

    return {
        restaurants,
        loading,
        selectedRestaurantId,
        setSelectedRestaurantId,
    };
};
