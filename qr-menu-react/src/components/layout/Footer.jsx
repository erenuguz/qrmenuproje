import React, {useState} from 'react';

const Footer = ({restaurantData}) => {
    const {
        wifiNetworkName = '',
        wifiPassword = '',
        instagram = '',
        whatsapp = '',
    } = restaurantData || {};

    const [isCopied, setIsCopied] = useState(false);

    if (
    !wifiNetworkName &&
    !wifiPassword &&
    !instagram &&
    !whatsapp
) {
    return null;
}

    const copyPassword = () => {
        if (!wifiPassword) return;
        navigator.clipboard?.writeText(wifiPassword);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <footer
            style={{
                marginTop: '32px',
                padding: '32px 20px 40px',
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                fontFamily: 'var(--font-family)',
            }}
        >
            <div style={{maxWidth: '480px', margin: '0 auto'}}>
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <span
                        style={{
                            fontSize: 'var(--font-small)',
                            fontWeight: 'var(--font-semibold)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        İşletme Bilgileri
                    </span>
                </div>

                {(wifiNetworkName || wifiPassword) && (
                    <div
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radiusLarge)',
                            padding: '16px 18px',
                            marginBottom: '12px',
                            boxShadow: 'var(--shadow)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <div
                                style={{
                                    flexShrink: 0,
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: 'var(--radius)',
                                    backgroundColor:
                                        'color-mix(in srgb, var(--primary) 15%, transparent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <WifiIcon color="var(--primary)" />
                            </div>

                            <div style={{flex: 1, minWidth: 0}}>
                                {wifiNetworkName && (
                                    <div
                                        style={{
                                            fontSize: 'var(--font-small)',
                                            color: 'var(--textSecondary)',
                                            marginBottom: '2px',
                                        }}
                                    >
                                        Ağ Adı
                                    </div>
                                )}
                                {wifiNetworkName && (
                                    <div
                                        style={{
                                            fontSize: 'var(--font-body)',
                                            fontWeight: 'var(--font-semibold)',
                                            color: 'var(--text)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {wifiNetworkName}
                                    </div>
                                )}
                            </div>

                            {wifiPassword && (
                                <button
                                    onClick={copyPassword}
                                    style={{
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        border: '1px solid',
                                        borderColor: isCopied
                                            ? 'var(--success)'
                                            : 'var(--border)',
                                        backgroundColor: isCopied
                                            ? 'var(--successBg)'
                                            : 'var(--background)',
                                        color: isCopied
                                            ? 'var(--success)'
                                            : 'var(--text)',
                                        borderRadius: 'var(--radiusSmall)',
                                        padding: '8px 12px',
                                        fontSize: 'var(--font-caption)',
                                        fontWeight: 'var(--font-semibold)',
                                        fontFamily: 'var(--font-family)',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                                    {isCopied ? 'Kopyalandı' : wifiPassword}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {(instagram || whatsapp) && (
                    <div style={{display: 'flex', gap: '10px'}}>
                        {instagram && (
                            <a
                                href={`https://instagram.com/${instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={linkStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'var(--primary)';
                                    e.currentTarget.style.color =
                                        'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'var(--border)';
                                    e.currentTarget.style.color = 'var(--text)';
                                }}
                            >
                                <InstagramIcon />
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
                                    e.currentTarget.style.borderColor =
                                        'var(--primary)';
                                    e.currentTarget.style.color =
                                        'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'var(--border)';
                                    e.currentTarget.style.color = 'var(--text)';
                                }}
                            >
                                <WhatsappIcon />
                                <span>WhatsApp</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
};

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
    transition: 'border-color 0.15s ease, color 0.15s ease',
};

const WifiIcon = ({color}) => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 13a10 10 0 0 1 14 0" />
        <path d="M8.5 16.5a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1" fill={color} stroke="none" />
    </svg>
);
const CopyIcon = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);
const CheckIcon = () => (
    <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const InstagramIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const WhatsappIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35Z" />
        <path d="M8.5 9a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5.5.5 0 0 0-.4.8 5 5 0 0 0 3.6 2.6.5.5 0 0 0 .8-.4.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1c0 1.1-.9 2-2 2A6 6 0 0 1 7 10c0-1.1.9-2 2-2" />
    </svg>
);

export default Footer;
