import { TIngredientsOrder } from '../types/data';
import { request } from '../utils/config'
import { getCookie } from '../utils/cookie'

export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const getApiIngredients = () => {
  return request("ingredients", undefined)
};

export const makeOrderApi = (burgerIngredients: string[]) => {
  return request("orders", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      ingredients: burgerIngredients
    })
  })
};

export const forgotPasswordApi = (email: string) => {
  return request("password-reset", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
};

export const resetPasswordApi = (password: string, token: string) => {
  return request("password-reset/reset", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      password: password,
      token: token
    })
  })
};

export const postRegistrationApi = (email: string, password: string, name: string) => {
  return request("auth/register", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
}

export const postLoginApi = (email: string, password: string) => {
  return request("auth/login", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
}

export const getAuth = () => {
  return request('auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
}

export const postRefreshToken = () => {
  return request("auth/token", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    })
  })
}

export const postLogout = () => {
  return request("auth/logout", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    })
  })
}

export const postUpdateUser = (name: string, email: string, password: string) => {
  return request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    })
  })
}
