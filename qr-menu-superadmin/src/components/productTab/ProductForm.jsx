import React from 'react';
import {uploadImageAndGetUrl, useToast, SaveButton, CancelButton} from '@/';
import Input from '@/components/common/Input';
import {inputStyle, formFieldStyle, labelStyle} from '@/styles/shared';
import Select from '@/components/common/Select';
import Textarea from '@/components/common/TextArea';

const rowStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
};

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
                <div style={formFieldStyle}>
                    <Input
                        label="Ürün Adı"
                        labelStyle={{
                            fontSize: 'var(--font-caption)',
                            color: 'var(--text)',
                        }}
                        value={activeForm.name}
                        onChange={handleChange('name')}
                    />
                </div>
                <div style={formFieldStyle}>
                    <Select
                        label="Kategori"
                        labelStyle={labelStyle}
                        value={activeForm.categoryId}
                        onChange={handleChange('categoryId')}
                    >
                        <option value="" disabled>
                            Kategori Seç
                        </option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Fiyat + Resim */}
            <div style={rowStyle}>
                <div style={formFieldStyle}>
                    <Input
                        label="Fiyat (₺)"
                        labelStyle={{
                            fontSize: 'var(--font-caption)',
                            color: 'var(--text)',
                        }}
                        type="number"
                        value={activeForm.price}
                        onChange={handleChange('price')}
                    />
                </div>
                <div style={formFieldStyle}>
                    <label style={labelStyle}>Resim Seç</label>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Input
                            value={activeForm.image}
                            onChange={handleChange('image')}
                            placeholder="Link yapıştırın..."
                            containerStyle={{flex: 1, minWidth: 0, gap: 0}}
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
                            {/* Dosya yükleme */}
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
                <Textarea
                    label="Açıklama"
                    labelStyle={labelStyle}
                    placeholder="Ürün açıklamasını girin"
                    value={activeForm.description}
                    onChange={handleChange('description')}
                    rows={4}
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
