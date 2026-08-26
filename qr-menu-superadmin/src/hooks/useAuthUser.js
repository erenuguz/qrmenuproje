import {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {auth, db} from '@/firebaseConfig';

export const useAuthUser = () => {
    const [user, setUser] = useState(null);
    const [restaurantId, setRestaurantId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);

            if (!authUser) {
                setRestaurantId(null);
            } else if (authUser.email === 'erenuguz301@gmail.com') {
                setRestaurantId(null);
            } else {
                setRestaurantId(null);
                try {
                    const q = query(
                        collection(db, 'restaurants'),
                        where('userId', '==', authUser.uid)
                    );
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        setRestaurantId(querySnapshot.docs[0].id);
                    }
                } catch (error) {
                    console.error(
                        "Restoran ID'si bulunurken hata oluştu:",
                        error
                    );
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return {user, restaurantId, loading};
};
