import React from 'react';
import Input from '@/components/common/Input';
import SectionHeader from '@/components/settingsTab/SectionHeader';
import {
    sectionCardStyle,
    smallLabelStyle,
    iconContainerStyle,
} from '@/styles/shared';
import {InstagramIcon, WhatsappIcon} from '@/components/common/icon/Icons';

const SocialMedia = ({
    instagram,
    setInstagram,
    whatsapp,
    setWhatsapp,
    updateField,
}) => {
    return (
        <div
            style={{
                ...sectionCardStyle,
            }}
        >
            <SectionHeader
                title="İletişim & Sosyal Medya"
                subtitle="İsteğe bağlı — QR menü footer'ında gösterilir"
                icon={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--instaBg)',
                                color: 'var(--insta)',
                            }}
                        >
                            <InstagramIcon size={20} />
                        </div>

                        <div
                            style={{
                                ...iconContainerStyle,
                                backgroundColor: 'var(--whatsappBg)',
                                color: 'var(--whatsapp)',
                            }}
                        >
                            <WhatsappIcon size={20} />
                        </div>
                    </div>
                }
            />

            {/* Alanlar */}
            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                {/* Instagram */}
                <div style={{flex: '1 1 300px'}}>
                    <Input
                        label="INSTAGRAM KULLANICI ADI"
                        labelStyle={smallLabelStyle}
                        icon={
                            <span
                                style={{
                                    color: 'var(--insta)',
                                    fontSize: 'var(--font-caption)',
                                    fontWeight: 'var(--font-semibold)',
                                }}
                            >
                                @
                            </span>
                        }
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        onBlur={(e) => updateField('instagram', e.target.value)}
                        placeholder="kullaniciadi"
                    />
                </div>

                {/* WhatsApp */}
                <div style={{flex: '1 1 300px'}}>
                    <Input
                        label="WHATSAPP SİPARİŞ / İLETİŞİM NO"
                        labelStyle={smallLabelStyle}
                        icon={
                            <WhatsappIcon size={16} color="var(--whatsapp)" />
                        }
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        onBlur={(e) => updateField('whatsapp', e.target.value)}
                        placeholder="05551234567"
                    />
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;
