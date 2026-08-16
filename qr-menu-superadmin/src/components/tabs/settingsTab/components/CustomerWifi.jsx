import React from 'react';
import {cardStyle, inputStyle, smallLabelStyle, iconContainerStyle} from '@/';

const CustomerWifi = ({
    wifiNetworkName,
    setWifiNetworkName,
    wifiPassword,
    setWifiPassword,
    updateField,
}) => {
    return (
        <div style={cardStyle}>
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
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
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
                        Müşteri Wi-Fi
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-small)',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        İsteğe bağlı — QR menüde gösterilir
                    </p>
                </div>
            </div>

            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>AĞ ADI (SSID)</label>
                    <input
                        type="text"
                        value={wifiNetworkName}
                        onChange={(e) => setWifiNetworkName(e.target.value)}
                        onBlur={(e) =>
                            updateField('wifiNetworkName', e.target.value)
                        }
                        placeholder="Örn: MutluKebap_Misafir"
                        style={inputStyle}
                    />
                </div>
                <div style={{flex: '1 1 300px'}}>
                    <label style={smallLabelStyle}>ŞİFRE</label>
                    <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        onBlur={(e) =>
                            updateField('wifiPassword', e.target.value)
                        }
                        placeholder="Örn: 12345678"
                        style={inputStyle}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerWifi;
