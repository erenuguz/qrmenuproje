import React from 'react';
import {ProductCard, EmptyState, Badge} from '@/';

const ProductList = ({
    menu,
    categories,
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
                <div
                    style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        overflow: 'hidden',
                    }}
                >
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
                                fontSize: '14px',
                                fontWeight: 'bold',
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
                                    categoryName={
                                        categories.find(
                                            (category) =>
                                                category.id ===
                                                product.categoryId
                                        )?.name
                                    }
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
                </div>
            ) : (
                // KATEGORİLERE GÖRE GRUPLANMIŞ LİSTE
                displayedCategories.map((category) => {
                    const categoryProducts = menu.filter(
                        (product) => product.categoryId === category.id
                    );
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div
                            key={category.id}
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                boxShadow: 'var(--shadow)',
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
                                <svg
                                    style={{
                                        color: 'var(--textSecondary)',
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                                <h4
                                    style={{
                                        color: 'var(--text)',
                                        margin: 0,
                                        fontSize: '14px',
                                        fontWeight: 'bold',
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
                        </div>
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
