/**
 * Sayaç/etiket göstermek için kullanılan küçük rozet.
 * Kaynak: CategoryList ("X kategori"), ProductList kategori başlıkları
 * ("X ürün"), RestaurantSelector ("toplam ürün").
 */
const Badge = ({children}) => (
    <span
        style={{
            backgroundColor: 'var(--badge)',
            color: 'var(--badgeText)',
            fontSize: 'var(--font-small)',
            padding: '2px 8px',
            borderRadius: 'var(--radius)',
            fontWeight: 'var(--font-medium)',
        }}
    >
        {children}
    </span>
);

export default Badge;
