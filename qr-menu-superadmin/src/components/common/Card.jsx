import {cardStyle} from '@/styles/shared';

const Card = ({
    children,
    onClick,
    padding = '16px',
    className = '',
    style = {},
    ...props
}) => {
    const isInteractive = typeof onClick === 'function';
    const Component = isInteractive ? 'button' : 'div';

    const cardClassName = [
        'ui-card',
        isInteractive && 'ui-card--interactive',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Component
            {...props}
            type={isInteractive ? 'button' : undefined}
            onClick={onClick}
            className={cardClassName}
            style={{
                ...cardStyle,
                borderColor: 'var(--ui-card-border-color, var(--border))',
                padding,
                fontFamily: 'inherit',
                color: 'inherit',
                textAlign: 'inherit',
                cursor: isInteractive ? 'pointer' : 'default',
                ...style,
            }}
        >
            {children}
        </Component>
    );
};

export default Card;
