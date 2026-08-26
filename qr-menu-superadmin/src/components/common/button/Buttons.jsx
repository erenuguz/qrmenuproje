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

export const SaveButton = ({children = 'Kaydet', ...props}) => (
    <BaseButton variant="primary" {...props}>
        {children}
    </BaseButton>
);

export const CancelButton = ({children = 'İptal', ...props}) => (
    <BaseButton variant="secondary" {...props}>
        {children}
    </BaseButton>
);

export const AddButton = ({children = 'Ekle', icon = '+', ...props}) => (
    <BaseButton variant="primary" icon={icon} {...props}>
        {children}
    </BaseButton>
);

export const EditButton = ({children = 'Düzenle', ...props}) => (
    <BaseButton variant="secondary" {...props}>
        {children}
    </BaseButton>
);

export const DeleteButton = ({children = '', ...props}) => (
    <BaseButton variant="danger" {...props}>
        {children}
    </BaseButton>
);

export const UploadImageButton = ({
    children = 'Fotoğraf Yükle',
    icon = <UploadIcon size={14} />,
    isLoading = false,
    loadingText = 'Yükleniyor...',
    ...props
}) => (
    <BaseButton
        variant="secondary"
        icon={icon}
        isLoading={isLoading}
        loadingText={loadingText}
        {...props}
    >
        {children}
    </BaseButton>
);

export const MoveUpButton = ({
    onClick,
    disabled = false,
    padding = '2px',
    icon = <ChevronUpIcon size={14} />,
    style = {},
    ...props
}) => (
    <BaseButton
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        padding={padding}
        textColor="var(--textMuted)"
        style={{
            opacity: disabled ? 0.3 : 1,
            ...style,
        }}
        {...props}
    />
);

export const MoveDownButton = ({
    onClick,
    disabled = false,
    padding = '2px',
    icon = <ChevronDownIcon size={14} />,
    style = {},
    ...props
}) => (
    <BaseButton
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        padding={padding}
        textColor="var(--textMuted)"
        style={{
            opacity: disabled ? 0.3 : 1,
            ...style,
        }}
        {...props}
    />
);

export const NewProductButton = ({
    children = 'Yeni Ürün',
    icon = (
        <span
            style={{
                fontSize: 'var(--font-body)',
                lineHeight: 1,
            }}
        >
            +
        </span>
    ),
    padding = '10px 20px',
    borderRadius = 'var(--radiusPill)',
    ...props
}) => (
    <BaseButton
        variant="primary"
        icon={icon}
        padding={padding}
        borderRadius={borderRadius}
        {...props}
    >
        {children}
    </BaseButton>
);

export const CreateButton = ({
    children = 'Oluştur',
    type = 'submit',
    isLoading = false,
    loadingText = 'Oluşturuluyor...',
    padding = '12px',
    ...props
}) => (
    <BaseButton
        variant="primary"
        type={type}
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
    icon = (
        <span
            style={{
                fontSize: 'var(--font-caption)',
                lineHeight: 1,
            }}
        >
            +
        </span>
    ),
    padding = '10px 16px',
    ...props
}) => (
    <BaseButton variant="primary" icon={icon} padding={padding} {...props}>
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
}) => (
    <BaseButton
        variant={isSelected ? 'primary' : 'ghost'}
        padding={padding}
        fontWeight={isSelected ? 'var(--font-semibold)' : 'var(--font-medium)'}
        icon={icon}
        style={{
            width: '100%',
            justifyContent: 'flex-start',
            textAlign: 'left',
            gap,
        }}
        {...props}
    >
        {children}
    </BaseButton>
);

export const HamburgerButton = ({
    isOpen = false,
    padding = '8px',
    borderRadius = 'var(--radiusSmall)',
    icon = <MenuIcon size={24} />,
    ...props
}) => (
    <BaseButton
        variant="ghost"
        aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        padding={padding}
        borderRadius={borderRadius}
        icon={icon}
        hoverTextColor="var(--primary)"
        {...props}
    />
);

export const HamburgerButton = ({
    isOpen = false,
    padding = '8px',
    borderRadius = 'var(--radiusSmall)',
    icon = <MenuIcon size={24} />,
    ...props
}) => (
    <BaseButton
        variant="ghost"
        aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        padding={padding}
        borderRadius={borderRadius}
        icon={icon}
        hoverTextColor="var(--primary)"
        {...props}
    />
);

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
            disabled={disabled}
            isLoading={loading}
            loadingText={loadingText}
            padding="14px"
            fontSize="var(--font-body)"
            fontWeight="var(--font-semibold)"
            style={{
                width: '100%',
                marginTop: '10px',
                ...style,
            }}
            {...props}
        >
            {label}
        </BaseButton>
    );
};

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
            textColor="var(--textMuted)"
            padding="0"
            fontSize="var(--font-small)"
            fontWeight="var(--font-medium)"
            style={{
                ...style,
            }}
            {...props}
        >
            {label}
        </BaseButton>
    );
};

export const PasswordToggleButton = ({
    showPassword = false,
    onPressStart,
    onPressEnd,
    style = {},
    ...props
}) => (
    <BaseButton
        type="button"
        variant="ghost"
        textColor={showPassword ? 'var(--primary)' : 'var(--textMuted)'}
        onPointerDown={onPressStart}
        onPointerUp={onPressEnd}
        onPointerCancel={onPressEnd}
        onPointerLeave={onPressEnd}
        title="Şifreyi görmek için basılı tutun"
        style={{
            position: 'absolute',
            right: '12px',
            padding: '4px',
            userSelect: 'none',
            WebkitUserSelect: 'none',
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

export const FloatingButton = ({
    onClick,
    icon,
    position = 'fixed',
    bottom = '25px',
    right = '25px',
    size = '50px',
    bgColor = 'var(--primary)',
    textColor = 'var(--textWhite)',
    shadow = '0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent)',
    ariaLabel = 'Yukarı Çık',
    style = {},
    ...props
}) => {
    return (
        <BaseButton
            variant="primary"
            onClick={onClick}
            aria-label={ariaLabel}
            bgColor={bgColor}
            textColor={textColor}
            borderColor="transparent"
            padding="0"
            borderRadius="var(--radiusCircle)"
            icon={icon}
            style={{
                position,
                bottom,
                right,
                zIndex: 1000,
                width: size,
                height: size,
                minWidth: size,
                boxShadow: shadow,
                ...style,
            }}
            {...props}
        />
    );
};
