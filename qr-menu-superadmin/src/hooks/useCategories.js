import {useState, useEffect} from 'react';
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useCategories = (restaurantId) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!restaurantId) {
            setCategories([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'restaurants', restaurantId, 'categories'),
            orderBy('order', 'asc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(data);
            setLoading(false);
        });

        return () => unsub();
    }, [restaurantId]);

    return {categories, loading};
};
