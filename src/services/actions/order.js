import { makeOrderApi } from '../../api/api';
import { DRAGGABLE_INGREDIENTS_CLEAR } from '../actions/draggable-ingredients';
import { RESET_COUNTER } from '../actions/ingredients';

export const ORDER_ADD = 'ORDER_ADD';
export const ORDER_CLOSE = 'ORDER_CLOSE';

export function sendIngredients(burgerIngredient) {
    return function (dispatch) {
        makeOrderApi(burgerIngredient)
            .then((data) => {
                dispatch({
                    type: ORDER_ADD,
                    ...data,
                })
                dispatch({
                    type: DRAGGABLE_INGREDIENTS_CLEAR
                })
                dispatch({
                    type: RESET_COUNTER
                })
            })
    }
} 