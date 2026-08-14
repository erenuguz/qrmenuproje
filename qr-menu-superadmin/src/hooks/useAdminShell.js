import {useState} from 'react';

export const useAdminShell = (varsayilanSekme = 'restoranlar') => {
    const [aktifSekme, setAktifSekme] = useState(varsayilanSekme);
    const [sidebarAcik, setSidebarAcik] = useState(false);

    return {aktifSekme, setAktifSekme, sidebarAcik, setSidebarAcik};
};