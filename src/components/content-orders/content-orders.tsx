import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";
import { TIngredientsState } from "../../services/reducers/ingredient";
import { addZero } from "../../utils/data";
import { v4 as uuidV4 } from "uuid";
import style from "./content-orders.module.css";
import { TIngredients } from "../../types/data";

export default function ContentOrders({ element }: any) {
    const { _id, ingredients, name, number, updatedAt, status } = element
    const reducer = useSelector<TIngredientsState>(state => state.ingredient);
    const location = useLocation();
    const statusText = status === "done" ? "Создан" : status === "pending" ? "Готовится" : "Отменён";
    const statusTextColor = status === "done" ? "" : status === "pending" ? "text_color_success" : "text_color_error";

    const orderIngredients = reducer.ingredients.filter(item => {
        for (let i = 0; i <= ingredients.length; i++) {
            if (ingredients[i] && (ingredients[i] === item._id)) {
                return item
            }
        }
    })

    const reduceIngredients = element.ingredients.reduce((label: { [x: string]: any; }, ingredient: string | number) => {
        label[ingredient] = (label[ingredient] || 0) + 1;
        return label;
    }, {})

    const count = orderIngredients.map(item => item.type === "bun" ? item.price * 2 : (item.price * reduceIngredients[item._id]))
        .reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue;
            })

    return (
        <Link to={`/profile/orders/${_id}`} state={{ background: location }} className={style.ContentOrders}>
            <div className={style.ContentOrdersNumber}>
                <span className="text text_type_digits-default">#{number}</span>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(updatedAt)} />
            </div>
            <h2 className="text text_type_main-medium ml-6 mr-6">{name}</h2>
            <p className={`text text_type_main-default ml-6 mt-2 ${statusTextColor}`}>{statusText}</p>
            <div className={style.ContentOrdersComponents}>
                <div className={style.ContentOrdersImageContainer}>
                    <span className={`${style.ContentOrdersImageCounter} text text_type_main-small`}>{`${orderIngredients.length > 5 ? `+${orderIngredients.length - 5}` : ''}`}</span>
                    {orderIngredients && orderIngredients.length > 5 && orderIngredients.slice(5, 6).map((element: TIngredients) =>
                        element.type !== "bun" && <img
                            className={`${style.ContentOrdersImage} ${style.ContentOrdersImageLast}`}
                            src={element.image_mobile}
                            alt={element.name}
                            key={uuidV4()}></img>
                    )}
                    {orderIngredients && orderIngredients.slice(0, 5).reverse().map((element: TIngredients) =>
                        <img
                            className={style.ContentOrdersImage}
                            src={element.image_mobile}
                            alt={element.name}
                            key={uuidV4()}></img>
                    )}
                </div>
                <div className={style.ContentOrdersPrice}>
                    <span className="text text_type_digits-default mr-2">{count}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}