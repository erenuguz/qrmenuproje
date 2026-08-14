const IMGBB_API_KEY = 'fdf64556ac25daf69d608d8fc66e23f3';

export const resimYukleVeUrlAl = async (dosya, setResimYukleniyor) => {
    if (!dosya) return null;

    setResimYukleniyor(true);

    try {
        const formData = new FormData();

        formData.append('image', dosya);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {method: 'POST', body: formData}
        );

        const data = await response.json();

        if (data.success) {
            setResimYukleniyor(false);

            return data.data.url;
        } else {
            throw new Error('Yükleme reddedildi');
        }
    } catch (error) {
        console.error(error);
        setResimYukleniyor(false);
        return null;
    }
};
