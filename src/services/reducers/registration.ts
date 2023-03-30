import { TUser } from '../../types/data';
import { IRegistrationSuccessAction } from '../actions/registration';
import { REGISTRATION_SUCCEESS } from '../constants'

export type TUserReg = {
    userRegistration: TUser | null
};

const initialState = {
    userRegistration: null
};

export const registrationReducer = (state = initialState, action: IRegistrationSuccessAction): TUserReg => {
    switch (action.type) {

        case REGISTRATION_SUCCEESS: {
            return {
                ...state,
                userRegistration: action.payload,
            }
        }


        default: {
            return state
        }
    }
}