import React from 'react';
import WifiCard from './WifiCard';
import SocialLinks from './SocialLinks';

const Footer = ({restaurantData}) => {
    const {
        wifiNetworkName = '',
        wifiPassword = '',
        instagram = '',
        whatsapp = '',
    } = restaurantData || {};

    // Hiçbir bilgi yoksa Footer'ı hiç çizme
    if (!wifiNetworkName && !wifiPassword && !instagram && !whatsapp) {
        return null;
    }

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

                <WifiCard
                    networkName={wifiNetworkName}
                    password={wifiPassword}
                />

                <SocialLinks instagram={instagram} whatsapp={whatsapp} />
            </div>
        </footer>
    );
};

export default Footer;
