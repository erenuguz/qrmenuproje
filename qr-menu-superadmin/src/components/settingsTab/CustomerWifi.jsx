import Input from '@/components/common/Input';
import SectionHeader from '@/components/settingsTab/SectionHeader';
import {sectionCardStyle, smallLabelStyle} from '@/styles/shared';
import {WifiIcon} from '@/components/common/icon/Icons';

const CustomerWifi = ({
    wifiNetworkName,
    setWifiNetworkName,
    wifiPassword,
    setWifiPassword,
    updateField,
}) => {
    return (
        <div
            style={{
                ...sectionCardStyle,
            }}
        >
            {/* Kart Başlığı */}
            <SectionHeader
                title="Müşteri Wi-Fi"
                subtitle="İsteğe bağlı — QR menüde gösterilir"
                icon={<WifiIcon size={20} />}
                iconBg="var(--infoBg)"
                iconColor="var(--info)"
            />

            <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                <div style={{flex: '1 1 300px'}}>
                    <Input
                        label="AĞ ADI (SSID)"
                        labelStyle={smallLabelStyle}
                        value={wifiNetworkName}
                        onChange={(e) => setWifiNetworkName(e.target.value)}
                        onBlur={(e) =>
                            updateField('wifiNetworkName', e.target.value)
                        }
                        placeholder="Örn: MutluKebap_Misafir"
                    />
                </div>

                <div style={{flex: '1 1 300px'}}>
                    <Input
                        label="ŞİFRE"
                        labelStyle={smallLabelStyle}
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        onBlur={(e) =>
                            updateField('wifiPassword', e.target.value)
                        }
                        placeholder="Örn: 12345678"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerWifi;
