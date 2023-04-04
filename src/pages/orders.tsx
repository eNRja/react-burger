import { useEffect } from 'react';
import ContentOrders from '../components/content-orders/content-orders';
import { ProfileNavBar } from '../components/profile-navbar/profile-navbar';
import { useDispatch, useSelector } from '../hooks/hooks';
import { orderCloseAction, orderInitAction } from '../services/actions/orders';
import { wsUrl } from '../utils/config';
import { getCookie } from '../utils/cookie';
import style from './orders.module.css'

export function OrdersPage() {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(orderInitAction(`${wsUrl}?token=${getCookie('token')}`));
        return () => {
            dispatch(orderCloseAction());
        };
    }, [dispatch]);

    if (!items.success) {
        return (<h2 className={"text text_type_main-large mt-15 pt-15"}>Загрузка...</h2>)
    } else {
        return (
            <main className={style.OrdersMain}>
                <ProfileNavBar />
                <div className={style.Orders}>
                    {items.orders && items.orders.slice(0).reverse().map((element) =>
                        <ContentOrders key={element._id} element={element} />)
                    }
                </div>
            </main>
        );
    }
}