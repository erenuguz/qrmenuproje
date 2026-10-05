import LoadingSpinner from '@/components/common/LoadingSpinner';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import Header from '@/components/layout/Header';
import RestaurantTab from '@/components/restaurantTab/RestaurantTab';
import {useRestaurants} from '@/hooks/useRestaurants';

const SuperAdminPanel = () => {
    const {
        restaurants,
        loading: restaurantsLoading,
        error: restaurantsError,
    } = useRestaurants();

    if (restaurantsLoading) {
        return <LoadingSpinner message="Restoranlar yükleniyor..." />;
    }

    if (restaurantsError) {
        return (
            <SnapshotErrorState
                error={restaurantsError}
                resourceName="Restoranlar"
                minHeight="100vh"
            />
        );
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                paddingTop: '70px',
                backgroundColor: 'var(--background)',
            }}
        >
            <Header showMenuButton={false} title="Super Admin" />

            <main
                style={{
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '30px',
                    boxSizing: 'border-box',
                }}
            >
                <RestaurantTab restaurants={restaurants} />
            </main>
        </div>
    );
};

export default SuperAdminPanel;
