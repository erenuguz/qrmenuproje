import {useState, useRef} from 'react';
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

    const handleFileChange = async (event) => {
        const input = event.target;
        const file = input.files?.[0];

        if (!file) return;

        try {
            const url = await uploadImageAndGetUrl(file, setIsUploading);

            await onImageUpdate(categoryId, url);
        } catch (error) {
            toast.error(error?.message || 'Resim yüklenirken hata oluştu.');
        } finally {
            input.value = '';
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
                accept=".jpg,.jpeg,.png,.webp"
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
