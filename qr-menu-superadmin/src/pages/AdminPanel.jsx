import {lazy, Suspense} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ProductTab = lazy(() => import('@/components/productTab/ProductTab'));

const CategoryTab = lazy(() => import('@/components/categoryTab/CategoryTab'));

const SettingsTab = lazy(() => import('@/components/settingsTab/SettingsTab'));
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import {useResponsive} from '@/hooks/useResponsive';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';
import {useMenu} from '@/hooks/useMenu';
import {useAdminShell} from '@/hooks/useAdminShell';
import {adminMenuItems} from '@/constants/menuItems';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';

const AdminPanel = ({restaurantId}) => {
    const {
        menu,
        loading: menuLoading,
        error: menuError,
    } = useMenu(restaurantId);

    const {
        restaurantData,
        loading: restaurantLoading,
        error: restaurantError,
    } = useRestaurantDoc(restaurantId);

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

    const activeError =
        restaurantError ||
        (['products', 'categories'].includes(activeTab) ? menuError : null);

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
                        transition: 'margin-left var(--motion-slow) ease',
                        minWidth: 0,
                    }}
                >
                    {/* İçerikler */}
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Sekme Yükleniyor..." />
                        }
                    >
                        {activeTab === 'products' && (
                            <ProductTab
                                restaurantId={restaurantId}
                                menu={menu}
                            />
                        )}

                        {activeTab === 'categories' && (
                            <CategoryTab
                                restaurantId={restaurantId}
                                menu={menu}
                            />
                        )}

                        {activeTab === 'settings' && (
                            <SettingsTab
                                restaurantId={restaurantId}
                                restaurantData={restaurantData}
                            />
                        )}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
