import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { draggableIngredientReducer } from './draggable-ingredients';
import { dropTargetReducer } from './drop-target';
import { modalIngredientReducer } from './modal-ingredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    ingredientList: draggableIngredientReducer,
    boardList: dropTargetReducer,
    modalIngredient: modalIngredientReducer,
    order: orderReducer,
  });