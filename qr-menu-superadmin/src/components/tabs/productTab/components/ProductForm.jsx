import {uploadImageAndGetUrl, useToast} from '@/';

// ── Shared stil nesneleri ──
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

export default function ProductForm({
    activeForm,
    setActiveForm,
    categories,
    isImageLoading,
    setIsImageLoading,
    saveForm,
}) {
    const toast = useToast();
    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                padding: 'clamp(15px, 5vw, 30px)',
                borderRadius: 'var(--radiusLarge)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                boxSizing: 'border-box',
                width: '100%',
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
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                }}
            >
                <div style={{flex: '1 1 200px'}}>
                    <label style={labelStyle}>Ürün Adı</label>
                    <input
                        type="text"
                        value={activeForm.name}
                        onChange={(e) =>
                            setActiveForm({...activeForm, name: e.target.value})
                        }
                        style={inputStyle}
                    />
                </div>
                <div style={{flex: '1 1 200px'}}>
                    <label style={labelStyle}>Kategori</label>
                    <select
                        value={activeForm.categoryId || ''}
                        onChange={(e) =>
                            setActiveForm({
                                ...activeForm,
                                categoryId: e.target.value,
                            })
                        }
                        style={{...inputStyle, cursor: 'pointer'}}
                    >
                        <option value="" disabled>
                            -- Kategori Seç --
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Fiyat + Resim */}
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                }}
            >
                <div style={{flex: '1 1 200px'}}>
                    <label style={labelStyle}>Fiyat (₺)</label>
                    <input
                        type="number"
                        value={activeForm.price}
                        onChange={(e) =>
                            setActiveForm({
                                ...activeForm,
                                price: e.target.value,
                            })
                        }
                        style={inputStyle}
                    />
                </div>
                <div style={{flex: '1 1 200px'}}>
                    <label style={labelStyle}>Resim Seç</label>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <input
                            type="text"
                            value={activeForm.image}
                            onChange={(e) =>
                                setActiveForm({
                                    ...activeForm,
                                    image: e.target.value,
                                })
                            }
                            placeholder="Link yapıştırın..."
                            style={{
                                ...inputStyle,
                                flex: 1,
                                minWidth: 0,
                                width: 'auto',
                            }}
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const url = await uploadImageAndGetUrl(
                                            file,
                                            setIsImageLoading
                                        );
                                        if (url) {
                                            setActiveForm({
                                                ...activeForm,
                                                image: url,
                                            });
                                        } else {
                                            toast.error(
                                                'Resim yüklenirken hata oluştu.'
                                            );
                                        }
                                    }
                                }}
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
                    onChange={(e) =>
                        setActiveForm({
                            ...activeForm,
                            description: e.target.value,
                        })
                    }
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
                <button
                    onClick={() => setActiveForm(null)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: 'var(--textSecondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radiusSmall)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    İptal
                </button>
                <button
                    onClick={saveForm}
                    disabled={isImageLoading}
                    style={{
                        padding: '10px 24px',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--textWhite)',
                        border: 'none',
                        borderRadius: 'var(--radiusSmall)',
                        fontWeight: 'bold',
                        cursor: isImageLoading ? 'wait' : 'pointer',
                        fontSize: '14px',
                    }}
                >
                    {isImageLoading ? 'Yükleniyor...' : 'Kaydet'}
                </button>
            </div>
        </div>
    );
}
