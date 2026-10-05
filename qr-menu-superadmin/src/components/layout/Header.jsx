import {signOut} from 'firebase/auth';
import {auth} from '@/firebaseConfig';
import {
    HamburgerButton,
    SignOutButton,
} from '@/components/common/button/Buttons';

const Header = ({
    isSidebarOpen = false,
    setIsSidebarOpen,
    restaurantData,
    showMenuButton = true,
    title,
}) => {
    const handleSignOut = () => {
        signOut(auth).catch((error) => {
            console.error('Çıkış hatası:', error);
        });
    };

    const handleMenuToggle = () => {
        setIsSidebarOpen?.((currentValue) => !currentValue);
    };

    const headerTitle = title || restaurantData?.name || 'Admin Paneli';

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--header)',
                borderBottom: '1px solid var(--border)',
                zIndex: 'var(--z-header)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                }}
            >
                {showMenuButton && (
                    <HamburgerButton
                        className="hamburger-btn"
                        isOpen={isSidebarOpen}
                        onClick={handleMenuToggle}
                    />
                )}

                {restaurantData?.logo && (
                    <img
                        src={restaurantData.logo}
                        alt={`${restaurantData.name || 'Restoran'} logosu`}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radiusCircle)',
                            objectFit: 'cover',
                            border: '1px solid var(--border)',
                            flexShrink: 0,
                        }}
                    />
                )}

                <h2
                    style={{
                        margin: 0,
                        color: 'var(--text)',
                        fontSize: 'var(--font-title)',
                        fontWeight: 'var(--font-semibold)',
                    }}
                >
                    {headerTitle}
                </h2>
            </div>

            <SignOutButton onClick={handleSignOut} />
        </header>
    );
};

export default Header;
