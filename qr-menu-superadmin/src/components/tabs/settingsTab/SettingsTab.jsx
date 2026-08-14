import React from 'react';
import {
    GenelBilgiler,
    MusteriWifi,
    SosyalMedya,
    PageHeader,
    useRestaurantSettings,
} from '@/';

const SettingsTab = ({restoranId, restoranData}) => {
    const {state, setters, handlers} = useRestaurantSettings(
        restoranId,
        restoranData
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
                <GenelBilgiler
                    ad={state.ad}
                    setAd={setters.setAd}
                    logo={state.logo}
                    logoYukleniyor={state.logoYukleniyor}
                    logoDosyasiSecildi={handlers.logoDosyasiSecildi}
                    alaniGuncelle={handlers.alaniGuncelle}
                />

                <MusteriWifi
                    wifiAgAdi={state.wifiAgAdi}
                    setWifiAgAdi={setters.setWifiAgAdi}
                    wifiSifre={state.wifiSifre}
                    setWifiSifre={setters.setWifiSifre}
                    alaniGuncelle={handlers.alaniGuncelle}
                />

                <SosyalMedya
                    instagram={state.instagram}
                    setInstagram={setters.setInstagram}
                    whatsapp={state.whatsapp}
                    setWhatsapp={setters.setWhatsapp}
                    alaniGuncelle={handlers.alaniGuncelle}
                />
            </div>
        </div>
    );
};

export default SettingsTab;
