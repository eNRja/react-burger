import { MODAL_INGREDIENT_ADD, MODAL_INGREDIENT_DELETE } from '../actions/modal-ingredient';

const initialState = {}

export const modalIngredientReducer = (state = initialState, action) => {
    switch (action.type) {

        case MODAL_INGREDIENT_ADD: {
            return action.element
        }

        case MODAL_INGREDIENT_DELETE: {
            return {};
        }

        default: {
            return state
        }
    }
} 