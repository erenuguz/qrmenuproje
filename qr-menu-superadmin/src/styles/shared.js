export const cardStyle = {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
};

// Standart text input
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

// Settings'de büyük harf, küçük puntolu Input başlığı
// (GeneralInfo, CustomerWifi, SocialMedia)
export const smallLabelStyle = {
    display: 'block',
    fontSize: 'var(--font-micro)',
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

// Ayar kartlarındaki başlık (GeneralInfo, CustomerWifi, SocialMedia)
export const sectionCardStyle = {
    ...cardStyle,
    padding: '24px',
};

export const formFieldStyle = {
    flex: '1 1 200px',
    minWidth: 0,
};

export const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'var(--font-semibold)',
    color: 'var(--text)',
    fontSize: 'var(--font-caption)',
};
