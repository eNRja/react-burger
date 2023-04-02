import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { feedCloseAction, feedInitAction } from "../../services/actions/feed";
import { TFeedState } from "../../services/reducers/feed";
import { TIngredientsState } from "../../services/reducers/ingredient";
import { TIngredients } from "../../types/data";
import { wsUrl } from "../../utils/config";
import style from "./modal-feed-content.module.css";

export default function ModalFeedContent() {
    const { items } = useSelector<TFeedState>(state => state.feed);
    const reducer = useSelector<TIngredientsState>(state => state.ingredient);
    const { feedId } = useParams();
    const dispatch = useDispatch();
    const element: any = items.orders.find((elem) => {
        return elem._id === feedId;
    })
    const statusText = element && element.status === "done" ? "Создан" : element && element.status === "pending" ? "Готовится" : "Отменён";
    const statusTextColor = element && element.status === "done" ? "" : element && element.status === "pending" ? "text_color_success" : "text_color_error";

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
        dispatch(feedInitAction(`${wsUrl}/all`));

        return () => {
            dispatch(feedCloseAction());
        };
    }, [dispatch]);

    if (!items.success) {
        return (<h2 className={"text text_type_main-large mt-15 pt-15"}>Загрузка...</h2>)
    } else {
        return (
            <div className={style.FeedMain}>
                <span className={"text text_type_digits-default mt-15 ml-10"}>{`#0${element && element.number}`}</span>
                <h2 className={"text text_type_main-medium mt-10 ml-10"}>{element && element.name}</h2>
                <p className={`text text_type_main-default mt-2 ml-10 mb-5 ${statusTextColor}`}>{statusText}</p>
                <p className={"text text_type_main-medium mt-15 ml-10"}>Состав:</p>
                <div className={style.FeedColumns}>
                    {filteredIngredients && filteredIngredients.map((elem: TIngredients) =>
                        <div className={style.FeedContent} key={elem._id}>
                            <img className={style.FeedContentImage} src={elem.image_mobile} alt={elem.name}></img>
                            <span className={`${style.FeedContentText} text text_type_main-default`}>{elem.name}</span>
                            <p className={`${style.FeedContentCount} text text_type_digits-default`}>{`${elem.type === "bun" ? "2" : reduceIngredients[elem._id]} x ${elem.price}`}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    )}
                </div>
                <div className={style.FeedFooter}>
                    <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(element.updatedAt)} />
                    <div className={style.FeedCounter}>
                        <span className="text text_type_digits-default mr-2">{count}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        )
    }
}