import React from 'react';
import ProductTab from '@/components/productTab/ProductTab';
import CategoryTab from '@/components/categoryTab/CategoryTab';
import SettingsTab from '@/components/settingsTab/SettingsTab';
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import {useResponsive} from '@/hooks/useResponsive';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';
import {useMenu} from '@/hooks/useMenu';
import {useAdminShell} from '@/hooks/useAdminShell';
import {adminMenuItems} from '@/constants/menuItems';

const AdminPanel = ({restaurantId}) => {
    const {menu, loading: menuLoading} = useMenu(restaurantId);

    const {restaurantData, loading: restaurantLoading} =
        useRestaurantDoc(restaurantId);

    const {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen} =
        useAdminShell('products');

    const {isMobile} = useResponsive();

    const loading = restaurantLoading || menuLoading;

    if (loading)
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
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                restaurantData={restaurantData}
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
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Sağ Alan */}
                <div
                    style={{
                        flex: 1,
                        marginLeft: isMobile
                            ? '0'
                            : isSidebarOpen
                              ? '250px'
                              : '0',
                        padding: '30px',
                        transition: 'margin-left .3s ease',
                        minWidth: 0,
                    }}
                >
                    {/* İçerikler */}
                    {activeTab === 'products' && (
                        <ProductTab restaurantId={restaurantId} menu={menu} />
                    )}

                    {activeTab === 'categories' && (
                        <CategoryTab restaurantId={restaurantId} menu={menu} />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsTab
                            restaurantId={restaurantId}
                            restaurantData={restaurantData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
