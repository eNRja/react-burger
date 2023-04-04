import { TAppDispatch } from '../../types';
import {
    ORDERS_INIT,
    ORDERS_CLOSE,
    ORDERS_MESSAGE,
    ORDERS_OPEN,
    ORDERS_CLOSED,
    ORDERS_ERROR,
} from '../constants';

export type TOrdersWsActions = {
    init: 'ORDERS_INIT',
    message: 'ORDERS_MESSAGE',
    close: 'ORDERS_CLOSE',
    open: 'ORDERS_OPEN',
    closed: 'ORDERS_CLOSED',
    error: 'ORDERS_ERROR'
};

export const ordersWsActions: TOrdersWsActions = {
    init: ORDERS_INIT,
    message: ORDERS_MESSAGE,
    close: ORDERS_CLOSE,
    open: ORDERS_OPEN,
    closed: ORDERS_CLOSED,
    error: ORDERS_ERROR
};

export type TOrderArr = {
    _id: string,
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
}

export interface IFeedInitAction {
    readonly type: typeof ORDERS_INIT;
    payload: string
}
export interface FeedCloseAction {
    readonly type: typeof ORDERS_CLOSE;
}
export interface IOrderErrorAction {
    readonly type: typeof ORDERS_ERROR;
    payload: string
}
export interface FeedMessageAction {
    readonly type: typeof ORDERS_MESSAGE;
    payload: {
        success: boolean,
        orders: TOrderArr[],
        total: number,
        totalToday: number
    }
}

export type TSetOrdersIngredientsActions =
    | IFeedInitAction
    | FeedCloseAction
    | FeedMessageAction
    | IOrderErrorAction

export function orderInitAction(wsUrl: string) {
    return function (dispatch: TAppDispatch) {
        dispatch({
            type: ORDERS_INIT,
            payload: wsUrl
        })
    }
}

export function orderCloseAction() {
    return function (dispatch: TAppDispatch) {
        dispatch({
            type: ORDERS_CLOSE
        })
    }
}

export function orderErrorAction(type: string) {
    return function (dispatch: TAppDispatch) {
        dispatch({
            type: ORDERS_ERROR,
            payload: type
        })
    }
}