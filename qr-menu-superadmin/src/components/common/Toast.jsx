import React from 'react';
import {SuccessIcon, ErrorIcon, InfoIcon} from '@/components/common/icon/Icons';

const COLORS = {
    success: {border: 'var(--success)', icon: 'var(--success)'},
    error: {border: 'var(--danger)', icon: 'var(--danger)'},
    info: {border: 'var(--info)', icon: 'var(--info)'},
};

const ICONS = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
};

export const ToastContainer = ({toasts, onDismiss}) => {
    if (!toasts || toasts.length === 0) return null;

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
            {toasts.map((toast) => {
                const toastType = toast.type || 'info';
                const colorConfig = COLORS[toastType] || COLORS.info;
                const iconComponent = ICONS[toastType] || ICONS.info;

                return (
                    <div
                        key={toast.id}
                        onClick={() => onDismiss(toast.id)}
                        style={{
                            pointerEvents: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: 'var(--surface)',
                            border: `1px solid ${colorConfig.border}`,
                            borderRadius: 'var(--radiusSmall)',
                            boxShadow: 'var(--shadow)',
                            padding: '12px 16px',
                            cursor: 'pointer',
                        }}
                    >
                        <span
                            style={{
                                color: colorConfig.icon,
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                            }}
                        >
                            {iconComponent}
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
                );
            })}
        </div>
    );
};

export default ToastContainer;
