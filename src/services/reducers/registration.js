import { REGISTRATION_SUCCEESS } from '../actions/registration';

const initialState = {
    userRegistration: [],
};

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTRATION_SUCCEESS: {
            return {
                ...state,
                userRegistration: [...state.userRegistration, action.payload],
            }
        }


        default: {
            return state
        }
    }
}