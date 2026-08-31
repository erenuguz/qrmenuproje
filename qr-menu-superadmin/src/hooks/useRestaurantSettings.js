import {useEffect, useRef, useState} from 'react';
import {doc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {uploadImageAndGetUrl} from '@/utils/helpers';
import {useToast} from '@/hooks/useToast';

const EDITABLE_FIELDS = new Set([
    'name',
    'logo',
    'wifiNetworkName',
    'wifiPassword',
    'instagram',
    'whatsapp',
]);

const FIELD_LABELS = {
    name: 'Restoran adı',
    logo: 'Logo',
    wifiNetworkName: 'Wi-Fi ağ adı',
    wifiPassword: 'Wi-Fi şifresi',
    instagram: 'Instagram hesabı',
    whatsapp: 'WhatsApp numarası',
};

const getSaveErrorMessage = (error, fieldLabel) => {
    switch (error?.code) {
        case 'permission-denied':
            return `${fieldLabel} kaydedilemedi. Bu işlem için yetkiniz bulunmuyor.`;

        case 'unavailable':
            return `${fieldLabel} kaydedilemedi. İnternet bağlantınızı kontrol edin.`;

        case 'not-found':
            return 'Restoran kaydı bulunamadı.';

        default:
            return `${fieldLabel} kaydedilemedi. Lütfen tekrar deneyin.`;
    }
};

export const useRestaurantSettings = (restaurantId, restaurantData) => {
    const initializedRestaurantIdRef = useRef(null);
    const toast = useToast();

    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [wifiNetworkName, setWifiNetworkName] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [isLogoLoading, setIsLogoLoading] = useState(false);

    useEffect(() => {
        if (!restaurantId || !restaurantData) return;

        const isAlreadyInitialized =
            initializedRestaurantIdRef.current === restaurantId;

        if (isAlreadyInitialized) return;

        setName(restaurantData.name ?? '');
        setLogo(restaurantData.logo ?? '');
        setWifiNetworkName(restaurantData.wifiNetworkName ?? '');
        setWifiPassword(restaurantData.wifiPassword ?? '');
        setInstagram(restaurantData.instagram ?? '');
        setWhatsapp(restaurantData.whatsapp ?? '');

        initializedRestaurantIdRef.current = restaurantId;
    }, [restaurantId, restaurantData]);

    const setLocalFieldValue = (fieldName, value) => {
        const setters = {
            name: setName,
            logo: setLogo,
            wifiNetworkName: setWifiNetworkName,
            wifiPassword: setWifiPassword,
            instagram: setInstagram,
            whatsapp: setWhatsapp,
        };

        setters[fieldName]?.(value);
    };

    const updateField = async (fieldName, newValue) => {
        if (!restaurantId) {
            toast.error(
                'Restoran bilgisi bulunamadığı için ayar kaydedilemedi.'
            );
            return false;
        }

        if (!EDITABLE_FIELDS.has(fieldName)) {
            toast.error('Geçersiz ayar alanı.');
            return false;
        }

        const previousValue = restaurantData?.[fieldName] ?? '';

        const normalizedValue =
            fieldName === 'name'
                ? String(newValue ?? '').trim()
                : (newValue ?? '');

        if (fieldName === 'name' && !normalizedValue) {
            setName(previousValue);
            toast.error('Restoran adı boş bırakılamaz.');
            return false;
        }

        if (previousValue === normalizedValue) {
            setLocalFieldValue(fieldName, normalizedValue);
            return true;
        }

        try {
            await updateDoc(doc(db, 'restaurants', restaurantId), {
                [fieldName]: normalizedValue,
                updatedAt: serverTimestamp(),
            });

            setLocalFieldValue(fieldName, normalizedValue);
            return true;
        } catch (error) {
            console.error(`${fieldName} güncelleme hatası:`, error);

            // Başarısız kaydı ekranda başarılıymış gibi bırakma.
            setLocalFieldValue(fieldName, previousValue);

            toast.error(
                getSaveErrorMessage(error, FIELD_LABELS[fieldName] ?? 'Ayar')
            );

            return false;
        }
    };

    const handleLogoFileSelect = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Lütfen geçerli bir görsel dosyası seçin.');
            event.target.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Logo en fazla 2 MB olabilir.');
            event.target.value = '';
            return;
        }

        try {
            setIsLogoLoading(true);

            const url = await uploadImageAndGetUrl(file, () => {});

            if (!url) {
                toast.error('Logo yüklenemedi. Lütfen tekrar deneyin.');
                return;
            }

            await updateField('logo', url);
        } catch (error) {
            console.error('Logo yükleme hatası:', error);

            toast.error(
                error?.message ||
                    'Logo yüklenirken beklenmeyen bir hata oluştu.'
            );
        } finally {
            setIsLogoLoading(false);
            event.target.value = '';
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

        handlers: {
            updateField,
            handleLogoFileSelect,
        },
    };
};
