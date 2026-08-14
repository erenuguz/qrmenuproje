import React from 'react';
import {useResponsive} from '@/hooks/useResponsive';

export default function ProductCard({
    yemek,
    kategoriAdi,
    topluSilModu,
    secilenUrunler,
    urunSecimiDegistir,
    setAktifForm,
    urunSil,
    isLast,
}) {
    const {isMobile} = useResponsive();

    /* ── Shared: Görsel ── */
    const gorsel = (
        <div
            style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'var(--surface)',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
            }}
        >
            <img
                src={yemek.resim}
                alt="ürün"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
        </div>
    );

    /* ── Shared: Checkbox ── */
    const checkbox = topluSilModu && (
        <input
            type="checkbox"
            checked={secilenUrunler.includes(yemek.id)}
            onChange={() => urunSecimiDegistir(yemek.id)}
            style={{transform: 'scale(1.3)', cursor: 'pointer', flexShrink: 0}}
        />
    );

    /* ── Shared: Butonlar (flex farkı koşullu) ── */
    const butonlar = (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                ...(isMobile && {marginTop: '10px'}),
            }}
        >
            <button
                onClick={() => setAktifForm(yemek)}
                style={{
                    flex: isMobile ? 1 : undefined,
                    padding: '4px 10px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--textSecondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                }}
            >
                Düzenle
            </button>
            <button
                onClick={() => urunSil(yemek.id, yemek.ad)}
                style={{
                    flex: isMobile ? 1 : undefined,
                    padding: '4px 10px',
                    backgroundColor: 'var(--dangerBg)',
                    color: 'var(--danger)',
                    border: '1px solid var(--borderLight)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px',
                }}
            >
                Sil
            </button>
        </div>
    );

    /* ── Mobile layout ── */
    if (isMobile) {
        return (
            <div
                style={{
                    padding: '12px 16px',
                    borderBottom: isLast ? 'none' : '1px solid var(--border)',
                }}
            >
                <div
                    style={{display: 'flex', alignItems: 'center', gap: '12px'}}
                >
                    {checkbox}
                    {gorsel}
                    <div style={{flex: 1, minWidth: 0}}>
                        <h5
                            style={{
                                margin: '0 0 4px 0',
                                color: 'var(--text)',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {yemek.ad}
                        </h5>
                        <span
                            style={{
                                fontSize: '12px',
                                color: 'var(--textSecondary)',
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {yemek.aciklama}
                        </span>
                    </div>
                    <span
                        style={{
                            fontSize: '15px',
                            color: 'var(--text)',
                            fontWeight: 'bold',
                            flexShrink: 0,
                        }}
                    >
                        ₺{yemek.fiyat}
                    </span>
                </div>
                {butonlar}
            </div>
        );
    }

    /* ── Desktop layout ── */
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: isLast ? 'none' : '1px solid var(--border)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flex: 1,
                }}
            >
                {checkbox}
                {gorsel}
                <div>
                    <h5
                        style={{
                            margin: '0 0 4px 0',
                            color: 'var(--text)',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        {yemek.ad}
                    </h5>
                    <span
                        style={{
                            fontSize: '12px',
                            color: 'var(--textSecondary)',
                        }}
                    >
                        {yemek.aciklama}
                    </span>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '40px'}}>
                <span
                    style={{
                        fontSize: '15px',
                        color: 'var(--text)',
                        fontWeight: 'bold',
                    }}
                >
                    ₺{yemek.fiyat}
                </span>
                {butonlar}
            </div>
        </div>
    );
}
