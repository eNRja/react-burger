import { postRegistrationApi, postLogoutApi } from '../../api/api';

export const REGISTRATION_SUCCEESS = 'REGISTRATION_SUCCEESS';

export function requestRegistration(email, password, name) {
    return function (dispatch) {
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
