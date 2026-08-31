import {useMemo} from 'react';

export const useMenuIndex = (menu = [], categories = []) => {
    return useMemo(() => {
        const productsByCategory = new Map();
        const categoryNameById = new Map();

        menu.forEach((product) => {
            const categoryId = product.categoryId;

            if (!productsByCategory.has(categoryId)) {
                productsByCategory.set(categoryId, []);
            }

            productsByCategory.get(categoryId).push(product);
        });

        categories.forEach((category) => {
            categoryNameById.set(category.id, category.name);
        });

        return {
            productsByCategory,
            categoryNameById,
        };
    }, [menu, categories]);
};
