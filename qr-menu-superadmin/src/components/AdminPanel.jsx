import React from 'react';
import {
    ProductTab,
    CategoryTab,
    SettingsTab,
    Header,
    SideBar,
    useResponsive,
    useRestaurantDoc,
    useMenu,
    useAdminShell,
    adminMenuItems,
} from '@/';

const AdminPanel = ({restoranId}) => {
    const {menu, yukleniyor: menuYukleniyor} = useMenu(restoranId);

    const {restoranData, yukleniyor: restoranYukleniyor} =
        useRestaurantDoc(restoranId);

    const {aktifSekme, setAktifSekme, sidebarAcik, setSidebarAcik} =
        useAdminShell('urunler');

    const {isMobile} = useResponsive();

    const yukleniyor = restoranYukleniyor || menuYukleniyor;

    if (yukleniyor)
        return (
            <div
                style={{
                    padding: '50px',
                    textAlign: 'center',
                    color: 'var(--textSecondary)',
                    fontSize: 'var(--font-body)',
                }}
            >
                Yönetim Paneli Yükleniyor...
            </div>
        );

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '0',
                paddingTop: '70px',
                backgroundColor: 'var(--background)',
                display: 'flex',
            }}
        >
            <Header
                sidebarAcik={sidebarAcik}
                setSidebarAcik={setSidebarAcik}
                restoranData={restoranData}
            />

            {/* Ana İçerik Düzeni */}
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                }}
            >
                <SideBar
                    menuItems={adminMenuItems}
                    aktifSekme={aktifSekme}
                    setAktifSekme={setAktifSekme}
                    sidebarAcik={sidebarAcik}
                    setSidebarAcik={setSidebarAcik}
                />

                {/* Sağ Alan */}
                <div
                    style={{
                        flex: 1,
                        marginLeft: isMobile
                            ? '0'
                            : sidebarAcik
                              ? '250px'
                              : '0',
                        padding: '30px',
                        transition: 'margin-left .3s ease',
                        minWidth: 0,
                    }}
                >
                    {/* İçerikler */}
                    {aktifSekme === 'urunler' && (
                        <ProductTab restoranId={restoranId} menu={menu} />
                    )}

                    {aktifSekme === 'kategoriler' && (
                        <CategoryTab restoranId={restoranId} menu={menu} />
                    )}

                    {aktifSekme === 'ayarlar' && (
                        <SettingsTab
                            restoranId={restoranId}
                            restoranData={restoranData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
