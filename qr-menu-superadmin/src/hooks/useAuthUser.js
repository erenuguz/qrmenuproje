import {useEffect, useRef, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {auth, db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';
import {SUPER_ADMIN_EMAIL} from '@/constants/auth';

export const useAuthUser = () => {
    const [user, setUser] = useState(null);
    const [restaurantId, setRestaurantId] = useState(null);
    const [loading, setLoading] = useState(true);

    const requestIdRef = useRef(0);

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            const currentRequestId = ++requestIdRef.current;

            if (!isMounted) return;

            setLoading(true);
            setUser(authUser);
            setRestaurantId(null);

            if (!authUser || authUser.email === SUPER_ADMIN_EMAIL) {
                if (isMounted && currentRequestId === requestIdRef.current) {
                    setLoading(false);
                }

                return;
            }

            try {
                const restaurantQuery = query(
                    collection(db, COLLECTIONS.RESTAURANTS),
                    where('userId', '==', authUser.uid)
                );

                const querySnapshot = await getDocs(restaurantQuery);

                const isCurrentRequest =
                    currentRequestId === requestIdRef.current;

                if (!isMounted || !isCurrentRequest) return;

                if (!querySnapshot.empty) {
                    setRestaurantId(querySnapshot.docs[0].id);
                }
            } catch (error) {
                const isCurrentRequest =
                    currentRequestId === requestIdRef.current;

                if (isMounted && isCurrentRequest) {
                    console.error(
                        "Restoran ID'si bulunurken hata oluştu:",
                        error
                    );
                }
            } finally {
                const isCurrentRequest =
                    currentRequestId === requestIdRef.current;

                if (isMounted && isCurrentRequest) {
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false;
            requestIdRef.current += 1;
            unsubscribe();
        };
    }, []);

    const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;

    return {
        user,
        restaurantId,
        loading,
        isSuperAdmin,
    };
};
