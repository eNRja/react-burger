import {
    GET_DRAGGABLE_INGREDIENT,
    GET_DRAGGABLE_BUN,
    DRAGGABLE_INGREDIENT_DELETE,
    DRAGGABLE_BUN_DELETE,
    DRAGGABLE_INGREDIENT_MOVE,
    DRAGGABLE_INGREDIENTS_CLEAR,
} from '../constants'
import { draggableIngredientReducer, initialState } from "./draggable-ingredients";
import { ingredient1Drag, ingredient2Drag, bunDrag } from '../constants/tests'


describe('draggable-ingredients reducer', () => {

    it("should return the initial state", () => {
        expect(draggableIngredientReducer(undefined, {}))
            .toEqual({
                items: [],
                bun: null,
                dragIngredients: null,
            });
    });

    it("should handle GET_DRAGGABLE_INGREDIENT", () => {
        expect(draggableIngredientReducer(initialState, {
            type: GET_DRAGGABLE_INGREDIENT,
            payload: ingredient1Drag
        }))
            .toEqual({
                ...initialState,
                items: [ingredient1Drag]
            });
    });

    it("should handle GET_DRAGGABLE_BUN", () => {
        expect(draggableIngredientReducer(initialState, {
            type: GET_DRAGGABLE_BUN,
            payload: bunDrag
        }))
            .toEqual({
                ...initialState,
                bun: bunDrag
            });
    });

    it("should handle DRAGGABLE_INGREDIENT_DELETE", () => {
        expect(draggableIngredientReducer(initialState, { type: DRAGGABLE_INGREDIENT_DELETE }))
            .toEqual({ ...initialState });
    });

    it("should handle DRAGGABLE_BUN_DELETE", () => {
        expect(draggableIngredientReducer(initialState, {
            type: DRAGGABLE_BUN_DELETE
        }))
            .toEqual({ ...initialState });
    });

    it("should handle DRAGGABLE_INGREDIENT_MOVE", () => {
        expect(draggableIngredientReducer({ ...initialState, items: [ingredient1Drag, ingredient2Drag] }, {
            type: DRAGGABLE_INGREDIENT_MOVE,
            dragIndex: 0,
            hoverIndex: 1
        }))
            .toEqual({ ...initialState, items: [ingredient2Drag, ingredient1Drag] });
    });

    it("should handle DRAGGABLE_INGREDIENTS_CLEAR", () => {
        expect(draggableIngredientReducer(initialState, { type: DRAGGABLE_INGREDIENTS_CLEAR }))
            .toEqual({ ...initialState });
    });

})