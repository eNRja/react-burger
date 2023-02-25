import { ORDER_ADD } from '../actions/order';

const initialState = {
    orderItems: []
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_ADD: {
            return {
                ...state,
                orderItems: [...state.orderItems, {action}]
            }
        }
        default: {
            return state
        }
    }
}