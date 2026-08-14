import React from 'react';

const CategoryBar = ({
    kategoriler,
    aktifKategori,
    kategoriyeKaydir,
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
            {kategoriler.map((kat) => {
                const aktif = aktifKategori === kat.id;
                return (
                    <button
                        key={`topbar-${kat.id}`}
                        id={`btn-${kat.id}`}
                        onClick={() => kategoriyeKaydir(kat.id)}
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
                            backgroundColor: aktif
                                ? 'var(--primary)'
                                : 'var(--surface)',
                            color: aktif ? 'var(--textWhite)' : 'var(--text)',
                            border: '1px solid',
                            borderColor: aktif
                                ? 'var(--primary)'
                                : 'var(--border)',
                            fontWeight: 'var(--font-semibold)',
                            fontSize: 'var(--font-caption)',
                            fontFamily: 'var(--font-family)',
                        }}
                    >
                        {kat.ad}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryBar;
