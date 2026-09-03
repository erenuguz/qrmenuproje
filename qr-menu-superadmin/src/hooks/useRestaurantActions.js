import {useState} from 'react';
import {useToast} from '@/hooks/useToast';
import {createRestaurantService} from '@/hooks/services/restaurant/createRestaurant';
import {deleteRestaurantService} from '@/hooks/services/restaurant/deleteRestaurant';
import {TEMPLATE_ID} from '@/hooks/services/restaurant/restaurantTemplate';

export const useRestaurantActions = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const toast = useToast();

    const addRestaurant = async (
        newId,
        newName,
        newEmail,
        newPassword,
        confirmPassword,
        onSuccess
    ) => {
        const cleanId = String(newId || '')
            .trim()
            .toLowerCase();
        const cleanName = String(newName || '').trim();
        const cleanEmail = String(newEmail || '')
            .trim()
            .toLowerCase();
        const password = String(newPassword ?? '');
        const passwordConfirmation = String(confirmPassword ?? '');

        if (!cleanId || !cleanName || !cleanEmail || !password) {
            toast.error('Tüm alanları doldurun!');
            return;
        }

        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanId)) {
            toast.error(
                'Sistem ID yalnızca küçük harf, rakam ve tire içerebilir.'
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            toast.error('Geçerli bir e-posta adresi girin.');
            return;
        }

        if (password !== passwordConfirmation) {
            toast.error('Girdiğiniz şifreler eşleşmiyor.');
            return;
        }

        if (password.length < 6) {
            toast.error('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (/\s/.test(password)) {
            toast.error('Şifre boşluk içeremez.');
            return;
        }

        const confirmed = window.confirm(
            `"${cleanName}" oluşturulup ${cleanEmail} adresine davet gönderilecek. Onaylıyor musunuz?`
        );

        if (!confirmed) return;

        try {
            setIsProcessing(true);

            await createRestaurantService({
                cleanId,
                cleanName,
                cleanEmail,
                password,
            });

            toast.success(
                'Restoran ve yönetici hesabı oluşturuldu. Giriş bilgilerini kullanıcıyla paylaşabilirsiniz.'
            );

            onSuccess?.();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error(
                    'Bu e-posta adresi zaten başka bir hesapta kullanılıyor.'
                );
                return;
            }

            if (error.code === 'auth/weak-password') {
                toast.error('Girdiğiniz şifre yeterince güçlü değil.');
                return;
            }
            console.error('Restoran oluşturma hatası:', error);
            toast.error(
                error?.message
                    ? `Hata: ${error.message}`
                    : 'Restoran oluşturulamadı.'
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteRestaurant = async (id, name) => {
        const cleanId = String(id || '').trim();

        if (!cleanId) {
            toast.error('Silinecek restoran ID’si bulunamadı.');
            return;
        }

        if (cleanId === TEMPLATE_ID) {
            toast.error('Taslak restoran silinemez.');
            return;
        }

        const confirmed = window.confirm(
            `DİKKAT: "${name}" ve bütün menü verileri tamamen silinecek! Onaylıyor musunuz?`
        );

        if (!confirmed) return;

        try {
            setIsProcessing(true);

            const wasDeleted = await deleteRestaurantService(cleanId);

            if (!wasDeleted) {
                toast.info('Restoran zaten silinmiş.');
                return;
            }

            toast.success(`"${name}" tamamen silindi.`);
        } catch (error) {
            console.error('Restoran silme hatası:', error);

            if (error.code === 'permission-denied') {
                toast.error(
                    'Restoran silinemedi. Bu işlem yalnızca SuperAdmin tarafından yapılabilir.'
                );
            } else {
                toast.error(error.message || 'Restoran silinemedi.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        addRestaurant,
        deleteRestaurant,
        isProcessing,
    };
};
