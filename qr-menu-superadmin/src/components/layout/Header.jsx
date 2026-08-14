import React from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '@/firebaseConfig';

const Header = ({sidebarAcik, setSidebarAcik, restoranData}) => {
    const cikisYap = () => {
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
                    <button
                        className="hamburger-btn"
                        onClick={() => setSidebarAcik(!sidebarAcik)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: 'var(--radiusSmall)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'var(--hover)';
                            e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'transparent';
                            e.currentTarget.style.color = 'var(--text)';
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

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
                            boxShadow: 'var(--shadow)', // Logoya hafif derinlik
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                        </svg>
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
                            {restoranData?.name || 'Admin Paneli'}
                        </h2>
                    </div>
                </div>

                {/* Çıkış */}
                <button
                    onClick={cikisYap}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: 'transparent',
                        color: 'var(--textSecondary)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'var(--font-semibold)', // 600 yerine tema değişkeni
                        fontSize: 'var(--font-caption)',
                        borderRadius: 'var(--radiusSmall)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--danger)';
                        e.currentTarget.style.backgroundColor =
                            'var(--dangerBg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--textSecondary)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Çıkış
                </button>
            </header>
        </div>
    );
};

export default Header;
