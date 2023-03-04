import { ORDER_ADD, ORDER_CLOSE } from '../actions/order';

const initialState = {
    orderItems: [],
    setmodal: false,
    orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_ADD: {
            return {
                ...state,
                orderItems: [...state.orderItems, {action}],
                setmodal: true
            }
        }

        case ORDER_CLOSE: {
            return {
                ...state,
                setmodal: false
            }
        }

        default: {
            return state
        }
    }
}