import {collection, doc, getDoc, getDocs} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {COLLECTIONS} from '@/constants/firestore';

export const TEMPLATE_ID = 'DyY8GVi99ZAiwNCA7RXp';

export const getValidatedTemplate = async () => {
    const templateReference = doc(db, COLLECTIONS.RESTAURANTS, TEMPLATE_ID);
    const categoriesReference = collection(
        db,
        COLLECTIONS.RESTAURANTS,
        TEMPLATE_ID,
        COLLECTIONS.CATEGORIES
    );
    const menuReference = collection(
        db,
        COLLECTIONS.RESTAURANTS,
        TEMPLATE_ID,
        COLLECTIONS.MENU
    );

    const [templateSnapshot, templateCategoriesSnapshot, templateMenuSnapshot] =
        await Promise.all([
            getDoc(templateReference),
            getDocs(categoriesReference),
            getDocs(menuReference),
        ]);

    if (!templateSnapshot.exists()) {
        throw new Error('Taslak restoran bulunamadı.');
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
            const categoryId = String(menuData.categoryId || '').trim();

            return !categoryId || !templateCategoryIds.has(categoryId);
        }
    );

    if (invalidTemplateProduct) {
        const productName =
            invalidTemplateProduct.data().name || invalidTemplateProduct.id;
        throw new Error(
            `"${productName}" isimli taslak ürün geçerli bir kategoriye bağlı değil. Restoran oluşturulmadı.`
        );
    }

    const templateData = {...templateSnapshot.data()};

    delete templateData.status;
    delete templateData.adminEmail;
    delete templateData.userId;
    delete templateData.productCount;
    delete templateData.categoryCount;
    delete templateData.createdAt;
    delete templateData.updatedAt;

    return {
        templateData,
        templateCategoriesSnapshot,
        templateMenuSnapshot,
    };
};
