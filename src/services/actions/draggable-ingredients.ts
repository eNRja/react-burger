import { v4 as uuidV4 } from "uuid";
import { TDragItem } from "../../types/data";
import {
    GET_DRAGGABLE_INGREDIENT,
    GET_DRAGGABLE_BUN,
    DRAGGABLE_BUN_DELETE,
    DRAGGABLE_INGREDIENT_DELETE,
    DRAGGABLE_INGREDIENT_MOVE,
    DRAGGABLE_INGREDIENTS_CLEAR,
} from '../constants';

export interface IGetDraggableIngredientAction {
    readonly type: typeof GET_DRAGGABLE_INGREDIENT;
    readonly payload: TDragItem;
    readonly uuid: string;
}
export interface IGetDraggableBunAction {
    readonly type: typeof GET_DRAGGABLE_BUN;
    readonly payload: TDragItem
    readonly uuid: string;
}
export interface IDraggableBunDeleteAction {
    readonly type: typeof DRAGGABLE_BUN_DELETE;
}
export interface IDraggableIngredientDeleteAction {
    readonly type: typeof DRAGGABLE_INGREDIENT_DELETE;
    readonly uuid: string
}
export interface IDraggableIngredientMoveAction {
    readonly type: typeof DRAGGABLE_INGREDIENT_MOVE;
    dragIndex: any,
    hoverIndex: any
}
export interface IDraggableIngredientClearAction {
    readonly type: typeof DRAGGABLE_INGREDIENTS_CLEAR;
}

export type TDragActions =
    | IGetDraggableIngredientAction
    | IGetDraggableBunAction
    | IDraggableBunDeleteAction
    | IDraggableIngredientDeleteAction
    | IDraggableIngredientMoveAction
    | IDraggableIngredientClearAction

export const DraggableBunDeleteAction = (): TDragActions => ({
    type: DRAGGABLE_BUN_DELETE
});
export const DraggableIngredientDeleteAction = (uuid: string): TDragActions => ({
    type: DRAGGABLE_INGREDIENT_DELETE,
    uuid
});
export const DraggableIngredientMoveAction = (dragIndex: any, hoverIndex: any): TDragActions => ({
    type: DRAGGABLE_INGREDIENT_MOVE,
    dragIndex,
    hoverIndex
});
export const DraggableIngredientClearAction = (): TDragActions => ({
    type: DRAGGABLE_INGREDIENTS_CLEAR
});

export function getDraggableIngredient(payload: TDragItem): TDragActions {
    if (payload.type !== "bun") {
        return {
            type: GET_DRAGGABLE_INGREDIENT,
            uuid: uuidV4(),
            payload,
        }
    } else {
        return {
            type: GET_DRAGGABLE_BUN,
            uuid: uuidV4(),
            payload,
        }
    }
}

export function deleteBun() {
    return {
        type: DRAGGABLE_BUN_DELETE,
    }
}