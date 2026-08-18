import React, {useState} from 'react';

export const Input = ({
    label, // Yeni eklendi: Başlık metni
    labelStyle = {}, // Yeni eklendi: Başlığa özel stil verebilmek için
    icon = null,
    isMobile = false,
    placeholder = '',
    value,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    style = {},
    containerStyle = {},
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    // İkon varsa ona göre sol padding, yoksa normal padding
    const paddingLeft = icon
        ? isMobile
            ? '38px'
            : '56px'
        : isMobile
          ? '16px'
          : '24px';
    
    return (
        // Dış Sarmalayıcı (Label ve Input'u alt alta dizmek için)
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                ...containerStyle,
            }}
        >
            {/* Label Alanı - Sadece label prop'u doluysa render edilir */}
            {label && (
                <label
                    style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--textSecondary)',
                        letterSpacing: '0.5px',
                        ...labelStyle, // Dışarıdan özel stil gelirse buradaki varsayılanları ezer
                    }}
                >
                    {label}
                </label>
            )}

            {/* İç Sarmalayıcı (İkon ve Input'u yan yana tutmak için eski kodun aynısı) */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Sol İkon (Sadece verilmişse render edilir) */}
                {icon && (
                    <div
                        style={{
                            position: 'absolute',
                            left: isMobile ? '12px' : '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                            color: isFocused
                                ? 'var(--primary)'
                                : 'var(--textMuted)',
                            transition: 'color 0.2s',
                        }}
                    >
                        {icon}
                    </div>
                )}

                {/* Ana Input Alanı */}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={(e) => {
                        setIsFocused(true);
                        if (onFocus) onFocus(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        if (onBlur) onBlur(e);
                    }}
                    style={{
                        width: '100%',
                        height: isMobile ? '42px' : '45px',
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: isMobile ? '16px' : '24px',
                        paddingLeft: paddingLeft,
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: `1px solid ${isFocused ? 'var(--primary)' : 'var(--inputBorder)'}`,
                        background: 'var(--inputBackground)',
                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',
                        color: 'var(--text)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        boxShadow: 'var(--shadow)',
                        transition: 'border-color 0.2s',
                        ...style,
                    }}
                    {...props}
                />
            </div>
        </div>
    );
};
export default Input;
