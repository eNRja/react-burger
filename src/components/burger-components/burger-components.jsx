import React from 'react';
import style from './burger-components.module.css';
import Slices from '../slices/slices';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DRAGGABLE_BUN_DELETE } from '../../services/actions/draggable-ingredients';
import { DECREASE_COUNTER } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { INCREASE_COUNTER, DECREASE_BUN } from '../../services/actions/ingredients'
import { DRAGGABLE_INGREDIENT_GET_ID, DRAGGABLE_BUN_GET_ID } from '../../services/actions/draggable-ingredients';
import { v4 as uuidV4 } from "uuid";

export default function BurgerComponents() {
    const dispatch = useDispatch();
    const dragIngredients = useSelector(state => state.ingredientList);

    const [{ isHover }, drop] = useDrop({
        accept: "BurgerConstructor",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(itemId) {
            itemId.typeDragElement === "bun" ?
                dispatch({
                    type: DRAGGABLE_BUN_GET_ID,
                    uuid: uuidV4(),
                    ...itemId,
                }) &&
                dispatch({
                    type: DECREASE_BUN,
                    ...itemId,
                }) &&
                dispatch({
                    type: INCREASE_COUNTER,
                    ...itemId,
                })
                :
                dispatch({
                    type: DRAGGABLE_INGREDIENT_GET_ID,
                    uuid: uuidV4(),
                    ...itemId,
                }) &&
                dispatch({
                    type: INCREASE_COUNTER,
                    ...itemId,
                })
        },
    });

    const onDelete = () => {
        dispatch({
            type: DRAGGABLE_BUN_DELETE,
        }) &&
            dispatch({
                type: DECREASE_COUNTER,
                _id: dragIngredients.bun._id,
            })
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