import {useState, useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

const TASLAK_ID = 'DyY8GVi99ZAiwNCA7RXp';

export const useRestaurants = () => {
    const [restoranlar, setRestoranlar] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [seciliRestoranId, setSeciliRestoranId] = useState('');

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'restaurants'), (snapshot) => {
            const liste = snapshot.docs
                .map((doc) => ({id: doc.id, ...doc.data()}))
                .filter((res) => res.id !== TASLAK_ID);

            setRestoranlar(liste);

            // ✅ Fonksiyonel update: closure değil, anlık state'i okur
            setSeciliRestoranId((mevcut) => mevcut || liste[0]?.id || '');

            setYukleniyor(false);
        });

        return () => unsub();
    }, []);

    return {restoranlar, yukleniyor, seciliRestoranId, setSeciliRestoranId};
};