import {useEffect, useState} from 'react';
import {ThemeContext} from '@/context/theme-context';
import {DEFAULT_THEME} from '@/styles/theme';

function applyCss(theme) {
    const el = document.documentElement;

    const c = theme.colors || DEFAULT_THEME.colors;
    const t = theme.typography || DEFAULT_THEME.typography;
    const s = theme.sizes || DEFAULT_THEME.sizes;
    const r = theme.radii || DEFAULT_THEME.radii;
    const spacing = theme.spacing || DEFAULT_THEME.spacing;
    const zIndices = theme.zIndices || DEFAULT_THEME.zIndices;
    const motion = theme.motion || DEFAULT_THEME.motion;
    const controls = theme.controls || DEFAULT_THEME.controls;

    // ==========================
    // Colors
    // ==========================

    el.style.setProperty('--background', c.background);
    el.style.setProperty('--surface', c.surface);
    el.style.setProperty('--sidebar', c.sidebar);
    el.style.setProperty('--header', c.header);

    el.style.setProperty('--font-micro', t.micro);
    el.style.setProperty('--font-compact', t.compact);
    el.style.setProperty('--font-bodySmall', t.bodySmall);

    el.style.setProperty('--iconSmall', s.iconSmall);
    el.style.setProperty('--iconMedium', s.iconMedium);
    el.style.setProperty('--iconLarge', s.iconLarge);
    el.style.setProperty('--border', c.border);
    el.style.setProperty('--borderLight', c.borderLight);

    el.style.setProperty('--text', c.text);
    el.style.setProperty('--textSecondary', c.textSecondary);
    el.style.setProperty('--textMuted', c.textMuted);
    el.style.setProperty('--textWhite', c.textWhite);

    el.style.setProperty('--primary', c.primary);
    el.style.setProperty('--primaryHover', c.primaryHover);
    el.style.setProperty('--primaryLight', c.primaryLight);

    el.style.setProperty('--success', c.success);
    el.style.setProperty('--successBg', c.successBg);

    el.style.setProperty('--danger', c.danger);
    el.style.setProperty('--dangerBg', c.dangerBg);

    el.style.setProperty('--warning', c.warning);

    el.style.setProperty('--info', c.info);
    el.style.setProperty('--infoBg', c.infoBg);
    el.style.setProperty('--overlay', c.overlay);

    el.style.setProperty('--insta', c.insta);
    el.style.setProperty('--instaBg', c.instaBg);
    el.style.setProperty('--whatsapp', c.whatsapp);
    el.style.setProperty('--whatsappBg', c.whatsappBg);

    el.style.setProperty('--badge', c.badge);
    el.style.setProperty('--badgeText', c.badgeText);

    el.style.setProperty('--inputBackground', c.inputBackground);
    el.style.setProperty('--inputBorder', c.inputBorder);
    el.style.setProperty('--inputPlaceholder', c.inputPlaceholder);

    el.style.setProperty('--hover', c.hover);
    el.style.setProperty('--active', c.active);

    el.style.setProperty('--shadow', c.shadow);

    el.style.setProperty('--radiusSmall', r.small);
    el.style.setProperty('--radius', r.medium);
    el.style.setProperty('--radiusLarge', r.large);
    el.style.setProperty('--radiusPill', r.pill);
    el.style.setProperty('--radiusCircle', r.circle);

    Object.entries(spacing).forEach(([key, value]) => {
        el.style.setProperty(`--space-${key}`, value);
    });

    el.style.setProperty('--z-sticky', zIndices.sticky);
    el.style.setProperty('--z-header', zIndices.header);
    el.style.setProperty('--z-modal', zIndices.modal);
    el.style.setProperty('--z-toast', zIndices.toast);

    el.style.setProperty('--motion-fast', motion.fast);
    el.style.setProperty('--motion-normal', motion.normal);
    el.style.setProperty('--motion-slow', motion.slow);

    el.style.setProperty('--control-height', controls.height);
    el.style.setProperty('--control-height-mobile', controls.mobileHeight);

    // ==========================
    // Typography
    // ==========================

    el.style.setProperty('--font-family', t.fontFamily);

    el.style.setProperty('--font-h1', t.h1);
    el.style.setProperty('--font-h2', t.h2);
    el.style.setProperty('--font-h3', t.h3);

    el.style.setProperty('--font-title', t.title);

    el.style.setProperty('--font-body', t.body);
    el.style.setProperty('--font-input', t.input);

    el.style.setProperty('--font-caption', t.caption);
    el.style.setProperty('--font-small', t.small);

    el.style.setProperty('--font-regular', t.regular);
    el.style.setProperty('--font-medium', t.medium);
    el.style.setProperty('--font-semibold', t.semibold);
    el.style.setProperty('--font-bold', t.bold);

    // ==========================
    // Theme Mode
    // ==========================

    if (theme.mode === 'dark') {
        el.classList.add('dark');
    } else {
        el.classList.remove('dark');
    }
}

// 3. PROVIDER
export function ThemeProvider({children}) {
    const [activeTheme] = useState(DEFAULT_THEME);

    useEffect(() => {
        applyCss(DEFAULT_THEME);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                activeTheme,
                loading: false,
            }}
        >
            <div
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    minHeight: '100vh',
                    fontFamily: 'var(--font-family)',
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
