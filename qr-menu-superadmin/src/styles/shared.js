// Ayarlar / kategori ekleme kartlarının dış wrapper'ı
// (GeneralInfo, CustomerWifi, SocialMedia, CategoryAdd)
export const cardStyle = {
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: 'var(--shadow)',
};

// Standart text input
// (GeneralInfo, CustomerWifi, SocialMedia, CategoryAdd, Login, RestaurantAddModal)
export const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radiusSmall)',
    border: '1px solid var(--inputBorder)',
    backgroundColor: 'var(--inputBackground)',
    color: 'var(--text)',
    fontSize: 'var(--font-input)',
    outline: 'none',
    boxSizing: 'border-box',
};

// Büyük harf, küçük puntolu form label'ı
// (GeneralInfo, CustomerWifi, SocialMedia)
export const smallLabelStyle = {
    display: 'block',
    fontSize: '11px',
    color: 'var(--textSecondary)',
    fontWeight: 'var(--font-bold)',
    textTransform: 'uppercase',
    marginBottom: '8px',
    letterSpacing: '0.5px',
};

// Ayar kartlarındaki ikon container (GeneralInfo, CustomerWifi, SocialMedia)
// Kullanım: style={{...iconContainerStyle, backgroundColor: 'var(--infoBg)', color: 'var(--info)'}}
export const iconContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radiusSmall)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};
