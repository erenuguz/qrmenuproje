import {lazy, Suspense} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import {useResponsive} from '@/hooks/useResponsive';
import {useRestaurants} from '@/hooks/useRestaurants';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';
import {useMenu} from '@/hooks/useMenu';
import {useAdminShell} from '@/hooks/useAdminShell';
import {superAdminMenuItems} from '@/constants/menuItems';
const RestaurantTab = lazy(
    () => import('@/components/restaurantTab/RestaurantTab')
);
const ProductTab = lazy(() => import('@/components/productTab/ProductTab'));
const CategoryTab = lazy(() => import('@/components/categoryTab/CategoryTab'));
const SettingsTab = lazy(() => import('@/components/settingsTab/SettingsTab'));

const SuperAdminPanel = () => {
    const {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen} =
        useAdminShell('restaurants');

    const {
        restaurants,
        loading: restaurantsLoading,
        selectedRestaurantId,
        setSelectedRestaurantId,
        error: restaurantsError,
    } = useRestaurants();

    const {isMobile} = useResponsive();
    const needsMenu = activeTab === 'products' || activeTab === 'categories';
    const needsRestaurantDocument = activeTab === 'settings';
    const menuRestaurantId =
        needsMenu && selectedRestaurantId ? selectedRestaurantId : '';
    const settingsRestaurantId =
        needsRestaurantDocument && selectedRestaurantId
            ? selectedRestaurantId
            : '';
    const {
        menu: selectedMenu,
        loading: menuLoading,
        error: menuError,
    } = useMenu(menuRestaurantId);
    const {
        restaurantData: selectedRestaurantData,
        loading: restaurantDocumentLoading,
        error: restaurantDocumentError,
    } = useRestaurantDoc(settingsRestaurantId);

    const generalLoading =
        restaurantsLoading ||
        Boolean(
            selectedRestaurantId &&
            ((needsMenu && menuLoading) ||
                (needsRestaurantDocument && restaurantDocumentLoading))
        );

    const activeError =
        restaurantsError ||
        (needsMenu ? menuError : null) ||
        (needsRestaurantDocument ? restaurantDocumentError : null);

    if (generalLoading) {
        return <LoadingSpinner message="Sistem Yükleniyor..." />;
    }

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
                padding: 0,
                paddingTop: '70px',
                backgroundColor: 'var(--background)',
                display: 'flex',
            }}
        >
            <Header
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

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
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main
                    style={{
                        flex: 1,
                        marginLeft: isMobile
                            ? '0'
                            : isSidebarOpen
                              ? '250px'
                              : '0',
                        padding: '30px',
                        transition: 'margin-left var(--motion-slow) ease',
                        minWidth: 0,
                    }}
                >
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
                                key={selectedRestaurantId}
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
                </main>
            </div>
        </div>
    );
};

export default SuperAdminPanel;
