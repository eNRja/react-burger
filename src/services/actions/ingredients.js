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
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    ingredients: res.data,
                })
            }).catch(err => {
                dispatch({
                    type: GET_ITEMS_FAILED
                })
            })
    }
}

export function increaseCounter(item) {
    return {
        type: INCREASE_COUNTER,
        ...item,
    }
}

export function decreaseBunCounter(item) {
    return {
        type: DECREASE_BUN,
        ...item,
    }
}

export function decreaseCounter(id) {
    return {
        type: DECREASE_COUNTER,
        _id: id,
    }
}

