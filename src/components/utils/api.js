const API_URL = 'https://norma.nomoreparties.space/api'

export const getIngredients = () => {

  return fetch(`${API_URL}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("error");
    })
    .then((body) => {
      if (body.success) {
        return Promise.resolve(body.data);
      }
      return Promise.reject("error")
    })

};