import {useEffect} from 'react';
import WelcomeScreen from '@/pages/welcomeScreen/WelcomeScreen';

const CUSTOMER_MENU_ORIGIN = 'https://menu.scanmenu.com.tr';

const App = () => {
    const {pathname, search, hash} = window.location;
    const isRestaurantPath = pathname !== '/';

    useEffect(() => {
        if (isRestaurantPath) {
            window.location.replace(
                `${CUSTOMER_MENU_ORIGIN}${pathname}${search}${hash}`
            );
            return;
        }

        if (window.location.hostname === 'www.scanmenu.com.tr') {
            window.location.replace('https://scanmenu.com.tr');
        }
    }, [hash, isRestaurantPath, pathname, search]);

    if (isRestaurantPath) {
        return null;
    }

    return <WelcomeScreen />;
};

export default App;
