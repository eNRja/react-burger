import { postRegistrationApi } from '../../api/api';
import { TUser } from '../../types/data';
import { REGISTRATION_SUCCEESS } from '../constants';
import { AppDispatch } from '../store';

export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCEESS;
    readonly payload: TUser,
}

export function requestRegistration(email: string, password: string, name: string) {
    return function (dispatch: AppDispatch) {
        postRegistrationApi(email, password, name)
            .then((data) => {
                dispatch({
                    type: REGISTRATION_SUCCEESS,
                    payload: data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
