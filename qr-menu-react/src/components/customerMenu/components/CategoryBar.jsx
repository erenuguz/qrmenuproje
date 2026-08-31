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
            className="hide-scrollbar"
            ref={navRef}
            {...dragHandlers}
            style={{
                display: 'flex',
                overflowX: 'auto',
                padding: '12px 20px',
                gap: 'var(--space-8)',
                backgroundColor:
                    'color-mix(in srgb, var(--surface) 90%, transparent)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: '65px',
                zIndex: 'var(--z-sticky)',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
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
