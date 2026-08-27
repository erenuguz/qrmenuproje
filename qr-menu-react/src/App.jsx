import React, {useState} from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Header from '@/components/layout/Header';
import WelcomeScreen from '@/components/WelcomeScreen';
import CustomerMenu from '@/components/customerMenu/CustomerMenu';
import Footer from '@/components/layout/footer/Footer';
import {useRestaurantDoc} from '@/hooks/useRestaurantDoc';

const App = () => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const restaurantId = pathParts[pathParts.length - 1];
    const {restaurantData, loading} = useRestaurantDoc(restaurantId);
    const [activeCategory, setActiveCategory] = useState(null);

    if (!restaurantId) {
        return <WelcomeScreen />;
    }

    if (loading) {
        return <LoadingSpinner message="Restoran Bilgileri Yükleniyor..." />;
    }

    const isFound = restaurantData !== null && restaurantData !== undefined;
    const isInactive = restaurantData?.isInactive === true; // Firestore'daki alanı kontrol ediyoruz

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

export default App;
