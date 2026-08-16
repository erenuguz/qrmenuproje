import React, {useEffect, useRef} from 'react';

const SideBar = ({
    menuItems,
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Eğer sidebar açık ise VE tıklanan yer sidebar'ın veya hamburger butonunun içinde DEĞİLSE kapat
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !event.target.closest('.hamburger-btn') // Hamburger butonunu tıklama dışı bırakıyoruz
            ) {
                setIsSidebarOpen(false);
            }
        };

        // Dinleyiciyi ekle
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            // Temizlik
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isSidebarOpen, setIsSidebarOpen]);

    return (
        <div
            ref={sidebarRef}
            style={{
                width: isSidebarOpen ? '250px' : '0px',
                minWidth: isSidebarOpen ? '250px' : '0px',
                backgroundColor: 'var(--sidebar)',

                borderTop: isSidebarOpen ? '1px solid var(--border)' : 'none',
                borderRight: isSidebarOpen ? '1px solid var(--border)' : 'none',

                padding: isSidebarOpen ? '24px 16px' : '0px 16px',
                opacity: isSidebarOpen ? 1 : 0,
                visibility: isSidebarOpen ? 'visible' : 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                overflowY: 'auto',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'all .3s ease',
                boxSizing: 'border-box',
                height: 'calc(100vh - 70px)',
                position: 'fixed',
                top: '70px',
                zIndex: 1000,
            }}
        >
            <span
                style={{
                    fontSize: 'var(--font-small)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--textMuted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '16px',
                    paddingLeft: '12px',
                }}
            >
                YÖNETİM
            </span>

            {menuItems.map((item) => {
                const isSelected = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                        }}
                        style={{
                            padding: '10px 12px',
                            backgroundColor: isSelected
                                ? 'var(--primary)'
                                : 'transparent',
                            color: isSelected
                                ? 'var(--textWhite)'
                                : 'var(--textSecondary)',
                            border: 'none',
                            borderRadius: 'var(--radiusSmall)',
                            fontWeight: isSelected
                                ? 'var(--font-semibold)'
                                : 'var(--font-medium)',
                            fontSize: 'var(--font-caption)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSelected) {
                                e.currentTarget.style.backgroundColor =
                                    'var(--hover)';
                                e.currentTarget.style.color = 'var(--text)';
                                e.currentTarget.querySelector(
                                    '.menu-icon'
                                ).style.color = 'var(--textSecondary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSelected) {
                                e.currentTarget.style.backgroundColor =
                                    'transparent';
                                e.currentTarget.style.color =
                                    'var(--textSecondary)';
                                e.currentTarget.querySelector(
                                    '.menu-icon'
                                ).style.color = 'var(--textMuted)';
                            }
                        }}
                    >
                        <span
                            className="menu-icon"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: isSelected
                                    ? 'var(--textWhite)'
                                    : 'var(--textMuted)',
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {item.icon}
                        </span>

                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SideBar;
