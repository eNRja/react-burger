const API_URL = 'https://norma.nomoreparties.space/api'

export const getApiIngredients = () => {

  return fetch(`${API_URL}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("error");
    })
};

export const makeOrderApi = (burgerIngredients) => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      ingredients: burgerIngredients
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("error");
    })
};