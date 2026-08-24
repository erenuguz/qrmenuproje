import React, {useState} from 'react';
import {WifiIcon, CopyIcon, CheckIcon} from '@/components/common/icon/Icons';
import {iconContainerStyle} from '@/styles/shared';

const WifiCard = ({networkName, password}) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!networkName && !password) return null;

    const copyPassword = () => {
        if (!password) return;
        navigator.clipboard?.writeText(password);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <div
            style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radiusLarge)',
                padding: '16px 18px',
                marginBottom: '12px',
                boxShadow: 'var(--shadow)',
            }}
        >
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

                {password && (
                    <button
                        onClick={copyPassword}
                        style={{
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid',
                            borderColor: isCopied
                                ? 'var(--success)'
                                : 'var(--border)',
                            backgroundColor: isCopied
                                ? 'var(--successBg)'
                                : 'var(--background)',
                            color: isCopied ? 'var(--success)' : 'var(--text)',
                            borderRadius: 'var(--radiusSmall)',
                            padding: '8px 12px',
                            fontSize: 'var(--font-caption)',
                            fontWeight: 'var(--font-semibold)',
                            fontFamily: 'var(--font-family)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {isCopied ? (
                            <CheckIcon size={13} color="var(--success)" />
                        ) : (
                            <CopyIcon size={13} color="currentColor" />
                        )}
                        {isCopied ? 'Kopyalandı' : password}
                    </button>
                )}
            </div>
        </div>
    );
};

export default WifiCard;
