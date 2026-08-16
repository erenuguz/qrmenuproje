import React from 'react';
import {
    GeneralInfo,
    CustomerWifi,
    SocialMedia,
    PageHeader,
    useRestaurantSettings,
} from '@/';

const SettingsTab = ({restaurantId, restaurantData}) => {
    const {state, setters, handlers} = useRestaurantSettings(
        restaurantId,
        restaurantData
    );

    return (
        <div>
            {/* Sayfa Üst Kısmı (Header) */}
            <PageHeader
                title="Ayarlar"
                subtitle="Restoranın genel bilgilerini ve iletişim adreslerini özelleştirin. Değişiklikler otomatik kaydedilir."
            />

            {/* Ayar Kartları */}
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <GeneralInfo
                    name={state.name}
                    setName={setters.setName}
                    logo={state.logo}
                    isLogoLoading={state.isLogoLoading}
                    handleLogoFileSelect={handlers.handleLogoFileSelect}
                    updateField={handlers.updateField}
                />

                <CustomerWifi
                    wifiNetworkName={state.wifiNetworkName}
                    setWifiNetworkName={setters.setWifiNetworkName}
                    wifiPassword={state.wifiPassword}
                    setWifiPassword={setters.setWifiPassword}
                    updateField={handlers.updateField}
                />

                <SocialMedia
                    instagram={state.instagram}
                    setInstagram={setters.setInstagram}
                    whatsapp={state.whatsapp}
                    setWhatsapp={setters.setWhatsapp}
                    updateField={handlers.updateField}
                />
            </div>
        </div>
    );
};

export default SettingsTab;
