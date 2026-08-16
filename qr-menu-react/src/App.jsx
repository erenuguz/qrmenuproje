import React, {useState, useEffect} from 'react';
import {
    LoadingSpinner,
    ScrollToTopButton,
    Header,
    WelcomeScreen,
    CustomerMenu,
    Footer,
    useRestaurantDoc,
} from '@/';

const App = () => {
    const id = window.location.pathname.replace('/', '');

    if (!id) return <WelcomeScreen />;

    const [restaurantId] = useState(id);
    const {restaurantData, loading} = useRestaurantDoc(restaurantId);
    const isFound = restaurantData !== null && restaurantData !== undefined;
    const [activeCategory, setActiveCategory] = useState(null);

    if (loading) {
        return <LoadingSpinner message="Restoran Bilgileri Yükleniyor..." />;
    }

    return (
        <div>
            {!isFound && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        gap: '12px',
                        fontFamily: 'var(--font-family)',
                        padding: '40px 20px',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--dangerBg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                        }}
                    >
                        🍽️
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-h3)',
                            fontWeight: 'var(--font-bold)',
                            color: 'var(--text)',
                        }}
                    >
                        Restoran Bulunamadı
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-caption)',
                            color: 'var(--textSecondary)',
                            maxWidth: '280px',
                            lineHeight: '1.6',
                        }}
                    >
                        Aradığınız restorana ait bir bilgi bulunamadı.
                        Bağlantıyı kontrol edip tekrar deneyiniz.
                    </p>
                </div>
            )}

            {isFound && (
                <>
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
                </>
            )}
        </div>
    );
};

export default App;
