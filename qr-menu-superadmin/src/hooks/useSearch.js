import {useMemo, useState} from 'react';

const EMPTY_ARRAY = [];

const normalizeText = (text) => {
    if (text == null) return '';

    return String(text).toLocaleLowerCase('tr-TR').trim();
};

const getNestedValue = (object, path) => {
    if (!object || !path) return '';

    return path
        .split('.')
        .reduce(
            (value, key) => (value?.[key] !== undefined ? value[key] : ''),
            object
        );
};

export const useSearch = (
    data = EMPTY_ARRAY,
    searchKeys = EMPTY_ARRAY,
    options = {}
) => {
    const [searchQuery, setSearchQuery] = useState('');

    const {extraFilter} = options;

    const filteredData = useMemo(() => {
        let result = data;

        if (typeof extraFilter === 'function') {
            result = result.filter(extraFilter);
        }

        const normalizedQuery = normalizeText(searchQuery);

        if (!normalizedQuery) {
            return result;
        }

        return result.filter((item) => {
            if (searchKeys.length === 0) {
                return Object.values(item).some((value) =>
                    normalizeText(value).includes(normalizedQuery)
                );
            }

            return searchKeys.some((key) => {
                const value = getNestedValue(item, key);

                return normalizeText(value).includes(normalizedQuery);
            });
        });
    }, [data, searchQuery, searchKeys, extraFilter]);

    return {
        searchQuery,
        setSearchQuery,
        filteredData,
        totalResults: filteredData.length,
        clearSearch: () => setSearchQuery(''),
    };
};
