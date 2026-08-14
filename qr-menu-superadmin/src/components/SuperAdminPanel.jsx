import React from 'react';
import {
    ProductTab,
    CategoryTab,
    SettingsTab,
    RestaurantManagementTab,
    Header,
    SideBar,
    useResponsive,
    useRestaurants,
    useRestaurantDoc,
    useMenu,
    useAdminShell,
    superAdminMenuItems,
} from '@/';

const SuperAdminPanel = () => {
    const {restoranlar, yukleniyor, seciliRestoranId, setSeciliRestoranId} =
        useRestaurants();

    const {menu: seciliMenu, yukleniyor: menuYukleniyor} =
        useMenu(seciliRestoranId);

    const {aktifSekme, setAktifSekme, sidebarAcik, setSidebarAcik} =
        useAdminShell('restoranlar');

    const {
        restoranData: seciliRestoranData,
        yukleniyor: restoranDocYukleniyor,
    } = useRestaurantDoc(seciliRestoranId);

    const {isMobile} = useResponsive();

    const genelYukleniyor =
        yukleniyor ||
        (seciliRestoranId && (restoranDocYukleniyor || menuYukleniyor));

    if (genelYukleniyor)
        return (
            <div
                style={{
                    padding: '50px',
                    textAlign: 'center',
                    color: 'var(--textSecondary)',
                }}
            >
                Sistem Yükleniyor...
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
            <Header sidebarAcik={sidebarAcik} setSidebarAcik={setSidebarAcik} />

            {/* Ana İçerik Düzeni */}
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                }}
            >
                <SideBar
                    menuItems={superAdminMenuItems}
                    aktifSekme={aktifSekme}
                    setAktifSekme={setAktifSekme}
                    sidebarAcik={sidebarAcik}
                    setSidebarAcik={setSidebarAcik} // <-- Bunu eklemeyi unutma
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

                    {aktifSekme === 'restoranlar' && (
                        <RestaurantManagementTab restoranlar={restoranlar} />
                    )}

                    {aktifSekme === 'urunler' && seciliRestoranId && (
                        <ProductTab
                            restoranId={seciliRestoranId}
                            menu={seciliMenu}
                            restoranlar={restoranlar}
                            seciliRestoranId={seciliRestoranId}
                            setSeciliRestoranId={setSeciliRestoranId}
                        />
                    )}

                    {aktifSekme === 'kategoriler' && seciliRestoranId && (
                        <CategoryTab
                            restoranId={seciliRestoranId}
                            menu={seciliMenu}
                        />
                    )}

                    {aktifSekme === 'ayarlar' && seciliRestoranId && (
                        <SettingsTab
                            restoranId={seciliRestoranId}
                            restoranData={seciliRestoranData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPanel;
