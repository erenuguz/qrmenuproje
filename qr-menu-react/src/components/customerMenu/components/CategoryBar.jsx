import React from 'react';
import {PillButton} from '@/components/common/button/Buttons';

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
                    <PillButton
                        key={`topbar-${category.id}`}
                        id={`btn-${category.id}`}
                        isActive={isActive}
                        onClick={() => scrollToCategory(category.id)}
                    >
                        {category.name}
                    </PillButton>
                );
            })}
        </div>
    );
};

export default CategoryBar;
