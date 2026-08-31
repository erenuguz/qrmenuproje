const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const uploadImageAndGetUrl = async (
    file,
    setImageLoading = () => {}
) => {
    if (!file) {
        throw new Error('Yüklenecek görsel bulunamadı.');
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        throw new Error('Yalnızca JPG, PNG veya WebP görseller yüklenebilir.');
    }

    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error('Görsel boyutu en fazla 2 MB olabilir.');
    }

    if (!IMGBB_API_KEY) {
        throw new Error('Görsel yükleme servisi yapılandırılmamış.');
    }

    setImageLoading(true);

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${encodeURIComponent(
                IMGBB_API_KEY
            )}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(
                `Görsel yükleme servisi isteği reddetti (${response.status}).`
            );
        }

        if (!data?.success || !data?.data?.url) {
            throw new Error('Görsel yükleme servisi geçersiz yanıt verdi.');
        }

        return data.data.url;
    } catch (error) {
        console.error('Görsel yükleme hatası:', error);
        throw error;
    } finally {
        setImageLoading(false);
    }
};
