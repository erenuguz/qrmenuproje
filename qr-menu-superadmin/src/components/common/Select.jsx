import {useId, useState} from 'react';
import {inputStyle} from '@/styles/shared';
import {ChevronDownIcon} from '@/components/common/icon/Icons';

export const Select = ({
    label,
    labelStyle = {},
    value,
    onChange,
    onFocus,
    onBlur,
    isMobile = false,
    style = {},
    containerStyle = {},
    children,
    id,
    ...props
}) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    const [isFocused, setIsFocused] = useState(false);

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
                    htmlFor={selectId}
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
                <select
                    id={selectId}
                    value={value}
                    onChange={onChange}
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
                        height: isMobile
                            ? 'var(--control-height-mobile)'
                            : 'var(--control-height)',
                        padding: isMobile ? '0 38px 0 16px' : '0 48px 0 24px',
                        borderRadius: isMobile
                            ? 'var(--radiusSmall)'
                            : 'var(--radiusLarge)',
                        border: `1px solid ${
                            isFocused ? 'var(--primary)' : 'var(--inputBorder)'
                        }`,
                        fontSize: isMobile
                            ? 'var(--font-caption)'
                            : 'var(--font-body)',
                        fontFamily: 'var(--font-family)',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        ...style,
                    }}
                    {...props}
                >
                    {children}
                </select>

                <ChevronDownIcon
                    size={isMobile ? 16 : 18}
                    color="var(--textMuted)"
                    style={{
                        position: 'absolute',
                        right: isMobile ? '14px' : '18px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default Select;
