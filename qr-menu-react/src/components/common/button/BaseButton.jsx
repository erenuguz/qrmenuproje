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

    success: {
        bgColor: 'var(--successBg)',
        textColor: 'var(--success)',
        borderColor: 'var(--success)',
        hoverBgColor: 'var(--success)',
        hoverTextColor: 'var(--textWhite)',
        hoverBorderColor: 'var(--success)',
    },

    danger: {
        bgColor: 'var(--dangerBg)',
        textColor: 'var(--danger)',
        borderColor: 'var(--danger)',
        hoverBgColor: 'var(--danger)',
        hoverTextColor: 'var(--textWhite)',
        hoverBorderColor: 'var(--danger)',
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

    className = '',
    style = {},
    ...props
}) => {
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

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isActionDisabled}
            aria-busy={isLoading || undefined}
            className={`ui-button ${className}`.trim()}
            style={{
                '--ui-button-bg': resolvedBgColor,
                '--ui-button-color': resolvedTextColor,
                '--ui-button-border': resolvedBorderColor,
                '--ui-button-hover-bg': resolvedHoverBgColor,
                '--ui-button-hover-color': resolvedHoverTextColor,
                '--ui-button-hover-border': resolvedHoverBorderColor,

                padding,
                borderRadius,
                fontWeight,
                fontSize,

                cursor: isActionDisabled
                    ? isLoading
                        ? 'wait'
                        : 'not-allowed'
                    : 'pointer',

                ...style,
            }}
            {...props}
        >
            {isLoading ? (
                loadingText
            ) : (
                <>
                    {icon && (
                        <span
                            style={{
                                display: 'inline-flex',
                            }}
                        >
                            {icon}
                        </span>
                    )}

                    {children}
                </>
            )}
        </button>
    );
};

export default BaseButton;
