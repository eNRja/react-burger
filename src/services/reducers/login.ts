import { TUser } from '../../types/data';
import { TGetUserActions } from '../actions/login';
import { USER_SUCCEESS, AUTH_CHECKED, REFRESH_TOKEN, USER_UPDATE } from '../constants';

export type TUserState = {
    user: TUser | null,
    passwordUser?: string,
    isAuthChecked: boolean
};

const initialState = {
    user: null,
    passwordUser: '',
    isAuthChecked: false,
};

export const userReducer = (state = initialState, action: TGetUserActions): TUserState => {
    switch (action.type) {

        case AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: true
            }
        }

        case USER_SUCCEESS: {
            return {
                ...state,
                user: action.payload,
                passwordUser: action.password,
            }
        }

        case REFRESH_TOKEN: {
            return {
                ...state,
                user: action.payload,
            }
        }

        case USER_UPDATE: {
            return {
                ...state,
                user: action.payload,
            }
        }

        default: {
            return state
        }
    }
}