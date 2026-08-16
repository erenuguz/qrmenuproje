import {useState, useMemo} from 'react';

/**
 * Metni Türkçe karakter kurallarına göre küçük harfe dönüştürür.
 */
const normalizeText = (text) => {
    if (text == null) return '';
    return String(text).toLocaleLowerCase('tr-TR').trim();
};

/**
 * İç içe obje özelliklerini güvenli bir şekilde getirir.
 * Örn: 'category.name'
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
 * @param {Array<string>} searchKeys - Aramanın yapılacağı alanların adları
 * @param {Object} options - Ek filtreleme ve ayarlar
 * @param {Function} [options.extraFilter] - Ekstra filtre fonksiyonu
 */
export const useSearch = (data = [], searchKeys = [], options = {}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const {extraFilter} = options;

    // Inline dizi referansı değişse bile useMemo'nun
    // gereksiz çalışmasını engellemek için key stringleşimi
    const searchKeysKey = Array.isArray(searchKeys) ? searchKeys.join(',') : '';

    const filteredData = useMemo(() => {
        let result = data;

        // 1. Ekstra filtre varsa uygula
        if (typeof extraFilter === 'function') {
            result = result.filter(extraFilter);
        }

        // 2. Arama metnini normalize et
        const normalizedQuery = normalizeText(searchQuery);

        // Arama boşsa filtrelenmiş veriyi direkt döndür
        if (!normalizedQuery) {
            return result;
        }

        // 3. Türkçe karakter duyarlı arama
        return result.filter((item) => {
            // searchKeys verilmemişse objenin tüm değerlerinde ara
            if (!searchKeys || searchKeys.length === 0) {
                return Object.values(item).some((val) =>
                    normalizeText(val).includes(normalizedQuery)
                );
            }

            // Belirtilen alanlarda ara
            return searchKeys.some((key) => {
                const val = getNestedValue(item, key);

                return normalizeText(val).includes(normalizedQuery);
            });
        });
    }, [data, searchQuery, searchKeysKey, extraFilter]);

    return {
        searchQuery,
        setSearchQuery,
        filteredData,
        totalResults: filteredData.length,
        clearSearch: () => setSearchQuery(''),
    };
};
