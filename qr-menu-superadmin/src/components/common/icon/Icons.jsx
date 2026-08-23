import React from 'react';
import BaseIcon from './BaseIcon';

export const WifiIcon = ({
    size = 17,
    strokeWidth = 2.2,
    color = 'currentColor',
    ...props
}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} color={color} {...props}>
        <path d="M5 13a10 10 0 0 1 14 0" />
        <path d="M8.5 16.5a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1" fill={color} stroke="none" />
    </BaseIcon>
);

export const CopyIcon = ({size = 13, strokeWidth = 2.2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </BaseIcon>
);

export const CheckIcon = ({size = 13, strokeWidth = 2.6, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="20 6 9 17 4 12" />
    </BaseIcon>
);

export const InstagramIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </BaseIcon>
);

export const WhatsappIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M3 21l1.65-4.95A9 9 0 1 1 8.05 19.35Z" />
        <path d="M8.5 9a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5.5.5 0 0 0-.4.8 5 5 0 0 0 3.6 2.6.5.5 0 0 0 .8-.4.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1c0 1.1-.9 2-2 2A6 6 0 0 1 7 10c0-1.1.9-2 2-2" />
    </BaseIcon>
);

// --- Toast / Durum İkonları ---

export const SuccessIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </BaseIcon>
);

export const ErrorIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </BaseIcon>
);

export const InfoIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </BaseIcon>
);

export const UploadIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </BaseIcon>
);

export const ChevronDownIcon = ({size = 14, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="6 9 12 15 18 9" />
    </BaseIcon>
);

export const ChevronUpIcon = ({size = 14, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="18 15 12 9 6 15" />
    </BaseIcon>
);
export const MenuIcon = ({size = 24, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </BaseIcon>
);

export const LogoutIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </BaseIcon>
);
export const CubeIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
    </BaseIcon>
);
export const TagIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </BaseIcon>
);
export const FolderIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </BaseIcon>
);

// Ürün / Paket İkonu (3D Kutu Detaylı)
export const PackageIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </BaseIcon>
);
export const SearchIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </BaseIcon>
);
export const HomeIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </BaseIcon>
);

export const MailIcon = ({size = 14, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </BaseIcon>
);
export const TrashIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </BaseIcon>
);
export const StoreIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M3 9h18v2" />
        <path d="M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9" />
        <path d="M2 7h20l-2-5H4L2 7z" />
    </BaseIcon>
);

export const SettingsIcon = ({size = 18, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </BaseIcon>
);
export const AlertCircleIcon = ({size = 28, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </BaseIcon>
);
export const LockIcon = ({size = 24, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </BaseIcon>
);

export const CheckCircleIcon = ({size = 16, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </BaseIcon>
);

export const EyeIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </BaseIcon>
);

export const EyeOffIcon = ({size = 20, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </BaseIcon>
);
