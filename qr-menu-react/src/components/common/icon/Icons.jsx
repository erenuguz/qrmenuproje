import BaseIcon from './BaseIcon';

export const ChevronLeftIcon = ({size = 14, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="15 18 9 12 15 6" />
    </BaseIcon>
);
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
export const ChevronUpIcon = ({size = 14, strokeWidth = 2, ...props}) => (
    <BaseIcon size={size} strokeWidth={strokeWidth} {...props}>
        <polyline points="18 15 12 9 6 15" />
    </BaseIcon>
);
