import {
    ORDER_ADD,
    ORDER_CLOSE,
    SET_LOADER
} from '../constants'
import { orderReducer, initialState } from "./order";
import { orderItemsTest } from '../constants/tests'

describe('order reducer', () => {

    it("should return the initial state", () => {
        expect(orderReducer(undefined, {}))
            .toEqual({
                orderItems: null,
                setmodal: false,
                orderFailed: false,
                loader: false
            });
    });

    it("should handle ORDER_ADD", () => {
        expect(orderReducer(initialState, {
            type: ORDER_ADD,
            payload: orderItemsTest
        }))
            .toEqual({
                ...initialState,
                orderItems: orderItemsTest,
                setmodal: true
            });
    });

    it("should handle ORDER_CLOSE", () => {
        expect(orderReducer({
            ...initialState,
            setmodal: true,
        }, {
            type: ORDER_CLOSE,
            setmodal: false
        }))
            .toEqual({
                ...initialState,
                setmodal: false,

            });
    });

    it("should handle SET_LOADER", () => {
        expect(orderReducer(initialState, {
            type: SET_LOADER,
            loader: true
        }))
            .toEqual({
                ...initialState,
                loader: true
            });
    });

})