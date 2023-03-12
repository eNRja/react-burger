import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { draggableIngredientReducer } from './draggable-ingredients';
import { dropTargetReducer } from './drop-target';
import { orderReducer } from './order';
import { forgotPasswordReducer } from './forgot-reset-password';
import { registrationReducer } from './registration';
import { userReducer } from './login';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    ingredientList: draggableIngredientReducer,
    boardList: dropTargetReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    registration: registrationReducer,
    login: userReducer,
  });