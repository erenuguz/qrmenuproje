export const validateProductForm = (activeForm, isImageLoading) => {
    if (isImageLoading) {
        throw new Error('IMAGE_LOADING');
    }

    const trimmedName = String(activeForm?.name || '').trim();
    const trimmedDescription = String(activeForm?.description || '').trim();
    const categoryId = String(activeForm?.categoryId || '').trim();
    const rawPrice = String(activeForm?.price ?? '').trim();

    if (!trimmedName || !rawPrice || !categoryId) {
        throw new Error('MISSING_FIELDS');
    }

    const numericPrice = Number(rawPrice);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        throw new Error('INVALID_PRICE');
    }

    return {
        name: trimmedName,
        categoryId,
        image:
            activeForm.image ||
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
        price: numericPrice,
        description: trimmedDescription,
    };
};
