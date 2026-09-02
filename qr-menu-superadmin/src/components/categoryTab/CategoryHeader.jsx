import {useResponsive} from '@/hooks/useResponsive';
import StatCard from '@/components/common/StatCard';
import PageHeader from '@/components/common/PageHeader';
import {AddButton} from '@/components/common/button/Buttons';
import {FolderIcon, PackageIcon} from '@/components/common/icon/Icons';

const CategoryHeader = ({
    categories,
    menu,
    onAddCategory,
    isProcessing,
}) => {
    const {isMobile} = useResponsive();

    return (
        <div style={{marginBottom: '30px'}}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'flex-start',
                    gap: '16px',
                    marginBottom: '20px',
                }}
            >
                <PageHeader
                    title="Kategoriler"
                    subtitle="Menü kategorilerini ekleyin, düzenleyin veya sıralayın."
                />

                <AddButton
                    onClick={onAddCategory}
                    disabled={isProcessing}
                    borderRadius="var(--radiusPill)"
                    padding="10px 20px"
                    style={{
                        width: isMobile ? '100%' : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    Yeni Kategori
                </AddButton>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                        ? 'repeat(2, minmax(0, 1fr))'
                        : 'repeat(2, 1fr)',
                    gap: '20px',
                }}
            >
                <StatCard
                    value={categories.length}
                    label="Toplam Kategori"
                    icon={<FolderIcon size={20} />}
                    bgColor="var(--badge)"
                    iconColor="var(--info)"
                />

                <StatCard
                    value={menu.length}
                    label="Toplam Ürün"
                    icon={<PackageIcon size={20} />}
                    bgColor="var(--successBg)"
                    iconColor="var(--success)"
                />
            </div>
        </div>
    );
};

export default CategoryHeader;
