import {useState} from 'react';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    writeBatch,
    serverTimestamp,
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import {auth, db, secondaryAuth} from '@/firebaseConfig';
import {useToast} from '@/hooks/useToast';

export const useRestaurantActions = () => {
    const TASLAK_ID = 'DyY8GVi99ZAiwNCA7RXp';
    const [islemYapiliyor, setIslemYapiliyor] = useState(false);
    const toast = useToast();

    const restoranEkle = async (yeniId, yeniAd, yeniEmail, onSuccess) => {
        if (!yeniId || !yeniAd || !yeniEmail)
            return toast.error('Tüm alanları doldurun!');

        const temizId = yeniId.trim().toLowerCase();
        const temizEmail = yeniEmail.trim().toLowerCase();

        if (
            !window.confirm(
                `"${yeniAd}" oluşturulup ${temizEmail} adresine davet gönderilecek. Onaylıyor musunuz?`
            )
        )
            return;

        let createdUser = null;

        try {
            setIslemYapiliyor(true);

            // 1. Taslak var mı kontrol et
            const taslakRef = doc(db, 'restaurants', TASLAK_ID);
            const taslakSnap = await getDoc(taslakRef);

            if (!taslakSnap.exists())
                throw new Error("'taslak_isletme' isimli taslak bulunamadı!");

            // 2. ÖNCE Auth kullanıcısını oluştur
            const geciciSifre = Math.random().toString(36).slice(-10) + 'A1!';
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                temizEmail,
                geciciSifre
            );
            createdUser = userCredential.user;

            // 3. Firestore Batch işlemlerini ve Rollback mekanizmasını kur
            try {
                const yeniRestoranRef = doc(db, 'restaurants', temizId);
                const batch = writeBatch(db);

                // Restoranı atomik olarak userId ile birlikte oluştur
                batch.set(yeniRestoranRef, {
                    ...taslakSnap.data(),
                    name: yeniAd,
                    admin_email: temizEmail,
                    userId: createdUser.uid, // <-- İlk anda doğru userId ile yazılıyor
                    durum: 'aktif',
                });

                // Kategorileri kopyala
                const categoryIdMap = {};
                const taslakCategoriesSnap = await getDocs(
                    collection(db, 'restaurants', TASLAK_ID, 'categories')
                );
                taslakCategoriesSnap.forEach((kategoriDoc) => {
                    const eskiKategori = kategoriDoc.data();
                    const yeniKategoriRef = doc(
                        collection(db, 'restaurants', temizId, 'categories')
                    );
                    categoryIdMap[kategoriDoc.id] = yeniKategoriRef.id;
                    batch.set(yeniKategoriRef, {
                        ...eskiKategori,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                });

                // Menüyü kopyala
                const taslakMenuSnap = await getDocs(
                    collection(db, 'restaurants', TASLAK_ID, 'menu')
                );
                taslakMenuSnap.forEach((menuUrunuDoc) => {
                    const eskiUrun = menuUrunuDoc.data();
                    const yeniUrunRef = doc(
                        collection(db, 'restaurants', temizId, 'menu')
                    );
                    const yeniBagliKategoriId =
                        categoryIdMap[eskiUrun.kategoriId] || '';
                    batch.set(yeniUrunRef, {
                        ...eskiUrun,
                        kategoriId: yeniBagliKategoriId,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                });

                // Batch'i commit et (Restoran + Kategoriler + Menü tek seferde yazılır)
                await batch.commit();

                // 4. Şifre sıfırlama e-postasını gönder
                await sendPasswordResetEmail(auth, temizEmail);

                toast.success(
                    'Restoran başarıyla oluşturuldu ve e-posta gönderildi!'
                );
                if (onSuccess) onSuccess();
            } catch (fsOrEmailError) {
                // Firestore veya E-posta adımında hata olursa Auth kullanıcısını sil (Rollback)
                if (createdUser) {
                    await createdUser
                        .delete()
                        .catch((delErr) =>
                            console.error(
                                'Auth rollback sırasında hata:',
                                delErr
                            )
                        );
                }
                throw fsOrEmailError;
            }
        } catch (error) {
            console.error('İşlem hatası:', error);
            toast.error('Hata oluştu: ' + error.message);
        } finally {
            setIslemYapiliyor(false);
        }
    };

    const restoranSil = async (id, ad) => {
        if (
            !window.confirm(
                `DİKKAT: "${ad}" tamamen silinecek! Onaylıyor musunuz?`
            )
        )
            return;

        try {
            const batch = writeBatch(db);
            const catSnap = await getDocs(
                collection(db, 'restaurants', id, 'categories')
            );
            catSnap.forEach((cDoc) => batch.delete(cDoc.ref));

            const menuSnap = await getDocs(
                collection(db, 'restaurants', id, 'menu')
            );
            menuSnap.forEach((mDoc) => batch.delete(mDoc.ref));

            batch.delete(doc(db, 'restaurants', id));
            await batch.commit();
            toast.success(`"${ad}" başarıyla silindi.`);
        } catch (error) {
            console.error('Silme hatası:', error);
            toast.error('Silinirken hata oluştu.');
        }
    };

    return {restoranEkle, restoranSil, islemYapiliyor};
};
