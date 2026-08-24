import React, {useState} from 'react';

const BUTTON_VARIANTS = {
    default: {
        bgColor: 'transparent',
        textColor: 'var(--textSecondary)',
        borderColor: 'transparent',
    },

    primary: {
        bgColor: 'var(--primary)',
        textColor: 'var(--textWhite)',
        borderColor: 'var(--primary)',
        hoverBgColor: 'var(--primaryHover)',
        hoverBorderColor: 'var(--primaryHover)',
    },

    secondary: {
        bgColor: 'var(--surface)',
        textColor: 'var(--text)',
        borderColor: 'var(--border)',
        hoverBgColor: 'var(--hover)',
    },

    ghost: {
        bgColor: 'transparent',
        textColor: 'var(--textSecondary)',
        borderColor: 'transparent',
        hoverBgColor: 'var(--hover)',
        hoverTextColor: 'var(--text)',
    },

    danger: {
        bgColor: 'var(--dangerBg)',
        textColor: 'var(--danger)',
        borderColor: 'var(--danger)',
        hoverBgColor: 'var(--danger)',
        hoverTextColor: 'var(--textWhite)',
    },
};

const BaseButton = ({
    children,
    onClick,
    type = 'button',
    variant = 'default',

    bgColor,
    textColor,
    borderColor,

    hoverBgColor,
    hoverTextColor,
    hoverBorderColor,

    padding = '10px 20px',
    borderRadius = 'var(--radiusSmall)',
    fontWeight = 'var(--font-medium)',
    fontSize = 'var(--font-small)',

    disabled = false,
    isLoading = false,
    loadingText = 'Yükleniyor...',
    icon = null,

    onPointerEnter,
    onPointerLeave,
    onPointerCancel,

    style = {},
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const isActionDisabled = disabled || isLoading;
    const variantStyle = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.default;

    const resolvedBgColor = bgColor ?? variantStyle.bgColor;
    const resolvedTextColor = textColor ?? variantStyle.textColor;
    const resolvedBorderColor = borderColor ?? variantStyle.borderColor;

    const resolvedHoverBgColor =
        hoverBgColor ?? variantStyle.hoverBgColor ?? resolvedBgColor;

    const resolvedHoverTextColor =
        hoverTextColor ?? variantStyle.hoverTextColor ?? resolvedTextColor;

    const resolvedHoverBorderColor =
        hoverBorderColor ??
        variantStyle.hoverBorderColor ??
        resolvedBorderColor;

    const shouldShowHover = isHovered && !isActionDisabled;

    const currentBorderColor = shouldShowHover
        ? resolvedHoverBorderColor
        : resolvedBorderColor;

    const handlePointerEnter = (event) => {
        if (event.pointerType === 'mouse' && !isActionDisabled) {
            setIsHovered(true);
        }

        onPointerEnter?.(event);
    };

    const handlePointerLeave = (event) => {
        setIsHovered(false);
        onPointerLeave?.(event);
    };

    const handlePointerCancel = (event) => {
        setIsHovered(false);
        onPointerCancel?.(event);
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isActionDisabled}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerCancel={handlePointerCancel}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding,

                backgroundColor: shouldShowHover
                    ? resolvedHoverBgColor
                    : resolvedBgColor,

                color: shouldShowHover
                    ? resolvedHoverTextColor
                    : resolvedTextColor,

                border:
                    currentBorderColor === 'transparent'
                        ? 'none'
                        : `1px solid ${currentBorderColor}`,

                borderRadius,
                fontWeight,
                fontSize,

                cursor: isActionDisabled
                    ? isLoading
                        ? 'wait'
                        : 'not-allowed'
                    : 'pointer',

                opacity: isActionDisabled ? 0.6 : 1,

                transition:
                    'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',

                ...style,
            }}
            {...props}
        >
            {isLoading ? (
                loadingText
            ) : (
                <>
                    {icon && (
                        <span style={{display: 'inline-flex'}}>{icon}</span>
                    )}

                    {children}
                </>
            )}
        </button>
    );
};

export default BaseButton;
