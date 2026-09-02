import {useState} from 'react';
import {DEMO_INFO} from '@/constants/welcomeData';

const DemoSection = () => {
    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <section className="dm-demo-section" id="demo">
            <div className="dm-section-head">
                <div className="dm-eyebrow">ŞEFFAFLIK</div>
                <h2 style={{color: 'var(--text-light)'}}>
                    Sistemi Canlı Test Edin
                </h2>
                <p className="dm-sub" style={{margin: '16px auto 0'}}>
                    Kayıt olmadan, kredi kartı girmeden sistemin nasıl
                    çalıştığını kendi gözlerinizle görün.
                </p>
            </div>

            <div className="dm-demo-grid">
                {/* YÖNETİM PANELİ */}
                <div className="dm-demo-card">
                    <div className="dm-demo-card-header">🛠 YÖNETİM PANELİ</div>
                    <div className="dm-demo-card-body">
                        <div className="dm-demo-credentials">
                            <div className="cred-row">
                                <span className="cred-label">E-Posta</span>
                                <div className="cred-value-wrap">
                                    <strong>{DEMO_INFO.adminEmail}</strong>
                                    <button
                                        onClick={() =>
                                            handleCopy(
                                                DEMO_INFO.adminEmail,
                                                'email'
                                            )
                                        }
                                        className="dm-copy-btn"
                                    >
                                        {copiedField === 'email'
                                            ? '✓'
                                            : 'Kopyala'}
                                    </button>
                                </div>
                            </div>
                            <div className="cred-row mt-2">
                                <span className="cred-label">Şifre</span>
                                <div className="cred-value-wrap">
                                    <strong>{DEMO_INFO.adminPass}</strong>
                                    <button
                                        onClick={() =>
                                            handleCopy(
                                                DEMO_INFO.adminPass,
                                                'pass'
                                            )
                                        }
                                        className="dm-copy-btn"
                                    >
                                        {copiedField === 'pass'
                                            ? '✓'
                                            : 'Kopyala'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <a
                            href={DEMO_INFO.adminUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="dm-btn-primary full-width"
                        >
                            Panele Giriş →
                        </a>
                    </div>
                </div>

                {/* MÜŞTERİ GÖRÜNÜMÜ */}
                <div className="dm-demo-card customer-demo">
                    <div className="dm-demo-card-header">
                        📱 MÜŞTERİ GÖRÜNÜMÜ
                    </div>
                    <div className="dm-demo-card-body text-center">
                        <div className="dm-demo-mockup">
                            <div className="mockup-screen">
                                <div className="mockup-title">
                                    {DEMO_INFO.menuName}
                                </div>
                                <div className="mockup-lines">
                                    <div className="line" />
                                    <div className="line short" />
                                    <div className="line" />
                                </div>
                            </div>
                        </div>
                        <a
                            href={DEMO_INFO.menuUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="dm-btn-secondary full-width"
                        >
                            Canlı Menüyü Gör
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
