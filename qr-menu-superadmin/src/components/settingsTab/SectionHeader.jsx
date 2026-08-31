
import {iconContainerStyle} from '@/styles/shared';

export const SectionHeader = ({icon, iconBg, iconColor, title, subtitle}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
            }}
        >
            {/* İkon alanı */}
            {icon &&
                (iconBg ? (
                    <div
                        style={{
                            ...iconContainerStyle,
                            backgroundColor: iconBg,
                            color: iconColor,
                        }}
                    >
                        {icon}
                    </div>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {icon}
                    </div>
                ))}

            {/* Başlık alanı */}
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <h3
                    style={{
                        margin: '0 0 4px 0',
                        fontSize: 'var(--font-body)',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--text)',
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </h3>

                {subtitle && (
                    <p
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-small)',
                            color: 'var(--textSecondary)',
                            lineHeight: 1.4,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SectionHeader;
