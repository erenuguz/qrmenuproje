import React from 'react';
import {inputStyle} from '@/';

const RestaurantAddModal = ({
    isModalOpen,
    setIsModalOpen,
    handleYeniRestoranEkle,
    yeniId,
    setYeniId,
    yeniAd,
    setYeniAd,
    yeniEmail,
    setYeniEmail,
    islemYapiliyor,
}) => {
    if (!isModalOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'var(--overlay)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                backdropFilter: 'blur(4px)',
            }}
        >
            <div
                style={{
                    backgroundColor: 'var(--surface)',
                    padding: '30px',
                    borderRadius: 'var(--radiusLarge)',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: 'var(--shadow)',
                }}
            >
                <h3
                    style={{
                        margin: '0 0 20px 0',
                        color: 'var(--text)',
                        fontSize: 'var(--font-title)',
                        fontWeight: 'var(--font-semibold)',
                    }}
                >
                    Yeni Restoran Oluştur
                </h3>

                <form
                    onSubmit={handleYeniRestoranEkle}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Sistem ID (örn: mutlu-kebap)"
                        required
                        value={yeniId}
                        onChange={(e) => setYeniId(e.target.value)}
                        style={{...inputStyle, padding: '12px'}}
                    />

                    <input
                        type="text"
                        placeholder="Restoran Adı"
                        required
                        value={yeniAd}
                        onChange={(e) => setYeniAd(e.target.value)}
                        style={{...inputStyle, padding: '12px'}}
                    />

                    <input
                        type="email"
                        placeholder="Yönetici E-Posta"
                        required
                        value={yeniEmail}
                        onChange={(e) => setYeniEmail(e.target.value)}
                        style={{...inputStyle, padding: '12px'}}
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--surface)',
                                color: 'var(--textSecondary)',
                                borderRadius: 'var(--radiusSmall)',
                                cursor: 'pointer',
                                fontWeight: 'var(--font-medium)',
                            }}
                        >
                            İptal
                        </button>

                        <button
                            type="submit"
                            disabled={islemYapiliyor}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--textWhite)',
                                borderRadius: 'var(--radiusSmall)',
                                cursor: islemYapiliyor ? 'wait' : 'pointer',
                                fontWeight: 'var(--font-medium)',
                            }}
                        >
                            {islemYapiliyor ? 'Oluşturuluyor...' : 'Oluştur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantAddModal;
