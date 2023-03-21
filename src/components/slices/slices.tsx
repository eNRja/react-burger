import { useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './slices.module.css';
import { DRAGGABLE_INGREDIENT_DELETE, DRAGGABLE_INGREDIENT_MOVE } from '../../services/actions/draggable-ingredients';
import { DECREASE_COUNTER } from '../../services/actions/ingredients';
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { IDragIngredient, TDragIngredients } from '../../utils/data'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function Slices({ element }: { element: IDragIngredient }) {
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useAppDispatch();
    const { uuid, _id, price, image_mobile, name } = element;
    const dragIngredients = useAppSelector<TDragIngredients>(state => state.ingredientList)

    const onDelete = () => {
        (dispatch({
            type: DRAGGABLE_INGREDIENT_DELETE,
            uuid
        }))
            &&
            dispatch({
                type: DECREASE_COUNTER,
                _id,
            })
    };

    const [, drop] = useDrop({
        accept: 'burgerCard',
        hover: (item: { index: number; element: IDragIngredient }, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = dragIngredients.items.indexOf(item.element);
            const hoverIndex = dragIngredients.items.indexOf(element);
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch({
                type: DRAGGABLE_INGREDIENT_MOVE,
                dragIndex,
                hoverIndex
            })
            item.index = hoverIndex;
        }
    });

    const [{ opacity }, drag] = useDrag({
        type: 'burgerCard',
        item: () => {
            return { element };
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    drag(drop(ref))

    return (
        <li style={{ opacity }} className={style.Slices} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={onDelete}
            />
        </li>
    )
}