import React from 'react';

/**
 * İkon + değer + etiket gösteren istatistik kartı.
 * Kaynak: CategoryHeader.jsx'teki local StatCard (size="sm", varsayılan)
 * ve RestaurantManagementTabHeader.jsx'teki elle tekrarlanan kart yapısı
 * (size="lg") birleştirildi. Görsel farklar korunduğu için mevcut
 * kullanımların hiçbirinde davranış/görünüm değişmiyor.
 */
const SIZES = {
    sm: {
        iconSize: '44px',
        iconRadius: 'var(--radiusSmall)',
        cardPadding: '20px',
        valueFontSize: 'var(--font-title)',
        valueMarginBottom: '2px',
        labelFontWeight: 'var(--font-medium)',
    },
    lg: {
        iconSize: '48px',
        iconRadius: 'var(--radius)',
        cardPadding: '24px',
        valueFontSize: 'var(--font-h3)',
        valueMarginBottom: '4px',
        labelFontWeight: 'var(--font-regular)',
    },
};

const StatCard = ({bgColor, iconColor, icon, value, label, size = 'sm'}) => {
    const s = SIZES[size];

    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                padding: s.cardPadding,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: 'var(--shadow)',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* İkon SADECE gönderilmişse render edilir */}
            {icon && (
                <div
                    style={{
                        width: s.iconSize,
                        height: s.iconSize,
                        minWidth: s.iconSize,
                        borderRadius: s.iconRadius,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: bgColor,
                        color: iconColor,
                    }}
                >
                    {icon}
                </div>
            )}

            {/* Yazı alanı - İkon yoksa tek başına tüm alanı kaplar */}
            <div style={{flex: 1, minWidth: 0}}>
                <h3
                    style={{
                        fontSize: s.valueFontSize,
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--text)',
                        margin: `0 0 ${s.valueMarginBottom} 0`,
                    }}
                >
                    {value}
                </h3>
                <p
                    style={{
                        fontSize: 'var(--font-small)',
                        color: 'var(--textSecondary)',
                        margin: 0,
                        fontWeight: s.labelFontWeight,
                    }}
                >
                    {label}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
