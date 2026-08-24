import React, {useState} from 'react';
import {inputStyle} from '@/styles/shared';

export const Input = ({
    label,
    labelStyle = {},
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

    // İkon durumuna ve ekrana göre sol padding hesabı
    const paddingLeft = icon
        ? isMobile
            ? '38px'
            : '56px'
        : isMobile
          ? '16px'
          : '24px';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                ...containerStyle,
            }}
        >
            {/* Label Alanı */}
            {label && (
                <label
                    style={{
                        fontSize: 'var(--font-small)',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--textSecondary)',
                        letterSpacing: '0.5px',
                        ...labelStyle,
                    }}
                >
                    {label}
                </label>
            )}

            {/* İç Kapsayıcı (İkon + Input) */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Sol İkon */}
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
                        ...inputStyle,
                        height: isMobile ? '42px' : '45px',
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: isMobile ? '16px' : '24px',
                        paddingLeft: paddingLeft,
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: `1px solid ${isFocused ? 'var(--primary)' : 'var(--inputBorder)'}`,
                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',
                        ...style,
                    }}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
