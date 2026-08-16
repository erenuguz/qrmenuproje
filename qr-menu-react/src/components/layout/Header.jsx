import React from 'react';

const Header = ({activeCategory, onBack, restaurantName, restaurantLogo}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor:
                    'color-mix(in srgb, var(--surface) 85%, transparent)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '14px 18px',
                borderBottom: '1px solid var(--border)',
                position: 'relative',
                top: 0,
                zIndex: 1000,
                fontFamily: 'var(--font-family)',
            }}
        >
            <div style={{width: '38px', display: 'flex', alignItems: 'center'}}>
                {activeCategory !== null && (
                    <button
                        onClick={onBack}
                        aria-label="Geri dön"
                        style={{
                            background: 'var(--background)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text)',
                            transition:
                                'background-color 0.15s ease, color 0.15s ease, transform 0.1s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'color-mix(in srgb, var(--primary) 15%, transparent)';
                            e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'var(--background)';
                            e.currentTarget.style.color = 'var(--text)';
                        }}
                        onMouseDown={(e) =>
                            (e.currentTarget.style.transform = 'scale(0.92)')
                        }
                        onMouseUp={(e) =>
                            (e.currentTarget.style.transform = 'scale(1)')
                        }
                    >
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
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
                                borderRadius: '50%',
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
                                borderRadius: '50%',
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
