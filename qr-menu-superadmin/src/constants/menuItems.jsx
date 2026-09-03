import {
    PackageIcon,
    TagIcon,
    SettingsIcon,
} from '@/components/common/icon/Icons';

export const adminMenuItems = [
    {
        id: 'products',
        label: 'Ürünler',
        icon: <PackageIcon size={18} />,
    },
    {
        id: 'categories',
        label: 'Kategoriler',
        icon: <TagIcon size={18} />,
    },
    {
        id: 'settings',
        label: 'Ayarlar',
        icon: <SettingsIcon size={18} />,
    },
];
