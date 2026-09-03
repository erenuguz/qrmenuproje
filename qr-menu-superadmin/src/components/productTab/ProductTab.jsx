import {useCallback, useMemo, useState} from 'react';
import ProductHeader from '@/components/productTab/ProductHeader';
import ProductFilters from '@/components/productTab/ProductFilters';
import ProductList from '@/components/productTab/ProductList';
import ProductForm from '@/components/productTab/ProductForm';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {useProductActions} from '@/hooks/useProductActions';
import {useCategories} from '@/hooks/useCategories';
import {useSearch} from '@/hooks/useSearch';
import {useMenuIndex} from '@/hooks/useMenuIndex';

const PRODUCT_SEARCH_KEYS = ['name'];

const ProductTab = ({restaurantId, menu = []}) => {
    const [activeForm, setActiveForm] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories(restaurantId);

    const {productsByCategory, categoryNameById} = useMenuIndex(
        menu,
        categories
    );

    const {deleteProduct, saveForm, bulkDeleteProducts, isProcessing} =
        useProductActions(restaurantId);

    const categoryFilter = useCallback(
        (product) =>
            selectedCategoryFilter === 'all' ||
            product.categoryId === selectedCategoryFilter,
        [selectedCategoryFilter]
    );

    const {
        searchQuery,
        setSearchQuery,
        filteredData: searchResults,
    } = useSearch(menu, PRODUCT_SEARCH_KEYS, {
        extraFilter: categoryFilter,
    });

    const handleSaveForm = () => {
        saveForm(activeForm, isImageLoading, () => {
            setActiveForm(null);
        });
    };

    const handleBulkDelete = () => {
        bulkDeleteProducts(selectedProducts, () => {
            setSelectedProducts([]);
            setIsBulkDeleteMode(false);
        });
    };

    const handleProductSelectionChange = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(
                selectedProducts.filter((id) => id !== productId)
            );
            return;
        }

        setSelectedProducts([...selectedProducts, productId]);
    };

    const displayedCategories = useMemo(() => {
        if (selectedCategoryFilter === 'all') {
            return categories;
        }

        return categories.filter(
            (category) => category.id === selectedCategoryFilter
        );
    }, [categories, selectedCategoryFilter]);

    if (categoriesError) {
        return (
            <SnapshotErrorState
                error={categoriesError}
                resourceName="Ürün kategorileri"
            />
        );
    }

    if (categoriesLoading) {
        return <LoadingSpinner message="Kategoriler yükleniyor..." />;
    }

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
                    isProcessing={isProcessing}
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
                        isProcessing={isProcessing}
                    />

                    <ProductFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategoryFilter={selectedCategoryFilter}
                        setSelectedCategoryFilter={setSelectedCategoryFilter}
                        categories={categories}
                    />

                    <ProductList
                        menu={menu}
                        productsByCategory={productsByCategory}
                        categoryNameById={categoryNameById}
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
