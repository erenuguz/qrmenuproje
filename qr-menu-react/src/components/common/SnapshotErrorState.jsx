import EmptyState from '@/components/common/EmptyState';

const getErrorMessage = (error) => {
    const errorCode = String(error?.code || '');

    if (errorCode.includes('permission-denied')) {
        return 'Bu verileri görüntülemek için yetkiniz bulunmuyor.';
    }

    if (errorCode.includes('unavailable')) {
        return 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.';
    }

    return 'Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.';
};

const SnapshotErrorState = ({
    error,
    resourceName = 'Veriler',
    minHeight = '300px',
}) => {
    return (
        <div role="alert" aria-live="assertive">
            <EmptyState
                icon="!"
                iconBg="var(--dangerBg)"
                title={`${resourceName} yüklenemedi`}
                message={getErrorMessage(error)}
                minHeight={minHeight}
            />
        </div>
    );
};

export default SnapshotErrorState;
