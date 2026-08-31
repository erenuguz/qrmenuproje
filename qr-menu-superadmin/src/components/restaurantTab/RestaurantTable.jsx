import RestaurantTableRow from '@/components/restaurantTab/restaurantTable/RestaurantTableRow';
import EmptyState from '@/components/common/EmptyState';
import RestaurantTableHeader from '@/components/restaurantTab/restaurantTable/RestaurantTableHeader';
import Card from '@/components/common/Card';

const RestaurantTable = ({
    onDelete,
    isProcessing,
    searchQuery,
    setSearchQuery,
    setIsModalOpen,
    filteredRestaurants,
}) => {
    return (
        <Card padding={0}>
            <RestaurantTableHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsModalOpen={setIsModalOpen}
            />

            <div style={{overflowX: 'auto'}}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        textAlign: 'left',
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                borderBottom: '1px solid var(--border)',
                            }}
                        >
                            {[
                                'SİSTEM ID',
                                'RESTORAN ADI',
                                'YÖNETİCİ E-POSTA',
                                'DURUM',
                                'İŞLEM',
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    style={{
                                        padding: '16px 24px',
                                        fontSize: 'var(--font-small)',
                                        fontWeight: 'var(--font-semibold)',
                                        color: 'var(--textMuted)',
                                        letterSpacing: '0.5px',
                                        textAlign:
                                            heading === 'İŞLEM'
                                                ? 'right'
                                                : 'left',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((restaurant, index) => (
                                <RestaurantTableRow
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    isLast={
                                        index === filteredRestaurants.length - 1
                                    }
                                    onDelete={onDelete}
                                    isProcessing={isProcessing}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <EmptyState message="Aranan kriterlere uygun restoran bulunamadı." />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default RestaurantTable;
