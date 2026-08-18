import {useState} from 'react';

export const useAdminShell = (defaultTab = 'products') => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen};
};
