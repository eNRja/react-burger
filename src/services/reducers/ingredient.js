import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, INCREASE_COUNTER, DECREASE_COUNTER, DECREASE_BUN } from '../actions/ingredients'

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}

export const ingredientReducer = (state = initialState, action) => {
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
                ingredients: action.ingredients,
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
                ingredients: [...state.ingredients].map(item =>
                    item._id === action._id ? { ...item, counter: (item.counter === undefined ? 1 : ++item.counter) } : item
                )
            }
        }

        case DECREASE_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item =>
                    item._id === action._id ? { ...item, counter: (item.counter === undefined ? 0 : --item.counter) } : item
                )
            }
        }

        case DECREASE_BUN: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item =>
                    item.type === "bun" ? { ...item, counter: 0 } : item
                )
            }
        }

        default: {
            return state
        }
    }
} 