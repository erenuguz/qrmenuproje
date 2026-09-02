import {
    EditButton,
    DeleteButton,
} from '@/components/common/button/Buttons';

export const CategoryItemActions = ({
    categoryId,
    categoryName,
    onEditClick,
    onDeleteClick,
    isMobile = false,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: isMobile ? '100%' : 'auto',
            }}
        >
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
