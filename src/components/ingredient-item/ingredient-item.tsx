import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-item.module.css';
import { useDrag } from "react-dnd";
import { TIngredients } from '../../types/data';

export default function IngredientItem({ element, setCurrent }: { element: TIngredients, setCurrent: CallableFunction }) {
    const { _id, name, price, image, image_mobile, type, counter = 0 } = element;
    const location = useLocation();

    const [bunRef, bunInView] = useInView({
        threshold: 0
    });

    useEffect(() => {
        type === "bun" && bunInView === false && setCurrent("two");
        type === "bun" && bunInView === true && setCurrent("one");
    }, [bunInView]);

    const [{ opacity }, dragRef] = useDrag({
        type: 'BurgerConstructor',
        item: { _id, name, price, image_mobile, type },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <>
            <Link to={`/modal/${_id}`} state={{ background: location }} className={style.Link} ref={dragRef}>
                <li style={{ opacity }} className={style.IngredientItem}  >
                    {counter > 0 &&
                        <div className={`${style.IngredientCounter} text text_type_digits-default`}>
                            {counter}
                        </div>
                    }
                    <img className={style.IngredientImage} src={image} alt={name} ref={bunRef}></img>
                    <div className={style.IngredientPrice}>
                        <span className="text text_type_digits-default mr-1 mb-1">{price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <span className={`${style.IngredientName} text text_type_main-default`}>{name}</span>
                </li>
            </Link>
        </>
    )
}