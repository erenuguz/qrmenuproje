import {InstagramIcon, WhatsappIcon} from '@/components/common/icon/Icons';

const SocialLinks = ({instagram, whatsapp}) => {
    if (!instagram && !whatsapp) return null;

    return (
        <div style={{display: 'flex', gap: '10px'}}>
            {instagram && (
                <a
                    href={`https://instagram.com/${instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link social-link--instagram"
                >
                    <InstagramIcon size={18} color="var(--insta)" />
                    <span>Instagram</span>
                </a>
            )}

            {whatsapp && (
                <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link social-link--whatsapp"
                >
                    <WhatsappIcon size={18} color="var(--whatsapp)" />
                    <span>WhatsApp</span>
                </a>
            )}
        </div>
    );
};

export default SocialLinks;
