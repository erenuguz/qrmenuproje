const BaseIcon = ({
    size = 18,
    color = 'currentColor',
    strokeWidth = 2,
    viewBox = '0 0 24 24',
    className = '',
    style = {},
    children,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                flexShrink: 0,
                ...style,
            }}
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
};

export default BaseIcon;
