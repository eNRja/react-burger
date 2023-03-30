import { postLoginApi, getAuth, postRefreshToken, postLogout, postUpdateUser } from '../../api/api';
import { TUser } from '../../types/data';
import { setCookie } from '../../utils/cookie';
import {
    USER_SUCCEESS,
    AUTH_CHECKED,
    REFRESH_TOKEN,
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
export interface IRefreshTokenAction {
    readonly type: typeof REFRESH_TOKEN;
    readonly payload: TUser | null;
}
export interface IUserUpdateAction {
    readonly type: typeof USER_UPDATE;
    readonly payload: TUser | null;
}

export type TGetUserActions =
    | IUserSuccessAction
    | IAuthCheckedAction
    | IUserUpdateAction
    | IRefreshTokenAction

export function requestLogin(email: string, password: string) {
    return function (dispatch: (arg0: IUserSuccessAction & { payload: TUser; password: string; }) => void) {
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

export const checkAuth = () => (dispatch: (arg0: (dispatch: any) => void) => void) => {
    dispatch(getUserWithRefresh());
};

function getUser() {
    return function (dispatch: (arg0: TGetUserActions & { payload?: TUser }) => void) {
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

function getUserWithRefresh() {
    return function (dispatch: (arg0: TGetUserActions & { payload?: TUser }) => void) {
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
                    return Promise.reject(`Error: ${err}`);
                }
            })
    }
}

export function requestLogout() {
    return function (dispatch: (arg0: IUserSuccessAction & { payload: null; password: string; }) => void) {

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
    return function (dispatch: (arg0: IUserUpdateAction & { payload: TUser; }) => void) {
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
