import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { orderCloseAction, orderInitAction } from "../../services/actions/orders";
import { TIngredientsState } from "../../services/reducers/ingredient";
import { TOrdersState } from "../../services/reducers/orders";
import { TIngredients } from "../../types/data";
import { wsUrl } from "../../utils/config";
import { getCookie } from "../../utils/cookie";
import { addZero } from "../../utils/data";
import style from "./modal-order-content.module.css";

export default function ModalOrderContent() {
    const { items } = useSelector<TOrdersState>(state => state.orders);
    const reducer = useSelector<TIngredientsState>(state => state.ingredient);
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const element: any = items.orders.find((elem) => {
        return elem._id === orderId;
    })
    const statusText = element && element.status === "done" ? "Создан" : element && element.status === "pending" ? "Готовится" : "Отменён";
    const statusTextColor = element && element.status === "done" ? "" : element && element.status === "pending" ? "text_color_success" : "text_color_error";
    const Data = new Date()
    const freshData = `${addZero(Data.getFullYear())}-${addZero(Data.getMonth() + 1)}-${addZero(Data.getDate())}`
    const burgerData = element && element.updatedAt.split('T');
    const time = burgerData && burgerData[1].slice(0, 5);

    const reduceIngredients = element && element.ingredients.reduce((label: { [x: string]: any; }, ingredient: string | number) => {
        label[ingredient] = (label[ingredient] || 0) + 1;
        return label;
    }, {})

    const filteredIngredients: any = reducer.ingredients.filter((elem) => {
        return reduceIngredients && reduceIngredients[elem._id];
    })

    const count = filteredIngredients.length !== 0 && filteredIngredients.map((item: {
        _id: string; type: string; price: number;
    }) =>
        item.type === "bun" ? item.price * 2 : (item.price * reduceIngredients[item._id])).reduce(
            (accumulator: number, currentValue: number) => {
                return accumulator + currentValue;
            })

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
            <div className={style.OrderMain}>
                <span className={"text text_type_digits-default mt-15 ml-10"}>{`#0${element && element.number}`}</span>
                <h2 className={"text text_type_main-medium mt-10 ml-10"}>{element && element.name}</h2>
                <p className={`text text_type_main-default mt-2 ml-10 mb-5 ${statusTextColor}`}>{statusText}</p>
                <p className={"text text_type_main-medium mt-15 ml-10"}>Состав:</p>
                <div className={style.OrderColumns}>
                    {filteredIngredients && filteredIngredients.map((elem: TIngredients) =>
                        <div className={style.OrderContent} key={elem._id}>
                            <img className={style.OrderContentImage} src={elem.image_mobile} alt={elem.name}></img>
                            <span className={`${style.OrderContentText} text text_type_main-default`}>{elem.name}</span>
                            <p className={`${style.OrderContentCount} text text_type_digits-default`}>{`${elem.type === "bun" ? "2" : reduceIngredients[elem._id]} x ${elem.price}`}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    )}
                </div>
                <div className={style.OrderFooter}>
                    <span className="text text_type_main-default text_color_inactive">{`${freshData === burgerData[0] ? "Сегодня" : burgerData[0]}, ${time}`}</span>
                    <div className={style.OrderCounter}>
                        <span className="text text_type_digits-default mr-2">{count}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        )
    }
}