import {
    ORDERS_MESSAGE,
    ORDERS_ERROR,
    ORDERS_CLOSE
} from '../constants'
import { ordersReducer, initialState } from "./orders";
import { feedItems } from '../constants/tests'

describe('orders reducer', () => {

    it("should return the initial state", () => {
        expect(ordersReducer(undefined, {}))
            .toEqual({
                wsConnected: false,
                items: {
                    success: false,
                    orders: [],
                    total: null,
                    totalToday: null
                },
                error: null
            });
    });

    it("should handle ORDERS_ERROR", () => {
        expect(ordersReducer(initialState, {
            type: ORDERS_ERROR,
            payload: "error"
        }))
            .toEqual({
                ...initialState,
                wsConnected: false,
                error: "error"
            });
    });

    it("should handle ORDERS_CLOSE", () => {
        expect(ordersReducer(initialState, {
            type: ORDERS_CLOSE
        }))
            .toEqual({
                ...initialState,
                wsConnected: false,
            });
    });

    it("should handle ORDERS_MESSAGE", () => {
        expect(ordersReducer(initialState, {
            type: ORDERS_MESSAGE,
            payload: feedItems
        }))
            .toEqual({
                ...initialState,
                wsConnected: true,
                items: feedItems
            });
    });


})