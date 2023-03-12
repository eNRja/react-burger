import { forgotPasswordApi, resetPasswordApi } from '../../api/api';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export function requestForgotPassword(email, goToResetPasswordPage) {
    return function (dispatch) {
        forgotPasswordApi(email)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: FORGOT_PASSWORD,
                        payload: data,
                    })
                    goToResetPasswordPage()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function requestResetPassword(password, token) {
    return function (dispatch) {
        resetPasswordApi(password, token)
            .then((data) => {
                dispatch({
                    type: RESET_PASSWORD,
                    payload: data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
} 