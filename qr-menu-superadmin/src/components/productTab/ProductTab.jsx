import {useState, useMemo, useCallback} from 'react';
import ProductHeader from '@/components/productTab/ProductHeader';
import RestaurantSelector from '@/components/productTab/RestaurantSelector';
import ProductFilters from '@/components/productTab/ProductFilters';
import ProductList from '@/components/productTab/ProductList';
import ProductForm from '@/components/productTab/ProductForm';
import {useProductActions} from '@/hooks/useProductActions';
import {useCategories} from '@/hooks/useCategories';
import {useSearch} from '@/hooks/useSearch';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import {useMenuIndex} from '@/hooks/useMenuIndex';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';

const PRODUCT_SEARCH_KEYS = ['name'];

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
        return selectedCategoryFilter === 'all'
            ? categories
            : categories.filter(
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

    if (categoriesError) {
        return (
            <EmptyState
                title="Kategoriler alınamadı"
                description={
                    categoriesError.message ||
                    'Kategoriler alınırken bir hata oluştu.'
                }
            />
        );
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
