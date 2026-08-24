import React from 'react';
import {InstagramIcon, WhatsappIcon} from '@/components/common/icon/Icons';

const linkStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: 'var(--text)',
    fontWeight: 'var(--font-semibold)',
    fontSize: 'var(--font-caption)',
    padding: '12px 16px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    transition:
        'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
};

const SocialLinks = ({instagram, whatsapp}) => {
    if (!instagram && !whatsapp) return null;

    return (
        <div style={{display: 'flex', gap: '10px'}}>
            {instagram && (
                <a
                    href={`https://instagram.com/${instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--insta)';
                        e.currentTarget.style.color = 'var(--insta)';
                        e.currentTarget.style.backgroundColor =
                            'var(--instaBg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.backgroundColor =
                            'var(--surface)';
                    }}
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
                    style={linkStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--whatsapp)';
                        e.currentTarget.style.color = 'var(--whatsapp)';
                        e.currentTarget.style.backgroundColor =
                            'var(--whatsappBg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.backgroundColor =
                            'var(--surface)';
                    }}
                >
                    <WhatsappIcon size={18} color="var(--whatsapp)" />
                    <span>WhatsApp</span>
                </a>
            )}
        </div>
    );
};

export default SocialLinks;
