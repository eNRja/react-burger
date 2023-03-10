import {
    GET_DRAGGABLE_INGREDIENT,
    GET_DRAGGABLE_BUN,
    DRAGGABLE_INGREDIENT_DELETE,
    DRAGGABLE_BUN_DELETE,
    DRAGGABLE_INGREDIENT_MOVE,
    DRAGGABLE_INGREDIENTS_CLEAR
} from "../actions/draggable-ingredients";

const initialState = {
    items: [],
    bun: {},
    dragIngredients: []
};

export const draggableIngredientReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DRAGGABLE_INGREDIENT: {
            return {
                ...state,
                items: [...state.items, {
                    _id: action._id,
                    uuid: action.uuid,
                    image_mobile: action.image_mobile,
                    name: action.name,
                    price: action.price,
                    type: action.typeDragElement
                }],
            }
        }

        case GET_DRAGGABLE_BUN: {
            return {
                ...state,
                bun: {
                    _id: action._id,
                    image_mobile: action.image_mobile,
                    name: action.name,
                    price: action.price,
                    type: action.typeDragElement
                }
            }
        }

        case DRAGGABLE_INGREDIENT_DELETE: {
            return {
                ...state,
                items: [...state.items].filter(item => item.uuid !== action.uuid)
            }
        }

        case DRAGGABLE_BUN_DELETE: {
            return {
                ...state,
                bun: {}
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
                bun: {},
                dragIngredients: []
            }
        }

        default: {
            return state
        }

    }
}