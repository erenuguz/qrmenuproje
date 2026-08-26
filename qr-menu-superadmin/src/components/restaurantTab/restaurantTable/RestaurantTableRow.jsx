import React, {useState, useEffect} from 'react';
import {collection, getCountFromServer} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {DeleteButton} from '@/';
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

const RestaurantTableRow = ({res, isLast, handleDelete}) => {
    const {isMobile} = useResponsive();
    const isInactive = res.isInactive === true;

    const [counts, setCounts] = useState({products: '...', categories: '...'});

    useEffect(() => {
        if (!res.id) return;
        const fetchCounts = async () => {
            try {
                const [productSnap, categorySnap] = await Promise.all([
                    getCountFromServer(
                        collection(db, 'restaurants', res.id, 'menu')
                    ),
                    getCountFromServer(
                        collection(db, 'restaurants', res.id, 'categories')
                    ),
                ]);
                setCounts({
                    products: productSnap.data().count,
                    categories: categorySnap.data().count,
                });
            } catch (err) {
                setCounts({products: '?', categories: '?'});
            }
        };
        fetchCounts();
    }, [res.id]);

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
                            <div style={textStyles.name}>{res.name}</div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                <span style={textStyles.idHash}>#</span>
                                <span style={textStyles.id}>{res.id}</span>
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
                            {res.admin_email}
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
                                {counts.products} ürün · {counts.categories}{' '}
                                kategori
                            </div>
                            <DeleteButton
                                onClick={() => handleDelete(res.id, res.name)}
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
                    <span style={textStyles.id}>{res.id}</span>
                </div>
            </td>
            <td style={cellStyle}>
                <div style={textStyles.name}>{res.name}</div>
                <div
                    style={{
                        fontSize: 'var(--font-small)',
                        color: 'var(--textMuted)',
                    }}
                >
                    {counts.products} ürün · {counts.categories} kategori
                </div>
            </td>
            <td style={cellStyle}>
                <div style={textStyles.email}>
                    <MailIcon size={14} />
                    {res.admin_email}
                </div>
            </td>
            <td style={cellStyle}>{statusBadge}</td>
            <td style={{...cellStyle, textAlign: 'right'}}>
                <DeleteButton
                    onClick={() => handleDelete(res.id, res.name)}
                    title="Sil"
                    bgColor="transparent"
                    textColor="var(--textMuted)"
                    borderColor="transparent"
                    padding="4px"
                    icon={<TrashIcon size={18} />}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--danger)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--textMuted)')
                    }
                />
            </td>
        </tr>
    );
};

export default RestaurantTableRow;
