import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { draggableIngredientReducer } from './draggable-ingredients';
import { orderReducer } from './order';
import { forgotPasswordReducer } from './forgot-reset-password';
import { registrationReducer } from './registration';
import { userReducer } from './login';
import { feedReducer } from './feed';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    ingredientList: draggableIngredientReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    registration: registrationReducer,
    login: userReducer,
    feed: feedReducer,
    orders: ordersReducer,
  });