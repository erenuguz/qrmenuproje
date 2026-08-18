const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadImageAndGetUrl = async (file, setImageLoading) => {
    if (!file) return null;

    setImageLoading(true);

    try {
        const formData = new FormData();

        formData.append('image', file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {method: 'POST', body: formData}
        );

        const data = await response.json();

        if (data.success) {
            setImageLoading(false);

            return data.data.url;
        } else {
            throw new Error('Yükleme reddedildi');
        }
    } catch (error) {
        console.error(error);
        setImageLoading(false);
        return null;
    }
};
