import {
    collection,
    doc,
    getDoc,
    writeBatch,
    serverTimestamp,
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendPasswordResetEmail,
} from 'firebase/auth';
import {auth, db, secondaryAuth} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';
import {getValidatedTemplate} from './restaurantTemplate';

const createTemporaryPassword = () => {
    const randomPart = crypto.randomUUID().replaceAll('-', '').slice(0, 16);
    return `${randomPart}Aa1!`;
};

export const createRestaurantService = async ({
    cleanId,
    cleanName,
    cleanEmail,
}) => {
    const newRestaurantReference = doc(db, COLLECTIONS.RESTAURANTS, cleanId);
    const existingRestaurantSnapshot = await getDoc(newRestaurantReference);

    if (existingRestaurantSnapshot.exists()) {
        throw new Error(`"${cleanId}" sistem ID'si zaten kullanılıyor.`);
    }

    const {templateData, templateCategoriesSnapshot, templateMenuSnapshot} =
        await getValidatedTemplate();

    const temporaryPassword = createTemporaryPassword();
    let createdUser;

    const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        cleanEmail,
        temporaryPassword
    );
    createdUser = userCredential.user;

    const batch = writeBatch(db);
    const categoryIdMap = {};

    templateCategoriesSnapshot.forEach((categoryDocument) => {
        const newCategoryReference = doc(
            collection(
                db,
                COLLECTIONS.RESTAURANTS,
                cleanId,
                COLLECTIONS.CATEGORIES
            )
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
            COLLECTIONS.RESTAURANTS,
            cleanId,
            COLLECTIONS.CATEGORIES,
            newCategoryId
        );

        batch.set(newCategoryReference, {
            name: String(templateCategoryData.name ?? '').trim(),
            image: templateCategoryData.image ?? '',
            order: Number(templateCategoryData.order) || 0,
            isInactive: templateCategoryData.isInactive === true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    });

    templateMenuSnapshot.forEach((menuItemDocument) => {
        const oldItem = menuItemDocument.data();
        const oldCategoryId = String(oldItem.categoryId || '').trim();
        const newCategoryId = categoryIdMap[oldCategoryId];

        if (!newCategoryId) {
            throw new Error(
                `"${oldItem.name || menuItemDocument.id}" ürününün kategorisi bulunamadı.`
            );
        }

        const newMenuItemReference = doc(
            collection(db, COLLECTIONS.RESTAURANTS, cleanId, COLLECTIONS.MENU)
        );

        batch.set(newMenuItemReference, {
            name: String(oldItem.name ?? '').trim(),
            description: String(oldItem.description ?? '').trim(),
            price: Number(oldItem.price) || 0,
            image: oldItem.image ?? '',
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
                console.error('Auth rollback sırasında hata:', rollbackError);
            }
        }
        throw firestoreError;
    }

    let emailSent = true;
    try {
        await sendPasswordResetEmail(auth, cleanEmail);
    } catch (emailError) {
        console.error('Davet e-postası gönderilemedi:', emailError);
        emailSent = false;
    }

    return {emailSent};
};
