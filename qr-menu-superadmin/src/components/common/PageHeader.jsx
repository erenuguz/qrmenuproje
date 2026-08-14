import React from 'react';

/**
 * Tüm sekmelerde kullanılan sabit sayfa başlığı deseni.
 * Title + subtitle her yerde aynı stille render edilir, varyant yok.
 */
const PageHeader = ({title, subtitle}) => (
    <div style={{marginBottom: '24px'}}>
        <h2
            style={{
                fontSize: 'var(--font-h3)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text)',
                margin: '0 0 4px 0',
            }}
        >
            {title}
        </h2>
        {subtitle && (
            <p
                style={{
                    margin: 0,
                    color: 'var(--textSecondary)',
                    fontSize: 'var(--font-caption)',
                }}
            >
                {subtitle}
            </p>
        )}
    </div>
);

export default PageHeader;
