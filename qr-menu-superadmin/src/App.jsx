import React from 'react';
import {auth} from '@/firebaseConfig';
import {
    Login,
    AdminPanel,
    SuperAdminPanel,
    ScrollToTopButton,
    LoadingSpinner,
    useAuthUser,
    cardStyle,
} from '@/';
import {AlertCircleIcon} from '@/components/common/icon/Icons';
import {SignOutButton} from '@/components/common/button/Buttons';

function App() {
    const {user, restaurantId, loading} = useAuthUser();

    if (loading) return <LoadingSpinner />;

    // Giriş yapan kimse yoksa
    if (!user) {
        return <Login />;
    }

    // Giriş yapan patron ise
    if (user.email === 'erenuguz301@gmail.com') {
        return <SuperAdminPanel />;
    }

    // Giriş yapan kişi bir Restoran Sahibi ise
    if (restaurantId) {
        return (
            <div>
                <AdminPanel restaurantId={restaurantId} />
                <ScrollToTopButton />
            </div>
        );
    }

    // Biri giriş yaptı ama üzerine kayıtlı restoran yoksa
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--background)',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    ...cardStyle,
                    textAlign: 'center',
                    padding: '40px',
                    maxWidth: '420px',
                }}
            >
                <div
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--dangerBg)',
                        color: 'var(--danger)',
                        borderRadius: 'var(--radiusCircle)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <AlertCircleIcon size={28} />
                </div>

                <h2
                    style={{
                        color: 'var(--text)',
                        margin: '0 0 12px 0',
                        fontSize: 'var(--font-h3)',
                        fontWeight: 'var(--font-bold)',
                    }}
                >
                    Restoran Bulunamadı!
                </h2>

                <p
                    style={{
                        color: 'var(--textSecondary)',
                        fontSize: 'var(--font-body)',
                        margin: '0 0 24px 0',
                        lineHeight: '1.5',
                    }}
                >
                    Hesabınıza tanımlanmış bir işletme yok. Lütfen sistem
                    yöneticisi ile iletişime geçin.
                </p>

                <SignOutButton onClick={() => auth.signOut()} />
            </div>
        </div>
    );
}

export default App;
