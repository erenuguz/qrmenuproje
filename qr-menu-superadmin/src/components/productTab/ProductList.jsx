import ProductCard from '@/components/productTab/ProductCard';
import EmptyState from '@/components/common/EmptyState';
import Badge from '@/components/common/Badge';
import {TagIcon} from '@/components/common/icon/Icons';
import Card from '@/components/common/Card';

const ProductList = ({
    menu,
    productsByCategory,
    categoryNameById,
    searchQuery,
    searchResults,
    displayedCategories,
    isBulkDeleteMode,
    selectedProducts,
    handleProductSelectionChange,
    setActiveForm,
    deleteProduct,
}) => {
    return (
        <div>
            {searchQuery.trim() !== '' ? (
                <Card padding={0} style={{overflow: 'hidden'}}>
                    <div
                        style={{
                            padding: '14px 20px',
                            borderBottom: '1px solid var(--borderLight)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <h4
                            style={{
                                margin: 0,
                                color: 'var(--text)',
                                fontSize: 'var(--font-caption)',
                                fontWeight: 'var(--font-bold)',
                            }}
                        >
                            Arama Sonuçları
                        </h4>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {searchResults.map((product, index) => {
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    categoryName={categoryNameById.get(
                                        product.categoryId
                                    )}
                                    isBulkDeleteMode={isBulkDeleteMode}
                                    selectedProducts={selectedProducts}
                                    handleProductSelectionChange={
                                        handleProductSelectionChange
                                    }
                                    setActiveForm={setActiveForm}
                                    deleteProduct={deleteProduct}
                                    isLast={index === searchResults.length - 1}
                                />
                            );
                        })}
                        {searchResults.length === 0 && (
                            <EmptyState message="Sonuç bulunamadı." />
                        )}
                    </div>
                </Card>
            ) : (
                // KATEGORİLERE GÖRE GRUPLANMIŞ LİSTE
                displayedCategories.map((category) => {
                    const categoryProducts =
                        productsByCategory.get(category.id) ?? [];
                    if (categoryProducts.length === 0) return null;

                    return (
                        <Card
                            key={category.id}
                            padding={0}
                            style={{
                                marginBottom: '24px',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Kategori Başlığı ve Etiket (Badge) */}
                            <div
                                style={{
                                    padding: '14px 20px',
                                    borderBottom:
                                        '1px solid var(--borderLight)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <TagIcon
                                    size={16}
                                    color="var(--textSecondary)"
                                />
                                <h4
                                    style={{
                                        color: 'var(--text)',
                                        margin: 0,
                                        fontSize: 'var(--font-caption)',
                                        fontWeight: 'var(--font-bold)',
                                    }}
                                >
                                    {category.name}
                                </h4>
                                <Badge>{categoryProducts.length} ürün</Badge>
                            </div>

                            {/* Kategori İçindeki Ürünler */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {categoryProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        categoryName={category.name}
                                        isBulkDeleteMode={isBulkDeleteMode}
                                        selectedProducts={selectedProducts}
                                        handleProductSelectionChange={
                                            handleProductSelectionChange
                                        }
                                        setActiveForm={setActiveForm}
                                        deleteProduct={deleteProduct}
                                        isLast={
                                            index ===
                                            categoryProducts.length - 1
                                        }
                                    />
                                ))}
                            </div>
                        </Card>
                    );
                })
            )}
            {menu.length === 0 && (
                <EmptyState message="Menüde henüz ürün yok." />
            )}
        </div>
    );
};

export default ProductList;
