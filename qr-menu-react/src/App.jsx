import {lazy, Suspense} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const WelcomeScreen = lazy(
    () => import('@/pages/welcomeScreen/pages/welcomeScreen/WelcomeScreen')
);

const RestaurantMenuPage = lazy(() => import('@/pages/RestaurantMenuPage'));

const App = () => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);

    const restaurantId = pathParts[pathParts.length - 1];

    return (
        <Suspense fallback={<LoadingSpinner message="Sayfa Yükleniyor..." />}>
            {restaurantId ? (
                <RestaurantMenuPage restaurantId={restaurantId} />
            ) : (
                <WelcomeScreen />
            )}
        </Suspense>
    );
};

export default App;
