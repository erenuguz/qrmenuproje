import React from 'react';

const EmptyState = ({message}) => (
    <div
        style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--textSecondary)',
            fontSize: 'var(--font-caption)',
        }}
    >
        {message}
    </div>
);

export default EmptyState;
