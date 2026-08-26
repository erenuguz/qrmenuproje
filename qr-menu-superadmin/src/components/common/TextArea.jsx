import React, {useId, useState} from 'react';
import {inputStyle} from '@/styles/shared';

const TextArea = ({
    label,
    labelStyle = {},
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder = '',
    rows = 4,
    resize = 'vertical',
    style = {},
    containerStyle = {},
    id,
    ...props
}) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

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
                    htmlFor={textareaId}
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

            <textarea
                id={textareaId}
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
                placeholder={placeholder}
                rows={rows}
                style={{
                    ...inputStyle,
                    minHeight: '110px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radiusSmall)',
                    border: `1px solid ${
                        isFocused ? 'var(--primary)' : 'var(--inputBorder)'
                    }`,
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-body)',
                    lineHeight: 1.5,
                    resize,
                    ...style,
                }}
                {...props}
            />
        </div>
    );
};

export default TextArea;
