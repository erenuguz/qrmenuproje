import {lazy, Suspense, useEffect} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const RestaurantMenuPage = lazy(() => import('@/pages/RestaurantMenuPage'));

const App = () => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const restaurantId = pathParts[pathParts.length - 1];

    useEffect(() => {
        if (!restaurantId) {
            window.location.replace('https://scanmenu.com.tr');
        }
    }, [restaurantId]);

    return (
        <Suspense fallback={<LoadingSpinner message="Sayfa Yukleniyor..." />}>
            {restaurantId ? (
                <RestaurantMenuPage restaurantId={restaurantId} />
            ) : (
                <LoadingSpinner message="Yonlendiriliyor..." />
            )}
        </Suspense>
    );
};

export default App;
