import React, {useState} from 'react';
import {
    RestaurantHeader,
    RestaurantTable,
    RestaurantAddModal,
    useRestaurantActions,
    useSearch,
} from '@/';

const RestaurantManagementTab = ({restaurants = []}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const {addRestaurant, deleteRestaurant, isProcessing} =
        useRestaurantActions();

    const handleAddNewRestaurant = (e) => {
        e.preventDefault();
        addRestaurant(newId, newName, newEmail, () => {
            setNewId('');
            setNewName('');
            setNewEmail('');
            setIsModalOpen(false);
        });
    };

    // Arama Filtresi
    const {
        searchQuery,
        setSearchQuery,
        filteredData: filteredRestaurants,
    } = useSearch(restaurants, ['name', 'id', 'admin_email']);

    return (
        <div>
            <RestaurantHeader restaurants={restaurants} />

            <RestaurantTable
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsModalOpen={setIsModalOpen}
                filteredRestaurants={filteredRestaurants}
                handleDelete={deleteRestaurant}
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
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default RestaurantManagementTab;
