import React from 'react';
import {cardStyle, inputStyle, useResponsive} from '@/';
import {AddButton} from '@/components/common/button/Buttons';
import {TagIcon} from '@/components/common/icon/Icons';

const CategoryAdd = ({newCategoryName, setNewCategoryName, addCategory}) => {
    const {isMobile} = useResponsive();
    const isActive = newCategoryName.trim();

    return (
        <div style={cardStyle}>
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
                }}
            >
                {/* Input */}
                <div
                    style={{
                        position: 'relative',
                        ...(isMobile ? {width: '100%'} : {flex: 1}),
                    }}
                >
                    <TagIcon
                        size={18}
                        color="var(--textMuted)"
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    />
                    <input
                        type="text"
                        placeholder={
                            isMobile
                                ? 'Kategori adı girin'
                                : 'Kategori adı girin (örn. Çorbalar)'
                        }
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                        style={{...inputStyle, padding: '12px 16px 12px 42px'}}
                    />
                </div>

                <AddButton onClick={addCategory} disabled={!isActive}>
                    Ekle
                </AddButton>
            </div>
        </div>
    );
};

export default CategoryAdd;
