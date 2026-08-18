import React from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '@/firebaseConfig';
import { HamburgerButton, SignOutButton } from '@/components/common/button/Buttons';
import {CubeIcon} from '@/components/common/icon/Icons';

const Header = ({isSidebarOpen, setIsSidebarOpen, restaurantData}) => {
    const handleSignOut = () => {
        signOut(auth).catch((error) => console.error('Çıkış hatası:', error));
    };

    return (
        <div>
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
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                    }}
                >
                    {/* Hamburger */}
                    <HamburgerButton
                        className="hamburger-btn"
                        isOpen={isSidebarOpen}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    {/* Logo */}
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

                    {/* Başlık */}
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: 'var(--text)',
                                fontSize: 'var(--font-title)',
                                fontWeight: 'var(--font-semibold)',
                            }}
                        >
                            {restaurantData?.name || 'Admin Paneli'}
                        </h2>
                    </div>
                </div>

                {/* Çıkış */}
                <SignOutButton onClick={handleSignOut} />
            </header>
        </div>
    );
};

export default Header;
