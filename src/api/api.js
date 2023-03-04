import { request } from '../utils/config'

export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const getApiIngredients = () => {
  return request("ingredients")
};

export const makeOrderApi = (burgerIngredients) => {
  return request("orders", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      ingredients: burgerIngredients
    })
  })
};