import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    DECREASE_BUN,
    RESET_COUNTER
} from '../constants'
import { ingredientReducer, initialState } from "./ingredient";
import { testIngredientCountNull, testIngredientCount1, testIngredientCount0, ingredients } from '../constants/tests'

describe('ingredients reducer', () => {

    it("should return the initial state", () => {
        expect(ingredientReducer(undefined, {}))
            .toEqual({
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: []
            });
    });

    it("should handle GET_ITEMS_REQUEST", () => {
        expect(ingredientReducer(initialState, {
            type: GET_ITEMS_REQUEST
        }))
            .toEqual({
                ingredients: [],
                ingredientsRequest: true,
                ingredientsFailed: false,
            });
    });

    it("should handle GET_ITEMS_SUCCESS", () => {
        expect(ingredientReducer(initialState, {
            type: GET_ITEMS_SUCCESS,
            payload: ingredients
        }))
            .toEqual({
                ingredients: ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
            });
    });

    it("should handle GET_ITEMS_FAILED", () => {
        expect(ingredientReducer(initialState, { type: GET_ITEMS_FAILED }))
            .toEqual({
                ingredients: [],
                ingredientsFailed: true,
                ingredientsRequest: false
            });
    });

    it("should handle INCREASE_COUNTER", () => {
        expect(ingredientReducer({ ingredients: [testIngredientCountNull], ingredientsFailed: false, ingredientsRequest: false }, {
            type: INCREASE_COUNTER,
            payload: testIngredientCountNull
        }))
            .toEqual({
                ingredients: [testIngredientCount1],
                ingredientsFailed: false,
                ingredientsRequest: false
            });
    });

    it("should handle DECREASE_COUNTER", () => {
        expect(ingredientReducer({ ingredients: [testIngredientCountNull], ingredientsFailed: false, ingredientsRequest: false }, {
            type: DECREASE_COUNTER,
            payload: testIngredientCount1
        }))
            .toEqual({
                ingredients: [testIngredientCountNull],
                ingredientsFailed: false,
                ingredientsRequest: false
            });
    });

    it("should handle DECREASE_BUN", () => {
        expect(ingredientReducer({ ingredients: [testIngredientCount1], ingredientsFailed: false, ingredientsRequest: false }, {
            type: DECREASE_BUN,
            payload: testIngredientCount1
        }))
            .toEqual({
                ingredients: [testIngredientCount0],
                ingredientsFailed: false,
                ingredientsRequest: false
            });
    });

    it("should handle RESET_COUNTER", () => {
        expect(ingredientReducer({ ingredients: [testIngredientCount1, testIngredientCount1], ingredientsFailed: false, ingredientsRequest: false }, { type: RESET_COUNTER }))
            .toEqual({
                ingredients: [testIngredientCount0, testIngredientCount0],
                ingredientsFailed: false,
                ingredientsRequest: false
            });
    });

})