import {useState} from 'react';
import {SaveButton, CancelButton} from '@/components/common/button/Buttons';
import Input from '@/components/common/Input';

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
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                containerStyle={{
                    flex: 1,
                    minWidth: 0,
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
