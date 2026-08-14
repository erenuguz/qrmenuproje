import {useState, useEffect} from 'react';
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

export const useCategories = (restoranId) => {
    const [kategoriler, setKategoriler] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);

    useEffect(() => {
        if (!restoranId) {
            setKategoriler([]);
            setYukleniyor(false);
            return;
        }

        const q = query(
            collection(db, 'restaurants', restoranId, 'categories'),
            orderBy('sira', 'asc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const veriler = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setKategoriler(veriler);
            setYukleniyor(false);
        });

        return () => unsub();
    }, [restoranId]);

    return {kategoriler, yukleniyor};
};
