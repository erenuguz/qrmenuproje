import {
    CONTACT_EMAIL,
    CONTACT_PHONE,
    WHATSAPP_LINK,
} from '@/pages/welcomeScreen/constants/welcomeData';

const ContactSection = () => {
    return (
        <section className="dm-contact-cta">
            <div className="dm-final-cta-box">
                <h2>Hâlâ kararsız mısınız?</h2>
                <p>14 gün ücretsiz deneyin, beğenmezseniz ödemezsiniz.</p>
                <a href="/register" className="dm-btn-primary dm-cta-large">
                    Ücretsiz Başla →
                </a>
            </div>

            <div className="dm-contact-info">
                <p className="dm-eyebrow">YA DA BİZE ULAŞIN</p>
                <div className="dm-contact-links">
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="dm-contact-btn"
                    >
                        ✉️ {CONTACT_EMAIL}
                    </a>
                    <a
                        href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                        className="dm-contact-btn"
                    >
                        📞 {CONTACT_PHONE}
                    </a>
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="dm-contact-btn whatsapp"
                    >
                        💬 WhatsApp'tan Yaz →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
