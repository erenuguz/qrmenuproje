import {
    BREAKPOINTS,
    CONTROLS,
    MOTION,
    RADII,
    SPACING,
    Z_INDICES,
} from '@/styles/tokens';

export const DEFAULT_THEME = {
    mode: 'light',

    radii: RADII,
    spacing: SPACING,
    breakpoints: BREAKPOINTS,
    zIndices: Z_INDICES,
    motion: MOTION,
    controls: CONTROLS,

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
    },

    typography: {
        // Font
        fontFamily: "'Inter', sans-serif",

        // Başlık
        h1: '32px',
        h2: '28px',
        h3: '24px',
        micro: '11px',
        compact: '13px',
        bodySmall: '15px',
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

    sizes: {
        iconSmall: '20px',
        iconMedium: '24px',
        iconLarge: '28px',
    },
};
