import {useState, useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useMenu = (restaurantId) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!restaurantId) {
            setLoading(false);
            return;
        }

        const unsubMenu = onSnapshot(
            collection(db, 'restaurants', restaurantId, 'menu'),
            (snapshot) => {
                setMenu(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
                setLoading(false);
            }
        );

        return () => unsubMenu();
    }, [restaurantId]);

    return {menu, loading};
};
