import {
    FEED_INIT,
    FEED_CLOSE,
    FEED_MESSAGE,
    FEED_OPEN,
    FEED_CLOSED,
    FEED_ERROR,
} from '../constants';
import { AppDispatch } from '../store';

export type TFeedWsActions = {
    init: 'FEED_INIT',
    message: 'FEED_MESSAGE',
    close: 'FEED_CLOSE',
    open: 'FEED_OPEN',
    closed: 'FEED_CLOSED',
    error: 'FEED_ERROR'
};

export type TFeedArr = {
    _id: string,
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
}

export const feedWsActions: TFeedWsActions = {
    init: FEED_INIT,
    message: FEED_MESSAGE,
    close: FEED_CLOSE,
    open: FEED_OPEN,
    closed: FEED_CLOSED,
    error: FEED_ERROR
};

export interface IFeedInitAction {
    readonly type: typeof FEED_INIT;
    payload: string
}
export interface FeedCloseAction {
    readonly type: typeof FEED_CLOSE;
}
export interface FeedMessageAction {
    readonly type: typeof FEED_MESSAGE;
    payload: {
        success: boolean,
        orders: TFeedArr[],
        total: number,
        totalToday: number
    }
}
export interface IFeedErrorAction {
    readonly type: typeof FEED_ERROR;
    payload: string
}

export type TSetIngredientsActions =
    | IFeedInitAction
    | FeedCloseAction
    | FeedMessageAction
    | FeedCloseAction
    | IFeedErrorAction

export function feedInitAction(wsUrl: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FEED_INIT,
            payload: wsUrl
        })
    }
}

export function feedCloseAction() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FEED_CLOSE
        })
    }
}

export function feedErrorAction(type: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FEED_ERROR,
            payload: type
        })
    }
}