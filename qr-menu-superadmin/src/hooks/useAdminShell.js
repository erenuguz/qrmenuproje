import {useState} from 'react';

export const useAdminShell = (defaultTab = 'restoranlar') => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return {activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen};
};
