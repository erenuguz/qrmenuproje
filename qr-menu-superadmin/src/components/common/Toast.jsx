import React from 'react';

const COLORS = {
    success: {border: 'var(--success)', icon: 'var(--success)'},
    error: {border: 'var(--danger)', icon: 'var(--danger)'},
    info: {border: 'var(--info)', icon: 'var(--info)'},
};

const ICONS = {
    success: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    ),
    error: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
    ),
    info: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    ),
};

export const ToastContainer = ({toasts, onDismiss}) => {
    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                maxWidth: '380px',
                padding: '0 20px',
                boxSizing: 'border-box',
                pointerEvents: 'none',
            }}
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    onClick={() => onDismiss(toast.id)}
                    style={{
                        pointerEvents: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: 'var(--surface)',
                        border: `1px solid ${COLORS[toast.type].border}`,
                        borderRadius: 'var(--radiusSmall)',
                        boxShadow: 'var(--shadow)',
                        padding: '12px 16px',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        style={{
                            color: COLORS[toast.type].icon,
                            display: 'flex',
                            flexShrink: 0,
                        }}
                    >
                        {ICONS[toast.type]}
                    </span>
                    <span
                        style={{
                            fontSize: 'var(--font-caption)',
                            color: 'var(--text)',
                            fontWeight: 'var(--font-medium)',
                        }}
                    >
                        {toast.message}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
