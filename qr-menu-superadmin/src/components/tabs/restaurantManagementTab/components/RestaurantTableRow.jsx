import React, {useState, useEffect} from 'react';
import {collection, getCountFromServer} from 'firebase/firestore';
import {db} from '@/firebaseConfig';

const RestaurantTableRow = ({res, isLast, handleDelete}) => {
    const isInactive = res.status === 'pasif';
    const [productCount, setProductCount] = useState('...');
    const [categoryCount, setCategoryCount] = useState('...');

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
                setProductCount(productSnap.data().count);
                setCategoryCount(categorySnap.data().count);
            } catch (err) {
                console.error('Sayı getirilemedi:', err);
                setProductCount('?');
                setCategoryCount('?');
            }
        };

        fetchCounts();
    }, [res.id]);

    return (
        <tr
            style={{
                borderBottom: isLast ? 'none' : '1px solid var(--borderLight)',
            }}
        >
            {/* SİSTEM ID */}
            <td style={{padding: '16px 24px'}}>
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                    <span
                        style={{
                            color: 'var(--textMuted)',
                            fontSize: '14px',
                            fontWeight: 700,
                        }}
                    >
                        #
                    </span>
                    <span
                        style={{
                            color: 'var(--textSecondary)',
                            fontSize: '14px',
                            fontFamily: 'monospace',
                        }}
                    >
                        {res.id}
                    </span>
                </div>
            </td>

            {/* RESTORAN ADI */}
            <td style={{padding: '16px 24px'}}>
                <div
                    style={{
                        fontWeight: 600,
                        color: 'var(--text)',
                        fontSize: '14px',
                        marginBottom: '4px',
                    }}
                >
                    {res.name}
                </div>
                <div style={{fontSize: '12px', color: 'var(--textMuted)'}}>
                    {productCount} ürün · {categoryCount} kategori
                </div>
            </td>

            {/* EMAIL */}
            <td style={{padding: '16px 24px'}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--textSecondary)',
                        fontSize: '14px',
                    }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {res.admin_email}
                </div>
            </td>

            {/* DURUM */}
            <td style={{padding: '16px 24px'}}>
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 8px',
                        borderRadius: 'var(--radiusSmall)',
                        backgroundColor: isInactive
                            ? 'var(--dangerBg)'
                            : 'var(--successBg)',
                        color: isInactive ? 'var(--danger)' : 'var(--success)',
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
            </td>

            {/* İŞLEM */}
            <td style={{padding: '16px 24px', textAlign: 'right'}}>
                <button
                    onClick={() => handleDelete(res.id, res.name)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--textMuted)',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'color 0.2s ease',
                    }}
                    title="Sil"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--danger)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--textMuted)')
                    }
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default RestaurantTableRow;
