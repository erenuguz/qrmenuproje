import React, {useState} from 'react';
import BaseButton from './BaseButton';
import {
    ChevronLeftIcon,
    CheckIcon,
    CopyIcon,
} from '@/components/common/icon/Icons';

export const BackButton = ({
    onClick,
    size = '36px',
    iconSize = 18,
    ariaLabel = 'Geri dön',
    style = {},
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const activeBg = isHovered
        ? 'color-mix(in srgb, var(--primary) 15%, transparent)'
        : 'var(--background)';

    const activeColor = isHovered ? 'var(--primary)' : 'var(--text)';

    return (
        <BaseButton
            onClick={onClick}
            aria-label={ariaLabel}
            bgColor={activeBg}
            textColor={activeColor}
            borderColor="transparent"
            padding="0"
            borderRadius="50%"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            style={{
                width: size,
                height: size,
                minWidth: size,
                transform: isPressed ? 'scale(0.92)' : 'scale(1)',
                transition: 'all 0.15s ease',
                ...style,
            }}
            {...props}
        >
            <ChevronLeftIcon size={iconSize} strokeWidth={2.3} />
        </BaseButton>
    );
};

export const PillButton = ({
    children,
    isActive = false,
    onClick,
    id,
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            id={id}
            onClick={onClick}
            bgColor={isActive ? 'var(--primary)' : 'var(--surface)'}
            textColor={isActive ? 'var(--textWhite)' : 'var(--text)'}
            borderColor={isActive ? 'var(--primary)' : 'var(--border)'}
            padding="8px 14px"
            borderRadius="25px"
            fontWeight="var(--font-semibold)"
            fontSize="var(--font-caption)"
            style={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                ...style,
            }}
            {...props}
        >
            {children}
        </BaseButton>
    );
};

export const CopyButton = ({
    textToCopy,
    label,
    successLabel = 'Kopyalandı',
    style = {},
    ...props
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (event) => {
        event?.stopPropagation();

        if (!textToCopy || !navigator.clipboard) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        } catch {
            setIsCopied(false);
        }
    };

    return (
        <BaseButton
            onClick={handleCopy}
            bgColor={isCopied ? 'var(--successBg)' : 'var(--background)'}
            textColor={isCopied ? 'var(--success)' : 'var(--text)'}
            borderColor={isCopied ? 'var(--success)' : 'var(--border)'}
            padding="8px 12px"
            borderRadius="var(--radiusSmall)"
            fontSize="var(--font-caption)"
            fontWeight="var(--font-semibold)"
            icon={
                isCopied ? (
                    <CheckIcon size={13} color="var(--success)" />
                ) : (
                    <CopyIcon size={13} color="currentColor" />
                )
            }
            style={{
                flexShrink: 0,
                ...style,
            }}
            {...props}
        >
            {isCopied ? successLabel : label || textToCopy}
        </BaseButton>
    );
};
export const FloatingButton = ({
    onClick,
    icon,
    position = 'fixed',
    bottom = '25px',
    right = '25px',
    size = '50px',
    bgColor = 'var(--primary)',
    textColor = 'var(--textWhite)',
    shadow = '0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent)',
    ariaLabel = 'Yukarı Çık',
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            onClick={onClick}
            aria-label={ariaLabel}
            bgColor={bgColor}
            textColor={textColor}
            borderColor="transparent"
            padding="0"
            borderRadius="50%"
            icon={icon}
            style={{
                position,
                bottom,
                right,
                zIndex: 1000,
                width: size,
                height: size,
                minWidth: size,
                boxShadow: shadow,
                ...style,
            }}
            {...props}
        />
    );
};
