import {useId, useRef} from 'react';
import {uploadImageAndGetUrl} from '@/utils/helpers';
import {useToast} from '@/hooks/useToast';
import {
    SaveButton,
    CancelButton,
    UploadImageButton,
} from '@/components/common/button/Buttons';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import {formFieldStyle, labelStyle} from '@/styles/shared';

const rowStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
    flexWrap: 'wrap',
};

const CategoryForm = ({
    activeForm,
    setActiveForm,
    isImageLoading,
    setIsImageLoading,
    saveForm,
    isProcessing,
}) => {
    const toast = useToast();
    const fileInputRef = useRef(null);
    const imageInputId = useId();

    const handleChange = (field) => (event) => {
        const value = event.target.value;

        setActiveForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    };

    const handleImageUpload = async (event) => {
        const input = event.target;
        const file = input.files?.[0];

        if (!file) return;

        try {
            const url = await uploadImageAndGetUrl(file, setIsImageLoading);

            setActiveForm((currentForm) => ({
                ...currentForm,
                image: url,
            }));
        } catch (error) {
            toast.error(
                error?.message || 'Kategori görseli yüklenemedi.'
            );
        } finally {
            input.value = '';
        }
    };

    return (
        <Card padding="clamp(15px, 5vw, 30px)">
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
                    {activeForm.id
                        ? 'Kategoriyi Düzenle'
                        : 'Yeni Kategori Ekle'}
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: 'var(--textSecondary)',
                        fontSize: 'var(--font-caption)',
                    }}
                >
                    Kategori adını ve görselini düzenleyebilirsiniz.
                </p>
            </div>

            <div style={rowStyle}>
                <div style={formFieldStyle}>
                    <Input
                        label="Kategori Adı"
                        value={activeForm.name}
                        onChange={handleChange('name')}
                        placeholder="Örn. Ana Yemekler"
                        autoFocus
                    />
                </div>

                <div style={formFieldStyle}>
                    <label htmlFor={imageInputId} style={labelStyle}>
                        Kategori Görseli
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
                            placeholder="Görsel URL’si yapıştırın..."
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
                            disabled={isProcessing}
                            padding="0 16px"
                            borderRadius="var(--radiusLarge)"
                            style={{
                                height: 'var(--control-height)',
                                flexShrink: 0,
                            }}
                        >
                            Gözat
                        </UploadImageButton>

                        <input
                            ref={fileInputRef}
                            id={imageInputId}
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleImageUpload}
                            disabled={isImageLoading || isProcessing}
                            style={{display: 'none'}}
                        />
                    </div>

                    {activeForm.image && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                marginTop: '12px',
                            }}
                        >
                            <img
                                src={activeForm.image}
                                alt="Kategori önizlemesi"
                                style={{
                                    width: '96px',
                                    height: '96px',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--radiusSmall)',
                                    border: '1px solid var(--border)',
                                }}
                            />

                            <CancelButton
                                onClick={() =>
                                    setActiveForm((currentForm) => ({
                                        ...currentForm,
                                        image: '',
                                    }))
                                }
                                disabled={isImageLoading || isProcessing}
                                padding="6px 10px"
                            >
                                Görseli Kaldır
                            </CancelButton>
                        </div>
                    )}
                </div>
            </div>

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
                    disabled={isImageLoading || isProcessing}
                />

                <SaveButton
                    onClick={saveForm}
                    disabled={!activeForm.name.trim()}
                    isLoading={isImageLoading || isProcessing}
                    loadingText={
                        isImageLoading
                            ? 'Görsel Yükleniyor...'
                            : 'Kaydediliyor...'
                    }
                />
            </div>
        </Card>
    );
};

export default CategoryForm;
