import { TSetIngredientsActions } from "../actions/orders";
import {
    ORDERS_MESSAGE,
} from '../constants'

export type TOrders = {
    _id: string,
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string
}

export type TOrdersState = {
    items: {
        success: boolean,
        orders: TOrders[],
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

export const ordersReducer = (state = initialState, action: TSetIngredientsActions): TOrdersState => {
    switch (action.type) {

        case ORDERS_MESSAGE: {
            return {
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