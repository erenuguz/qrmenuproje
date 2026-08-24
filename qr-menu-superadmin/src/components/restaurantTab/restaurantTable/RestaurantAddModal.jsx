import React from 'react';
import Input from '@/components/common/Input';
import {CancelButton, CreateButton} from '@/components/common/button/Buttons';
import {cardStyle} from '@/styles/shared';

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
                    ...cardStyle,
                    padding: '30px',
                    maxWidth: '400px',
                    borderRadius: 'var(--radiusLarge)',
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
                    <Input
                        type="text"
                        placeholder="Sistem ID (örn: mutlu-kebap)"
                        required
                        value={newId}
                        onChange={(e) => setNewId(e.target.value)}
                    />

                    <Input
                        type="text"
                        placeholder="Restoran Adı"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />

                    <Input
                        type="email"
                        placeholder="Yönetici E-Posta"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <CancelButton
                            onClick={() => setIsModalOpen(false)}
                            bgColor="var(--surface)"
                            padding="12px"
                            style={{flex: 1}}
                        />

                        <CreateButton
                            isLoading={isProcessing}
                            style={{flex: 1}}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantAddModal;
