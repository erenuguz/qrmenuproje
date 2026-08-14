import React from 'react';
import {
    LoadingSpinner,
    useMenu,
    useCategories,
    useCategoryScrollSpy,
    useDraggable,
    CategoryGrid,
    MenuListView,
} from '@/';

const CustomerMenu = ({restoranId, aktifKategori, setAktifKategori}) => {
    const {menu, yukleniyor: menuYukleniyor} = useMenu(restoranId);
    const {kategoriler, yukleniyor: katYukleniyor} = useCategories(restoranId);

    const {kategoriyeKaydir} = useCategoryScrollSpy(
        kategoriler,
        aktifKategori,
        setAktifKategori
    );
    const {dragRef, isDragging, dragHandlers} = useDraggable();

    const yukleniyor = menuYukleniyor || katYukleniyor;

    if (yukleniyor) return <LoadingSpinner mesaj="Menü Yükleniyor..." />;

    return (
        <div
            style={{
                backgroundColor: 'transparent',
                minHeight: '100vh',
                paddingBottom: '30px',
                fontFamily: 'var(--font-family)',
            }}
        >
            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                {aktifKategori === null ? (
                    <CategoryGrid
                        kategoriler={kategoriler}
                        menu={menu}
                        kategoriyeKaydir={kategoriyeKaydir}
                    />
                ) : (
                    <MenuListView
                        kategoriler={kategoriler}
                        menu={menu}
                        aktifKategori={aktifKategori}
                        kategoriyeKaydir={kategoriyeKaydir}
                        navRef={dragRef}
                        isDragging={isDragging}
                        dragHandlers={dragHandlers}
                    />
                )}

                {/* Eğer menüde hiç ürün yoksa */}
                {menu.length === 0 && (
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--textSecondary)',
                            marginTop: '40px',
                            fontSize: 'var(--font-caption)',
                        }}
                    >
                        Menüde henüz ürün yok.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CustomerMenu;
