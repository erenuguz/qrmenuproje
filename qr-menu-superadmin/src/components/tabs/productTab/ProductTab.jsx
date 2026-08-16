import React, {useState, useMemo, useCallback} from 'react';
import {
    ProductHeader,
    RestaurantSelector,
    ProductFilters,
    ProductList,
    ProductForm,
    useProductActions,
    useCategories,
    useSearch,
} from '@/';

const ProductTab = ({
    restaurantId,
    menu = [],
    restaurants,
    selectedRestaurantId,
    setSelectedRestaurantId,
}) => {
    const [activeForm, setActiveForm] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Kategori filtresi state'i kalıyor (aramaMetni state'i useSearch'e devredildi)
    const [selectedCategoryFilter, setSelectedCategoryFilter] =
        useState('Hepsi');

    const {categories} = useCategories(restaurantId);
    const {deleteProduct, saveForm, bulkDeleteProducts} =
        useProductActions(restaurantId);

    // 2. Kategori filtresini useCallback ile sabitliyoruz
    const categoryFilter = useCallback(
        (product) =>
            selectedCategoryFilter === 'Hepsi' ||
            product.categoryId === selectedCategoryFilter,
        [selectedCategoryFilter]
    );

    // 3. useSearch Hook'unun Doğru Kullanımı
    const {
        searchQuery,
        setSearchQuery,
        filteredData: searchResults,
    } = useSearch(menu, ['name'], {extraFilter: categoryFilter});

    // Formu Kaydetme Handleri
    const handleSaveForm = () => {
        saveForm(activeForm, isImageLoading, () => {
            setActiveForm(null);
        });
    };

    // Toplu Silme Handleri
    const handleBulkDelete = () => {
        bulkDeleteProducts(selectedProducts, () => {
            setSelectedProducts([]);
            setIsBulkDeleteMode(false);
        });
    };

    // Seçim kutucuğu mantığı
    const handleProductSelectionChange = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(
                selectedProducts.filter((id) => id !== productId)
            );
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    // useMemo ile Gösterilecek Kategorileri Filtreleme
    const displayedCategories = useMemo(() => {
        return selectedCategoryFilter === 'Hepsi'
            ? categories
            : categories.filter((k) => k.id === selectedCategoryFilter);
    }, [categories, selectedCategoryFilter]);

    return (
        <div style={{backgroundColor: 'var(--background)'}}>
            {activeForm ? (
                <ProductForm
                    activeForm={activeForm}
                    setActiveForm={setActiveForm}
                    categories={categories}
                    isImageLoading={isImageLoading}
                    setIsImageLoading={setIsImageLoading}
                    saveForm={handleSaveForm}
                />
            ) : (
                <div>
                    <ProductHeader
                        isBulkDeleteMode={isBulkDeleteMode}
                        setIsBulkDeleteMode={setIsBulkDeleteMode}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        setActiveForm={setActiveForm}
                        categories={categories}
                        bulkDeleteProducts={handleBulkDelete}
                    />

                    {restaurants && (
                        <RestaurantSelector
                            restaurants={restaurants}
                            selectedRestaurantId={selectedRestaurantId}
                            setSelectedRestaurantId={setSelectedRestaurantId}
                            totalProducts={menu.length}
                        />
                    )}

                    <ProductFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategoryFilter={selectedCategoryFilter}
                        setSelectedCategoryFilter={setSelectedCategoryFilter}
                        categories={categories}
                    />

                    <ProductList
                        menu={menu}
                        categories={categories}
                        searchQuery={searchQuery}
                        searchResults={searchResults}
                        displayedCategories={displayedCategories}
                        isBulkDeleteMode={isBulkDeleteMode}
                        selectedProducts={selectedProducts}
                        handleProductSelectionChange={
                            handleProductSelectionChange
                        }
                        setActiveForm={setActiveForm}
                        deleteProduct={deleteProduct}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductTab;
