import {useState} from 'react';

const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <nav className="dm-header">
            <div className="dm-header-logo">
                <a
                    href="#top"
                    style={{textDecoration: 'none', color: 'inherit'}}
                >
                    <strong>QR</strong>MENÜ
                </a>
            </div>

            {/* Desktop Menu */}
            <div className="dm-header-links">
                <a href="#ozellikler">Özellikler</a>
                <a href="#nasil-calisir">Nasıl Çalışır?</a>
                <a href="#fiyatlar">Fiyatlar</a>
            </div>
            <div className="dm-header-actions">
                <a
                    href="https://admin.scanmenu.com.tr"
                    className="dm-btn-ghost"
                >
                    Giriş Yap
                </a>
                <a href="#fiyatlar" className="dm-btn-primary">
                    Ücretsiz Dene →
                </a>
            </div>

            {/* Mobile Hamburger */}
            <button
                className="dm-hamburger"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                ☰
            </button>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="dm-mobile-drawer">
                    <a
                        href="#ozellikler"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        Özellikler
                    </a>
                    <a
                        href="#nasil-calisir"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        Nasıl Çalışır?
                    </a>
                    <a href="#fiyatlar" onClick={() => setIsMobileOpen(false)}>
                        Fiyatlar
                    </a>
                    <hr />
                    <a href="https://admin.scanmenu.com.tr">Giriş Yap</a>
                    <a href="#fiyatlar" className="dm-drawer-primary">
                        Ücretsiz Dene →
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Header;
