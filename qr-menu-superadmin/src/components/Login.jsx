import React, {useState} from 'react';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import {auth} from '@/firebaseConfig';
import {inputStyle} from '@/';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setInfo('');
        try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Hatalı e-posta veya şifre!');
            setLoading(false);
            setPassword('');
        }
    };

    const handleForgotPassword = async () => {
        if (!email)
            return setError('Lütfen önce e-posta adresinizi kutuya yazın.');
        try {
            setLoading(true);
            setError('');
            setInfo('');
            await sendPasswordResetEmail(auth, email);
            setInfo(
                'Şifre sıfırlama linki e-postanıza gönderildi! Gelen kutunuzu kontrol edin.'
            );
        } catch (err) {
            setError('Şifre sıfırlama e-postası gönderilemedi.');
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: 'var(--font-caption)',
        fontWeight: 'var(--font-semibold)',
        color: 'var(--textSecondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    };

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
                    backgroundColor: 'var(--surface)',
                    width: '100%',
                    maxWidth: '420px',
                    padding: '40px',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border)',
                }}
            >
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--textWhite)',
                            borderRadius: 'var(--radiusSmall)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: 'var(--shadow)',
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
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2
                        style={{
                            margin: 0,
                            color: 'var(--text)',
                            fontSize: 'var(--font-h3)',
                            fontWeight: 'var(--font-bold)',
                        }}
                    >
                        Yönetici Girişi
                    </h2>
                    <p
                        style={{
                            margin: '8px 0 0 0',
                            color: 'var(--textSecondary)',
                            fontSize: 'var(--font-caption)',
                        }}
                    >
                        Sisteme erişmek için bilgilerinizi girin.
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            color: 'var(--danger)',
                            backgroundColor: 'var(--dangerBg)',
                            padding: '12px 16px',
                            borderRadius: 'var(--radiusSmall)',
                            fontSize: 'var(--font-caption)',
                            fontWeight: 'var(--font-medium)',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
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
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}

                {info && (
                    <div
                        style={{
                            color: 'var(--success)',
                            backgroundColor: 'var(--successBg)',
                            padding: '12px 16px',
                            borderRadius: 'var(--radiusSmall)',
                            fontSize: 'var(--font-caption)',
                            fontWeight: 'var(--font-medium)',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
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
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {info}
                    </div>
                )}

                <form
                    onSubmit={handleSignIn}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div>
                        <label style={labelStyle}>E-posta</label>
                        <input
                            type="email"
                            required
                            placeholder="admin@ornek.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                ...inputStyle,
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = 'var(--primary)')
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor =
                                    'var(--inputBorder)')
                            }
                        />
                    </div>

                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px',
                            }}
                        >
                            <label style={{...labelStyle, marginBottom: 0}}>
                                Şifre
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                disabled={loading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--textMuted)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--font-small)',
                                    fontWeight: 'var(--font-medium)',
                                    padding: 0,
                                }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = 'var(--primary)')
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color = 'var(--textMuted)')
                                }
                            >
                                Şifremi Unuttum
                            </button>
                        </div>

                        {/* Şifre Alanı ve Göster/Gizle Butonu */}
                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    ...inputStyle,
                                    // Şifre boşken normal padding, doluyken ikonun metinle çakışmaması için sağa boşluk
                                    paddingRight:
                                        password.length > 0 ? '40px' : '16px',
                                    transition:
                                        'border-color 0.2s, padding-right 0.2s',
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor =
                                        'var(--primary)')
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor =
                                        'var(--inputBorder)')
                                }
                            />

                            {/* Sadece şifre alanına bir şey yazıldığında ikonu göster */}
                            {password.length > 0 && (
                                <button
                                    type="button"
                                    // Masaüstü için bas-çek olayları
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)}
                                    // Mobil dokunmatik ekranlar için bas-çek olayları
                                    onTouchStart={(e) => {
                                        e.preventDefault(); // Mobilde metin seçimini veya klavye kaymasını önler
                                        setShowPassword(true);
                                    }}
                                    onTouchEnd={() => setShowPassword(false)}
                                    title="Şifreyi görmek için basılı tutun"
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        // Basılı tutulduğunda rengi canlandır
                                        color: showPassword
                                            ? 'var(--primary)'
                                            : 'var(--textMuted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '4px',
                                        transition: 'color 0.2s ease',
                                        userSelect: 'none',
                                        WebkitUserSelect: 'none',
                                        outline: 'none',
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                >
                                    {showPassword ? (
                                        /* Göz Açık İkonu (Basılı tutulurken) */
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5" // İkonu biraz daha dolgun gösterir
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                            ></circle>
                                        </svg>
                                    ) : (
                                        /* Göz Kapalı / Çizgili İkon (Normal durum) */
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line
                                                x1="1"
                                                y1="1"
                                                x2="23"
                                                y2="23"
                                            ></line>
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '14px',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--textWhite)',
                            border: 'none',
                            borderRadius: 'var(--radiusSmall)',
                            fontWeight: 'var(--font-semibold)',
                            fontSize: 'var(--font-body)',
                            cursor: loading ? 'wait' : 'pointer',
                            marginTop: '10px',
                            transition: 'background-color 0.2s',
                            opacity: loading ? 0.8 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!loading)
                                e.target.style.backgroundColor =
                                    'var(--primaryHover)';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading)
                                e.target.style.backgroundColor =
                                    'var(--primary)';
                        }}
                    >
                        {loading ? 'İşlem Yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
