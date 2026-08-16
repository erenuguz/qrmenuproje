import React, {createContext, useContext, useEffect, useState} from 'react';

export const DEFAULT_THEME = {
    mode: 'light',

    colors: {
        // ==========================
        // Arka Planlar
        // ==========================

        background: '#F8FAFC', // Sayfanın ana arka planı
        surface: '#FFFFFF', // Kartlar, inputlar, selectler
        sidebar: '#FFFFFF', // Sol menü
        header: '#FFFFFF', // Üst header

        // ==========================
        // Border
        // ==========================

        border: '#E5E7EB', // Input, kart ve çizgiler
        borderLight: '#F1F5F9', // Çok hafif ayırıcı çizgiler

        // ==========================
        // Yazılar
        // ==========================

        text: '#111827', // Ana başlıklar
        textSecondary: '#6B7280', // Açıklamalar
        textMuted: '#9CA3AF', // Placeholder, ikonlar
        textWhite: '#FFFFFF', // Beyaz yazılar

        // ==========================
        // Ana Tema
        // ==========================

        primary: '#111827', // Sol menü aktif, butonlar
        primaryHover: '#1F2937', // Hover
        primaryLight: '#374151', // Açık tonu

        // ==========================
        // Durum Renkleri
        // ==========================

        success: '#10B981', // Aktif yazısı
        successBg: '#ECFDF5', // Aktif arka planı

        danger: '#EF4444', // Pasif yazısı
        dangerBg: '#FEF2F2', // Pasif arka planı

        warning: '#F59E0B', // Uyarılar

        info: '#3B82F6', // Bilgi

        // ==========================
        // Badge
        // ==========================

        badge: '#F3F4F6', // Toplam ürün kutusu
        badgeText: '#374151', // Badge yazısı

        // ==========================
        // Input
        // ==========================

        inputBackground: '#FFFFFF',
        inputBorder: '#E5E7EB',
        inputPlaceholder: '#9CA3AF',

        // ==========================
        // Hover
        // ==========================

        hover: '#F9FAFB', // Satır hover
        active: '#111827', // Aktif menü

        // ==========================
        // Shadow
        // ==========================

        shadow: '0 1px 3px rgba(0,0,0,.08)',

        // ==========================
        // Radius
        // ==========================

        radiusSmall: '8px',
        radius: '12px',
        radiusLarge: '16px',
    },

    typography: {
        // Font
        fontFamily: "'Inter', sans-serif",

        // Başlık
        h1: '32px',
        h2: '28px',
        h3: '24px',

        // Kart Başlığı
        title: '22px',

        // Normal Yazı
        body: '16px',

        // Input Yazısı
        input: '16px',

        // Küçük Açıklamalar
        caption: '14px',

        // Çok Küçük
        small: '12px',

        // Font Weight
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
};

const ThemeContext = createContext(null);

function applyThemeCss(theme) {
    const el = document.documentElement;

    const colors = theme.colors || DEFAULT_THEME.colors;
    const typography = theme.typography || DEFAULT_THEME.typography;

    // ==========================
    // Colors
    // ==========================

    el.style.setProperty('--background', colors.background);
    el.style.setProperty('--surface', colors.surface);
    el.style.setProperty('--sidebar', colors.sidebar);
    el.style.setProperty('--header', colors.header);

    el.style.setProperty('--border', colors.border);
    el.style.setProperty('--borderLight', colors.borderLight);

    el.style.setProperty('--text', colors.text);
    el.style.setProperty('--textSecondary', colors.textSecondary);
    el.style.setProperty('--textMuted', colors.textMuted);
    el.style.setProperty('--textWhite', colors.textWhite);

    el.style.setProperty('--primary', colors.primary);
    el.style.setProperty('--primaryHover', colors.primaryHover);
    el.style.setProperty('--primaryLight', colors.primaryLight);

    el.style.setProperty('--success', colors.success);
    el.style.setProperty('--successBg', colors.successBg);

    el.style.setProperty('--danger', colors.danger);
    el.style.setProperty('--dangerBg', colors.dangerBg);

    el.style.setProperty('--warning', colors.warning);

    el.style.setProperty('--info', colors.info);

    el.style.setProperty('--badge', colors.badge);
    el.style.setProperty('--badgeText', colors.badgeText);

    el.style.setProperty('--inputBackground', colors.inputBackground);
    el.style.setProperty('--inputBorder', colors.inputBorder);
    el.style.setProperty('--inputPlaceholder', colors.inputPlaceholder);

    el.style.setProperty('--hover', colors.hover);
    el.style.setProperty('--active', colors.active);

    el.style.setProperty('--shadow', colors.shadow);

    el.style.setProperty('--radiusSmall', colors.radiusSmall);
    el.style.setProperty('--radius', colors.radius);
    el.style.setProperty('--radiusLarge', colors.radiusLarge);

    // ==========================
    // Typography
    // ==========================

    el.style.setProperty('--font-family', typography.fontFamily);

    el.style.setProperty('--font-h1', typography.h1);
    el.style.setProperty('--font-h2', typography.h2);
    el.style.setProperty('--font-h3', typography.h3);

    el.style.setProperty('--font-title', typography.title);

    el.style.setProperty('--font-body', typography.body);
    el.style.setProperty('--font-input', typography.input);

    el.style.setProperty('--font-caption', typography.caption);
    el.style.setProperty('--font-small', typography.small);

    el.style.setProperty('--font-regular', typography.regular);
    el.style.setProperty('--font-medium', typography.medium);
    el.style.setProperty('--font-semibold', typography.semibold);
    el.style.setProperty('--font-bold', typography.bold);

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
        applyThemeCss(DEFAULT_THEME);
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
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
