import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-item.module.css';
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
            <div className={style.IngredientItem} onClick={openModal}>
                <div className={`${style.IngredientCounter} text text_type_digits-default`}>1</div>
                <img className={style.IngredientImage} src={element.image} alt={element.name}></img>
                <div className={style.IngredientPrice}>
                    <span className="text text_type_digits-default mr-1 mb-1">{element.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text text_type_main-default">{element.name}</span>
            </div>
        </>
    )
}