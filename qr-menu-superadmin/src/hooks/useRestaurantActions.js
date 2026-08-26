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
    const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const addRestaurant = async (newId, newName, newEmail, onSuccess) => {
        if (!newId || !newName || !newEmail)
            return toast.error('Tüm alanları doldurun!');

        const cleanId = newId.trim().toLowerCase();
        const cleanEmail = newEmail.trim().toLowerCase();

        if (
            !window.confirm(
                `"${newName}" oluşturulup ${cleanEmail} adresine davet gönderilecek. Onaylıyor musunuz?`
            )
        )
            return;

        let createdUser = null;

        try {
            setIsProcessing(true);

            // 1. Taslak var mı kontrol et
            const templateRef = doc(db, 'restaurants', TEMPLATE_ID);
            const templateSnap = await getDoc(templateRef);

            if (!templateSnap.exists())
                throw new Error("'taslak_isletme' isimli taslak bulunamadı!");

            // 2. ÖNCE Auth kullanıcısını oluştur
            const tempPassword = Math.random().toString(36).slice(-10) + 'A1!';
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                cleanEmail,
                tempPassword
            );
            createdUser = userCredential.user;

            // 3. Firestore Batch işlemlerini ve Rollback mekanizmasını kur
            try {
                const newRestaurantRef = doc(db, 'restaurants', cleanId);
                const batch = writeBatch(db);

                // Restoranı atomik olarak userId ile birlikte oluştur
                batch.set(newRestaurantRef, {
                    ...templateSnap.data(),
                    name: newName,
                    admin_email: cleanEmail,
                    userId: createdUser.uid,
                    isInactive: false,
                });

                // Kategorileri kopyala
                const categoryIdMap = {};
                const templateCategoriesSnap = await getDocs(
                    collection(db, 'restaurants', TEMPLATE_ID, 'categories')
                );
                templateCategoriesSnap.forEach((categoryDoc) => {
                    const oldCategory = categoryDoc.data();
                    const newCategoryRef = doc(
                        collection(db, 'restaurants', cleanId, 'categories')
                    );
                    categoryIdMap[categoryDoc.id] = newCategoryRef.id;
                    batch.set(newCategoryRef, {
                        ...oldCategory,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                });

                // Menüyü kopyala
                const templateMenuSnap = await getDocs(
                    collection(db, 'restaurants', TEMPLATE_ID, 'menu')
                );
                templateMenuSnap.forEach((menuItemDoc) => {
                    const oldItem = menuItemDoc.data();
                    const newItemRef = doc(
                        collection(db, 'restaurants', cleanId, 'menu')
                    );

                    // Eski Türkçe alan adı yerine İngilizce categoryId kullanılıyor
                    const oldCategoryId =
                        oldItem.categoryId || oldItem.kategoriId || '';
                    const newLinkedCategoryId =
                        categoryIdMap[oldCategoryId] || '';

                    batch.set(newItemRef, {
                        ...oldItem,
                        categoryId: newLinkedCategoryId,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    });
                });

                // Batch'i commit et (Restoran + Kategoriler + Menü tek seferde yazılır)
                await batch.commit();

                // 4. Şifre sıfırlama e-postasını gönder
                await sendPasswordResetEmail(auth, cleanEmail);

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
            setIsProcessing(false);
        }
    };

    const deleteRestaurant = async (id, name) => {
        if (
            !window.confirm(
                `DİKKAT: "${name}" tamamen silinecek! Onaylıyor musunuz?`
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
            toast.success(`"${name}" başarıyla silindi.`);
        } catch (error) {
            console.error('Silme hatası:', error);
            toast.error('Silinirken hata oluştu.');
        }
    };

    return {addRestaurant, deleteRestaurant, isProcessing};
};
