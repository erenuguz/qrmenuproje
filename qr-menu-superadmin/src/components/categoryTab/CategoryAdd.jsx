import {useResponsive} from '@/hooks/useResponsive';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import {AddButton} from '@/components/common/button/Buttons';
import {TagIcon} from '@/components/common/icon/Icons';

const CategoryAdd = ({newCategoryName, setNewCategoryName, addCategory}) => {
    const {isMobile} = useResponsive();
    const isActive = newCategoryName.trim();

    return (
        <Card
            padding={isMobile ? '16px 20px' : '20px 24px'}
            style={{marginBottom: '24px'}}
        >
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: 'var(--font-body)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text)',
                }}
            >
                Yeni Kategori Ekle
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '12px',
                    alignItems: 'center',
                }}
            >
                <Input
                    icon={<TagIcon size={18} />}
                    placeholder={
                        isMobile
                            ? 'Kategori adı girin'
                            : 'Kategori adı girin (örn. Çorbalar)'
                    }
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                    isMobile={isMobile}
                    containerStyle={{
                        flex: isMobile ? undefined : 1,
                    }}
                />

                <AddButton
                    onClick={addCategory}
                    disabled={!isActive}
                    style={{
                        width: isMobile ? '100%' : 'auto',
                    }}
                >
                    Ekle
                </AddButton>
            </div>
        </Card>
    );
};

export default CategoryAdd;
