import React from 'react';
import {inputStyle} from '@/';

const RestaurantAddModal = ({
    isModalOpen,
    setIsModalOpen,
    handleAddNewRestaurant,
    newId,
    setNewId,
    newName,
    setNewName,
    newEmail,
    setNewEmail,
    isProcessing,
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
                    onSubmit={handleAddNewRestaurant}
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
                        value={newId}
                        onChange={(e) => setNewId(e.target.value)}
                        style={{...inputStyle, padding: '12px'}}
                    />

                    <input
                        type="text"
                        placeholder="Restoran Adı"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        style={{...inputStyle, padding: '12px'}}
                    />

                    <input
                        type="email"
                        placeholder="Yönetici E-Posta"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
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
                            disabled={isProcessing}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--textWhite)',
                                borderRadius: 'var(--radiusSmall)',
                                cursor: isProcessing ? 'wait' : 'pointer',
                                fontWeight: 'var(--font-medium)',
                            }}
                        >
                            {isProcessing ? 'Oluşturuluyor...' : 'Oluştur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantAddModal;
