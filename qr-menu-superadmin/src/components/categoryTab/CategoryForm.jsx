import React, {useState} from 'react';
import {SaveButton, CancelButton} from '@/components/common/button/Buttons';

export const CategoryForm = ({initialName = '', onSave, onCancel}) => {
    const [name, setName] = useState(initialName);

    const handleSave = () => {
        if (name.trim() && name.trim() !== initialName) {
            onSave(name.trim());
        } else {
            onCancel();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div style={{display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap'}}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '8px 12px',
                    borderRadius: 'var(--radiusSmall)',
                    border: '1px solid var(--primary)',
                    backgroundColor: 'var(--inputBackground)',
                    color: 'var(--text)',
                    outline: 'none',
                    fontSize: 'var(--font-body)',
                }}
            />

            <SaveButton onClick={handleSave} />

            <CancelButton
                onClick={onCancel}
                bgColor="var(--borderLight)"
                textColor="var(--text)"
                borderColor="transparent"
                padding="6px 12px"
                fontSize="var(--font-small)"
                fontWeight="var(--font-medium)"
            />
        </div>
    );
};

export default CategoryForm;
