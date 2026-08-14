import {useState, useEffect} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useRestaurantDoc = (restoranId) => {
    const [restoranData, setRestoranData] = useState(null);
    const [yukleniyor, setYukleniyor] = useState(true);

    useEffect(() => {
        if (!restoranId) {
            setYukleniyor(false);
            return;
        }

        const unsubRestoran = onSnapshot(
            doc(db, 'restaurants', restoranId),
            (docSnap) => {
                if (docSnap.exists()) {
                    setRestoranData(docSnap.data());
                } else {
                    setRestoranData(null);
                }
                setYukleniyor(false);
            }
        );

        return () => unsubRestoran();
    }, [restoranId]);

    return {restoranData, yukleniyor};
};
