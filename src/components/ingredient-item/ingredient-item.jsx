import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './ingredient-item-styles.css';
import Modal from '../modal/modal';

export default function IngredientItem({ element }) {
    const [modal, setModal] = React.useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            {modal && <Modal onClose={closeModal} element={element} />}
            <div className='IngredientItem' onClick={openModal}>
                <div className="IngredientCounter text text_type_digits-default">1</div>
                <img src={element.image} alt={element.name} className="IngredientImage"></img>
                <div className="IngredientPrice mt-1 mb-1">
                    <span className="text text_type_digits-default mr-1 mb-1">{element.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text text_type_main-default">{element.name}</span>
            </div>
        </>
    )
}