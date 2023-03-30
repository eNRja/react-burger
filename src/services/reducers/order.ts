import { TOrder } from '../../types/data';
import { TSetIngredientsActions } from '../actions/order';
import { ORDER_ADD, ORDER_CLOSE, SET_LOADER } from '../constants';

export type TOrders = {
    orderItems: TOrder | null,
    setmodal: boolean,
    orderFailed: boolean,
    loader: boolean
};

const initialState = {
    orderItems: null,
    setmodal: false,
    orderFailed: false,
    loader: false
};

export const orderReducer = (state = initialState, action: TSetIngredientsActions): TOrders => {
    switch (action.type) {

        case ORDER_ADD: {
            return {
                ...state,
                orderItems: action.payload,
                setmodal: true
            }
        }

        case ORDER_CLOSE: {
            return {
                ...state,
                setmodal: false
            }
        }

        case SET_LOADER: {
            return {
                ...state,
                loader: action.loader
            }
        }

        default: {
            return state
        }
    }
}