import React, {useState} from 'react';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import {auth} from '@/firebaseConfig';
import {inputStyle} from '@/';
import {
    LockIcon,
    AlertCircleIcon,
    CheckCircleIcon,
    EyeIcon,
    EyeOffIcon,
} from '@/components/common/icon/Icons';
import {
    SubmitButton,
    ForgotPasswordButton,
    PasswordToggleButton,
} from '@/components/common/button/Buttons';

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
                        <LockIcon size={24} />
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
                        <AlertCircleIcon size={16} />
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
                        <CheckCircleIcon size={16} />
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
                            <ForgotPasswordButton
                                onClick={handleForgotPassword}
                                disabled={loading}
                            />
                        </div>

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

                            {password.length > 0 && (
                                <PasswordToggleButton
                                    showPassword={showPassword}
                                    onPressStart={() => setShowPassword(true)}
                                    onPressEnd={() => setShowPassword(false)}
                                />
                            )}
                        </div>
                    </div>

                    <SubmitButton
                        loading={loading}
                        loadingText="İşlem Yapılıyor..."
                        label="Giriş Yap"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
