import {useEffect, useRef} from 'react';
import {NavTabButton} from '@/components/common/button/Buttons';

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
                transition: `
                    width var(--motion-slow) ease,
                    min-width var(--motion-slow) ease,
                    padding var(--motion-slow) ease,
                    opacity var(--motion-normal) ease`,
                boxSizing: 'border-box',
                height: 'calc(100vh - 70px)',
                position: 'fixed',
                top: '70px',
                zIndex: 'var(--z-header)',
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
                    <NavTabButton
                        key={item.id}
                        isSelected={isSelected}
                        onClick={() => setActiveTab(item.id)}
                        icon={item.icon}
                    >
                        {item.label}
                    </NavTabButton>
                );
            })}
        </div>
    );
};

export default SideBar;
