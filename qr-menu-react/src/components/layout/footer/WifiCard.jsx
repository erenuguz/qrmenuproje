import {WifiIcon} from '@/components/common/icon/Icons';
import {iconContainerStyle} from '@/styles/shared';
import {CopyButton} from '@/components/common/button/Buttons';
import Card from '@/components/common/Card';

const WifiCard = ({networkName, password}) => {
    if (!networkName && !password) return null;

    return (
        <Card padding="16px 18px" style={{marginBottom: '12px'}}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}
            >
                <div
                    style={{
                        ...iconContainerStyle,
                        backgroundColor: 'var(--infoBg)',
                        color: 'var(--info)',
                    }}
                >
                    <WifiIcon size={20} color="currentColor" />
                </div>

                <div style={{flex: 1, minWidth: 0}}>
                    {networkName && (
                        <>
                            <div
                                style={{
                                    fontSize: 'var(--font-small)',
                                    color: 'var(--textSecondary)',
                                    marginBottom: '2px',
                                }}
                            >
                                Ağ Adı
                            </div>
                            <div
                                style={{
                                    fontSize: 'var(--font-body)',
                                    fontWeight: 'var(--font-semibold)',
                                    color: 'var(--text)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {networkName}
                            </div>
                        </>
                    )}
                </div>

                {password && <CopyButton textToCopy={password} />}
            </div>
        </Card>
    );
};

export default WifiCard;
