import { getApiIngredients } from '../../api/api';
import { TIngredients } from '../../types/data';
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    DECREASE_BUN,
    RESET_COUNTER
} from '../constants';


export interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly payload: Array<TIngredients>;
}
export interface IGetItemsFailedAction {
    readonly type: typeof GET_ITEMS_FAILED;
}
export interface IIncreaseCounterAction {
    readonly type: typeof INCREASE_COUNTER;
    readonly payload: TIngredients;
}
export interface IDecreaseCounterAction {
    readonly type: typeof DECREASE_COUNTER;
    readonly _id: string
}
export interface IDecreaseBunAction {
    readonly type: typeof DECREASE_BUN;
    readonly payload: TIngredients;
}
export interface IResetCounterAction {
    readonly type: typeof RESET_COUNTER;
}

export type TGetItemsActions =
    | IGetItemsRequestAction
    | IGetItemsSuccessAction
    | IGetItemsFailedAction
    | IIncreaseCounterAction
    | IDecreaseCounterAction
    | IDecreaseBunAction
    | IResetCounterAction

export function getIngredients() {

    return function (dispatch: (arg0: TGetItemsActions & { payload?: Array<TIngredients> }) => void) {
        dispatch({
            type: GET_ITEMS_REQUEST
        })
        getApiIngredients()
            .then(res => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data,
                })
            }).catch(err => {
                dispatch({
                    type: GET_ITEMS_FAILED
                })
            })
    }
}

export function increaseCounter(payload: TIngredients): IIncreaseCounterAction {
    return {
        type: INCREASE_COUNTER,
        payload,
    }
}

export function decreaseBunCounter(payload: TIngredients): IDecreaseBunAction {
    return {
        type: DECREASE_BUN,
        payload,
    }
}

export function decreaseCounter(id: string): IDecreaseCounterAction {
    return {
        type: DECREASE_COUNTER,
        _id: id,
    }
}

export function resetCounter(): IResetCounterAction {
    return {
        type: RESET_COUNTER,
    }
}
