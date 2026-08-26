import React, {useState, useEffect} from 'react';
import {collection, getCountFromServer} from 'firebase/firestore';
import {db} from '@/firebaseConfig';
import {DeleteButton} from '@/';
import {MailIcon, TrashIcon} from '@/components/common/icon/Icons';
import {useResponsive} from '@/hooks/useResponsive'; // Ekledik!

const textStyles = {
    idHash: {color: 'var(--textMuted)', fontSize: '14px', fontWeight: 700},
    id: {
        color: 'var(--textSecondary)',
        fontSize: '13px',
        fontFamily: 'monospace',
    },
    name: {
        fontWeight: 600,
        color: 'var(--text)',
        fontSize: '15px',
        marginBottom: '4px',
    },
    email: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--textSecondary)',
        fontSize: '13px',
    },
};

const RestaurantTableRow = ({res, isLast, handleDelete}) => {
    const {isMobile} = useResponsive(); // Ekledik!
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
                fontSize: '12px',
                fontWeight: 600,
            }}
        >
            <span
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
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
                {/* Tüm içeriği tek bir hücrede (colSpan="5") topluyoruz */}
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
                                    fontSize: '12px',
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
                <div style={{fontSize: '12px', color: 'var(--textMuted)'}}>
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
