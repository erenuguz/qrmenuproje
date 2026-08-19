/* =========================================
   1. SAYFALAR (PAGES)
   Ana ekranlar ve yönlendirme bileşenleri
========================================= */
export {default as Login} from '@/pages/Login';
export {default as AdminPanel} from '@/pages/AdminPanel';
export {default as SuperAdminPanel} from '@/pages/SuperAdminPanel';

/* =========================================
   2. ORTAK BİLEŞENLER (COMMON)
   Projenin her yerinde kullanılan UI elemanları
========================================= */
// Temel UI
export {default as Input} from '@/components/common/Input';
export {default as Badge} from '@/components/common/Badge';
export {default as EmptyState} from '@/components/common/EmptyState';
export {default as PageHeader} from '@/components/common/PageHeader';
export {default as StatCard} from '@/components/common/StatCard';
export {default as LoadingSpinner} from '@/components/common/LoadingSpinner';
export {default as ScrollToTopButton} from '@/components/common/ScrollToTopButton';

// Butonlar
export {default as BaseButton} from '@/components/common/button/BaseButton';
export * from '@/components/common/button/Buttons';

// İkonlar
export {default as BaseIcon} from '@/components/common/icon/BaseIcon';
export * from '@/components/common/icon/Icons';

// Bildirimler (Toast)
export {default as Toast} from '@/components/common/Toast';
export {ToastContainer} from '@/components/common/Toast';

/* =========================================
   3. DÜZEN (LAYOUT)
   Sayfa iskeletini oluşturan bileşenler
========================================= */
export {default as Header} from '@/components/layout/Header';
export {default as SideBar} from '@/components/layout/SideBar';

/* =========================================
   4. KATEGORİ (CATEGORY)
   Kategori sekmesine ait tüm bileşenler
========================================= */
export {default as CategoryTab} from '@/components/categoryTab/CategoryTab';
export {default as CategoryHeader} from '@/components/categoryTab/CategoryHeader';
export {default as CategoryAdd} from '@/components/categoryTab/CategoryAdd';
export {default as CategoryItem} from '@/components/categoryTab/CategoryItem';
export {default as CategoryForm} from '@/components/categoryTab/CategoryForm';
export {default as CategoryItemActions} from '@/components/categoryTab/categoryItem/CategoryItemActions';
export {default as CategoryItemInfo} from '@/components/categoryTab/categoryItem/CategoryItemInfo';
export {default as CategoryItemOrder} from '@/components/categoryTab/categoryItem/CategoryItemOrder';
export {default as CategoryListHeader} from '@/components/categoryTab/categoryItem/CategoryListHeader';

/* =========================================
   5. ÜRÜN (PRODUCT)
   Ürün sekmesine ait tüm bileşenler
========================================= */
export {default as ProductTab} from '@/components/productTab/ProductTab';
export {default as ProductHeader} from '@/components/productTab/ProductHeader';
export {default as ProductFilters} from '@/components/productTab/ProductFilters';
export {default as ProductForm} from '@/components/productTab/ProductForm';
export {default as ProductList} from '@/components/productTab/ProductList';
export {default as ProductCard} from '@/components/productTab/ProductCard';
export {default as RestaurantSelector} from '@/components/productTab/RestaurantSelector';

/* =========================================
   6. RESTORAN YÖNETİMİ (RESTAURANT)
   Restoran sekmesine ait tüm bileşenler
========================================= */
export {default as RestaurantTab} from '@/components/restaurantTab/RestaurantTab';
export {default as RestaurantHeader} from '@/components/restaurantTab/RestaurantHeader';
export {default as RestaurantAddModal} from '@/components/restaurantTab/restaurantTable/RestaurantAddModal';
export {default as RestaurantTable} from '@/components/restaurantTab/RestaurantTable';
export {default as RestaurantTableHeader} from '@/components/restaurantTab/restaurantTable/RestaurantTableHeader';
export {default as RestaurantTableRow} from '@/components/restaurantTab/restaurantTable/RestaurantTableRow';

/* =========================================
   7. AYARLAR (SETTINGS)
   Ayarlar sekmesine ait tüm bileşenler
========================================= */
export {default as SettingsTab} from '@/components/settingsTab/SettingsTab';
export {default as SectionHeader} from '@/components/settingsTab/SectionHeader';
export {default as GeneralInfo} from '@/components/settingsTab/GeneralInfo';
export {default as CustomerWifi} from '@/components/settingsTab/CustomerWifi';
export {default as SocialMedia} from '@/components/settingsTab/SocialMedia';

/* =========================================
   8. HOOKS
   Tüm özel React kancaları
========================================= */
export {useAuthUser} from '@/hooks/useAuthUser';
export {useRestaurants} from '@/hooks/useRestaurants';
export {useResponsive} from '@/hooks/useResponsive';
export {useScroll} from '@/hooks/useScroll';
export {useRestaurantDoc} from '@/hooks/useRestaurantDoc';
export {useMenu} from '@/hooks/useMenu';
export {useAdminShell} from '@/hooks/useAdminShell';
export {useRestaurantActions} from '@/hooks/useRestaurantActions';
export {useSearch} from '@/hooks/useSearch';
export {useProductActions} from '@/hooks/useProductActions';
export {useCategories} from '@/hooks/useCategories';
export {useCategoryActions} from '@/hooks/useCategoryActions';
export {useToast} from '@/hooks/useToast';
export {useRestaurantSettings} from '@/hooks/useRestaurantSettings';

/* =========================================
   9. SABİTLER, STİLLER VE YARDIMCILAR
   Constants, Styles, Utils
========================================= */
export {superAdminMenuItems, adminMenuItems} from '@/constants/menuItems';

export {
    cardStyle,
    inputStyle,
    smallLabelStyle,
    iconContainerStyle,
} from '@/styles/shared.js';

export {uploadImageAndGetUrl} from '@/utils/helpers.js';
