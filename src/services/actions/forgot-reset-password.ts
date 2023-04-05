import { forgotPasswordApi, resetPasswordApi } from '../../api/api';
import { TAppDispatch } from '../../types';
import { TFrogotPass } from '../../types/data';
import {
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    PROTECT_RESET_PAGE
} from '../constants'

export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD,
    readonly payload: TFrogotPass;
}
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
    readonly payload: TFrogotPass;
}
export interface IProtectResetPageAction {
    readonly type: typeof PROTECT_RESET_PAGE;
    readonly payload: boolean;
}

export type TResetForgotPAssActions =
    | IForgotPasswordAction
    | IResetPasswordAction
    | IProtectResetPageAction

export function requestForgotPassword(email: string, goToResetPasswordPage: { (): void; (): void; }) {
    return function (dispatch: TAppDispatch) {
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

export function requestResetPassword(password: string, token: string) {
    return function (dispatch: TAppDispatch) {
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

export function checkProtectResetPage(bool: boolean) {
    return function (dispatch: TAppDispatch) {
        dispatch({
            type: PROTECT_RESET_PAGE,
            payload: bool
        })
    }
}