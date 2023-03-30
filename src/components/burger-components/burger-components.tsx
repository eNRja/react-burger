import style from './burger-components.module.css';
import Slices from '../slices/slices';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteBun } from '../../services/actions/draggable-ingredients';
import { useDrop } from "react-dnd";
import { increaseCounter, decreaseBunCounter, decreaseCounter } from '../../services/actions/ingredients';
import { getDraggableIngredient } from '../../services/actions/draggable-ingredients';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TDragItem, TIngredients } from '../../types/data';
import { TDragState } from '../../services/reducers/draggable-ingredients';

export default function BurgerComponents() {
    const dispatch = useDispatch();
    const { items, bun } = useSelector<TDragState>(state => state.ingredientList);

    const [, drop] = useDrop<TDragItem & TIngredients>({
        accept: "BurgerConstructor",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {

            item.type === "bun" ?
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
        bun && dispatch(decreaseCounter(bun._id))
    }

    return (
        <div className={style.BurgerComponents} ref={drop}>
            {bun &&
                <div>
                    <ConstructorElement
                        extraClass='ml-10 mb-4'
                        type={"top"}
                        text={`${bun.name}${' '}${'(верх)'}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        handleClose={onDelete}
                    />
                </div>
            }
            <ul className={style.BurgerCenter}>
                {items && items.map((element: TDragItem) =>
                    element.type !== 'bun' &&
                    <Slices
                        element={element}
                        key={element.uuid}
                    />
                )}
            </ul>
            {bun &&
                <div>
                    <ConstructorElement
                        extraClass='ml-10 mt-4'
                        type={"bottom"}
                        isLocked={true}
                        text={`${bun.name}${' '}${'(низ)'}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
            }
        </div>
    )
}