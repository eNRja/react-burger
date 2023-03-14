import { request } from '../utils/config'
import { getCookie } from '../utils/cookie'

export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const getApiIngredients = () => {
  return request("ingredients")
};

export const makeOrderApi = (burgerIngredients) => {
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

export const forgotPasswordApi = (email) => {
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

export const resetPasswordApi = (password, token) => {
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

export const postRegistrationApi = (email, password, name) => {
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

export const postLoginApi = (email, password) => {
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

export const postRefreshToken = (refreshToken) => {
  return request("auth/token", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
}

export const postLogout = (refreshToken) => {
  return request("auth/logout", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
}

export const postUpdateUser = (name, email, password) => {
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