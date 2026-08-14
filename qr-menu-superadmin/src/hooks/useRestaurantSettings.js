import {useState, useEffect} from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {resimYukleVeUrlAl, useToast} from '@/';

export const useRestaurantSettings = (restoranId, restoranData) => {
    const toast = useToast();
    const [ad, setAd] = useState('');
    const [logo, setLogo] = useState('');
    const [wifiAgAdi, setWifiAgAdi] = useState('');
    const [wifiSifre, setWifiSifre] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [logoYukleniyor, setLogoYukleniyor] = useState(false);

    useEffect(() => {
        if (restoranData) {
            setAd(restoranData.name || '');
            setLogo(restoranData.logo || '');
            setWifiAgAdi(restoranData.wifiAgAdi || '');
            setWifiSifre(restoranData.wifiSifre || '');
            setInstagram(restoranData.instagram || '');
            setWhatsapp(restoranData.whatsapp || '');
        }
    }, [restoranData]);

    const alaniGuncelle = async (alanAdi, yeniDeger) => {
        if (restoranData && restoranData[alanAdi] === yeniDeger) return;
        try {
            await updateDoc(doc(db, 'restaurants', restoranId), {
                [alanAdi]: yeniDeger,
            });
            console.log(`${alanAdi} başarıyla güncellendi!`);
        } catch (error) {
            console.error('Güncelleme hatası:', error);
        }
    };

    const logoDosyasiSecildi = async (e) => {
        const dosya = e.target.files[0];
        if (dosya) {
            setLogoYukleniyor(true);
            const url = await resimYukleVeUrlAl(dosya, () => {});
            if (url) {
                setLogo(url);
                await alaniGuncelle('logo', url);
            } else {
                toast.error('Logo yüklenirken hata oluştu.');
            }
            setLogoYukleniyor(false);
        }
    };

    return {
        state: {
            ad,
            logo,
            wifiAgAdi,
            wifiSifre,
            instagram,
            whatsapp,
            logoYukleniyor,
        },
        setters: {
            setAd,
            setLogo,
            setWifiAgAdi,
            setWifiSifre,
            setInstagram,
            setWhatsapp,
        },
        handlers: {alaniGuncelle, logoDosyasiSecildi},
    };
};
