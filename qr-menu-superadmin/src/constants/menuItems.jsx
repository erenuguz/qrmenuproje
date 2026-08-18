import {
    StoreIcon,
    PackageIcon,
    TagIcon,
    SettingsIcon,
} from '@/components/common/icon/Icons';

export const superAdminMenuItems = [
    {
        id: 'restaurants',
        label: 'Restoran Yönetimi',
        icon: <StoreIcon size={18} />,
    },
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
