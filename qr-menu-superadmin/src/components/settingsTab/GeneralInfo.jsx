import React, {useRef} from 'react';

import {UploadImageButton, SectionHeader, Input} from '@/';
import {
    sectionCardStyle,
    smallLabelStyle,
    iconContainerStyle,
} from '@/styles/shared';
import {HomeIcon} from '@/components/common/icon/Icons';

const GeneralInfo = ({
    name,
    setName,
    logo,
    isLogoLoading,
    handleLogoFileSelect,
    updateField,
}) => {
    const fileInputRef = useRef(null);

    return (
        <div
            style={{
                ...sectionCardStyle,
            }}
        >
            {/* Kart Başlığı */}
            <SectionHeader
                title="Genel Bilgiler"
                subtitle="Restoran adı ve logo ayarları"
                icon={<HomeIcon size={20} />}
                iconBg="var(--infoBg)"
                iconColor="var(--info)"
            />

            {/* Form Alanı */}
            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                {/* Yeni Input Bileşeni Kullanımı */}
                <div style={{flex: '1 1 300px'}}>
                    <Input
                        label="RESTORAN ADI"
                        labelStyle={smallLabelStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => updateField('name', e.target.value)}
                        placeholder="Restoran adını girin"
                    />
                </div>

                {/* Logo Alanı */}
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
                            {isLogoLoading ? (
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
                                    {name
                                        ? name.substring(0, 2).toUpperCase()
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
                            <UploadImageButton
                                onClick={() => fileInputRef.current.click()}
                                borderRadius="var(--radiusSmall)"
                                padding="10px 16px"
                                style={{
                                    width: '100%',
                                    maxWidth: '200px',
                                    justifyContent: 'center',
                                }}
                            >
                                Dosya Seç
                            </UploadImageButton>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoFileSelect}
                                ref={fileInputRef}
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

export default GeneralInfo;
