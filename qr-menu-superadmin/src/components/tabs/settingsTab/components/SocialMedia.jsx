import React from 'react';
import {cardStyle, inputStyle, smallLabelStyle, iconContainerStyle} from '@/';

const SosyalMedya = ({
    instagram,
    setInstagram,
    whatsapp,
    setWhatsapp,
    updateField,
}) => {
    return (
        <div style={cardStyle}>
            {/* Kart Başlığı */}
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px',
                    alignItems: 'center',
                }}
            >
                <div style={{display: 'flex', gap: '8px'}}>
                    {/* Instagram ikonu */}
                    <div
                        style={{
                            ...iconContainerStyle,
                            backgroundColor: 'var(--instaBg)',
                            color: 'var(--insta)',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </div>

                    {/* WhatsApp ikonu */}
                    <div
                        style={{
                            ...iconContainerStyle,
                            backgroundColor: 'var(--whatsappBg)',
                            color: 'var(--whatsapp)',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h3
                        style={{
                            margin: '0 0 4px 0',
                            fontSize: 'var(--font-body)',
                            fontWeight: 'var(--font-semibold)',
                            color: 'var(--text)',
                        }}
                    >
                        İletişim & Sosyal Medya
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-small)',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        İsteğe bağlı — QR menü footer'ında gösterilir
                    </p>
                </div>
            </div>

            {/* Alanlar */}
            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                {/* Instagram */}
                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>
                        INSTAGRAM KULLANICI ADI
                    </label>
                    <div style={{position: 'relative'}}>
                        <span
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--insta)',
                                fontSize: '14px',
                                fontWeight: 'var(--font-semibold)',
                            }}
                        >
                            @
                        </span>
                        <input
                            type="text"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            onBlur={(e) =>
                                updateField('instagram', e.target.value)
                            }
                            placeholder="kullaniciadi"
                            style={{
                                ...inputStyle,
                                padding: '12px 16px 12px 36px',
                            }}
                        />
                    </div>
                </div>

                {/* WhatsApp */}
                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>
                        WHATSAPP SİPARİŞ / İLETİŞİM NO
                    </label>
                    <div style={{position: 'relative'}}>
                        <svg
                            style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--whatsapp)',
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <input
                            type="text"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            onBlur={(e) =>
                                updateField('whatsapp', e.target.value)
                            }
                            placeholder="05551234567"
                            style={{
                                ...inputStyle,
                                padding: '12px 16px 12px 40px',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SosyalMedya;
