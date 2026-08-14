import React from 'react';

// Dışarıdan özel bir mesaj gelmezse varsayılan olarak "Yükleniyor..." yazar
const LoadingSpinner = ({mesaj = 'Yükleniyor...'}) => {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px',
                textAlign: 'center',
                color: 'var(--textSecondary)',
                fontSize: 'var(--font-body)',
                fontWeight: 'var(--font-bold)',
                backgroundColor: 'var(--background)',
            }}
        >
            ⏳ {mesaj}
        </div>
    );
};

export default LoadingSpinner;
