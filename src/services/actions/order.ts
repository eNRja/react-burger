import { makeOrderApi } from '../../api/api';
import { TOrder } from '../../types/data';
import {
    DRAGGABLE_INGREDIENTS_CLEAR,
    RESET_COUNTER,
    ORDER_ADD,
    ORDER_CLOSE,
    SET_LOADER,
} from '../constants';
import { AppDispatch } from '../store';

export interface IOrderAddAction {
    readonly type: typeof ORDER_ADD;
    readonly payload: TOrder
}
export interface IResetCounterAction {
    readonly type: typeof RESET_COUNTER;
}
export interface IDraggableIngredientsClearAction {
    readonly type: typeof DRAGGABLE_INGREDIENTS_CLEAR;
}
export interface IOrderCloseAction {
    readonly type: typeof ORDER_CLOSE;
}
export interface ISetLoaderAction {
    readonly type: typeof SET_LOADER;
    readonly loader: boolean
}

export type TSetIngredientsActions =
    | IOrderAddAction
    | IResetCounterAction
    | IDraggableIngredientsClearAction
    | IOrderCloseAction
    | ISetLoaderAction

export const setLoaderAction = (loader: boolean): ISetLoaderAction => ({
    type: SET_LOADER,
    loader
});

export function sendIngredients(burgerIngredient: string[]) {
    return function (dispatch: AppDispatch) {
        makeOrderApi(burgerIngredient)
            .then((data) => {
                dispatch({
                    type: ORDER_ADD,
                    payload: data,
                })
                dispatch({
                    type: DRAGGABLE_INGREDIENTS_CLEAR
                })
                dispatch({
                    type: RESET_COUNTER
                })
                dispatch(setLoaderAction(false))
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoaderAction(false))
            })
    }
}