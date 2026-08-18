import React from 'react';
import {uploadImageAndGetUrl, useToast, SaveButton, CancelButton} from '@/';

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'var(--font-semibold)',
    color: 'var(--text)',
    fontSize: 'var(--font-caption)',
};

const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    borderRadius: 'var(--radiusSmall)',
    border: '1px solid var(--inputBorder)',
    backgroundColor: 'var(--inputBackground)',
    color: 'var(--text)',
    outline: 'none',
};

const rowStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
};

const fieldStyle = {flex: '1 1 200px'};

export default function ProductForm({
    activeForm,
    setActiveForm,
    categories,
    isImageLoading,
    setIsImageLoading,
    saveForm,
}) {
    const toast = useToast();

    const handleChange = (field) => (e) => {
        setActiveForm({...activeForm, [field]: e.target.value});
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = await uploadImageAndGetUrl(file, setIsImageLoading);
        if (url) {
            setActiveForm({...activeForm, image: url});
        } else {
            toast.error('Resim yüklenirken hata oluştu.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                padding: 'clamp(15px, 5vw, 30px)',
                borderRadius: 'var(--radiusLarge)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* Başlık */}
            <div
                style={{
                    borderBottom: '1px solid var(--borderLight)',
                    paddingBottom: '16px',
                    marginBottom: '24px',
                }}
            >
                <h2
                    style={{
                        color: 'var(--text)',
                        margin: '0 0 4px 0',
                        fontSize: 'var(--font-title)',
                        fontWeight: 'var(--font-bold)',
                    }}
                >
                    {activeForm.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                </h2>
                <p
                    style={{
                        margin: 0,
                        color: 'var(--textSecondary)',
                        fontSize: 'var(--font-caption)',
                    }}
                >
                    Ürün detaylarını aşağıdan doldurabilirsiniz.
                </p>
            </div>

            {/* Ürün Adı + Kategori */}
            <div style={rowStyle}>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Ürün Adı</label>
                    <input
                        type="text"
                        value={activeForm.name}
                        onChange={handleChange('name')} // Kısaldı!
                        style={inputStyle}
                    />
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Kategori</label>
                    <select
                        value={activeForm.categoryId || ''}
                        onChange={handleChange('categoryId')} // Kısaldı!
                        style={{...inputStyle, cursor: 'pointer'}}
                    >
                        <option value="" disabled>
                            -- Kategori Seç --
                        </option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Fiyat + Resim */}
            <div style={rowStyle}>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Fiyat (₺)</label>
                    <input
                        type="number"
                        value={activeForm.price}
                        onChange={handleChange('price')} // Kısaldı!
                        style={inputStyle}
                    />
                </div>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Resim Seç</label>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <input
                            type="text"
                            value={activeForm.image}
                            onChange={handleChange('image')}
                            placeholder="Link yapıştırın..."
                            style={{...inputStyle, flex: 1, minWidth: 0}}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: 'var(--badge)',
                                border: '1px solid var(--inputBorder)',
                                borderRadius: 'var(--radiusSmall)',
                                padding: '0 16px',
                                cursor: 'pointer',
                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: 'var(--badgeText)',
                                }}
                            >
                                Gözat
                            </span>
                            {/* Dosya yükleme*/}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    opacity: 0,
                                    cursor: 'pointer',
                                    height: '100%',
                                }}
                            />
                        </div>
                    </div>
                    {/* Resim Önizleme */}
                    {activeForm.image && (
                        <img
                            src={activeForm.image}
                            alt="ürün"
                            style={{
                                width: '64px',
                                height: '64px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radiusSmall)',
                                marginTop: '12px',
                                border: '1px solid var(--border)',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Açıklama */}
            <div style={{marginBottom: '30px'}}>
                <label style={labelStyle}>Açıklama</label>
                <textarea
                    value={activeForm.description}
                    onChange={handleChange('description')} // Kısaldı!
                    style={{
                        ...inputStyle,
                        minHeight: '100px',
                        resize: 'vertical',
                    }}
                />
            </div>

            {/* Butonlar */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                }}
            >
                <CancelButton onClick={() => setActiveForm(null)} />
                <SaveButton onClick={saveForm} isLoading={isImageLoading} />
            </div>
        </div>
    );
}
