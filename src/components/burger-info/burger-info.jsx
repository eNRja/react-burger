import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-info-style.css'
import Modal from '../modal/modal';
import {BigCurrencyIcon} from '../big-currency-icon/big-currency-icon'

export default function BurgerInfo() {
    const [modal, setModal] = React.useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            <div className="BurgerInfo">
                <span className="text text_type_digits-medium">610</span>
                <BigCurrencyIcon type="primary" />
                    <Button onClick={openModal} extraClass="ml-10 pt-5 pb-5" htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                    {modal && <Modal onClose={closeModal} order={true} />}
            </div>
        </>
    )
}