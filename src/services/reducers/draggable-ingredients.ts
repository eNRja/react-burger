import { TDragItem } from "../../types/data";
import { TDragActions } from "../actions/draggable-ingredients";
import {
    GET_DRAGGABLE_INGREDIENT,
    GET_DRAGGABLE_BUN,
    DRAGGABLE_INGREDIENT_DELETE,
    DRAGGABLE_BUN_DELETE,
    DRAGGABLE_INGREDIENT_MOVE,
    DRAGGABLE_INGREDIENTS_CLEAR,
} from '../constants'

export type TDragState = {
    items: Array<TDragItem>,
    bun: TDragItem | null,
    dragIngredients: Array<TDragItem> | null,
};

export const initialState = {
    items: [],
    bun: null,
    dragIngredients: null,
};

export const draggableIngredientReducer = (state = initialState, action: TDragActions): TDragState => {
    switch (action.type) {

        case GET_DRAGGABLE_INGREDIENT: {
            return {
                ...state,
                items: [...state.items, {
                    _id: action.payload._id,
                    uuid: action.uuid,
                    image_mobile: action.payload.image_mobile,
                    name: action.payload.name,
                    price: action.payload.price,
                    type: action.payload.type
                }],
            }
        }

        case GET_DRAGGABLE_BUN: {
            return {
                ...state,
                bun: {
                    _id: action.payload._id,
                    uuid: action.uuid,
                    image_mobile: action.payload.image_mobile,
                    name: action.payload.name,
                    price: action.payload.price,
                    type: action.payload.type
                }
            }
        }

        case DRAGGABLE_INGREDIENT_DELETE: {
            return {
                ...state,
                items: [...state.items].filter((item: TDragItem) => item.uuid !== action.uuid)
            }
        }

        case DRAGGABLE_BUN_DELETE: {
            return {
                ...state,
                bun: null
            }
        }

        case DRAGGABLE_INGREDIENT_MOVE: {
            const dragIngredient = state.items[action.dragIndex];
            const newIngredients = [...state.items];
            newIngredients.splice(action.dragIndex, 1);
            newIngredients.splice(action.hoverIndex, 0, dragIngredient);

            return {
                ...state,
                items: newIngredients
            }
        }

        case DRAGGABLE_INGREDIENTS_CLEAR: {
            return {
                ...state,
                items: [],
                bun: null,
                dragIngredients: null
            }
        }

        default: {
            return state
        }

    }
}