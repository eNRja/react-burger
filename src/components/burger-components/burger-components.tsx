import style from './burger-components.module.css';
import Slices from '../slices/slices';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteBun } from '../../services/actions/draggable-ingredients';
import { useDrop } from "react-dnd";
import { increaseCounter, decreaseBunCounter, decreaseCounter } from '../../services/actions/ingredients';
import { getDraggableIngredient } from '../../services/actions/draggable-ingredients';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IDragIngredient, TIngredientList } from '../../utils/data';

export default function BurgerComponents() {
    const dispatch = useAppDispatch();
    const dragIngredients = useAppSelector<TIngredientList>(state => state.ingredientList);

    const [, drop] = useDrop<TIngredientList>({
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
        dispatch(deleteBun())
        dispatch(decreaseCounter(dragIngredients.bun._id))
    }

    return (
        <div className={style.BurgerComponents} ref={drop}>
            {dragIngredients.bun._id &&
                <div>
                    <ConstructorElement
                        extraClass='ml-10 mb-4'
                        type={"top"}
                        text={`${dragIngredients.bun.name}${' '}${'(верх)'}`}
                        price={dragIngredients.bun.price}
                        thumbnail={dragIngredients.bun.image_mobile}
                        handleClose={onDelete}
                    />
                </div>
            }
            <ul className={style.BurgerCenter}>
                {dragIngredients.items.map((element: IDragIngredient) =>
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
                        extraClass='ml-10 mt-4'
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