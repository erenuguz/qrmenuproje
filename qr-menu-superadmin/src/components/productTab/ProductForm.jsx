import React, {useId, useRef} from 'react';
import {uploadImageAndGetUrl} from '@/utils/helpers';
import {useToast} from '@/hooks/useToast';
import {
    SaveButton,
    CancelButton,
    UploadImageButton,
} from '@/components/common/button/Buttons';
import Input from '@/components/common/Input';
import {cardStyle, formFieldStyle, labelStyle} from '@/styles/shared';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea';

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
    isProcessing,
}) {
    const toast = useToast();
    const fileInputRef = useRef(null);
    const imageInputId = useId();

    const handleChange = (field) => (e) => {
        setActiveForm({...activeForm, [field]: e.target.value});
    };

    const handleImageUpload = async (event) => {
        const input = event.target;
        const file = input.files?.[0];

        if (!file) return;

        const url = await uploadImageAndGetUrl(file, setIsImageLoading);

        if (url) {
            setActiveForm((currentForm) => ({
                ...currentForm,
                image: url,
            }));
        } else {
            toast.error('Resim yüklenirken hata oluştu.');
        }

        // Aynı dosyanın tekrar seçilebilmesini sağlar.
        input.value = '';
    };

    return (
        <div
            style={{
                ...cardStyle,
                padding: 'clamp(15px, 5vw, 30px)',
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
                    <label htmlFor={imageInputId} style={labelStyle}>
                        Resim Seç
                    </label>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                        }}
                    >
                        <Input
                            value={activeForm.image}
                            onChange={handleChange('image')}
                            placeholder="Link yapıştırın..."
                            containerStyle={{
                                flex: 1,
                                minWidth: 0,
                                gap: 0,
                            }}
                        />

                        <UploadImageButton
                            onClick={() => fileInputRef.current?.click()}
                            isLoading={isImageLoading}
                            loadingText="Yükleniyor..."
                            padding="0 16px"
                            borderRadius="var(--radiusLarge)"
                            style={{
                                height: '45px',
                                flexShrink: 0,
                            }}
                        >
                            Gözat
                        </UploadImageButton>

                        <input
                            ref={fileInputRef}
                            id={imageInputId}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{display: 'none'}}
                        />
                    </div>
                    {/* Resim Önizleme */}
                    {activeForm.image && (
                        <img
                            src={activeForm.image}
                            alt="Ürün önizlemesi"
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
                <TextArea
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
                <CancelButton
                    onClick={() => setActiveForm(null)}
                    disabled={isProcessing}
                />
                <SaveButton
                    onClick={saveForm}
                    isLoading={isImageLoading || isProcessing}
                    loadingText={
                        isImageLoading
                            ? 'Görsel Yükleniyor...'
                            : 'Kaydediliyor...'
                    }
                />
            </div>
        </div>
    );
}
