export const validateProductForm = (activeForm, isImageLoading) => {
    if (isImageLoading) {
        throw new Error('IMAGE_LOADING');
    }

    const trimmedName = String(activeForm?.name || '').trim();
    const trimmedDescription = String(activeForm?.description || '').trim();
    const categoryId = String(activeForm?.categoryId || '').trim();
    const rawPrice = String(activeForm?.price ?? '').trim();
    const rawCalories = String(activeForm?.calories ?? '').trim();

    if (!trimmedName || !rawPrice || !categoryId) {
        throw new Error('MISSING_FIELDS');
    }

    const numericPrice = Number(rawPrice);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        throw new Error('INVALID_PRICE');
    }

    const numericCalories = rawCalories === '' ? null : Number(rawCalories);

    if (
        rawCalories !== '' &&
        (!Number.isInteger(numericCalories) || numericCalories < 0)
    ) {
        throw new Error('INVALID_CALORIES');
    }

    return {
        name: trimmedName,
        categoryId,
        image:
            activeForm.image ||
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
        price: numericPrice,
        calories: numericCalories,
        description: trimmedDescription,
    };
};
