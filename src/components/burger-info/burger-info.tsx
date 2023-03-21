import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-info.module.css'
import Modal from '../modal/modal';
import { BigCurrencyIcon } from '../big-currency-icon/big-currency-icon';
import { sendIngredients } from '../../services/actions/order';
import { ORDER_CLOSE } from '../../services/actions/order'
import OrderDetails from '../order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TStateIngredient, TStateOrder, TStateUser } from '../../utils/data';




export default function BurgerInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { items, bun } = useAppSelector<TStateIngredient>(state => state.ingredientList);

    const burgerIngredient = items.map((item: any) => item._id)
    const [modal, setModal] = useState(false);
    const calculation = useMemo(() => calc(items, bun), [items, bun]);
    const { setmodal } = useAppSelector<TStateOrder>(state => state.order);
    const { user } = useAppSelector<TStateUser>(state => state.login);

    useEffect(() => {
        if (setmodal === true) {
            setModal(true);
            dispatch({
                type: ORDER_CLOSE
            })
        }
    }, [setmodal]);


    const openModal = () => {
        if (user && bun._id) {
            bun._id && burgerIngredient.push(bun._id)
            dispatch(sendIngredients(burgerIngredient));
        } else if (bun._id) {
            navigate('/login')
        } else {
            navigate('/')
        }
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className={style.BurgerInfo}>
            <span className="text text_type_digits-medium">{calculation === false ? 0 : calculation}</span>
            <BigCurrencyIcon type="primary" />
            <Button onClick={openModal} extraClass="ml-10 pt-5 pb-5" htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
            {modal && (<Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>
            )}
        </div>
    )
}

const calc = (funcItems: any[], bun: { price: number }) => {
    const calculatedIngredients = funcItems.length > 0 && funcItems.map(item => item.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    if (bun.price > 0) {
        return (bun.price * 2 + +calculatedIngredients)
    } else {
        return calculatedIngredients
    }
}
