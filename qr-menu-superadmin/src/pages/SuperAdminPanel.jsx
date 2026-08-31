import {lazy, Suspense} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const RestaurantTab = lazy(
    () => import('@/components/restaurantTab/RestaurantTab')
);

const ProductTab = lazy(() => import('@/components/productTab/ProductTab'));

const CategoryTab = lazy(() => import('@/components/categoryTab/CategoryTab'));

const SettingsTab = lazy(() => import('@/components/settingsTab/SettingsTab'));
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import {useResponsive} from '@/hooks/useResponsive';
import {useRestaurants} from '@/hooks/useRestaurants';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';
import {useMenu} from '@/hooks/useMenu';
import {useAdminShell} from '@/hooks/useAdminShell';
import {superAdminMenuItems} from '@/constants/menuItems';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';

const SuperAdminPanel = () => {
    const {
        restaurants,
        loading,
        selectedRestaurantId,
        setSelectedRestaurantId,
        error: restaurantsError,
    } = useRestaurants();

    const {
        menu: selectedMenu,
        loading: menuLoading,
        error: menuError,
    } = useMenu(selectedRestaurantId);

    const {
        restaurantData: selectedRestaurantData,
        loading: restaurantDocLoading,
        error: restaurantDocError,
    } = useRestaurantDoc(selectedRestaurantId);

    const {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen} =
        useAdminShell('restaurants');

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

    const activeError =
        restaurantsError ||
        (['products', 'categories'].includes(activeTab) ? menuError : null) ||
        (activeTab === 'settings' ? restaurantDocError : null);

    if (activeError) {
        return (
            <SnapshotErrorState
                error={activeError}
                resourceName="Yönetim paneli verileri"
                minHeight="100vh"
            />
        );
    }

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
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Sekme Yükleniyor..." />
                        }
                    >
                        {activeTab === 'restaurants' && (
                            <RestaurantTab restaurants={restaurants} />
                        )}

                        {activeTab === 'products' && selectedRestaurantId && (
                            <ProductTab
                                restaurantId={selectedRestaurantId}
                                menu={selectedMenu}
                                restaurants={restaurants}
                                selectedRestaurantId={selectedRestaurantId}
                                setSelectedRestaurantId={
                                    setSelectedRestaurantId
                                }
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
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPanel;
