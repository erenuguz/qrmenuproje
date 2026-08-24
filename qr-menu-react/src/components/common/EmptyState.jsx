import React from 'react';

const EmptyState = ({
    icon,
    title,
    message,
    minHeight = 'auto',
    iconBg = 'var(--badge)', // Varsayılan ikon arka planı
    style = {},
}) => (
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
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '4px', // Başlıkla arasına ekstra hafif bir boşluk
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
                    fontSize: 'var(--font-caption)',
                    color: 'var(--textSecondary)',
                    maxWidth: '280px',
                    lineHeight: '1.6',
                }}
            >
                {message}
            </p>
        )}
    </div>
);

export default EmptyState;
