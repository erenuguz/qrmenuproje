const Footer = () => {
    return (
        <footer className="dm-footer">
            <div className="dm-footer-top">
                <div className="dm-footer-brand">
                    <strong>QR</strong>MENÜ
                </div>
                <div className="dm-footer-links">
                    <a href="#ozellikler">Özellikler</a>
                    <a href="#nasil-calisir">Nasıl Çalışır?</a>
                    <a href="#fiyatlar">Fiyatlar</a>
                    <a href="#sss">SSS</a>
                    <a href="/gizlilik-politikasi">Gizlilik Politikası</a>
                    <a href="/kvkk">KVKK</a>
                </div>
            </div>
            <div className="dm-footer-bottom">
                © {new Date().getFullYear()} QRMENÜ — scanmenu.com.tr — Tüm
                hakları saklıdır.
            </div>
        </footer>
    );
};

export default Footer;
