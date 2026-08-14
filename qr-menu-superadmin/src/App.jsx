import React from 'react';
import {auth} from '@/firebaseConfig';
import {
    Login,
    AdminPanel,
    SuperAdminPanel,
    ScrollToTopButton,
    LoadingSpinner,
    useAuthUser,
} from '@/';

function App() {
    const {kullanici, restoranId, yukleniyor} = useAuthUser();

    if (yukleniyor) return <LoadingSpinner />;

    // Giriş yapan kimse yoksa
    if (!kullanici) {
        return <Login />;
    }

    // Giriş yapan Patron (Sen) isen
    if (kullanici.email === 'erenuguz301@gmail.com') {
        return <SuperAdminPanel />;
    }

    // Giriş yapan kişi bir Restoran Sahibi ise
    if (restoranId) {
        return (
            <div>
                <AdminPanel restoranId={restoranId} />
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
                    textAlign: 'center',
                    backgroundColor: 'var(--surface)',
                    padding: '40px',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border)',
                    maxWidth: '420px',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--dangerBg)',
                        color: 'var(--danger)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
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

                <button
                    onClick={() => auth.signOut()}
                    style={{
                        width: '100%',
                        padding: '12px 24px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--textWhite)',
                        border: 'none',
                        borderRadius: 'var(--radiusSmall)',
                        fontWeight: 'var(--font-semibold)',
                        fontSize: 'var(--font-input)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = 'var(--primaryHover)')
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = 'var(--primary)')
                    }
                >
                    Çıkış Yap
                </button>
            </div>
        </div>
    );
}

export default App;
