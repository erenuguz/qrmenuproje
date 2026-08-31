import {DeleteButton} from '@/components/common/button/Buttons';
import {MailIcon, TrashIcon} from '@/components/common/icon/Icons';
import {useResponsive} from '@/hooks/useResponsive';

const textStyles = {
    idHash: {
        color: 'var(--textMuted)',
        fontSize: 'var(--font-caption)',
        fontWeight: 'var(--font-bold)',
    },

    id: {
        color: 'var(--textSecondary)',
        fontSize: 'var(--font-compact)',
        fontFamily: 'monospace',
    },

    name: {
        fontWeight: 'var(--font-semibold)',
        color: 'var(--text)',
        fontSize: 'var(--font-bodySmall)',
        marginBottom: '4px',
    },

    email: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--textSecondary)',
        fontSize: 'var(--font-compact)',
    },
};

const RestaurantTableRow = ({restaurant, isLast, onDelete, isProcessing}) => {
    const {isMobile} = useResponsive();
    const isInactive = restaurant.isInactive === true;

    const productCount = Number(restaurant.productCount) || 0;
    const categoryCount = Number(restaurant.categoryCount) || 0;

    const badgeBg = isInactive ? 'var(--dangerBg)' : 'var(--successBg)';
    const badgeColor = isInactive ? 'var(--danger)' : 'var(--success)';

    // Ortak rozet (badge) tasarımı
    const statusBadge = (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                borderRadius: 'var(--radiusSmall)',
                backgroundColor: badgeBg,
                color: badgeColor,
                fontSize: 'var(--font-small)',
                fontWeight: 'var(--font-semibold)',
            }}
        >
            <span
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: 'var(--radiusCircle)',
                    backgroundColor: 'currentColor',
                }}
            />
            {isInactive ? 'Pasif' : 'Aktif'}
        </div>
    );

    /* ── MOBİL GÖRÜNÜM (KART TASARIMI) ── */
    if (isMobile) {
        return (
            <tr
                style={{
                    borderBottom: isLast
                        ? 'none'
                        : '1px solid var(--borderLight)',
                }}
            >
                <td colSpan="5" style={{padding: '16px'}}>
                    {/* Üst Kısım: İsim ve Durum Rozeti */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '12px',
                        }}
                    >
                        <div>
                            <div style={textStyles.name}>{restaurant.name}</div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                <span style={textStyles.idHash}>#</span>
                                <span style={textStyles.id}>
                                    {restaurant.id}
                                </span>
                            </div>
                        </div>
                        {statusBadge}
                    </div>

                    {/* Alt Kısım: E-posta, İstatistikler ve Sil Butonu */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <div style={textStyles.email}>
                            <MailIcon size={14} />
                            {restaurant.adminEmail}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 'var(--font-small)',
                                    color: 'var(--textMuted)',
                                }}
                            >
                                {productCount} ürün · {categoryCount} kategori
                            </div>
                            <DeleteButton
                                onClick={() =>
                                    onDelete(restaurant.id, restaurant.name)
                                }
                                disabled={isProcessing}
                                aria-busy={isProcessing}
                                title="Sil"
                                bgColor="transparent"
                                textColor="var(--textMuted)"
                                borderColor="var(--border)"
                                padding="6px"
                                icon={<TrashIcon size={16} />}
                            />
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    /* ── MASAÜSTÜ GÖRÜNÜM (STANDART TABLO) ── */
    const cellStyle = {padding: '16px 24px'};

    return (
        <tr
            style={{
                borderBottom: isLast ? 'none' : '1px solid var(--borderLight)',
            }}
        >
            <td style={cellStyle}>
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '4px'}}
                >
                    <span style={textStyles.idHash}>#</span>
                    <span style={textStyles.id}>{restaurant.id}</span>
                </div>
            </td>
            <td style={cellStyle}>
                <div style={textStyles.name}>{restaurant.name}</div>
                <div
                    style={{
                        fontSize: 'var(--font-small)',
                        color: 'var(--textMuted)',
                    }}
                >
                    {productCount} ürün · {categoryCount} kategori
                </div>
            </td>
            <td style={cellStyle}>
                <div style={textStyles.email}>
                    <MailIcon size={14} />
                    {restaurant.adminEmail}
                </div>
            </td>
            <td style={cellStyle}>{statusBadge}</td>
            <td style={{...cellStyle, textAlign: 'right'}}>
                <DeleteButton
                    onClick={() => onDelete(restaurant.id, restaurant.name)}
                    disabled={isProcessing}
                    aria-busy={isProcessing}
                    title="Sil"
                    aria-label={`${restaurant.name} restoranını sil`}
                    bgColor="transparent"
                    textColor="var(--textMuted)"
                    borderColor="transparent"
                    hoverBgColor="var(--dangerBg)"
                    hoverTextColor="var(--danger)"
                    hoverBorderColor="transparent"
                    padding="4px"
                    icon={<TrashIcon size={18} />}
                />
            </td>
        </tr>
    );
};

export default RestaurantTableRow;
