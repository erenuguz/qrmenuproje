import React from 'react';
import {MoveUpButton, MoveDownButton} from '@/components/common/button/Buttons';

export const CategoryItemOrder = ({
    index,
    totalCount,
    onMoveUp,
    onMoveDown,
    isMobile = false,
}) => {
    const isFirst = index === 0;
    const isLast = index === totalCount - 1;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                ...(isMobile ? {minWidth: '24px'} : {width: '50px'}),
            }}
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                <MoveUpButton
                    onClick={() => onMoveUp(index)}
                    disabled={isFirst}
                />
                <MoveDownButton
                    onClick={() => onMoveDown(index)}
                    disabled={isLast}
                />
            </div>

            <span
                style={{
                    fontSize: 'var(--font-small)',
                    color: 'var(--textMuted)',
                    fontWeight: 'var(--font-medium)',
                    lineHeight: '1',
                }}
            >
                {index + 1}
            </span>
        </div>
    );
};

export default CategoryItemOrder;
