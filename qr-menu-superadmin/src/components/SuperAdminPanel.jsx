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
    const {
        restaurants,
        loading,
        selectedRestaurantId,
        setSelectedRestaurantId,
    } = useRestaurants();

    const {menu: selectedMenu, loading: menuLoading} =
        useMenu(selectedRestaurantId);

    const {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen} =
        useAdminShell('restaurants');

    const {
        restaurantData: selectedRestaurantData,
        loading: restaurantDocLoading,
    } = useRestaurantDoc(selectedRestaurantId);

    const {isMobile} = useResponsive();

    const generalLoading =
        loading ||
        (selectedRestaurantId && (restaurantDocLoading || menuLoading));

    if (generalLoading)
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
            <Header
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
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
                    menuItems={superAdminMenuItems}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} // <-- Bunu eklemeyi unutma
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

                    {activeTab === 'restaurants' && (
                        <RestaurantManagementTab restaurants={restaurants} />
                    )}

                    {activeTab === 'products' && selectedRestaurantId && (
                        <ProductTab
                            restaurantId={selectedRestaurantId}
                            menu={selectedMenu}
                            restaurants={restaurants}
                            selectedRestaurantId={selectedRestaurantId}
                            setSelectedRestaurantId={setSelectedRestaurantId}
                        />
                    )}

                    {activeTab === 'categories' && selectedRestaurantId && (
                        <CategoryTab
                            restaurantId={selectedRestaurantId}
                            menu={selectedMenu}
                        />
                    )}

                    {activeTab === 'settings' && selectedRestaurantId && (
                        <SettingsTab
                            restaurantId={selectedRestaurantId}
                            restaurantData={selectedRestaurantData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPanel;
