import { TIngredients, TIngredientsArray } from '../../types/data';
import { TGetItemsActions } from '../actions/ingredients';
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    DECREASE_BUN,
    RESET_COUNTER
} from '../constants';


export type TIngredientsState = {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    ingredients: Array<TIngredients>
};

export const initialState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const ingredientReducer = (state = initialState, action: TGetItemsActions): TIngredientsState => {
    switch (action.type) {

        case GET_ITEMS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }

        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
                ingredientsFailed: false,
            };
        }

        case GET_ITEMS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }

        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((item: TIngredients) =>
                    item._id === action.payload._id ? { ...item, counter: (item.counter === undefined ? 1 : ++item.counter) } : item
                )
            }
        }

        case DECREASE_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((item: TIngredients) =>
                    item._id === action._id ? { ...item, counter: (item.counter === undefined ? 0 : --item.counter) } : item
                )
            }
        }

        case DECREASE_BUN: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((item: TIngredients) =>
                    item.type === "bun" ? { ...item, counter: 0 } : item
                )
            }
        }

        case RESET_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((item: TIngredients) =>
                    item && { ...item, counter: 0 }
                )
            }
        }

        default: {
            return state
        }
    }
} 