import { TFrogotPass } from '../../types/data';
import { TResetForgotPAssActions } from '../actions/forgot-reset-password';
import { FORGOT_PASSWORD, RESET_PASSWORD, PROTECT_RESET_PAGE } from '../constants';

export type TForgotResetState = {
    itemRequest: TFrogotPass | null,
    passwordRequest: TFrogotPass | null,
    protectedResetPage: boolean
};

export const initialState = {
    itemRequest: null,
    passwordRequest: null,
    protectedResetPage: false
};

export const forgotPasswordReducer = (state = initialState, action: TResetForgotPAssActions): TForgotResetState => {
    switch (action.type) {

        case FORGOT_PASSWORD: {
            return {
                ...state,
                itemRequest: action.payload,
            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                passwordRequest: action.payload,
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