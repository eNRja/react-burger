import React from 'react';
import style from './burger-components.module.css';
import Slices from '../slices/slices';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteBun } from '../../services/actions/draggable-ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { increaseCounter, decreaseBunCounter, decreaseCounter } from '../../services/actions/ingredients';
import { getDraggableIngredient } from '../../services/actions/draggable-ingredients';

export default function BurgerComponents() {
    const dispatch = useDispatch();
    const dragIngredients = useSelector(state => state.ingredientList);

    const [{ isHover }, drop] = useDrop({
        accept: "BurgerConstructor",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            item.typeDragElement === "bun" ?
                dispatch(getDraggableIngredient(item)) &&
                dispatch(decreaseBunCounter(item)) &&
                dispatch(increaseCounter(item))
                :
                dispatch(getDraggableIngredient(item)) &&
                dispatch(increaseCounter(item))
        },
    });

    const onDelete = () => {
        dispatch(deleteBun(dragIngredients.bun._id))
        dispatch(decreaseCounter(dragIngredients.bun._id))
    }

    return (

        <div className={style.BurgerComponents} board={"BurgerConstructor"} ref={drop}>
            {dragIngredients.bun._id &&
                <div>
                    <ConstructorElement
                        extraClass='ml-8 mb-4'
                        type={"top"}
                        text={`${dragIngredients.bun.name}${' '}${'(верх)'}`}
                        price={dragIngredients.bun.price}
                        thumbnail={dragIngredients.bun.image_mobile}
                        handleClose={onDelete}
                    />
                </div>
            }
            <ul className={style.BurgerCenter}>
                {dragIngredients.items.map(element =>
                    element.type !== 'bun' &&
                    <Slices
                        element={element}
                        key={element.uuid}
                    />
                )}
            </ul>
            {dragIngredients.bun._id &&
                <div>
                    <ConstructorElement
                        extraClass='ml-8 mt-4'
                        type={"bottom"}
                        isLocked={true}
                        text={`${dragIngredients.bun.name}${' '}${'(низ)'}`}
                        price={dragIngredients.bun.price}
                        thumbnail={dragIngredients.bun.image_mobile}
                    />
                </div>
            }
        </div>
    )
}