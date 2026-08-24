import React, {useState} from 'react';
import {cardStyle} from '@/styles/shared';

const Card = ({
    children,
    onClick,
    padding = '16px',
    borderRadius = 'var(--radiusLarge)',
    style = {},
    hoverStyle = {},
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);

    const isInteractive = typeof onClick === 'function';
    const Component = isInteractive ? 'button' : 'div';

    return (
        <Component
            {...props}
            type={isInteractive ? 'button' : undefined}
            onClick={onClick}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            style={{
                ...cardStyle,

                width: '100%',
                padding,
                borderRadius,
                boxSizing: 'border-box',

                fontFamily: 'inherit',
                color: 'inherit',
                textAlign: 'inherit',

                cursor: isInteractive ? 'pointer' : 'default',

                transition: 'border-color 0.15s ease, transform 0.15s ease',

                ...style,

                ...(isInteractive && isActive
                    ? {
                          borderColor: 'var(--primary)',
                          transform: 'translateY(-2px)',
                          ...hoverStyle,
                      }
                    : {}),
            }}
        >
            {children}
        </Component>
    );
};

export default Card;
