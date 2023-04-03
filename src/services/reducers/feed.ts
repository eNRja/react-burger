import { TSetIngredientsActions } from "../actions/feed";
import {
    FEED_CLOSE,
    FEED_ERROR,
    FEED_MESSAGE,
} from '../constants'

export type TOrdersFeed = {
    _id: string,
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string
}

export type TFeedState = {
    wsConnected: boolean,
    items: {
        success: boolean,
        orders: TOrdersFeed[],
        total: number | null,
        totalToday: number | null
    },
    error?: string | null,
};

export const initialState = {
    wsConnected: false,
    items: {
        success: false,
        orders: [],
        total: null,
        totalToday: null
    },
    error: null
};

export const feedReducer = (state = initialState, action: TSetIngredientsActions): TFeedState => {
    switch (action.type) {

        case FEED_MESSAGE: {
            return {
                ...state,
                wsConnected: true,
                items: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday,
                },
            }
        }

        case FEED_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case FEED_CLOSE:
            return {
                ...state,
                wsConnected: false
            };

        default: {
            return state
        }

    }
}