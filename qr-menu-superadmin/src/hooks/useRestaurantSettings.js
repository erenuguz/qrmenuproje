import {useState, useEffect} from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {uploadImageAndGetUrl, useToast} from '@/';

export const useRestaurantSettings = (restaurantId, restaurantData) => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [wifiNetworkName, setWifiNetworkName] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [isLogoLoading, setIsLogoLoading] = useState(false);

    useEffect(() => {
        if (restaurantData) {
            setName(restaurantData.name || '');
            setLogo(restaurantData.logo || '');
            setWifiNetworkName(restaurantData.wifiNetworkName || '');
            setWifiPassword(restaurantData.wifiPassword || '');
            setInstagram(restaurantData.instagram || '');
            setWhatsapp(restaurantData.whatsapp || '');
        }
    }, [restaurantData]);

    const updateField = async (fieldName, newValue) => {
        if (restaurantData && restaurantData[fieldName] === newValue) return;
        try {
            await updateDoc(doc(db, 'restaurants', restaurantId), {
                [fieldName]: newValue,
            });
            console.log(`${fieldName} başarıyla güncellendi!`);
        } catch (error) {
            console.error('Güncelleme hatası:', error);
        }
    };

    const handleLogoFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsLogoLoading(true);
            const url = await uploadImageAndGetUrl(file, () => {});
            if (url) {
                setLogo(url);
                await updateField('logo', url);
            } else {
                toast.error('Logo yüklenirken hata oluştu.');
            }
            setIsLogoLoading(false);
        }
    };

    return {
        state: {
            name,
            logo,
            wifiNetworkName,
            wifiPassword,
            instagram,
            whatsapp,
            isLogoLoading,
        },
        setters: {
            setName,
            setLogo,
            setWifiNetworkName,
            setWifiPassword,
            setInstagram,
            setWhatsapp,
        },
        handlers: {updateField, handleLogoFileSelect},
    };
};
