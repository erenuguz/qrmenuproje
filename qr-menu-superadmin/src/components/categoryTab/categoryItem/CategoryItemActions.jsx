import React, {useState, useRef} from 'react';
import {useToast} from '@/hooks/useToast';
import {uploadImageAndGetUrl} from '@/utils/helpers';
import {
    UploadImageButton,
    EditButton,
    DeleteButton,
} from '@/components/common/button/Buttons';

export const CategoryItemActions = ({
    categoryId,
    categoryName,
    onEditClick,
    onDeleteClick,
    onImageUpdate,
    isMobile = false,
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const toast = useToast();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const url = await uploadImageAndGetUrl(file, () => {});
            if (url) {
                onImageUpdate(categoryId, url);
            } else {
                toast.error('Resim yüklenirken hata oluştu.');
            }
            setIsUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: isMobile ? '100%' : 'auto',
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                disabled={isUploading}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <UploadImageButton
                isLoading={isUploading}
                onClick={() => fileInputRef.current?.click()}
                style={{flex: isMobile ? 1 : undefined}}
            >
                {isMobile ? 'Görsel' : 'Görsel Ekle'}
            </UploadImageButton>

            <EditButton
                onClick={onEditClick}
                style={{flex: isMobile ? 1 : undefined}}
            />

            <DeleteButton
                onClick={() => onDeleteClick(categoryId, categoryName)}
                style={{flex: isMobile ? 1 : undefined}}
            >
                Sil
            </DeleteButton>
        </div>
    );
};

export default CategoryItemActions;
