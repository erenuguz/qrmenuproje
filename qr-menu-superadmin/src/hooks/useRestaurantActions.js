import {useState} from 'react';
import {
    collection,
    doc,
    deleteDoc,
    getDoc,
    getDocs,
    writeBatch,
    serverTimestamp,
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendPasswordResetEmail,
} from 'firebase/auth';
import {auth, db, secondaryAuth} from '@/firebaseConfig';
import {useToast} from '@/hooks/useToast';

const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';
const FIRESTORE_BATCH_LIMIT = 400;

const createTemporaryPassword = () => {
    const randomPart = crypto.randomUUID().replaceAll('-', '').slice(0, 16);

    return `${randomPart}Aa1!`;
};

const deleteDocumentsInChunks = async (documents) => {
    for (
        let index = 0;
        index < documents.length;
        index += FIRESTORE_BATCH_LIMIT
    ) {
        const documentChunk = documents.slice(
            index,
            index + FIRESTORE_BATCH_LIMIT
        );

        const batch = writeBatch(db);

        documentChunk.forEach((documentSnapshot) => {
            batch.delete(documentSnapshot.ref);
        });

        await batch.commit();
    }
};

export const useRestaurantActions = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const addRestaurant = async (newId, newName, newEmail, onSuccess) => {
        const cleanId = String(newId || '')
            .trim()
            .toLowerCase();
        const cleanName = String(newName || '').trim();
        const cleanEmail = String(newEmail || '')
            .trim()
            .toLowerCase();

        if (!cleanId || !cleanName || !cleanEmail) {
            toast.error('Tüm alanları doldurun!');
            return;
        }

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanId)) {
            toast.error(
                'Sistem ID yalnızca küçük harf, rakam ve tire içerebilir.'
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            toast.error('Geçerli bir e-posta adresi girin.');
            return;
        }

        const confirmed = window.confirm(
            `"${cleanName}" oluşturulup ${cleanEmail} adresine davet gönderilecek. Onaylıyor musunuz?`
        );

        if (!confirmed) return;

        let createdUser;

        try {
            setIsProcessing(true);

            const templateReference = doc(db, 'restaurants', TEMPLATE_ID);

            const newRestaurantReference = doc(db, 'restaurants', cleanId);

            const [
                templateSnapshot,
                existingRestaurantSnapshot,
                templateCategoriesSnapshot,
                templateMenuSnapshot,
            ] = await Promise.all([
                getDoc(templateReference),

                getDoc(newRestaurantReference),

                getDocs(
                    collection(db, 'restaurants', TEMPLATE_ID, 'categories')
                ),

                getDocs(collection(db, 'restaurants', TEMPLATE_ID, 'menu')),
            ]);

            if (!templateSnapshot.exists()) {
                throw new Error('Taslak restoran bulunamadı.');
            }

            if (existingRestaurantSnapshot.exists()) {
                throw new Error(
                    `"${cleanId}" sistem ID'si zaten kullanılıyor.`
                );
            }

            const totalWriteCount =
                1 + templateCategoriesSnapshot.size + templateMenuSnapshot.size;

            if (totalWriteCount > 500) {
                throw new Error(
                    'Taslak restoran 500 işlem sınırını aşıyor. Restoran oluşturma işlemi backend üzerinden yapılmalı.'
                );
            }

            const templateCategoryIds = new Set(
                templateCategoriesSnapshot.docs.map(
                    (categoryDocument) => categoryDocument.id
                )
            );

            const invalidTemplateProduct = templateMenuSnapshot.docs.find(
                (menuDocument) => {
                    const menuData = menuDocument.data();

                    const categoryId =
                        menuData.categoryId || menuData.kategoriId || '';

                    return !categoryId || !templateCategoryIds.has(categoryId);
                }
            );

            if (invalidTemplateProduct) {
                const productName =
                    invalidTemplateProduct.data().name ||
                    invalidTemplateProduct.id;

                throw new Error(
                    `"${productName}" isimli taslak ürün geçerli bir kategoriye bağlı değil. Restoran oluşturulmadı.`
                );
            }

            const temporaryPassword = createTemporaryPassword();

            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                cleanEmail,
                temporaryPassword
            );

            createdUser = userCredential.user;

            const templateData = {
                ...templateSnapshot.data(),
            };

            delete templateData.status;
            delete templateData.adminEmail;
            delete templateData.userId;
            delete templateData.productCount;
            delete templateData.categoryCount;
            delete templateData.createdAt;
            delete templateData.updatedAt;

            const batch = writeBatch(db);
            const categoryIdMap = {};

            templateCategoriesSnapshot.forEach((categoryDocument) => {
                const newCategoryReference = doc(
                    collection(db, 'restaurants', cleanId, 'categories')
                );

                categoryIdMap[categoryDocument.id] = newCategoryReference.id;
            });

            batch.set(newRestaurantReference, {
                ...templateData,
                name: cleanName,
                adminEmail: cleanEmail,
                userId: createdUser.uid,
                isInactive: false,

                productCount: templateMenuSnapshot.size,
                categoryCount: templateCategoriesSnapshot.size,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            templateCategoriesSnapshot.forEach((categoryDocument) => {
                const templateCategoryData = categoryDocument.data();

                const newCategoryId = categoryIdMap[categoryDocument.id];

                const newCategoryReference = doc(
                    db,
                    'restaurants',
                    cleanId,
                    'categories',
                    newCategoryId
                );

                batch.set(newCategoryReference, {
                    ...templateCategoryData,
                    isInactive: templateCategoryData.isInactive ?? false,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            });

            templateMenuSnapshot.forEach((menuItemDocument) => {
                const oldItem = menuItemDocument.data();

                const oldCategoryId =
                    oldItem.categoryId || oldItem.kategoriId || '';

                const menuItemData = {
                    ...oldItem,
                };

                delete menuItemData.categoryId;
                delete menuItemData.kategoriId;
                delete menuItemData.createdAt;
                delete menuItemData.updatedAt;

                const newCategoryId = categoryIdMap[oldCategoryId];

                const newMenuItemReference = doc(
                    collection(db, 'restaurants', cleanId, 'menu')
                );

                batch.set(newMenuItemReference, {
                    ...menuItemData,
                    categoryId: newCategoryId,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            });

            try {
                await batch.commit();
            } catch (firestoreError) {
                if (createdUser) {
                    try {
                        await deleteUser(createdUser);
                    } catch (rollbackError) {
                        console.error(
                            'Auth rollback sırasında hata:',
                            rollbackError
                        );
                    }
                }

                throw firestoreError;
            }

            try {
                await sendPasswordResetEmail(auth, cleanEmail);

                toast.success(
                    'Restoran oluşturuldu ve davet e-postası gönderildi!'
                );
            } catch (emailError) {
                console.error('Davet e-postası gönderilemedi:', emailError);

                toast.info(
                    'Restoran oluşturuldu fakat davet e-postası gönderilemedi. Şifre sıfırlama e-postasını daha sonra tekrar gönderebilirsiniz.'
                );
            }

            onSuccess?.();
        } catch (error) {
            console.error('Restoran oluşturma hatası:', error);

            toast.error(
                error?.message
                    ? `Hata: ${error.message}`
                    : 'Restoran oluşturulamadı.'
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteRestaurant = async (id, name) => {
        const cleanId = String(id || '').trim();

        if (!cleanId) {
            toast.error('Silinecek restoran ID’si bulunamadı.');
            return;
        }

        if (cleanId === TEMPLATE_ID) {
            toast.error('Taslak restoran silinemez.');
            return;
        }

        const confirmed = window.confirm(
            `DİKKAT: "${name}" ve bütün menü verileri tamamen silinecek! Onaylıyor musunuz?`
        );

        if (!confirmed) return;

        try {
            setIsProcessing(true);

            const restaurantReference = doc(db, 'restaurants', cleanId);

            const categoriesReference = collection(
                db,
                'restaurants',
                cleanId,
                'categories'
            );

            const menuReference = collection(
                db,
                'restaurants',
                cleanId,
                'menu'
            );

            const [categoriesSnapshot, menuSnapshot] = await Promise.all([
                getDocs(categoriesReference),
                getDocs(menuReference),
            ]);

            // Alt koleksiyonlar önce silinir.
            await deleteDocumentsInChunks([
                ...categoriesSnapshot.docs,
                ...menuSnapshot.docs,
            ]);

            // Ana restoran belgesi en son silinir.
            await deleteDoc(restaurantReference);

            toast.success(`"${name}" tamamen silindi.`);
        } catch (error) {
            console.error('Restoran silme hatası:', error);

            toast.error(
                error?.message
                    ? `Silme hatası: ${error.message}`
                    : 'Restoran silinemedi.'
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        addRestaurant,
        deleteRestaurant,
        isProcessing,
    };
};
