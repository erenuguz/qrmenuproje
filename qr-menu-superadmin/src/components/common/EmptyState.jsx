import React from 'react';

export const EmptyState = ({
    icon,
    title,
    message,
    minHeight = 'auto',
    iconBg = 'var(--badge)',
    style = {},
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight,
                gap: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                fontFamily: 'var(--font-family)',
                ...style,
            }}
        >
            {icon && (
                <div
                    aria-hidden="true"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        marginBottom: '4px',
                    }}
                >
                    {icon}
                </div>
            )}

            {title && (
                <h2
                    style={{
                        margin: 0,
                        fontSize: 'var(--font-h3)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--text)',
                    }}
                >
                    {title}
                </h2>
            )}

            {message && (
                <p
                    style={{
                        margin: 0,
                        maxWidth: '280px',
                        fontSize: 'var(--font-caption)',
                        color: 'var(--textSecondary)',
                        lineHeight: 1.6,
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default EmptyState;
