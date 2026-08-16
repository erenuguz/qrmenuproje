import React from 'react';
import {MenuItemCard, CategoryBar} from '@/';

const MenuListView = ({
    categories,
    menu,
    activeCategory,
    scrollToCategory,
    navRef,
    isDragging,
    dragHandlers,
}) => {
    return (
        <>
            {/* ÜST YAPISKAN MENÜ */}
            <CategoryBar
                categories={categories}
                activeCategory={activeCategory}
                scrollToCategory={scrollToCategory}
                navRef={navRef}
                isDragging={isDragging}
                dragHandlers={dragHandlers}
            />

            {/* ÜRÜN LİSTESİ */}
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '36px',
                }}
            >
                {categories.map((category) => {
                    const categoryItems = menu.filter(
                        (item) => item.categoryId === category.id
                    );
                    if (categoryItems.length === 0) return null;

                    return (
                        <div
                            key={`section-${category.id}`}
                            id={`category-${category.id}`}
                        >
                            {/* Kategori Başlığı */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '9px',
                                    paddingBottom: '10px',
                                    marginBottom: '14px',
                                    borderBottom: '1px solid var(--border)',
                                }}
                            >
                                <h2
                                    style={{
                                        margin: 0,
                                        color: 'var(--text)',
                                        fontSize: 'var(--font-h3)',
                                        fontWeight: 'var(--font-bold)',
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    {category.name}
                                </h2>
                            </div>

                            {/* Ürünler */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                }}
                            >
                                {categoryItems.map((item) => (
                                    <MenuItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MenuListView;
