import React, {useId, useState} from 'react';
import {inputStyle} from '@/styles/shared';

export const Input = ({
    id,
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
    className = '',
    style = {},
    containerStyle = {},
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [isFocused, setIsFocused] = useState(false);

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
            {label && (
                <label
                    htmlFor={inputId}
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

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {icon && (
                    <div
                        aria-hidden="true"
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

                <input
                    id={inputId}
                    className={`ui-control ${className}`.trim()}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={(event) => {
                        setIsFocused(true);
                        onFocus?.(event);
                    }}
                    onBlur={(event) => {
                        setIsFocused(false);
                        onBlur?.(event);
                    }}
                    style={{
                        ...inputStyle,
                        height: isMobile ? '42px' : '45px',
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: isMobile ? '16px' : '24px',
                        paddingLeft,
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: `1px solid ${
                            isFocused ? 'var(--primary)' : 'var(--inputBorder)'
                        }`,
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
