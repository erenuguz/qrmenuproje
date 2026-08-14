import {useState, useMemo} from 'react';

/**
 * Metni Türkçe karakter kurallarına göre küçük harfe dönüştürür.
 */
const normalizeText = (text) => {
    if (text == null) return '';
    return String(text).toLocaleLowerCase('tr-TR').trim();
};

/**
 * İç içe obje özelliklerini güvenli bir şekilde getirir (Örn: 'category.name')
 */
const getNestedValue = (obj, path) => {
    if (!obj || !path) return '';
    return path
        .split('.')
        .reduce(
            (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''),
            obj
        );
};

/**
 * Performanslı, Türkçe destekli ve generic arama hook'u.
 *
 * @param {Array} data - Arama yapılacak veri dizisi
 * @param {Array<string>} searchKeys - Aramanın yapılacağı alanların adları (örn: ['name', 'category.title'])
 * @param {Object} options - Ek filtreleme ve ayarlar
 * @param {Function} [options.extraFilter] - Ekstra kategori/durum filtresi fonksiyonu (item => boolean)
 */
export const useSearch = (data = [], searchKeys = [], options = {}) => {
    const [aramaMetni, setAramaMetni] = useState('');
    const {extraFilter} = options;

    // Inline dizi referansı değişse bile useMemo'nun gereksiz çalışmasını engellemek için key stringleşimi
    const searchKeysKey = Array.isArray(searchKeys) ? searchKeys.join(',') : '';

    const filtrelenmisVeri = useMemo(() => {
        let sonuc = data;

        // 1. Adım: Ekstra Filtre Fonksiyonu (Kategori, Durum vs.) Varsa Uygula
        if (typeof extraFilter === 'function') {
            sonuc = sonuc.filter(extraFilter);
        }

        // 2. Adım: Arama Metni Boşsa Doğrudan Veriyi Dön (O(1) Hızlı Çıkış)
        const aranan = normalizeText(aramaMetni);
        if (!aranan) {
            return sonuc;
        }

        // 3. Adım: Türkçe Karakter Duyarlı Arama
        return sonuc.filter((item) => {
            // Eğer searchKeys boş verilmişse, doğrudan objenin kendi değerlerinde ara
            if (!searchKeys || searchKeys.length === 0) {
                return Object.values(item).some((val) =>
                    normalizeText(val).includes(aranan)
                );
            }

            // Belirtilen key'lerde ara
            return searchKeys.some((key) => {
                const val = getNestedValue(item, key);
                return normalizeText(val).includes(aranan);
            });
        });
    }, [data, aramaMetni, searchKeysKey, extraFilter]);

    return {
        aramaMetni,
        setAramaMetni,
        filtrelenmisVeri,
        toplamSonuc: filtrelenmisVeri.length,
        aramaTemizle: () => setAramaMetni(''),
    };
};
