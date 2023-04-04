import { postLoginApi, getAuth, postRefreshToken, postLogout, postUpdateUser } from '../../api/api';
import { TAppDispatch } from '../../types';
import { TUser } from '../../types/data';
import { setCookie } from '../../utils/cookie';
import {
    USER_SUCCEESS,
    AUTH_CHECKED,
    USER_UPDATE
} from '../constants';

export interface IUserSuccessAction {
    readonly type: typeof USER_SUCCEESS;
    readonly payload: TUser | null;
    readonly password?: string
}
export interface IAuthCheckedAction {
    readonly type: typeof AUTH_CHECKED;
}
export interface IUserUpdateAction {
    readonly type: typeof USER_UPDATE;
    readonly payload: TUser | null;
}

export type TGetUserActions =
    | IUserSuccessAction
    | IAuthCheckedAction
    | IUserUpdateAction

export function requestLogin(email: string, password: string) {
    return function (dispatch: TAppDispatch) {
        postLoginApi(email, password)
            .then((data) => {
                if (data.success) {
                    const authToken = data.accessToken.split('Bearer ')[1];
                    if (authToken) {
                        setCookie('token', authToken, { secure: true, 'max-age': 20000, SameSite: "Lax" });
                        setCookie('refreshToken', data.refreshToken, { secure: true, SameSite: "Lax" });
                    }
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: data,
                        password: password
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

function getUser() {
    return function (dispatch: TAppDispatch) {
        getAuth()
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: data,
                    });
                    dispatch({ type: AUTH_CHECKED });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function getUserWithRefresh() {
    return function (dispatch: TAppDispatch) {
        getAuth()
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: data,
                    });
                    dispatch({ type: AUTH_CHECKED });
                }
            })
            .catch(err => {
                if (err.message === "jwt expired") {
                    postRefreshToken()
                        .then((data) => {
                            const authToken = data.accessToken.split('Bearer ')[1];
                            if (authToken) {
                                setCookie('token', authToken, { secure: true, 'max-age': 20000, SameSite: "Lax" });
                                setCookie('refreshToken', data.refreshToken, { secure: true, SameSite: "Lax" });
                            }
                            getUser();
                        })
                } else {
                    dispatch({ type: AUTH_CHECKED });
                }
            })
    }
}

export function requestLogout() {
    return function (dispatch: TAppDispatch) {

        postLogout()
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: null,
                        password: ''
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function requestUpdateUser(name: string, email: string, password: string) {
    return function (dispatch: TAppDispatch) {
        postUpdateUser(name, email, password)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_UPDATE,
                        payload: data,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}
