import React from 'react';

const BaseButton = ({
    children,
    onClick,
    type = 'button',
    bgColor = 'transparent',
    textColor = 'var(--textSecondary)',
    borderColor = 'transparent',
    padding = '10px 20px',
    borderRadius = 'var(--radiusSmall)',
    fontWeight = 'var(--font-medium)',
    fontSize = 'var(--font-small)',
    disabled = false,
    isLoading = false,
    loadingText = 'Yükleniyor...',
    icon = null,
    style = {},
    ...props
}) => {
    const isActionDisabled = disabled || isLoading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isActionDisabled}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding,
                backgroundColor: bgColor,
                color: textColor,
                border:
                    borderColor === 'transparent'
                        ? 'none'
                        : `1px solid ${borderColor}`,
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
