import {useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useMenu = (restaurantId) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setMenu([]);
        setError(null);

        if (!restaurantId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(
            collection(db, 'restaurants', restaurantId, 'menu'),
            (snapshot) => {
                setMenu(
                    snapshot.docs.map((document) => ({
                        id: document.id,
                        ...document.data(),
                    }))
                );
                setLoading(false);
            },
            (snapshotError) => {
                console.error('Menü alınamadı:', snapshotError);
                setMenu([]);
                setError(snapshotError);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [restaurantId]);

    return {menu, loading, error};
};
