import {useEffect, useState} from 'react';
import {MENU_ITEMS} from '@/components/pages/welcomeScreen/constants/welcomeData';

const HeroSection = () => {
    const [revealed, setRevealed] = useState(0);

    useEffect(() => {
        if (revealed >= 3) return;
        const t = setTimeout(
            () => setRevealed((r) => r + 1),
            500 + revealed * 350
        );
        return () => clearTimeout(t);
    }, [revealed]);

    return (
        <header className="dm-hero">
            <div className="dm-eyebrow">QR MENÜ SİSTEMİ</div>
            <h1 className="dm-h1">
                Menünüz artık cepte,
                <br />
                <em>saniyeler içinde</em>
            </h1>
            <p className="dm-sub">
                Müşterileriniz kamerayı açar, QR kodu okutur ve menünüz elinde
                olur — uygulama yok, bekleme yok, temassız ve modern.
            </p>

            <div className="dm-ticket-wrap">
                <div className="dm-ticket">
                    <div className="dm-ticket-head">
                        <span className="no">FİŞ NO. 0182</span>
                        <span className="status">CANLI</span>
                    </div>
                    <div className="dm-qr">
                        <div className="dm-scanline" />
                        <svg viewBox="0 0 100 100" fill="none">
                            <rect
                                x="8"
                                y="8"
                                width="26"
                                height="26"
                                rx="3"
                                stroke="#F7F2E7"
                                strokeWidth="6"
                            />
                            <rect
                                x="66"
                                y="8"
                                width="26"
                                height="26"
                                rx="3"
                                stroke="#F7F2E7"
                                strokeWidth="6"
                            />
                            <rect
                                x="8"
                                y="66"
                                width="26"
                                height="26"
                                rx="3"
                                stroke="#F7F2E7"
                                strokeWidth="6"
                            />
                            <rect
                                x="17"
                                y="17"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="75"
                                y="17"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="17"
                                y="75"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="46"
                                y="8"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="46"
                                y="24"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="62"
                                y="46"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="46"
                                y="46"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="46"
                                y="62"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="46"
                                y="78"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="78"
                                y="62"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="78"
                                y="78"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                            <rect
                                x="8"
                                y="46"
                                width="8"
                                height="8"
                                fill="#F7F2E7"
                            />
                        </svg>
                    </div>
                    <div className="dm-ticket-lines">
                        {MENU_ITEMS.map((item, i) => (
                            <div
                                key={item.title}
                                className={`dm-ticket-line ${i < revealed ? 'visible' : ''}`}
                            >
                                <span>{item.title}</span>
                                <span>{item.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <a className="dm-cta-primary" href="#olustur">
                Menünüzü Oluşturun →
            </a>
        </header>
    );
};

export default HeroSection;
