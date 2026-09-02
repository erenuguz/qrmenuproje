import {
    CONTACT_EMAIL,
    CONTACT_PHONE,
} from '@/components/pages/welcomeScreen/constants/welcomeData';

const ContactSection = () => {
    return (
        <section className="dm-contact">
            <div className="dm-stamp">
                <span>ONAYLI</span>
                <strong>QR</strong>
                <span>MENÜ</span>
            </div>
            <h2>İşletmeniz İçin Menü Zamanı</h2>
            <p>
                Kendi restoranınıza özel dijital menüyü birlikte hazırlayalım.
                Kurulum birkaç gün içinde tamamlanır.
            </p>
            <div className="dm-contact-links">
                <a href={`mailto:${CONTACT_EMAIL}`}>✉️ {CONTACT_EMAIL}</a>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>
                    📞 {CONTACT_PHONE}
                </a>
            </div>
        </section>
    );
};

export default ContactSection;
