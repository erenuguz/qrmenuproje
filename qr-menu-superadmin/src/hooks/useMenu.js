import {useState, useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useMenu = (restoranId) => {
    const [menu, setMenu] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);

    useEffect(() => {
        if (!restoranId) {
            setYukleniyor(false);
            return;
        }

        const unsubMenu = onSnapshot(
            collection(db, 'restaurants', restoranId, 'menu'),
            (snapshot) => {
                setMenu(
                    snapshot.docs.map((belge) => ({
                        id: belge.id,
                        ...belge.data(),
                    }))
                );
                setYukleniyor(false);
            }
        );

        return () => unsubMenu();
    }, [restoranId]);

    return {menu, yukleniyor};
};
