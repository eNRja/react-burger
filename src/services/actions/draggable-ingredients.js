export const GET_DRAGGABLE_INGREDIENT = 'GET_DRAGGABLE_INGREDIENT';
export const GET_DRAGGABLE_BUN = 'GET_DRAGGABLE_BUN';
export const DRAGGABLE_INGREDIENT_DELETE = 'DRAGGABLE_INGREDIENT_DELETE';
export const DRAGGABLE_BUN_DELETE = 'DRAGGABLE_BUN_DELETE';
export const DRAGGABLE_INGREDIENT_MOVE = 'DRAGGABLE_INGREDIENT_MOVE';
export const DRAGGABLE_INGREDIENTS_CLEAR = 'DRAGGABLE_INGREDIENTS_CLEAR';

import { v4 as uuidV4 } from "uuid";
import { DECREASE_COUNTER } from "./ingredients";

export function getDraggableIngredient(item) {
    if (item.typeDragElement !== "bun") {
        return {
            type: GET_DRAGGABLE_INGREDIENT,
            uuid: uuidV4(),
            ...item,
        }
    } else {
        return {
            type: GET_DRAGGABLE_BUN,
            uuid: uuidV4(),
            ...item,
        }
    }
}

export function deleteBun(id) {
    return {
        type: DRAGGABLE_BUN_DELETE,
    }
}
