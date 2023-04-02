import { TSetIngredientsActions } from "../actions/feed";
import {
    FEED_CLOSE,
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
    items: {
        success: boolean,
        orders: TOrdersFeed[],
        total: number | null,
        totalToday: number | null
    },
};

const initialState = {
    items: {
        success: false,
        orders: [],
        total: null,
        totalToday: null
    },
};

export const feedReducer = (state = initialState, action: TSetIngredientsActions): TFeedState => {
    switch (action.type) {

        case FEED_MESSAGE: {
            return {
                items: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday,
                },
            }
        }

        case FEED_INIT: {
            return {
                items: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday,
                },
            }
        }

        case FEED_CLOSE: {
            return {
                items: {
                    success: false,
                    orders: [],
                    total: null,
                    totalToday: null
                },
            }
        }

        default: {
            return state
        }

    }
}