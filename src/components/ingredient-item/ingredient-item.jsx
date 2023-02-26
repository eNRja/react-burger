import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from "react-intersection-observer";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-item.module.css';
import Modal from '../modal/modal';
import { useDrag } from "react-dnd";
import PropType from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import { MODAL_INGREDIENT_ADD, MODAL_INGREDIENT_DELETE } from '../../services/actions/modal-ingredient'

export default function IngredientItem({ element, setCurrent }) {
    const { _id, name, price, image, image_mobile, type, counter } = element;
    const typeDragElement = type;
    const dispatch = useDispatch();
    const modalIngredients = useSelector(state => state.modalIngredient);

    const [bunRef, bunInView] = useInView({
        threshold: 0
    });

    React.useEffect(() => {
        type === "bun" && bunInView === false && setCurrent("two");
        type === "bun" && bunInView === true && setCurrent("one");
    }, [bunInView]);

    const [{ opacity }, dragRef] = useDrag({
        type: 'BurgerConstructor',
        item: { _id, name, price, image_mobile, typeDragElement },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [modal, setModal] = React.useState(false);

    const openModal = () => {
        dispatch({
            type: MODAL_INGREDIENT_ADD,
            element
        });
        setModal(true);
    };

    const closeModal = () => {
        dispatch({
            type: MODAL_INGREDIENT_DELETE,
            element
        });
        setModal(false);
    }

    return (
        <>
            {modal && <Modal onClose={closeModal} element={modalIngredients} />}
            <li style={{ opacity }} className={style.IngredientItem} onClick={openModal} ref={dragRef}>
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
        </>
    )
}

IngredientItem.propTypes = {
    setCurrent: PropType.func.isRequired,
    element: ingredientPropType
}