import React from 'react';

/**
 * Liste/tablo boş olduğunda gösterilen ortak mesaj bloğu.
 * Kaynak: CategoryList, ProductList (2 yerde), RestaurantTable.
 */
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
