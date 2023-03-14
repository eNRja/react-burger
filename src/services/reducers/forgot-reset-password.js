import { FORGOT_PASSWORD, RESET_PASSWORD } from '../actions/forgot-reset-password';

const initialState = {
    itemRequest: [],
    passwordRequest: []
};

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD: {
            return {
                ...state,
                itemRequest: [action.payload],
            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                passwordRequest: [action.payload],
            }
        }

        default: {
            return state
        }
    }
}