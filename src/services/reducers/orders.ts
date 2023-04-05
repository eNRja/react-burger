import { TSetOrdersIngredientsActions } from "../actions/orders";
import {
    ORDERS_CLOSE,
    ORDERS_ERROR,
    ORDERS_MESSAGE,
} from '../constants'

export type TOrders = {
    // element: { _id: any; ingredients: any; name: any; number: any; updatedAt: any; status: any; };
    _id: string,
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string
}

export type TOrdersState = {
    wsConnected: boolean,
    items: {
        success: boolean,
        orders: TOrders[],
        total: number | null,
        totalToday: number | null
    },
    error?: string | null
};

export const initialState: TOrdersState = {
    wsConnected: false,
    items: {
        success: false,
        orders: [],
        total: null,
        totalToday: null
    },
    error: null
};

export const ordersReducer = (state = initialState, action: TSetOrdersIngredientsActions): TOrdersState => {
    switch (action.type) {

        case ORDERS_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case ORDERS_CLOSE:
            return {
                ...state,
                wsConnected: false
            };

        case ORDERS_MESSAGE: {
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

        default: {
            return state
        }

    }
}