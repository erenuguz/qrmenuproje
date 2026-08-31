import {useState} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import SnapshotErrorState from '@/components/common/SnapshotErrorState';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Header from '@/components/layout/Header';
import CustomerMenu from '@/components/customerMenu/CustomerMenu';
import Footer from '@/components/layout/footer/Footer';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';

const RestaurantMenuPage = ({restaurantId}) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const {restaurantData, loading, error} = useRestaurantDoc(restaurantId);

    if (loading) {
        return <LoadingSpinner message="Restoran Bilgileri Yükleniyor..." />;
    }

    if (error) {
        return (
            <SnapshotErrorState
                error={error}
                resourceName="Restoran bilgileri"
                minHeight="100vh"
            />
        );
    }

    const isFound = restaurantData != null;
    const isInactive = restaurantData?.isInactive === true;

    if (!isFound || isInactive) {
        return (
            <EmptyState
                icon="🍽️"
                iconBg="var(--dangerBg)"
                title="Restoran Bulunamadı"
                message="Aradığınız restorana ait bir bilgi bulunamadı. Bağlantıyı kontrol edip tekrar deneyiniz."
                minHeight="100vh"
            />
        );
    }

    return (
        <div>
            <Header
                activeCategory={activeCategory}
                onBack={() => setActiveCategory(null)}
                restaurantName={restaurantData.name}
                restaurantLogo={restaurantData.logo}
            />

            <CustomerMenu
                restaurantId={restaurantId}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <Footer restaurantData={restaurantData} />

            <ScrollToTopButton />
        </div>
    );
};

export default RestaurantMenuPage;
