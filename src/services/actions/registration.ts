import { postRegistrationApi } from '../../api/api';
import { TAppDispatch } from '../../types';
import { TUser } from '../../types/data';
import { REGISTRATION_SUCCEESS } from '../constants';

export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCEESS;
    readonly payload: TUser,
}

export function requestRegistration(email: string, password: string, name: string) {
    return function (dispatch: TAppDispatch) {
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
