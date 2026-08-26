import React from 'react';
import {BackButton} from '@/components/common/button/Buttons';

const Header = ({activeCategory, onBack, restaurantName, restaurantLogo}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor:
                    'color-mix(in srgb, var(--header) 85%, transparent)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '14px 18px',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                fontFamily: 'var(--font-family)',
            }}
        >
            <div style={{width: '38px', display: 'flex', alignItems: 'center'}}>
                {activeCategory !== null && (
                    <BackButton onClick={onBack} size="36px" iconSize={18} />
                )}
            </div>

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 0,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        minWidth: 0,
                    }}
                >
                    {restaurantLogo ? (
                        <img
                            src={restaurantLogo}
                            alt={restaurantName || 'Logo'}
                            style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: 'var(--radiusCircle)',
                                objectFit: 'cover',
                                border: '1px solid var(--border)',
                                flexShrink: 0,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: 'var(--radiusCircle)',
                                backgroundColor:
                                    'color-mix(in srgb, var(--primary) 15%, transparent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'var(--font-body)',
                                flexShrink: 0,
                            }}
                        >
                            🍽️
                        </div>
                    )}
                    <h1
                        style={{
                            margin: 0,
                            fontSize: 'var(--font-body)',
                            letterSpacing: '-0.01em',
                            color: 'var(--text)',
                            fontWeight: 'var(--font-bold)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {restaurantName}
                    </h1>
                </div>
            </div>

            <div style={{width: '38px'}}></div>
        </div>
    );
};

export default Header;
