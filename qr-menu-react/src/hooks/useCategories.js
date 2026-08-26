import {useEffect, useState} from 'react';
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useCategories = (restaurantId) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCategories([]);
        setError(null);

        if (!restaurantId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const categoriesQuery = query(
            collection(db, 'restaurants', restaurantId, 'categories'),
            orderBy('order', 'asc')
        );

        const unsubscribe = onSnapshot(
            categoriesQuery,
            (snapshot) => {
                setCategories(
                    snapshot.docs.map((document) => ({
                        id: document.id,
                        ...document.data(),
                    }))
                );
                setLoading(false);
            },
            (snapshotError) => {
                console.error('Kategoriler alınamadı:', snapshotError);
                setCategories([]);
                setError(snapshotError);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    return {categories, loading, error};
};
