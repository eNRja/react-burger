import style from './feed.module.css';
import { useDispatch, useSelector } from '../hooks/hooks';
import ContentFeed from '../components/conotent-feed/content-feed';
import { useEffect } from 'react';
import { wsUrl } from '../utils/config';
import { feedCloseAction, feedInitAction, TFeedArr } from '../services/actions/feed';

export function FeedPage() {
    const { items } = useSelector(state => state.feed);
    const dispatch = useDispatch();
    const frontTotal = items.total && items.total.toString().slice(0, 2);
    const backTotal = items.total && items.total.toString().slice(2);

    useEffect(() => {
        dispatch(feedInitAction(`${wsUrl}/all`));

        return () => {
            dispatch(feedCloseAction());
        };
    }, [dispatch]);

    if (!items.success) {
        return (<h2 className={"text text_type_main-large mt-15 pt-15"}>Загрузка...</h2>)
    } else {
        return (
            <>
                <h1 className={`${style.FeedСaption} mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>
                <main className={style.Feed}>

                    <div className={style.FeedOrders}>
                        {items.orders && items.orders.map((element: TFeedArr) => <ContentFeed key={element._id} element={element} />)}
                    </div>
                    <div className={style.FeedRightColumn}>
                        <div className={style.FeedRightColumnOrders}>
                            <div className={style.FeedRightColumnOrdersReady}>
                                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                                {items.orders && items.orders.filter(item => item.status === "done").slice(0, 10).map((element: TFeedArr) =>
                                    element.status === "done" &&
                                    <span key={element._id} className={`${style.FeedRightColumnOrdersReadyNumber} text text_type_digits-default text_color_success mb-2`}>{`0${element.number}`}</span>
                                )}
                            </div>
                            <div className={style.FeedRightColumnOrdersInWork}>
                                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                                {items.orders && items.orders.filter(item => item.status === "pending").slice(0, 10).map((element: TFeedArr) =>
                                    element.status === "pending" &&
                                    <span key={element._id} className={`${style.FeedRightColumnOrdersReadyNumber} text text_type_digits-default mb-2`}>{`0${element.number}`}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="text text_type_main-medium mt-10 ml-4">Выполнено за все время:</h2>
                            <span className="text text_type_digits-large ml-4">{`${frontTotal} ${backTotal}`}</span>
                        </div>
                        <div>
                            <h2 className="text text_type_main-medium pt-6 mt-10 ml-4">Выполнено за сегодня:</h2>
                            <span className="text text_type_digits-large ml-4">{items.totalToday}</span>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}