import React from 'react';
import BaseButton from './BaseButton';
import {
    UploadIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    MenuIcon,
    LogoutIcon,
    EyeIcon,
    EyeOffIcon,
} from '@/components/common/icon/Icons';

// 1. Kaydet Butonu
export const SaveButton = ({children = 'Kaydet', ...props}) => (
    <BaseButton
        bgColor="var(--primary)"
        textColor="var(--textWhite)"
        {...props}
    >
        {children}
    </BaseButton>
);

// 2. İptal Butonu
export const CancelButton = ({children = 'İptal', ...props}) => (
    <BaseButton
        bgColor="transparent"
        textColor="var(--textSecondary)"
        borderColor="var(--border)"
        {...props}
    >
        {children}
    </BaseButton>
);

// 3. Ekle Butonu
export const AddButton = ({children = 'Ekle', icon = '+', ...props}) => (
    <BaseButton
        icon={icon}
        bgColor="var(--primary)"
        textColor="var(--textWhite)"
        {...props}
    >
        {children}
    </BaseButton>
);

// 4. Düzenle Butonu
export const EditButton = ({children = 'Düzenle', ...props}) => (
    <BaseButton
        bgColor="var(--background)"
        textColor="var(--textSecondary)"
        borderColor="var(--border)"
        {...props}
    >
        {children}
    </BaseButton>
);

// 5. Sil Butonu
export const DeleteButton = ({children = '', ...props}) => (
    <BaseButton
        bgColor="var(--dangerBg)"
        textColor="var(--danger)"
        borderColor="var(--danger)"
        {...props}
    >
        {children}
    </BaseButton>
);

export const UploadImageButton = ({
    children = 'Fotoğraf Yükle',
    icon = <UploadIcon size={14} />,
    isLoading = false,
    loadingText = 'Yükleniyor...',
    borderColor = 'var(--border)',
    ...props
}) => (
    <BaseButton
        icon={icon}
        isLoading={isLoading}
        loadingText={loadingText}
        borderColor={borderColor}
        {...props}
    >
        {children}
    </BaseButton>
);

// 1. Yukarı Taşı Butonu
export const MoveUpButton = ({
    onClick,
    disabled = false,
    padding = '2px',
    icon = <ChevronUpIcon size={14} />,
    style = {},
    ...props
}) => (
    <BaseButton
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        bgColor="transparent"
        textColor="var(--textMuted)"
        borderColor="transparent"
        padding={padding}
        style={{
            opacity: disabled ? 0.3 : 1,
            cursor: disabled ? 'default' : 'pointer',
            ...style,
        }}
        {...props}
    />
);

// 2. Aşağı Taşı Butonu
export const MoveDownButton = ({
    onClick,
    disabled = false,
    padding = '2px',
    icon = <ChevronDownIcon size={14} />,
    style = {},
    ...props
}) => (
    <BaseButton
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        bgColor="transparent"
        textColor="var(--textMuted)"
        borderColor="transparent"
        padding={padding}
        style={{
            opacity: disabled ? 0.3 : 1,
            cursor: disabled ? 'default' : 'pointer',
            ...style,
        }}
        {...props}
    />
);

// Yeni Ürün Ekle Butonu
export const NewProductButton = ({
    children = 'Yeni Ürün',
    icon = <span style={{fontSize: '16px', lineHeight: '14px'}}>+</span>,
    padding = '10px 20px',
    borderRadius = '24px',

    ...props
}) => (
    <BaseButton
        bgColor="var(--primary)"
        textColor="var(--textWhite)"
        borderColor="transparent"
        icon={icon}
        padding={padding}
        borderRadius={borderRadius}
        {...props}
    >
        {children}
    </BaseButton>
);

// Oluştur / Submit Butonu
export const CreateButton = ({
    children = 'Oluştur',
    type = 'submit',
    isLoading = false,
    loadingText = 'Oluşturuluyor...',
    padding = '12px',
    ...props
}) => (
    <BaseButton
        type={type}
        bgColor="var(--primary)"
        textColor="var(--textWhite)"
        borderColor="transparent"
        isLoading={isLoading}
        loadingText={loadingText}
        padding={padding}
        {...props}
    >
        {children}
    </BaseButton>
);
export const NewRestaurantButton = ({
    children = 'Yeni Restoran',
    icon = <span style={{fontSize: '14px', lineHeight: '1'}}>+</span>,
    padding = '10px 16px',
    ...props
}) => (
    <BaseButton
        bgColor="var(--primary)"
        textColor="var(--textWhite)"
        borderColor="transparent"
        icon={icon}
        padding={padding}
        {...props}
    >
        {children}
    </BaseButton>
);

export const NavTabButton = ({
    children,
    icon,
    isSelected = false,
    padding = '10px 12px',
    gap = '12px',
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const activeBg = isSelected
        ? 'var(--primary)'
        : isHovered
          ? 'var(--hover)'
          : 'transparent';
    const activeColor = isSelected
        ? 'var(--textWhite)'
        : isHovered
          ? 'var(--text)'
          : 'var(--textSecondary)';
    const activeIconColor = isSelected
        ? 'var(--textWhite)'
        : isHovered
          ? 'var(--textSecondary)'
          : 'var(--textMuted)';

    return (
        <BaseButton
            bgColor={activeBg}
            textColor={activeColor}
            borderColor="transparent"
            padding={padding}
            fontWeight={
                isSelected ? 'var(--font-semibold)' : 'var(--font-medium)'
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: gap,
                transition: 'all 0.2s ease',
            }}
            icon={
                icon ? (
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: activeIconColor,
                            transition: 'color 0.2s ease',
                        }}
                    >
                        {icon}
                    </span>
                ) : null
            }
            {...props}
        >
            {children}
        </BaseButton>
    );
};

export const HamburgerButton = ({
    isOpen = false,
    padding = '8px',
    borderRadius = 'var(--radiusSmall)',
    icon = <MenuIcon size={24} />,
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <BaseButton
            aria-label={isOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            bgColor={isHovered ? 'var(--hover)' : 'transparent'}
            textColor={isHovered ? 'var(--primary)' : 'var(--text)'}
            borderColor="transparent"
            padding={padding}
            borderRadius={borderRadius}
            icon={icon}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
            }}
            {...props}
        />
    );
};

export const SignOutButton = ({
    children = 'Çıkış',
    padding = '8px 15px',
    borderRadius = 'var(--radiusSmall)',
    fontSize = 'var(--font-caption)',
    fontWeight = 'var(--font-semibold)',
    icon = <LogoutIcon size={16} />,
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <BaseButton
            bgColor={isHovered ? 'var(--dangerBg)' : 'transparent'}
            textColor={isHovered ? 'var(--danger)' : 'var(--textSecondary)'}
            borderColor="transparent"
            padding={padding}
            borderRadius={borderRadius}
            fontSize={fontSize}
            fontWeight={fontWeight}
            icon={icon}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                gap: '8px',
                transition: 'all 0.2s ease',
            }}
            {...props}
        >
            {children}
        </BaseButton>
    );
};
export const SubmitButton = ({
    loading = false,
    loadingText = 'İşlem Yapılıyor...',
    label = 'Giriş Yap',
    disabled = false,
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            type="submit"
            variant="primary"
            disabled={loading || disabled}
            style={{
                width: '100%',
                padding: '14px',
                fontSize: 'var(--font-body)',
                fontWeight: 'var(--font-semibold)',
                borderRadius: 'var(--radiusSmall)',
                backgroundColor: 'var(--primary)',
                color: 'var(--textWhite)',
                marginTop: '10px',
                opacity: loading ? 0.8 : 1,
                cursor: loading ? 'wait' : 'pointer',
                ...style,
            }}
            {...props}
        >
            {loading ? loadingText : label}
        </BaseButton>
    );
};

// Şifremi Unuttum metin butonu
export const ForgotPasswordButton = ({
    onClick,
    disabled = false,
    label = 'Şifremi Unuttum',
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            type="button"
            variant="ghost"
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: 0,
                fontSize: 'var(--font-small)',
                fontWeight: 'var(--font-medium)',
                color: 'var(--textMuted)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                ...style,
            }}
            {...props}
        >
            {label}
        </BaseButton>
    );
};

// Şifre Göster/Gizle (Basılı tutmalı) butonu
export const PasswordToggleButton = ({
    showPassword = false,
    onPressStart,
    onPressEnd,
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            type="button"
            variant="ghost"
            onMouseDown={onPressStart}
            onMouseUp={onPressEnd}
            onMouseLeave={onPressEnd}
            onTouchStart={(e) => {
                e.preventDefault();
                if (onPressStart) onPressStart();
            }}
            onTouchEnd={onPressEnd}
            title="Şifreyi görmek için basılı tutun"
            style={{
                position: 'absolute',
                right: '12px',
                padding: '4px',
                background: 'none',
                border: 'none',
                color: showPassword ? 'var(--primary)' : 'var(--textMuted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                ...style,
            }}
            {...props}
        >
            {showPassword ? (
                <EyeIcon size={20} strokeWidth={2.5} />
            ) : (
                <EyeOffIcon size={20} strokeWidth={2} />
            )}
        </BaseButton>
    );
};
