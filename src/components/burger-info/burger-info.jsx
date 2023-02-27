import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-info.module.css'
import Modal from '../modal/modal';
import { BigCurrencyIcon } from '../big-currency-icon/big-currency-icon';
import { sendIngredients } from '../../services/actions/order';
import { ORDER_CLOSE } from '../../services/actions/order'
import OrderDetails from '../order-details/order-details';

export default function BurgerInfo() {
    const dispatch = useDispatch();
    const { items, bun } = useSelector(state => state.ingredientList);
    const burgerIngredient = items.map((item) => item._id)
    const [modal, setModal] = React.useState(false);
    const calculation = useMemo(() => calc(items, bun), [items, bun]);
    const { setmodal } = useSelector(state => state.order);

    useEffect(() => {
        if (setmodal === true) {
            setModal(true);
            dispatch({
                type: ORDER_CLOSE
            })
        }
    }, [setmodal]);


    const openModal = () => {
        bun._id &&
            burgerIngredient.push(bun._id)
        dispatch(sendIngredients(burgerIngredient));
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className={style.BurgerInfo}>
            <span className="text text_type_digits-medium">{calculation === false ? 0 : calculation}</span>
            <BigCurrencyIcon type="primary" />
            <Button onClick={bun._id && openModal} extraClass="ml-10 pt-5 pb-5" htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
            {modal && <Modal onClose={closeModal} order={true}>
                <OrderDetails />
            </Modal>}
        </div>
    )
}

const calc = (funcItems, bun) => {
    const calculatedIngredients = funcItems.length > 0 && funcItems.map(item => item.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    if (bun.price > 0) {
        return (bun.price * 2 + calculatedIngredients)
    } else {
        return calculatedIngredients
    }
}
