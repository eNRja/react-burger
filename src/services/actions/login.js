import { postLoginApi, getAuth, postRefreshToken, postLogout, postUpdateUser } from '../../api/api';
import { getCookie, setCookie } from '../../utils/cookie';

export const USER_SUCCEESS = 'USER_SUCCEESS';
export const AUTH_CHECKED = 'AUTH_CHECKED';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const USER_UPDATE = 'USER_UPDATE';

export function requestLogin(email, password) {
    return function (dispatch) {
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

export const checkAuth = () => (dispatch) => {
    dispatch(getUserWithRefresh());
    dispatch({ type: AUTH_CHECKED });
};

function getUser() {
    return function (dispatch) {
        getAuth()
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: data,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function getUserWithRefresh() {
    return function (dispatch) {
        getAuth()
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: USER_SUCCEESS,
                        payload: data,
                    });
                }
            })
            .catch(err => {

                if (err.message === "jwt expired") {
                    postRefreshToken(`${getCookie("refreshToken")}`)
                        .then((data) => {

                            const authToken = data.accessToken.split('Bearer ')[1];
                            if (authToken) {
                                setCookie('token', authToken, { secure: true, 'max-age': 20000, SameSite: "Lax" });
                                setCookie('refreshToken', data.refreshToken, { secure: true, SameSite: "Lax" });
                            }
                            return dispatch(getUser());
                        })
                } else {
                    return Promise.reject(`Error: ${err}`);
                }
            })
    }
}

export function requestLogout() {
    return function (dispatch) {

        postLogout(`${getCookie("refreshToken")}`)
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

export function requestUpdateUser(name, email, password) {
    return function (dispatch) {
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
