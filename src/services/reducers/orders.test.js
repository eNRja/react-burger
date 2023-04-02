import {
    ORDERS_MESSAGE
} from '../constants'
import { ordersReducer, initialState } from "./orders";
import { feedItems } from '../constants/tests'

describe('orders reducer', () => {

    it("should return the initial state", () => {
        expect(ordersReducer(undefined, {}))
            .toEqual({
                items: {
                    success: false,
                    orders: [],
                    total: null,
                    totalToday: null
                },
            });
    });

    it("should handle ORDERS_MESSAGE", () => {
        expect(ordersReducer(initialState, {
            type: ORDERS_MESSAGE,
            payload: feedItems
        }))
            .toEqual({
                items: feedItems
            });
    });

})