import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';

export const useAuthUser = () => {
 
    const [kullanici, setKullanici] = useState(null);
    const [restoranId, setRestoranId] = useState(null);
    const [yukleniyor, setYukleniyor] = useState(true);


    useEffect(() => {
            const unsub = onAuthStateChanged(auth, async (user) => {
                setKullanici(user);

                if (!user) {
                    setRestoranId(null);
                } else if (user.email === 'erenuguz301@gmail.com') {
                    setRestoranId(null);
                } else {
                    setRestoranId(null);
                    try {
                        const q = query(
                            collection(db, 'restaurants'),
                            where('userId', '==', user.uid)
                        );
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            setRestoranId(querySnapshot.docs[0].id);
                        }
                    } catch (error) {
                        console.error(
                            "Restoran ID'si bulunurken hata oluştu:",
                            error
                        );
                    }
                }

                setYukleniyor(false);
            });
    
            return () => unsub();
        }, []);

    return { kullanici, restoranId, yukleniyor };
};