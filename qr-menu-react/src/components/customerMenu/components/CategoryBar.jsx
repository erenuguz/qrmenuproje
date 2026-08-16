import React from 'react';

const CategoryBar = ({
    categories,
    activeCategory,
    scrollToCategory,
    navRef,
    isDragging,
    dragHandlers,
}) => {
    return (
        <div
            ref={navRef}
            {...dragHandlers}
            style={{
                display: 'flex',
                overflowX: 'auto',
                padding: '12px 20px',
                gap: '9px',
                backgroundColor:
                    'color-mix(in srgb, var(--surface) 90%, transparent)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 990,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                    <button
                        key={`topbar-${category.id}`}
                        id={`btn-${category.id}`}
                        onClick={() => scrollToCategory(category.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px 14px',
                            borderRadius: '25px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: isActive
                                ? 'var(--primary)'
                                : 'var(--surface)',
                            color: isActive
                                ? 'var(--textWhite)'
                                : 'var(--text)',
                            border: '1px solid',
                            borderColor: isActive
                                ? 'var(--primary)'
                                : 'var(--border)',
                            fontWeight: 'var(--font-semibold)',
                            fontSize: 'var(--font-caption)',
                            fontFamily: 'var(--font-family)',
                        }}
                    >
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryBar;
