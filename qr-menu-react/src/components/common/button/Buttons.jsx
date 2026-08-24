import React from 'react';
import BaseButton from './BaseButton';
import {ChevronLeftIcon} from '@/components/common/icon/Icons';

export const BackButton = ({
    onClick,
    size = '36px',
    iconSize = 18,
    ariaLabel = 'Geri dön',
    style = {},
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const activeBg = isHovered
        ? 'color-mix(in srgb, var(--primary) 15%, transparent)'
        : 'var(--background)';

    const activeColor = isHovered ? 'var(--primary)' : 'var(--text)';

    return (
        <BaseButton
            onClick={onClick}
            aria-label={ariaLabel}
            bgColor={activeBg}
            textColor={activeColor}
            borderColor="transparent"
            padding="0"
            borderRadius="50%"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
                width: size,
                height: size,
                minWidth: size,
                transform: isPressed ? 'scale(0.92)' : 'scale(1)',
                transition: 'all 0.15s ease',
                ...style,
            }}
            {...props}
        >
            <ChevronLeftIcon size={iconSize} strokeWidth={2.3} />
        </BaseButton>
    );
};
