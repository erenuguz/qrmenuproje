import {useState} from 'react';
import RestaurantHeader from '@/components/restaurantTab/RestaurantHeader';
import RestaurantTable from '@/components/restaurantTab/RestaurantTable';
import RestaurantAddModal from '@/components/restaurantTab/restaurantTable/RestaurantAddModal';
import {useRestaurantActions} from '@/hooks/useRestaurantActions';
import {useSearch} from '@/hooks/useSearch';

const RESTAURANT_SEARCH_KEYS = ['name', 'id', 'adminEmail'];

const RestaurantTab = ({restaurants = []}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {addRestaurant, deleteRestaurant, isProcessing} =
        useRestaurantActions();

    const handleAddNewRestaurant = (event) => {
        event.preventDefault();

        addRestaurant(
            newId,
            newName,
            newEmail,
            newPassword,
            confirmPassword,
            () => {
                setNewId('');
                setNewName('');
                setNewEmail('');
                setNewPassword('');
                setConfirmPassword('');
                setIsModalOpen(false);
            }
        );
    };

    // Arama Filtresi
    const {
        searchQuery,
        setSearchQuery,
        filteredData: filteredRestaurants,
    } = useSearch(restaurants, RESTAURANT_SEARCH_KEYS);

    return (
        <div>
            <RestaurantHeader restaurants={restaurants} />

            <RestaurantTable
                onDelete={deleteRestaurant}
                isProcessing={isProcessing}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsModalOpen={setIsModalOpen}
                filteredRestaurants={filteredRestaurants}
            />

            <RestaurantAddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleAddNewRestaurant={handleAddNewRestaurant}
                newId={newId}
                setNewId={setNewId}
                newName={newName}
                setNewName={setNewName}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default RestaurantTab;
