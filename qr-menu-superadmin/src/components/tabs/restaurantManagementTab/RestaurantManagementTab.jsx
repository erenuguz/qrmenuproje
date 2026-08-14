import React, {useState} from 'react';
import {
    RestaurantManagementTabHeader,
    RestaurantTable,
    RestaurantAddModal,
    useRestaurantActions,
    useSearch,
} from '@/';

const RestaurantManagementTab = ({restoranlar = []}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [yeniId, setYeniId] = useState('');
    const [yeniAd, setYeniAd] = useState('');
    const [yeniEmail, setYeniEmail] = useState('');

    const {restoranEkle, restoranSil, islemYapiliyor} = useRestaurantActions();

    const handleYeniRestoranEkle = (e) => {
        e.preventDefault();
        restoranEkle(yeniId, yeniAd, yeniEmail, () => {
            setYeniId('');
            setYeniAd('');
            setYeniEmail('');
            setIsModalOpen(false);
        });
    };

    // Arama Filtresi
    const {
        aramaMetni,
        setAramaMetni,
        filtrelenmisVeri: filtrelenmisRestoranlar,
    } = useSearch(restoranlar, ['name', 'id', 'admin_email']);

    return (
        <div>
            <RestaurantManagementTabHeader restoranlar={restoranlar} />

            <RestaurantTable
                aramaMetni={aramaMetni}
                setAramaMetni={setAramaMetni}
                setIsModalOpen={setIsModalOpen}
                filtrelenmisRestoranlar={filtrelenmisRestoranlar}
                handleSil={restoranSil}
            />

            <RestaurantAddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleYeniRestoranEkle={handleYeniRestoranEkle}
                yeniId={yeniId}
                setYeniId={setYeniId}
                yeniAd={yeniAd}
                setYeniAd={setYeniAd}
                yeniEmail={yeniEmail}
                setYeniEmail={setYeniEmail}
                islemYapiliyor={islemYapiliyor}
            />
        </div>
    );
};

export default RestaurantManagementTab;
