import React, {useRef} from 'react';
import {cardStyle, inputStyle, smallLabelStyle, iconContainerStyle} from '@/';

const GenelBilgiler = ({
    ad,
    setAd,
    logo,
    logoYukleniyor,
    logoDosyasiSecildi,
    alaniGuncelle,
}) => {
    const dosyaInputRef = useRef(null);

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
                <div
                    style={{
                        ...iconContainerStyle,
                        backgroundColor: 'var(--infoBg)',
                        color: 'var(--info)',
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
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
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
                        Genel Bilgiler
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-small)',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        Restoran adı ve logo ayarları
                    </p>
                </div>
            </div>

            {/* Form Alanı */}
            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>RESTORAN ADI</label>
                    <input
                        type="text"
                        value={ad}
                        onChange={(e) => setAd(e.target.value)}
                        onBlur={(e) => alaniGuncelle('name', e.target.value)}
                        placeholder="Restoran adını girin"
                        style={inputStyle}
                    />
                </div>

                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>LOGO</label>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        {/* Logo Önizleme Yuvarlağı */}
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--badge)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}
                        >
                            {logoYukleniyor ? (
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: 'var(--textMuted)',
                                    }}
                                >
                                    ...
                                </span>
                            ) : logo ? (
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 'var(--font-bold)',
                                        color: 'var(--textMuted)',
                                    }}
                                >
                                    {ad
                                        ? ad.substring(0, 2).toUpperCase()
                                        : 'LG'}
                                </span>
                            )}
                        </div>

                        {/* Dosya Seç Butonu */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                flex: 1,
                            }}
                        >
                            <button
                                onClick={() => dosyaInputRef.current.click()}
                                style={{
                                    padding: '10px 16px',
                                    backgroundColor: 'var(--surface)',
                                    border: '1px dashed var(--border)',
                                    borderRadius: 'var(--radiusSmall)',
                                    color: 'var(--textSecondary)',
                                    fontSize: 'var(--font-small)',
                                    fontWeight: 'var(--font-medium)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    width: '100%',
                                    maxWidth: '200px',
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                Dosya Seç
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={logoDosyasiSecildi}
                                ref={dosyaInputRef}
                                style={{display: 'none'}}
                            />
                            <span
                                style={{
                                    fontSize: '11px',
                                    color: 'var(--textMuted)',
                                }}
                            >
                                PNG, JPG — maks. 2 MB
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenelBilgiler;
