import {useEffect, useState} from 'react';
import {MENU_ITEMS} from '@/constants/welcomeData';
import QrIcon from '@/assets/icons/QrIcon';

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
        <header className="dm-hero" id="top">
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
                        <QrIcon />
                    </div>
                    <div className="dm-ticket-lines">
                        {MENU_ITEMS.slice(0, 3).map((item, i) => (
                            <div
                                key={item.title}
                                className={`dm-ticket-line ${i < revealed ? 'visible' : ''}`}
                            >
                                <span>{item.title}</span>
                                <span>✓</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dm-hero-actions">
                <a className="dm-btn-primary dm-hero-btn" href="/register">
                    Ücretsiz 14 Gün Dene →
                </a>
                <a className="dm-btn-secondary dm-hero-btn" href="#demo">
                    Canlı Demo İzle ▶
                </a>
            </div>

            <div className="dm-hero-proofs">
                <span>✓ Kredi kartı gerekmez</span>
                <span>✓ Kurulum 5 dk</span>
                <span>✓ İptal istediğinde</span>
            </div>
        </header>
    );
};

export default HeroSection;
