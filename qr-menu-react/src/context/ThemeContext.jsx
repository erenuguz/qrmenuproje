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
        infoBg: '#EFF6FF', // Bilgi arka planı
        overlay: 'rgba(0,0,0,0.4)', // Modal overlay

        insta: '#DB2777', // Instagram
        instaBg: '#FDF2F8', // Instagram arka planı
        whatsapp: '#25D366', // WhatsApp
        whatsappBg: '#DCFCE7', // WhatsApp arka planı

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

function applyCss(theme) {
    const el = document.documentElement;

    const c = theme.colors || DEFAULT_THEME.colors;
    const t = theme.typography || DEFAULT_THEME.typography;

    // ==========================
    // Colors
    // ==========================

    el.style.setProperty('--background', c.background);
    el.style.setProperty('--surface', c.surface);
    el.style.setProperty('--sidebar', c.sidebar);
    el.style.setProperty('--header', c.header);

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

    el.style.setProperty('--radiusSmall', c.radiusSmall);
    el.style.setProperty('--radius', c.radius);
    el.style.setProperty('--radiusLarge', c.radiusLarge);

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
