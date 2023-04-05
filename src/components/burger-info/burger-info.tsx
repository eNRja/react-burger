import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-info.module.css'
import Modal from '../modal/modal';
import { BigCurrencyIcon } from '../big-currency-icon/big-currency-icon';
import { sendIngredients, setLoaderAction } from '../../services/actions/order';
import { ORDER_CLOSE } from '../../services/constants'
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TDragItem } from '../../types/data';

export default function BurgerInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, bun } = useSelector(state => state.ingredientList);
    const { loader } = useSelector(state => state.order);
    const burgerIngredient = items.map((item: TDragItem) => item._id)
    const [modal, setModal] = useState(false);
    const calculation = useMemo(() => bun && calc(items, bun), [items, bun]);
    const { setmodal } = useSelector(state => state.order);
    const { user } = useSelector(state => state.login);
    const styleButton = loader ? style.Button : ''

    useEffect(() => {
        if (setmodal === true) {
            setModal(true);
            dispatch({
                type: ORDER_CLOSE
            })
        }
    }, [setmodal]);

    const openModal = () => {
        if (user && bun && bun._id) {
            bun._id && burgerIngredient.push(bun._id)
            dispatch(sendIngredients(burgerIngredient));
            dispatch(setLoaderAction(true));
        } else if (bun && bun._id) {
            navigate('/login')
        } else {
            navigate('/login')
        }
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className={style.BurgerInfo}>
            <span className="text text_type_digits-medium">{calculation === false ? 0 : calculation}</span>
            <BigCurrencyIcon type="primary" />
            <Button onClick={openModal} extraClass={`ml-10 pt-5 pb-5 ${styleButton}`} htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
            {loader && <div className={`${style.loader} ${style.center}`}><span></span></div>}
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
