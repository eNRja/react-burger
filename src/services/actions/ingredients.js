import { getApiIngredients } from '../../api/api'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const DECREASE_BUN = 'DECREASE_BUN';
export const RESET_COUNTER = 'RESET_COUNTER';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        })
        getApiIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ITEMS_SUCCESS,
                        ingredients: res.data,
                    })
                } else {
                    dispatch({
                        type: GET_ITEMS_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_ITEMS_FAILED
                })
            })
    }
}