const LoadingSpinner = ({message = 'Yükleniyor...'}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                gap: '16px',
                fontFamily: 'var(--font-family)',
            }}
        >
            {/* Spinner Halkası */}
            <div style={{position: 'relative', width: '48px', height: '48px'}}>
                {/* Arka plan halkası */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'var(--radiusCircle)',
                        border: '3px solid var(--border)',
                    }}
                />
                {/* Dönen halka */}
                <div
                    className="loading-spinner-ring"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'var(--radiusCircle)',
                        border: '3px solid transparent',
                        borderTopColor: 'var(--primary)',
                    }}
                />
            </div>

            {/* Mesaj */}
            <p
                style={{
                    margin: 0,
                    color: 'var(--textSecondary)',
                    fontSize: 'var(--font-caption)',
                    fontWeight: 'var(--font-medium)',
                    letterSpacing: '0.01em',
                }}
            >
                {message}
            </p>
        </div>
    );
};

export default LoadingSpinner;
