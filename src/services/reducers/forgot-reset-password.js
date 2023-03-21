import { FORGOT_PASSWORD, RESET_PASSWORD, PROTECT_RESET_PAGE } from '../actions/forgot-reset-password';

const initialState = {
    itemRequest: [],
    passwordRequest: [],
    protectedResetPage: false
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

        case PROTECT_RESET_PAGE: {
            return {
                ...state,
                protectedResetPage: action.payload,
            }
        }

        default: {
            return state
        }
    }
}