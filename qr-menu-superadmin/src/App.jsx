import {lazy, Suspense} from 'react';
import {auth} from '@/firebaseConfig';
const Login = lazy(() => import('@/pages/Login'));

const AdminPanel = lazy(() => import('@/pages/AdminPanel'));

const SuperAdminPanel = lazy(() => import('@/pages/SuperAdminPanel'));
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {useAuthUser} from '@/hooks/useAuthUser';
import {cardStyle} from '@/styles/shared';
import {AlertCircleIcon} from '@/components/common/icon/Icons';
import {SignOutButton} from '@/components/common/button/Buttons';

function App() {
    const {user, restaurantId, loading} = useAuthUser();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Suspense fallback={<LoadingSpinner message="Sayfa Yükleniyor..." />}>
            {!user ? (
                <Login />
            ) : user.email === 'erenuguz301@gmail.com' ? (
                <SuperAdminPanel />
            ) : restaurantId ? (
                <div>
                    <AdminPanel restaurantId={restaurantId} />
                    <ScrollToTopButton />
                </div>
            ) : (
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
                                margin: '0 0 12px',
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
                                margin: '0 0 24px',
                                lineHeight: 1.5,
                            }}
                        >
                            Hesabınıza tanımlanmış bir işletme yok. Lütfen
                            sistem yöneticisi ile iletişime geçin.
                        </p>

                        <SignOutButton onClick={() => auth.signOut()} />
                    </div>
                </div>
            )}
        </Suspense>
    );
}

export default App;
