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
                orderItems: orderItemsTest,
                setmodal: true,
                orderFailed: false,
                loader: false
            });
    });

    it("should handle ORDER_CLOSE", () => {
        expect(orderReducer({
            orderItems: null,
            setmodal: true,
            orderFailed: false,
            loader: false
        }, {
            type: ORDER_CLOSE,
            setmodal: false
        }))
            .toEqual({
                orderItems: null,
                setmodal: false,
                orderFailed: false,
                loader: false
            });
    });

    it("should handle SET_LOADER", () => {
        expect(orderReducer(initialState, {
            type: SET_LOADER,
            loader: true
        }))
            .toEqual({
                orderItems: null,
                setmodal: false,
                orderFailed: false,
                loader: true
            });
    });

})