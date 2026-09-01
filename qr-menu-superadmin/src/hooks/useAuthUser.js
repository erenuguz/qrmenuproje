import {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {auth, db} from '@/firebaseConfig';

export const useAuthUser = () => {
    const [user, setUser] = useState(null);
    const [restaurantId, setRestaurantId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (!isMounted) return;
            setUser(authUser);

            if (!authUser) {
                if (isMounted) setRestaurantId(null);
            } else if (authUser.email === 'erenuguz301@gmail.com') {
                if (isMounted) setRestaurantId(null);
            } else {
                if (isMounted) setRestaurantId(null);
                try {
                    const q = query(
                        collection(db, 'restaurants'),
                        where('userId', '==', authUser.uid)
                    );
                    const querySnapshot = await getDocs(q);

                    if (isMounted && !querySnapshot.empty) {
                        setRestaurantId(querySnapshot.docs[0].id);
                    }
                } catch (error) {
                    console.error(
                        "Restoran ID'si bulunurken hata oluştu:",
                        error
                    );
                }
            }

            if (isMounted) {
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    return {user, restaurantId, loading};
};
