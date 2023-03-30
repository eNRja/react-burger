import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";
import { TIngredientsState } from "../../services/reducers/ingredient";
import style from "./content-feed.module.css";
import { v4 as uuidV4 } from "uuid";
import { addZero } from "../../utils/data";
import { TIngredients } from "../../types/data";

export default function ContentFeed({ element }: any) {
    const { _id, ingredients, name, number, updatedAt } = element
    const reducer = useSelector<TIngredientsState>(state => state.ingredient);
    const location = useLocation();
    const Data = new Date()
    const freshData = `${addZero(Data.getFullYear())}-${addZero(Data.getMonth() + 1)}-${addZero(Data.getDate())}`
    const burgerData = updatedAt.split('T');
    const time = burgerData[1].slice(0, 5);

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
        <Link to={`/feed/${_id}`} state={{ background: location }} className={style.ContentFeed}>
            <div className={style.ContentFeedNumber}>
                <span className="text text_type_digits-default">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">{`${freshData === burgerData[0] ? "Сегодня" : burgerData[0]}, ${time}`}</span>
            </div>
            <h2 className="text text_type_main-medium ml-6 mr-6">{name}</h2>
            <div className={style.ContentFeedComponents}>
                <div className={style.ContentFeedImageContainer}>
                    <span className={`${style.ContentFeedImageCounter} text text_type_main-small`}>{`${orderIngredients.length > 5 ? `+${orderIngredients.length - 5}` : ''}`}</span>
                    {orderIngredients && orderIngredients.length > 5 && orderIngredients.slice(5, 6).map((element: TIngredients) =>
                        element.type !== "bun" && <img
                            className={`${style.ContentFeedImage} ${style.ContentFeedImageLast}`}
                            src={element.image_mobile}
                            alt={element.name}
                            key={uuidV4()}></img>
                    )}
                    {orderIngredients && orderIngredients.slice(0, 5).reverse().map((element: TIngredients) =>
                        <img
                            className={style.ContentFeedImage}
                            src={element.image_mobile}
                            alt={element.name}
                            key={uuidV4()}></img>
                    )}
                </div>
                <div className={style.ContentFeedPrice}>
                    <span className="text text_type_digits-default mr-2">{count}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}