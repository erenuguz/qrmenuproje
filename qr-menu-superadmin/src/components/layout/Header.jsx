import {signOut} from 'firebase/auth';
import {auth} from '@/firebaseConfig';
import {
    HamburgerButton,
    SignOutButton,
} from '@/components/common/button/Buttons';
import {CubeIcon} from '@/components/common/icon/Icons';

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

                <div
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--textWhite)',
                        padding: '8px',
                        borderRadius: 'var(--radiusSmall)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow)',
                    }}
                >
                    <CubeIcon size={20} />
                </div>

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
