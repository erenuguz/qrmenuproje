import React, {useEffect, useState} from 'react';

const CONTACT_EMAIL = 'erenn.uguz@gmail.com';
const CONTACT_PHONE = '+90 541 534 01 87';

const MENU_ITEMS = [
    {
        course: 'BAŞLANGIÇ',
        title: 'Hızlı Kurulum',
        tag: '5 DK',
        desc: 'Uygulama indirmeden, sadece kamerayla QR okutarak menünüze anında ulaşılır.',
    },
    {
        course: 'ANA YEMEK',
        title: 'Anında Güncelleme',
        tag: 'SINIRSIZ',
        desc: 'Fiyat ve ürünleri panelden değiştirin, baskı masrafı ve bekleme süresi olmadan.',
    },
    {
        course: 'TATLI',
        title: 'Markanıza Özel Tasarım',
        tag: '%100 SİZE ÖZEL',
        desc: 'Logo ve renklerinizle uyumlu, göz yormayan şık bir dijital menü arayüzü.',
    },
];

const WelcomeScreen = () => {
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
        <div className="dm-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        * { box-sizing: border-box; }

        .dm-root {
          --ink: #16261E;
          --green-deep: #1F3D2E;
          --green-line: #375646;
          --paper: #F7F2E7;
          --paper-dim: #EFE8D8;
          --saffron: #E7A33E;
          --rust: #C0432E;
          --text-light: #F7F2E7;
          --text-dim: #B9C9BE;

          font-family: 'Work Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          width: 100%;
          overflow-x: hidden;
        }

        .dm-root a, .dm-root button { font-family: inherit; }

        /* ---------- HERO ---------- */
        .dm-hero {
          background: radial-gradient(ellipse 120% 80% at 50% -10%, #274A38 0%, var(--green-deep) 55%, var(--ink) 100%);
          color: var(--text-light);
          padding: 72px 24px 96px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dm-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.28em;
          color: var(--saffron);
          margin-bottom: 22px;
          font-weight: 600;
        }

        .dm-h1 {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 7vw, 4.6rem);
          line-height: 0.98;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          margin: 0 0 22px;
          max-width: 820px;
        }

        .dm-h1 em {
          font-style: normal;
          color: var(--saffron);
        }

        .dm-sub {
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          color: var(--text-dim);
          max-width: 480px;
          line-height: 1.6;
          margin: 0 0 56px;
        }

        /* ---------- TICKET (signature element) ---------- */
        .dm-ticket-wrap {
          perspective: 1000px;
          margin-bottom: 8px;
        }

        .dm-ticket {
          position: relative;
          width: min(320px, 82vw);
          background: var(--paper);
          color: var(--ink);
          border-radius: 4px;
          padding: 28px 24px 22px;
          transform: rotate(-2.5deg);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.03);
        }

        .dm-ticket::before {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -9px;
          height: 18px;
          background:
            radial-gradient(circle at 9px 0, transparent 9px, var(--paper) 9.5px) 0 0 / 18px 18px repeat-x;
        }

        .dm-ticket-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1.5px dashed #C9BFA4;
          padding-bottom: 12px;
          margin-bottom: 14px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .dm-ticket-head .no {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #8A8064;
        }

        .dm-ticket-head .status {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--rust);
          font-weight: 600;
        }

        .dm-qr {
          width: 100%;
          aspect-ratio: 1;
          background: var(--ink);
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
          display: grid;
          place-items: center;
        }

        .dm-qr svg { width: 72%; height: 72%; }

        .dm-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--saffron), transparent);
          animation: dm-scan 2.2s ease-in-out infinite;
        }

        @keyframes dm-scan {
          0% { top: 4%; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 92%; opacity: 1; }
          60% { opacity: 0; }
          100% { top: 92%; opacity: 0; }
        }

        .dm-ticket-lines {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
        }

        .dm-ticket-line {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px dotted #D8D0BA;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .dm-ticket-line.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dm-ticket-line span:last-child {
          color: #8A8064;
        }

        .dm-cta-primary {
          margin-top: 44px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--saffron);
          color: var(--ink);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 16px 30px;
          border-radius: 999px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px -8px rgba(231, 163, 62, 0.55);
        }

        .dm-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(231, 163, 62, 0.7);
        }

        /* ---------- MENU / FEATURES ---------- */
        .dm-menu {
          padding: 88px 24px 64px;
          max-width: 760px;
          margin: 0 auto;
        }

        .dm-menu-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .dm-menu-head .dm-eyebrow {
          color: var(--rust);
        }

        .dm-menu-head h2 {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(2rem, 4.5vw, 2.8rem);
          margin: 0;
          color: var(--ink);
        }

        .dm-menu-row {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 20px;
          align-items: start;
          padding: 26px 0;
          border-bottom: 1.5px dashed #D8D0BA;
        }

        .dm-menu-row:last-child { border-bottom: none; }

        .dm-menu-course {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #8A8064;
          padding-top: 6px;
        }

        .dm-menu-title {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          text-transform: uppercase;
          margin: 0 0 8px;
          color: var(--green-deep);
        }

        .dm-menu-desc {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
          color: #4B4A3E;
          max-width: 42ch;
        }

        .dm-menu-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--rust);
          white-space: nowrap;
          padding-top: 6px;
        }

        /* ---------- CONTACT / STAMP ---------- */
        .dm-contact {
          background: var(--ink);
          color: var(--text-light);
          padding: 88px 24px;
          text-align: center;
        }

        .dm-contact h2 {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(2rem, 5vw, 3.2rem);
          max-width: 620px;
          margin: 0 auto 18px;
          line-height: 1;
        }

        .dm-contact p {
          color: var(--text-dim);
          max-width: 440px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .dm-stamp {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          border: 2.5px solid var(--saffron);
          border-radius: 50%;
          width: 152px;
          height: 152px;
          transform: rotate(-8deg);
          color: var(--saffron);
          font-family: 'IBM Plex Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
          font-weight: 700;
          margin-bottom: 44px;
        }

        .dm-stamp strong {
          font-family: 'Big Shoulders Display', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0;
        }

        .dm-contact-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        .dm-contact-links a {
          color: var(--text-light);
          text-decoration: none;
          border: 1.5px solid var(--green-line);
          padding: 13px 26px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .dm-contact-links a:hover {
          border-color: var(--saffron);
          background: rgba(231,163,62,0.08);
        }

        .dm-footer {
          background: var(--ink);
          color: #6E7D74;
          text-align: center;
          font-size: 0.78rem;
          padding: 22px 24px 30px;
          border-top: 1px solid var(--green-line);
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }

        @media (max-width: 560px) {
          .dm-menu-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
          .dm-menu-tag { padding-top: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dm-scanline { animation: none; display: none; }
          .dm-ticket-line { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

            {/* HERO */}
            <header className="dm-hero">
                <div className="dm-eyebrow">QR MENÜ SİSTEMİ</div>
                <h1 className="dm-h1">
                    Menünüz artık cepte,
                    <br />
                    <em>saniyeler içinde</em>
                </h1>
                <p className="dm-sub">
                    Müşterileriniz kamerayı açar, QR kodu okutur ve menünüz
                    elinde olur — uygulama yok, bekleme yok, temassız ve modern.
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

                <a className="dm-cta-primary">Menünüzü Oluşturun →</a>
            </header>

            {/* MENU / FEATURES */}
            <section className="dm-menu">
                <div className="dm-menu-head">
                    <div className="dm-eyebrow">NEDEN DİJİTAL MENÜ</div>
                    <h2>Bugünün Menüsü</h2>
                </div>

                {MENU_ITEMS.map((item) => (
                    <div className="dm-menu-row" key={item.title}>
                        <div className="dm-menu-course">{item.course}</div>
                        <div>
                            <h3 className="dm-menu-title">{item.title}</h3>
                            <p className="dm-menu-desc">{item.desc}</p>
                        </div>
                        <div className="dm-menu-tag">{item.tag}</div>
                    </div>
                ))}
            </section>

            {/* CONTACT */}
            <section className="dm-contact">
                <div className="dm-stamp">
                    <span>ONAYLI</span>
                    <strong>QR</strong>
                    <span>MENÜ</span>
                </div>
                <h2>İşletmeniz İçin Menü Zamanı</h2>
                <p>
                    Kendi restoranınıza özel dijital menüyü birlikte
                    hazırlayalım. Kurulum birkaç gün içinde tamamlanır.
                </p>
                <div className="dm-contact-links">
                    <a href={`mailto:${CONTACT_EMAIL}`}>✉️ {CONTACT_EMAIL}</a>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>
                        📞 {CONTACT_PHONE}
                    </a>
                </div>
            </section>

            <div className="dm-footer">
                DİJİTAL MENÜ SİSTEMİ — TÜM HAKLARI SAKLIDIR
            </div>
        </div>
    );
};

export default WelcomeScreen;
