import Badge from '@/components/common/Badge';
import {TagIcon} from '@/components/common/icon/Icons';

export const CategoryListHeader = ({
    count = 0,
    title = 'Kategori Listesi',
    helperText = 'Okları kullanarak sırayı değiştirin',
}) => {
    return (
        <div
            style={{
                padding: '16px 24px',
                borderBottom: '1px solid var(--borderLight)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <TagIcon size={18} color="var(--textMuted)" />

                <h3
                    style={{
                        margin: 0,
                        fontSize: 'var(--font-body)',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--text)',
                    }}
                >
                    {title}
                </h3>

                <Badge>{count} kategori</Badge>
            </div>

            {helperText && (
                <span
                    style={{
                        fontSize: 'var(--font-small)',
                        color: 'var(--textMuted)',
                    }}
                >
                    {helperText}
                </span>
            )}
        </div>
    );
};

export default CategoryListHeader;
