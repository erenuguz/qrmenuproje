import {Component} from 'react';
import EmptyState from '@/components/common/EmptyState';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.error('Uygulama genelinde hata yakalandı:', error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: '20px',
                        backgroundColor:
                            'var(--bgMain, var(--background, #fff))',
                    }}
                >
                    <EmptyState
                        icon="!"
                        iconBg="var(--dangerBg)"
                        title="Bir şeyler ters gitti"
                        message="Beklenmeyen bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz."
                        minHeight="auto"
                    />

                    <button
                        type="button"
                        onClick={this.handleReload}
                        style={{
                            marginTop: '16px',
                            height: 'var(--control-height, 45px)',
                            padding: '0 24px',
                            borderRadius: 'var(--radiusMedium, 12px)',
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            fontWeight: 'var(--font-semibold, 600)',
                            fontSize: 'var(--font-body, 15px)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'opacity 0.2s',
                        }}
                    >
                        Sayfayı Yenile
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
